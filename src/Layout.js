import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <section className="min-h-screen bg-gray-900">
      <header className="bg-black shadow-lg border-b border-gray-800">
        <nav className="px-4 py-4 flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Products
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">{children}</main>
    </section>
  );
}

export default Layout;
