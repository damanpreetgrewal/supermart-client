import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            property="og:title"
            content="KachaBazar - React Grocery & Organic Food Store e-commerce Template"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="React Grocery & Organic Food Store e-commerce Template"
          />
          <meta
            property="og:url"
            content="https://kachabazar-store.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/ahossain/image/upload/v1636729752/facebook-page_j7alju.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
