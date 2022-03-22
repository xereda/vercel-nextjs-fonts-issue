import propTypes from 'prop-types';
import '@hookstate/devtools';
import 'antd/dist/antd.css';
import '@/styles/globals.css';

require('../mocks');

MyApp.propTypes = {
  Component: propTypes.func.isRequired,
  pageProps: propTypes.shape({}).isRequired,
};

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
