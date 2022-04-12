import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getStaticProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Ben - Portal RH</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" type="image/svg" href="/svg/icon-ben.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <div id="myportal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
