import '@hookstate/devtools';
import Head from 'next/head';
import propTypes from 'prop-types';
import Loading from '@/components/Loading/Loading';
import 'antd/dist/antd.css';
import '@/styles/globals.css';

require('../mocks');

MyApp.propTypes = {
  Component: propTypes.func.isRequired,
  pageProps: propTypes.shape({}).isRequired,
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ben - Portal RH</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Loading />
    </>
  );
}
