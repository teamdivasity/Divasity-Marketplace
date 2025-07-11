import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Bell,
  Bitcoin,
  ChevronRight,
  FolderOpen,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

interface StatCard {
  icon: React.ReactNode;
  amount: string;
  label: string;
  trend?: string;
  color: string;
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
  image: string;
}

export function Dashboard() {
  const stats: StatCard[] = [
    {
      icon: <Bitcoin size={24} />,
      amount: "Ξ 4,500",
      label: "Total Raised",
      trend: "+12.5%",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FolderOpen size={24} />,
      amount: "3",
      label: "Live Projects",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Users size={24} />,
      amount: "127",
      label: "Total Investors",
      trend: "+8.2%",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <TrendingUp size={24} />,
      amount: "89%",
      label: "Success Rate",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentProjects: Project[] = [
    {
      id: "1",
      title: "EcoTech Solutions",
      description: "Sustainable technology for clean energy solutions",
      raised: "Ξ 2,300",
      target: "Ξ 5,000",
      progress: 46,
      investors: 45,
      daysLeft: 12,
      image: "/api/placeholder/300/200",
    },
    {
      id: "2",
      title: "AgriConnect Platform",
      description: "Connecting farmers with modern agricultural tools",
      raised: "Ξ 1,800",
      target: "Ξ 3,500",
      progress: 51,
      investors: 32,
      daysLeft: 8,
      image: "/api/placeholder/300/200",
    },
  ];

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
        {/* Welcome Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Engr 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your projects today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`} />
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.amount}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
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

        {/* Projects Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="aspect-video bg-gradient-to-r from-purple-400 to-blue-500 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {project.daysLeft} days left
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Users size={14} />
                          {project.investors}
                        </span>
                        <span className="text-gray-600">
                          {project.raised} / {project.target}
                        </span>
                      </div>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                      >
                        <Eye size={14} />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="mt-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              to="/projects/create"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FolderOpen size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Create Project</p>
                <p className="text-sm text-gray-600">Start a new funding campaign</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" />
            </Link>
            
            <Link 
              to="/marketplace"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Explore Market</p>
                <p className="text-sm text-gray-600">Discover new opportunities</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
            </Link>
            
            <Link 
              to="/wallet"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Bitcoin size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Wallet</p>
                <p className="text-sm text-gray-600">View your transactions</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Activity size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item === 1 ? "New investor joined EcoTech Solutions" : 
                       item === 2 ? "Project milestone achieved" : 
                       "Funding goal 50% reached"}
                    </p>
                    <p className="text-xs text-gray-500">{item === 1 ? "2 hours ago" : item === 2 ? "Yesterday" : "3 days ago"}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link 
              to="/notifications"
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
            >
              View All Activity
              <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
