import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Bell, ChevronRight, TrendingUp, Users, Eye, ArrowUpRight, DollarSign, Target, Award, 
  BarChart3, Download, RefreshCw, Star, Zap, Globe, Activity, PieChart, LineChart,
  Calendar, Filter, Settings, Plus, Heart, Bookmark, Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface StatCard {
  icon: React.ReactNode;
  amount: string;
  label: string;
  trend?: string;
  color: string;
  change?: number;
  description?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  raised: string;
  target: string;
  progress: number;
  investors: number;
  daysLeft: number;
  category: string;
  roi: number;
  risk: 'low' | 'medium' | 'high';
  trending: boolean;
  featured: boolean;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeView, setActiveView] = useState('overview');

  const stats: StatCard[] = [
    {
      icon: <DollarSign size={24} />,
      amount: "$45,230",
      label: "Total Portfolio",
      trend: "+12.5%",
      color: "from-yellow-500 to-yellow-600",
      change: 12.5,
      description: "Your total investment value"
    },
    {
      icon: <Target size={24} />,
      amount: "8",
      label: "Active Investments",
      trend: "+3",
      color: "from-purple-500 to-purple-600",
      change: 8.2,
      description: "Currently active projects"
    },
    {
      icon: <TrendingUp size={24} />,
      amount: "23.4%",
      label: "Average ROI",
      trend: "+2.1%",
      color: "from-yellow-500 to-yellow-600",
      change: 15.3,
      description: "Return on investment"
    },
    {
      icon: <Award size={24} />,
      amount: "94%",
      label: "Success Rate",
      color: "from-purple-500 to-purple-600",
      change: 5.2,
      description: "Successful investments"
    },
    {
      icon: <Users size={24} />,
      amount: "1,247",
      label: "Network Size",
      trend: "+89",
      color: "from-yellow-500 to-yellow-600",
      change: 7.8,
      description: "Your investor network"
    },
    {
      icon: <Globe size={24} />,
      amount: "12",
      label: "Countries",
      trend: "+2",
      color: "from-purple-500 to-purple-600",
      change: 20.0,
      description: "Global reach"
    }
  ];

  const featuredProjects: Project[] = [
    {
      id: "1",
      title: "GreenTech Solar Initiative",
      description: "Revolutionary solar panel technology for sustainable energy solutions",
      raised: "$125,000",
      target: "$200,000",
      progress: 62,
      investors: 89,
      daysLeft: 15,
      category: "Clean Energy",
      roi: 18.5,
      risk: 'medium',
      trending: true,
      featured: true
    },
    {
      id: "2",
      title: "AI Healthcare Platform",
      description: "Machine learning solutions for early disease detection",
      raised: "$89,500",
      target: "$150,000",
      progress: 59,
      investors: 67,
      daysLeft: 22,
      category: "Healthcare",
      roi: 24.2,
      risk: 'high',
      trending: false,
      featured: true
    }
  ];

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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      <div className="md:hidden">
        <TabHeader
          name="Dashboard"
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
        {/* Header Section */}
        <motion.div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Welcome back, Engr 👋
            </h1>
            <p className="text-gray-600 text-lg">Here's your comprehensive investment overview</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-1 shadow-lg">
              {['overview', 'analytics', 'portfolio'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeView === view
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="p-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/90 transition-all shadow-lg">
              <RefreshCw size={18} />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  {stat.change && (
                    <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
                      stat.change > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      <TrendingUp size={12} className="mr-1" />
                      <span>{Math.abs(stat.change)}%</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.amount}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  {stat.description && (
                    <p className="text-xs text-gray-500 mb-2">{stat.description}</p>
                  )}
                  {stat.trend && (
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Chart Section */}
          <div className="xl:col-span-2">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Portfolio Performance</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <BarChart3 size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LineChart size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <PieChart size={18} />
                  </button>
                </div>
              </div>
              <div className="h-80 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-center text-white flex items-center flex-col space-y-3">
                    <BarChart3 size={56} className="mx-auto" />
                    <p className="font-semibold text-lg">Interactive Chart</p>
                    <p className="text-sm opacity-90">Portfolio trending upward</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: <Plus size={18} />, title: "New Investment", desc: "Explore opportunities", color: "purple", link: "/marketplace" },
                  { icon: <BarChart3 size={18} />, title: "View Analytics", desc: "Detailed insights", color: "yellow", link: "/analytics" },
                  { icon: <Settings size={18} />, title: "Settings", desc: "Manage preferences", color: "purple", link: "/settings" }
                ].map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all group"
                  >
                    <div className={`p-2 bg-${action.color}-100 rounded-lg text-${action.color}-600 group-hover:bg-${action.color}-200 transition-colors`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.desc}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Market News */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Market News</h3>
                <Link to="/news" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Clean Energy Investments Surge 40%", category: "Market", time: "2h ago", trending: true },
                  { title: "AI Startups Dominate Healthcare", category: "Tech", time: "4h ago", trending: false }
                ].map((news, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{news.title}</h4>
                      {news.trending && (
                        <TrendingUp size={14} className="text-red-500 ml-2 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{news.category}</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Projects */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={index === 0 
                        ? "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop&crop=center" 
                        : "https://i.pinimg.com/736x/53/fe/e1/53fee13e1744545fada80a995d27c3e0.jpg"
                      }
                      alt={index === 0 ? "Solar panels and renewable energy" : "AI healthcare technology"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.featured && (
                        <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Star size={10} className="mr-1" />
                          Featured
                        </span>
                      )}
                      {project.trending && (
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <TrendingUp size={10} className="mr-1" />
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                        <Heart size={16} />
                      </button>
                      <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>

                    {/* Days Left */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {project.daysLeft} days left
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-yellow-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">{project.raised} raised</span>
                      <span className="text-gray-600">Goal: {project.target}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{project.investors}</p>
                      <p className="text-gray-600">Investors</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-600">{project.roi}%</p>
                      <p className="text-gray-600">Expected ROI</p>
                    </div>
                    <div className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.risk)}`}>
                        {project.risk} risk
                      </span>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Founder</span>
                    </div>
                    <Link 
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                    >
                      <Eye size={14} />
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export { Dashboard };