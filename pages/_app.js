import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { LanguageProvider } from '../context/LanguageContext';
import "../styles/globals.sass";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  // Pages can opt out of the site layout (e.g. /studio)
  if (Component.noLayout) {
    return <Component {...pageProps} />
  }

  return (
    <LanguageProvider>
      <Layout>
        {/* Site-wide defaults. Per-page title/description/OG live in <Seo>. */}
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <title>Luca Jop — Architetto</title>
          <meta name="description" content="Studio di architettura di Luca Jop. Residenze, edifici pubblici e riqualificazione energetica." />
          <link rel="icon" href="/favicon_io/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png"/>
        </Head>
        <Component {...pageProps} />
        <Analytics/>
        <SpeedInsights/>
      </Layout>
    </LanguageProvider>
  );
}

export default MyApp;
