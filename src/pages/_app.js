import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@hookstate/devtools';
import Head from 'next/head';
import propTypes from 'prop-types';
import * as gtag from '@/utils/google-analytics';
import Loading from '@/components/Loading/Loading';
import Analytics from '@/components/Analytics/Analytics';
import 'antd/dist/antd.css';
import '@/styles/globals.css';

require('../mocks');

App.propTypes = {
  Component: propTypes.func.isRequired,
  pageProps: propTypes.shape({}).isRequired,
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageview(url);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Ben - Portal RH</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Loading />
      {process.env.NEXT_PUBLIC_GA_ID && <Analytics />}
    </>
  );
}
