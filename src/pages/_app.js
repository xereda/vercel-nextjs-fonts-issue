import propTypes from 'prop-types';
import '@hookstate/devtools';
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
      <Component {...pageProps} />
      <Loading />
    </>
  );
}
