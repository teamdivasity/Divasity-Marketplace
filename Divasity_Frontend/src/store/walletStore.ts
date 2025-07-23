import { create } from 'zustand';

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'refund' | 'reward';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  projectId?: string;
  projectTitle?: string;
  createdAt: string;
  completedAt?: string;
  transactionHash?: string;
  fee?: number;
}

export interface WalletBalance {
  currency: string;
  balance: number;
  lockedBalance: number;
  symbol: string;
  usdValue: number;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'card' | 'crypto_wallet' | 'mobile_money';
  name: string;
  details: string;
  isDefault: boolean;
  isVerified: boolean;
  createdAt: string;
}

interface WalletState {
  balances: WalletBalance[];
  transactions: WalletTransaction[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  error: string | null;
  selectedCurrency: string;
  
  // Actions
  setBalances: (balances: WalletBalance[]) => void;
  setTransactions: (transactions: WalletTransaction[]) => void;
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  addTransaction: (transaction: WalletTransaction) => void;
  updateTransaction: (id: string, updates: Partial<WalletTransaction>) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  setSelectedCurrency: (currency: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTotalBalance: () => number;
  getBalanceByCurrency: (currency: string) => WalletBalance | undefined;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balances: [],
  transactions: [],
  paymentMethods: [],
  isLoading: false,
  error: null,
  selectedCurrency: 'USD',

  setBalances: (balances) => set({ balances }),
  
  setTransactions: (transactions) => set({ transactions }),
  
  setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions],
  })),
  
  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ),
  })),
  
  addPaymentMethod: (method) => set((state) => ({
    paymentMethods: [...state.paymentMethods, method],
  })),
  
  removePaymentMethod: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.filter(m => m.id !== id),
  })),
  
  setDefaultPaymentMethod: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.map(m => ({
      ...m,
      isDefault: m.id === id,
    })),
  })),
  
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  getTotalBalance: () => {
    const { balances } = get();
    return balances.reduce((total, balance) => total + balance.usdValue, 0);
  },
  
  getBalanceByCurrency: (currency) => {
    const { balances } = get();
    return balances.find(b => b.currency === currency);
  },
}));