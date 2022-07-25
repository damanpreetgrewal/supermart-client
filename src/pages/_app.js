import '@styles/custom.css';
import { CartProvider } from 'react-use-cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//internal import
import { UserProvider } from '@context/UserContext';
import DefaultSeo from '@component/common/DefaultSeo';
import { SidebarProvider } from '@context/SidebarContext';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || null);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <SidebarProvider>
          <Elements stripe={stripePromise}>
            <CartProvider>
              <DefaultSeo />
              <Component {...pageProps} />
            </CartProvider>
          </Elements>
        </SidebarProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
