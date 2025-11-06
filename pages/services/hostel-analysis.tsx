import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function HostelAnalysis() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Head>
        <title>Hostel Market Analysis | Highbrook Realty AI</title>
        <meta name="description" content="Data-driven market analysis for hostel locations. Identify target demographics, seasonal demand, and optimal pricing strategies with AI." />
      </Head>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8">Hostel Market Analysis</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Content for this section is coming soon. This page will detail the specific metrics and data points Highbrook Realty AI analyzes for hostel ventures.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
