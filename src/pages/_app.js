import Head from 'next/head';
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Vercel Fonts Issue</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
