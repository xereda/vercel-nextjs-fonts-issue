import '../styles/globals.css'
import 'antd/dist/antd.css'
import colors from '../styles/colors.css'
import Layout from '../components/Layout/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
