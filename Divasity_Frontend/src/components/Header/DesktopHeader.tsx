import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, FileText, ClipboardList, Wallet, Bell, User } from 'lucide-react';
import { images } from '../../constants';

export function DesktopHeader() {
  const location = useLocation();

  const navItems = [
    { key: 'Dashboard', icon: <Home size={20} />, path: '/dashboard', label: 'Dashboard' },
    { key: 'Marketplace', icon: <ShoppingCart size={20} />, path: '/marketplace', label: 'Marketplace' },
    { key: 'Posts', icon: <FileText size={20} />, path: '/posts', label: 'Posts' },
    { key: 'Projects', icon: <ClipboardList size={20} />, path: '/projects', label: 'Projects' },
    { key: 'Wallets', icon: <Wallet size={20} />, path: '/wallet', label: 'Wallet' },
  ];

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src={images.Logo} alt="Divasity" className="h-8 w-auto" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Divasity
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {navItems.map(({ key, icon, path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={key}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-purple-600 bg-purple-50 shadow-sm' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/profile" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer">
              <User size={16} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}