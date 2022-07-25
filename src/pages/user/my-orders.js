import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoBagHandle } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import Dashboard from '@pages/user/dashboard';
import OrderServices from '@services/OrderServices';
import Loading from '@component/preloader/Loading';
import { UserContext } from '@context/UserContext';
import OrderHistory from '@component/order/OrderHistory';

const MyOrders = () => {
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { data, error, loading } = useAsync(OrderServices.getOrderByUser);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard title="My Orders" description="This is user order history page">
      <div className="overflow-hidden rounded-md font-serif">
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <h2 className="text-2xl text-center my-10 mx-auto w-11/12">
            {error}
          </h2>
        ) : data.length === 0 ? (
          <div className="text-center">
            <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
              <IoBagHandle />
            </span>
            <h2 className="font-medium text-md my-4 text-gray-600">
              You Have no order Yet!
            </h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-serif font-semibold mb-5">My Orders</h2>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                  <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100">
                        <th
                          scope="col"
                          className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          OrderTime
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Method
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.map((order) => (
                        <tr key={order._id}>
                          <OrderHistory order={order} />
                          <td className="px-5 py-3 whitespace-nowrap text-right text-sm">
                            <Link href={`/order/${order._id}`}>
                              <a className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full">
                                Details
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default MyOrders;
