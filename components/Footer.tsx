import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-400 text-sm">
          <div className="mb-4">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
          <p>© {new Date().getFullYear()} Highbrook Realty AI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/company/highbrook-realty-ai" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="https://twitter.com/highbrookrealtyai" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
          </div>
          <div className="mt-4">
            <a href="mailto:support@thehighbrooks.com" className="hover:text-white">support@thehighbrooks.com</a>
            <span className="mx-2">|</span>
            <a href="tel:+1-555-010-4321" className="hover:text-white">+1-555-010-4321</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
