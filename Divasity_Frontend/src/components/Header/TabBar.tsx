import React from 'react';
import {
  Home,
  ShoppingCart,
  FileText,
  ClipboardList,
  Wallet,
  ExternalLink,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define the type for internal and external tabs
type TabInternal = {
  key: 'Dashboard' | 'Marketplace' | 'Posts' | 'Projects';
  icon: React.ReactNode;
  path: string;
  external?: false;
};

type TabExternal = {
  key: 'Wallets'; // key can still be "Wallets"
  icon: React.ReactNode;
  url: string;
  external: true;
};

type Tab = TabInternal | TabExternal;

export function TabBar() {
  const location = useLocation();

  const tabs: Tab[] = [
    { key: 'Dashboard', icon: <Home size={26} />, path: '/dashboard' },
    { key: 'Marketplace', icon: <ShoppingCart size={26} />, path: '/marketplace' },
    { key: 'Posts', icon: <FileText size={24} />, path: '/posts' },
    { key: 'Projects', icon: <ClipboardList size={26} />, path: '/projects' },
    {
      key: 'Wallets',
      icon: <Wallet size={26} />,
      url: 'http://127.0.0.1:8000/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai', // replace with your wallet URL
      external: true,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-lg z-50">
      <div className="safe-area-inset-bottom">
        <ul className="flex justify-around px-2 py-2">
          {tabs.map((tab) => {
            const isActive = !tab.external && location.pathname === tab.path;

            const icon = React.cloneElement(tab.icon as React.ReactElement, {
              className: isActive ? 'text-purple-600' : 'text-gray-500',
              size: 22,
            });

            return (
              <li key={tab.key} className="flex-1">
                {tab.external ? (
                  <a
                    href={tab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-col items-center py-3 px-2 rounded-xl text-gray-500 hover:text-purple-600 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="p-1 rounded-lg">{icon}</div>
                  </a>
                ) : (
                  <Link
                    to={tab.path}
                    className={`w-full flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-100' : ''}`}>
                      {icon}
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
