import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { JsonLdSchema } from '../components/json-ld-schema';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Highbrook Realty AI | AI-Powered Location Intelligence for Real Estate</title>
        <meta name="description" content="Unlock actionable insights for your hospitality venture. Highbrook Realty AI provides data-driven location analysis, competitor intelligence, and revenue projections." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Highbrook Realty AI | AI-Powered Location Intelligence for Real Estate" />
        <meta property="og:description" content="Unlock actionable insights for your hospitality venture. Highbrook Realty AI provides data-driven location analysis, competitor intelligence, and revenue projections." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thehighbrooks.com" />
        <meta property="og:image" content="https://www.thehighbrooks.com/og-image.jpg" />
        <meta property="og:site_name" content="Highbrook Realty AI" />

        <JsonLdSchema />
      </Head>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
