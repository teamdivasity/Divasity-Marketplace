import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react';

interface WalletIntegrationProps {
  userId: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export function WalletIntegration({ userId }: WalletIntegrationProps) {
  const [balance, setBalance] = useState(2450.75);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'investment',
      amount: -500,
      description: 'Investment in GreenTech Solutions',
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: '2',
      type: 'return',
      amount: 75.50,
      description: 'Return from MediHealth App',
      date: '2024-01-18',
      status: 'completed'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 1000,
      description: 'Bank transfer deposit',
      date: '2024-01-15',
      status: 'completed'
    }
  ]);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="text-green-600" size={16} />;
      case 'withdrawal': return <ArrowUpRight className="text-red-600" size={16} />;
      case 'investment': return <TrendingUp className="text-blue-600" size={16} />;
      case 'return': return <DollarSign className="text-green-600" size={16} />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
      case 'return':
        return 'text-green-600';
      case 'withdrawal':
      case 'investment':
        return 'text-red-600';
    }
  };

  const handleAddFunds = () => {
    if (!addAmount || parseFloat(addAmount) <= 0) return;
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount: parseFloat(addAmount),
      description: 'Funds added to wallet',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + parseFloat(addAmount));
    setAddAmount('');
    setShowAddFunds(false);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Wallet size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Wallet Balance</h3>
              <p className="text-white/80">Available funds</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddFunds(true)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="text-3xl font-bold mb-2">${balance.toLocaleString()}</div>
        <div className="flex items-center gap-2 text-white/80">
          <TrendingUp size={16} />
          <span>+5.2% this month</span>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowAddFunds(true)}
          className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 flex items-center gap-3"
        >
          <div className="p-2 bg-green-100 rounded-lg">
            <Plus className="text-green-600" size={20} />
          </div>
          <div className="text-left">
            <div className="font-medium">Add Funds</div>
            <div className="text-sm text-gray-500">Deposit money</div>
          </div>
        </button>
        
        <button className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Minus className="text-red-600" size={20} />
          </div>
          <div className="text-left">
            <div className="font-medium">Withdraw</div>
            <div className="text-sm text-gray-500">Transfer out</div>
          </div>
        </button>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddFunds(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Add Funds to Wallet</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[50, 100, 250, 500, 1000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setAddAmount(amount.toString())}
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <CreditCard className="text-gray-400" size={20} />
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-gray-500">Expires 12/25</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  disabled={!addAmount || parseFloat(addAmount) <= 0}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  Add ${addAmount || '0'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className={`text-xs ${
                    transaction.status === 'completed' ? 'text-green-600' :
                    transaction.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}