import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// This is mock data. In a real application, you would fetch this from a CMS.
const posts = [
  {
    slug: 'ultimate-guide-to-choosing-a-restaurant-location',
    title: 'The Ultimate Guide to Choosing a Restaurant Location',
    excerpt: 'Learn how data analytics is revolutionizing hospitality real estate and how to decode foot traffic for your café\'s success.',
    date: 'October 26, 2023'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Blog | Highbrook Realty AI</title>
        <meta name="description" content="Insights and articles on location intelligence, real estate analytics, and the hospitality industry." />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Content Hub</h1>
          <p className="text-lg text-gray-300">Insights on Hospitality, Real Estate, and Data Intelligence</p>
        </div>

        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-1 lg:max-w-none">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="flex-1 bg-[#1e293b] p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`} className="block mt-2">
                    <p className="text-xl font-semibold text-white">{post.title}</p>
                    <p className="mt-3 text-base text-gray-400">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="text-sm text-gray-400">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
