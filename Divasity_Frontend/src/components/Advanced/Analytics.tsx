import { TrendingUp, TrendingDown, DollarSign, Target, Award, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsProps {
  data: {
    totalInvested: number;
    totalReturns: number;
    activeProjects: number;
    successRate: number;
    monthlyGrowth: number;
    portfolioValue: number;
  };
}

export function Analytics({ data }: AnalyticsProps) {
  const stats = [
    {
      label: 'Total Invested',
      value: `$${data.totalInvested.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Active Projects',
      value: data.activeProjects.toString(),
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      label: 'Total Returns',
      value: `$${data.totalReturns.toLocaleString()}`,
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      label: 'Success Rate',
      value: `${data.successRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Award,
      color: 'orange'
    }
  ];

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon size={20} className={`text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}