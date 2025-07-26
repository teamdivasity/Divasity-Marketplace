import { useState } from 'react';
import { X, DollarSign, CreditCard } from 'lucide-react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onInvest: (amount: number, rewardId?: string) => void;
}

export function InvestmentModal({ isOpen, onClose, project, onInvest }: InvestmentModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedReward, setSelectedReward] = useState('');

  if (!isOpen) return null;

  const handleInvest = () => {
    const investmentAmount = parseFloat(amount);
    if (investmentAmount > 0) {
      onInvest(investmentAmount, selectedReward);
      onClose();
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Invest in Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.category}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-3">
              {quickAmounts.map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ${quickAmount}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <CreditCard size={20} className="text-gray-400" />
              <span className="text-sm text-gray-700">Credit Card ending in 4242</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Investment Amount:</span>
              <span>${amount || '0'}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Platform Fee (2.5%):</span>
              <span>${amount ? (parseFloat(amount) * 0.025).toFixed(2) : '0.00'}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
              <span>Total:</span>
              <span>${amount ? (parseFloat(amount) * 1.025).toFixed(2) : '0.00'}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInvest}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}