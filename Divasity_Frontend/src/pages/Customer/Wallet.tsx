import { TabHeader } from '../../components/Header/TabHeader';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Download, 
  CreditCard, 
  Clock, 
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  project?: string;
}

export function Wallet() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const walletBalance = 'Ξ 2,450.00';
  const pendingBalance = 'Ξ 350.00';
  const totalInvested = 'Ξ 5,200.00';
  
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 'Ξ 500.00',
      status: 'completed',
      date: '2023-12-15',
      description: 'Wallet deposit',
    },
    {
      id: '2',
      type: 'investment',
      amount: 'Ξ 200.00',
      status: 'completed',
      date: '2023-12-10',
      description: 'Investment in EcoTech Solutions',
      project: 'EcoTech Solutions',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 'Ξ 100.00',
      status: 'pending',
      date: '2023-12-08',
      description: 'Withdrawal to bank account',
    },
    {
      id: '4',
      type: 'investment',
      amount: 'Ξ 150.00',
      status: 'completed',
      date: '2023-12-05',
      description: 'Investment in AgriConnect Platform',
      project: 'AgriConnect Platform',
    },
    {
      id: '5',
      type: 'deposit',
      amount: 'Ξ 300.00',
      status: 'completed',
      date: '2023-12-01',
      description: 'Wallet deposit',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => 
    (transactionFilter === 'all' || transaction.type === transactionFilter) &&
    (transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (transaction.project && transaction.project.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft size={16} className="text-green-500" />;
      case 'withdrawal': return <ArrowUpRight size={16} className="text-red-500" />;
      case 'investment': return <CreditCard size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name='Wallet'
          containerStyle='flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200'
          icon={<WalletIcon className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>
      
      <motion.div 
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Wallet
          </h1>
          <p className="text-gray-600">Manage your funds and track your investments</p>
        </motion.div>

        {/* Wallet Overview */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <WalletIcon size={24} className="text-white" />
                </div>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-white/80 mb-1">Available Balance</p>
              <h2 className="text-3xl font-bold mb-4">{walletBalance}</h2>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium">
                  <ArrowDownLeft size={16} />
                  Deposit
                </button>
                <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium">
                  <ArrowUpRight size={16} />
                  Withdraw
                </button>
              </div>
            </div>

            {/* Pending Balance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Clock size={24} className="text-yellow-600" />
                </div>
              </div>
              <p className="text-gray-500 mb-1">Pending Balance</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{pendingBalance}</h2>
              <p className="text-sm text-gray-500">Funds that are currently being processed</p>
            </div>

            {/* Total Invested */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CreditCard size={24} className="text-green-600" />
                </div>
              </div>
              <p className="text-gray-500 mb-1">Total Invested</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{totalInvested}</h2>
              <p className="text-sm text-gray-500">Total amount invested in projects</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'overview' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'transactions' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'investments' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('investments')}
            >
              Investments
            </button>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex">
                <button 
                  className={`px-3 py-2 text-xs font-medium rounded-l-lg ${
                    transactionFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setTransactionFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-2 text-xs font-medium ${
                    transactionFilter === 'deposit' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setTransactionFilter('deposit')}
                >
                  Deposits
                </button>
                <button 
                  className={`px-3 py-2 text-xs font-medium ${
                    transactionFilter === 'withdrawal' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setTransactionFilter('withdrawal')}
                >
                  Withdrawals
                </button>
                <button 
                  className={`px-3 py-2 text-xs font-medium rounded-r-lg ${
                    transactionFilter === 'investment' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setTransactionFilter('investment')}
                >
                  Investments
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No transactions found matching your criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-gray-100">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'deposit' ? 'text-green-600' : 
                        transaction.type === 'withdrawal' ? 'text-red-600' : 'text-purple-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'} {transaction.amount}
                      </p>
                      {transaction.project && (
                        <p className="text-xs text-gray-500">{transaction.project}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
              View All Transactions
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}