import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, FileText, ClipboardList, Wallet, User, Menu, X } from 'lucide-react';
import { images } from '../../constants';
import { RealTimeUpdates } from '../Advanced/RealTimeUpdates';
import { motion, AnimatePresence } from 'framer-motion';

// Define a stricter type for navItems
type NavItem =
  | { key: string; icon: JSX.Element; path: string; label: string; external?: false }
  | { key: string; icon: JSX.Element; url: string; label: string; external: true };

export function DesktopHeader() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { key: 'Dashboard', icon: <Home size={20} />, path: '/dashboard', label: 'Dashboard' },
    { key: 'Marketplace', icon: <ShoppingCart size={20} />, path: '/marketplace', label: 'Marketplace' },
    { key: 'Posts', icon: <FileText size={20} />, path: '/posts', label: 'Posts' },
    { key: 'Projects', icon: <ClipboardList size={20} />, path: '/projects', label: 'Projects' },
    { key: 'Wallets', icon: <Wallet size={20} />, url: 'http://127.0.0.1:8000/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai', label: 'Wallet', external: true }, //Links to fronten canister
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src={images.Logo} alt="Divasity" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Divasity
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = 'path' in item && location.pathname === item.path;
                const classNames = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-purple-600 bg-purple-50 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`;

                return 'external' in item && item.external ? (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classNames}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.key} to={item.path} className={classNames}>
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <RealTimeUpdates userId="user123" />
              <Link to="/profile" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer">
                <User size={16} className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={images.Logo} alt="Divasity" className="h-8 w-auto" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Divasity
                    </h1>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = 'path' in item && location.pathname === item.path;
                  const classNames = `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-purple-600 bg-purple-50 border-r-4 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`;

                  return 'external' in item && item.external ? (
                    <a
                      key={item.key}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNames}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.key}
                      to={item.path}
                      className={classNames}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.href = '/signin';
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <User size={16} />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
