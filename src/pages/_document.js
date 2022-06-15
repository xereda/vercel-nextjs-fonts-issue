import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html>
      <Head>
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
