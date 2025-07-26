import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, LineChart, PieChart } from 'lucide-react';

interface PerformanceData {
  period: string;
  value: number;
  change: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
  type?: 'line' | 'bar' | 'area';
}

export function PerformanceChart({ data, title, type = 'line' }: PerformanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>(type);

  const periods = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'line': return <LineChart size={16} />;
      case 'bar': return <BarChart3 size={16} />;
      case 'area': return <PieChart size={16} />;
      default: return <LineChart size={16} />;
    }
  };

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ${currentValue.toLocaleString()}
            </span>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(change).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {['line', 'bar', 'area'].map((t) => (
            <button
              key={t}
              onClick={() => setChartType(t as 'line' | 'bar' | 'area')}
              className={`p-2 rounded-md transition-colors ${
                chartType === t
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {getChartIcon(t)}
            </button>
          ))}
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-1 mb-6">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
              selectedPeriod === period
                ? 'bg-purple-100 text-purple-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="relative h-64 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Chart based on type */}
          {chartType === 'line' && (
            <>
              {/* Area fill */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={`M ${data.map((d, i) => 
                  `${(i / (data.length - 1)) * 380 + 10},${190 - ((d.value - minValue) / range) * 180}`
                ).join(' L ')}`}
                fill="url(#areaGradient)"
                stroke="none"
              />
              
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={`M ${data.map((d, i) => 
                  `${(i / (data.length - 1)) * 380 + 10},${190 - ((d.value - minValue) / range) * 180}`
                ).join(' L ')}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map((d, i) => (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  cx={(i / (data.length - 1)) * 380 + 10}
                  cy={190 - ((d.value - minValue) / range) * 180}
                  r="4"
                  fill="#8b5cf6"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </>
          )}

          {chartType === 'bar' && (
            <>
              {data.map((d, i) => (
                <motion.rect
                  key={i}
                  initial={{ height: 0, y: 190 }}
                  animate={{ 
                    height: ((d.value - minValue) / range) * 180,
                    y: 190 - ((d.value - minValue) / range) * 180
                  }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  x={(i / data.length) * 380 + 15}
                  width={380 / data.length - 10}
                  fill="#8b5cf6"
                  rx="2"
                  className="hover:fill-purple-700 transition-colors cursor-pointer"
                />
              ))}
            </>
          )}
        </svg>

        {/* Tooltip on hover */}
        <div className="absolute inset-0 pointer-events-none">
          {data.map((d, i) => (
            <div
              key={i}
              className="absolute opacity-0 hover:opacity-100 transition-opacity pointer-events-auto"
              style={{
                left: `${(i / (data.length - 1)) * 100}%`,
                top: `${100 - ((d.value - minValue) / range) * 100}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 mb-2">
                <div className="font-medium">${d.value.toLocaleString()}</div>
                <div className="text-gray-300">{d.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-sm text-gray-500">High</div>
          <div className="font-semibold text-gray-900">${maxValue.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Low</div>
          <div className="font-semibold text-gray-900">${minValue.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Avg</div>
          <div className="font-semibold text-gray-900">
            ${Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}