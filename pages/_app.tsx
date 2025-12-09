import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { JsonLdSchema } from '../components/json-ld-schema';
import { Footer } from '../components/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Highbrook Realty AI | AI-Powered Location Intelligence for Hospitality</title>
        <meta name="description" content="Make data-driven decisions for your hospitality venture. Highbrook Realty AI provides comprehensive location analysis, competitor intelligence, and revenue projections for cafés, restaurants, and hotels." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Highbrook Realty AI | AI-Powered Location Intelligence for Hospitality" />
        <meta property="og:description" content="Make data-driven decisions for your hospitality venture. Highbrook Realty AI provides comprehensive location analysis, competitor intelligence, and revenue projections." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thehighbrooks.com/" />
        <meta property="og:image" content="https://www.thehighbrooks.com/og-image.jpg" />
        <meta property="og:site_name" content="Highbrook Realty AI" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Highbrook Realty AI | AI-Powered Location Intelligence for Hospitality" />
        <meta name="twitter:description" content="Make data-driven decisions for your hospitality venture. Highbrook Realty AI provides comprehensive location analysis, competitor intelligence, and revenue projections." />
        <meta name="twitter:image" content="https://www.thehighbrooks.com/og-image.jpg" />

        <JsonLdSchema />
      </Head>
      <div className={inter.className}>
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
