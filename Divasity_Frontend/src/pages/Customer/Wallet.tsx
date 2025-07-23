import { useState } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Eye, EyeOff,
  TrendingUp, TrendingDown, DollarSign, Bitcoin, Send, RefreshCw,
  History, Bell, QrCode, ExternalLink, Award, Target, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  icon: React.ReactNode;
  color: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'dividend' | 'transfer';
  amount: number;
  asset: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  hash?: string;
  fee?: number;
}

export function Wallet() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionFilter, setTransactionFilter] = useState('all');

  const assets: Asset[] = [
    {
      id: 'usd',
      symbol: 'USD',
      name: 'US Dollar',
      balance: 12450.75,
      value: 12450.75,
      change24h: 0,
      icon: <DollarSign size={24} />,
      color: 'green'
    },
    {
      id: 'btc',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.5432,
      value: 23456.80,
      change24h: 2.34,
      icon: <Bitcoin size={24} />,
      color: 'orange'
    },
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 8.7654,
      value: 15678.90,
      change24h: -1.23,
      icon: <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">Ξ</div>,
      color: 'blue'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'investment',
      amount: 5000,
      asset: 'USD',
      description: 'Investment in GreenTech Solutions',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      hash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'dividend',
      amount: 250.50,
      asset: 'USD',
      description: 'Dividend from EcoTech Project',
      date: '2024-01-14T14:20:00Z',
      status: 'completed'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 10000,
      asset: 'USD',
      description: 'Bank transfer deposit',
      date: '2024-01-13T09:15:00Z',
      status: 'completed',
      fee: 25
    }
  ];

  const totalBalance = assets.reduce((sum, asset) => sum + asset.value, 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="text-green-500" size={20} />;
      case 'withdrawal': return <ArrowUpRight className="text-red-500" size={20} />;
      case 'investment': return <TrendingUp className="text-blue-500" size={20} />;
      case 'dividend': return <Award className="text-purple-500" size={20} />;
      case 'transfer': return <Send className="text-gray-500" size={20} />;
      default: return <Activity className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name="Wallet"
          containerStyle="flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200"
          icon={<Bell className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Wallet</h1>
            <p className="text-gray-600">Manage your assets and track your investments</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <QrCode size={18} />
              Receive
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Send size={18} />
              Send
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </motion.div>

        {/* Balance Overview */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 mb-2">Total Portfolio Value</p>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-4xl font-bold">
                      {balanceVisible ? `$${totalBalance.toLocaleString()}` : '••••••••'}
                    </h2>
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {balanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-300 mb-2">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-sm font-medium">+8.2%</span>
                  </div>
                  <p className="text-white/80 text-sm">Last 30 days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Available Balance</span>
                    <WalletIcon size={16} className="text-white/60" />
                  </div>
                  <p className="text-xl font-bold">${assets[0].balance.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Total Invested</span>
                    <Target size={16} className="text-white/60" />
                  </div>
                  <p className="text-xl font-bold">$25,000</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Total Returns</span>
                    <Award size={16} className="text-white/60" />
                  </div>
                  <p className="text-xl font-bold text-green-300">+$3,750</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200">
            {[
              { id: 'overview', name: 'Overview', icon: <WalletIcon size={18} /> },
              { id: 'assets', name: 'Assets', icon: <DollarSign size={18} /> },
              { id: 'transactions', name: 'Transactions', icon: <History size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">+15.2%</div>
                    <div className="text-sm text-gray-600">Monthly Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                    <div className="text-sm text-gray-600">Active Investments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">$3,750</div>
                    <div className="text-sm text-gray-600">Total Profit</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'assets' && (
            <motion.div
              key="assets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {assets.map((asset) => (
                <div key={asset.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 last:mb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        {asset.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                        <p className="text-gray-600">{asset.balance} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${asset.value.toLocaleString()}</p>
                      {asset.change24h !== 0 && (
                        <div className={`flex items-center ${
                          asset.change24h > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.change24h > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="ml-1 text-sm font-medium">
                            {Math.abs(asset.change24h)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Send
                    </button>
                    <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Receive
                    </button>
                    <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Swap
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="investment">Investments</option>
                  <option value="dividend">Dividends</option>
                </select>
              </div>

              {/* Transaction List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {transactions
                  .filter(tx => transactionFilter === 'all' || tx.type === transactionFilter)
                  .map((transaction) => (
                    <div key={transaction.id} className="p-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{new Date(transaction.date).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                              </span>
                              {transaction.hash && (
                                <>
                                  <span>•</span>
                                  <button className="flex items-center hover:text-purple-600 transition-colors">
                                    <span className="mr-1">{transaction.hash}</span>
                                    <ExternalLink size={12} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-semibold ${
                            transaction.type === 'deposit' || transaction.type === 'dividend' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {transaction.type === 'deposit' || transaction.type === 'dividend' ? '+' : '-'}
                            ${transaction.amount.toLocaleString()}
                          </p>
                          {transaction.fee && (
                            <p className="text-sm text-gray-500">Fee: ${transaction.fee}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}