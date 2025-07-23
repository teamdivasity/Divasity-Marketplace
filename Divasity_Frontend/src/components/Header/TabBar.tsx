import React from 'react';
import { Home, ShoppingCart, FileText, ClipboardList, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define the type for tabs
type Tab = 'Dashboard' | 'Marketplace' | 'Posts' | 'Projects' | 'Wallets';

export function TabBar() {
  const location = useLocation();

  const tabs: { key: Tab; icon: React.ReactNode; path: string }[] = [
    { key: 'Dashboard', icon: <Home size={26} />, path: '/dashboard' },
    { key: 'Marketplace', icon: <ShoppingCart size={26} />, path: '/marketplace' },
    { key: 'Posts', icon: <FileText size={24} />, path: '/posts' },
    { key: 'Projects', icon: <ClipboardList size={26} />, path: '/projects' },
    { key: 'Wallets', icon: <Wallet size={26} />, path: '/wallet' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="safe-area-inset-bottom">
        <ul className="flex justify-around px-2 py-2">
          {tabs.map(({ key, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={key} className="flex-1">
                <Link
                  to={path}
                  className={`w-full flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${
                    isActive ? 'bg-purple-100' : ''
                  }`}>
                    {React.cloneElement(icon as React.ReactElement, {
                      className: isActive ? 'text-purple-600' : 'text-gray-500',
                      size: 22
                    })}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
