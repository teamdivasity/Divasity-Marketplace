import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, TrendingUp, DollarSign, Users, Target, X } from 'lucide-react';

interface Update {
  id: string;
  type: 'investment' | 'milestone' | 'news' | 'dividend';
  title: string;
  message: string;
  timestamp: string;
  projectId?: string;
  amount?: number;
  read: boolean;
}

interface RealTimeUpdatesProps {
  userId: string;
}

export function RealTimeUpdates({ userId }: RealTimeUpdatesProps) {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      type: 'investment',
      title: 'Investment Confirmed',
      message: 'Your $500 investment in GreenTech Solutions has been confirmed',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      projectId: 'greentech-1',
      amount: 500,
      read: false
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Project Milestone Reached',
      message: 'EcoFarm Initiative has reached 75% funding milestone',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      projectId: 'ecofarm-1',
      read: false
    },
    {
      id: '3',
      type: 'dividend',
      title: 'Dividend Payment',
      message: 'You received $75.50 dividend from MediHealth App',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      amount: 75.50,
      read: true
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'investment': return <DollarSign className="text-green-600" size={16} />;
      case 'milestone': return <Target className="text-blue-600" size={16} />;
      case 'news': return <TrendingUp className="text-purple-600" size={16} />;
      case 'dividend': return <Users className="text-orange-600" size={16} />;
    }
  };

  const getUpdateColor = (type: Update['type']) => {
    switch (type) {
      case 'investment': return 'bg-green-50 border-green-200';
      case 'milestone': return 'bg-blue-50 border-blue-200';
      case 'news': return 'bg-purple-50 border-purple-200';
      case 'dividend': return 'bg-orange-50 border-orange-200';
    }
  };

  const markAsRead = (id: string) => {
    setUpdates(prev => prev.map(update => 
      update.id === id ? { ...update, read: true } : update
    ));
  };

  const unreadCount = updates.filter(update => !update.read).length;

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {updates.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {updates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !update.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => markAsRead(update.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getUpdateColor(update.type)}`}>
                          {getUpdateIcon(update.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium ${
                              !update.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {update.title}
                            </h4>
                            {!update.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{update.message}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(update.timestamp)}
                            </span>
                            {update.amount && (
                              <span className="text-xs font-medium text-green-600">
                                ${update.amount.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {updates.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setUpdates(prev => prev.map(update => ({ ...update, read: true })));
                  }}
                  className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}