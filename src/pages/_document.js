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
            content="Supermart - Grocery & Organic Food Store e-commerce"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Grocery & Organic Food Store e-commerce"
          />
          <meta
            property="og:url"
            content="https://supermart-client.vercel.app/"
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
