export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Highbrook Realty AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
