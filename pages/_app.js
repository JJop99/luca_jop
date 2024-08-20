import Layout from "../components/Layout/Layout";
import "../styles/globals.sass";
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics/>
    </Layout>
  );
}

export default MyApp;
