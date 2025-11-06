import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

// This is mock data. In a real application, you would fetch this from a CMS based on the slug.
const post = {
  title: 'The Ultimate Guide to Choosing a Restaurant Location',
  date: 'October 26, 2023',
  content: `
    <p class="text-lg text-gray-300 mb-6">Choosing the right location is the single most important factor in a restaurant's success. This guide breaks down the key data points you need to analyze.</p>
    <h2 class="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">1. Decoding Foot Traffic</h2>
    <p class="text-gray-300 mb-4">High foot traffic is great, but is it the *right* foot traffic? Our AI analyzes pedestrian flow patterns to distinguish between morning commuters, lunchtime office workers, and evening diners, helping you align your concept with the audience that's actually there.</p>
    <h2 class="text-2xl font-semibold text-[#7c7ff3] mt-10 mb-4">2. Competitor Analysis Beyond the Obvious</h2>
    <p class="text-gray-300 mb-4">It's not enough to know who your competitors are. You need to know how they're performing. We analyze review sentiment, peak hours, and menu pricing to identify market gaps you can exploit.</p>
  `
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>{post.title} | Highbrook Realty AI</title>
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
            <p className="text-sm text-gray-400">{post.date}</p>
            <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
