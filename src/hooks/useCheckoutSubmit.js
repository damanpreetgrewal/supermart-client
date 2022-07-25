import Cookies from 'js-cookie';
import * as dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from 'react-use-cart';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

//internal import
import useAsync from '@hooks/useAsync';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import CouponServices from '@services/CouponServices';
import { notifyError, notifySuccess } from '@utils/toast';

const useCheckoutSubmit = () => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const [error, setError] = useState('');
  const [total, setTotal] = useState('');
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState('');
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef('');
  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useAsync(CouponServices.getAllCoupons);

  useEffect(() => {
    if (Cookies.get('couponInfo')) {
      const coupon = JSON.parse(Cookies.get('couponInfo'));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, []);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove('couponInfo');
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  useEffect(() => {
    const result = items?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );
    let totalValue = '';
    let subTotal = (cartTotal + shippingCost).toFixed(2);
    let discountAmount = discountProductTotal * (discountPercentage / 100);
    totalValue = subTotal - discountAmount;
    setDiscountAmount(discountAmount);
    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  //if not login then push user to home page
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }

    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('address', shippingAddress.address);
    setValue('contact', shippingAddress.contact);
    setValue('email', shippingAddress.email);
    setValue('city', shippingAddress.city);
    setValue('country', shippingAddress.country);
    setValue('zipCode', shippingAddress.zipCode);
  }, []);

  const submitHandler = async (data) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
    Cookies.set('shippingAddress', JSON.stringify(data));
    setIsCheckoutSubmit(true);

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: 'Pending',
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };
    if (data.paymentMethod === 'Card') {
      if (!stripe) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error && !paymentMethod) {
        setError(error.message);
      } else {
        setError('');
        const orderData = {
          ...orderInfo,
          cardInfo: paymentMethod,
        };

        OrderServices.addOrder(orderData)
          .then((res) => {
            router.push(`/order/${res._id}`);
            notifySuccess('Your Order Confirmed!');
            Cookies.remove('couponInfo');
            emptyCart();
            sessionStorage.removeItem('products');
            setIsCheckoutSubmit(false);
          })
          .catch((err) => {
            notifyError(err.message);
            setIsCheckoutSubmit(false);
          });
      }
    }
    if (data.paymentMethod === 'COD') {
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          router.push(`/order/${res._id}`);
          notifySuccess('Your Order Confirmed!');
          Cookies.remove('couponInfo');
          sessionStorage.removeItem('products');
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError('Please Input a Coupon Code!');
      return;
    }
    const result = data.filter(
      (coupon) => coupon.couponCode === couponRef.current.value
    );

    if (result.length < 1) {
      notifyError('Please Input a Valid Coupon!');
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError('This coupon is not valid!');
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch({ type: 'SAVE_COUPON', payload: result[0] });
      Cookies.set('couponInfo', JSON.stringify(result[0]));
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
  };
};

export default useCheckoutSubmit;
