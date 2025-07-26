import { useState, useEffect } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { TabBar } from "../../components/Header/TabBar";
import { Plus, Grid, List, Search, TrendingUp, Target, Award, Calendar, Users, DollarSign } from "lucide-react";
import { images } from "../../constants";
import { motion } from "framer-motion";

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  
  const [projects] = useState([
    {
      id: "1",
      title: "GreenTech Solutions",
      category: "Clean Energy",
      image: "https://i.pinimg.com/736x/e0/32/0b/e0320b736c26d63b53aeec1fbb7c689a.jpg",
      description: "Innovative solar panel technology with 30% higher efficiency than market standards.",
      status: "active",
      progress: 75,
      funding: {
        raised: 45000,
        goal: 75000,
        backers: 128,
        daysLeft: 18,
      },
      createdAt: "2023-11-10",
      riskLevel: "Medium",
      expectedReturn: "15-20%"
    },
    {
      id: "2",
      title: "Urban Farming Initiative",
      category: "Agriculture",
      image: images.FarmingPost,
      description: "Vertical farming solution for urban areas to grow organic produce locally.",
      status: "active",
      progress: 45,
      funding: {
        raised: 28500,
        goal: 50000,
        backers: 95,
        daysLeft: 24,
      },
      createdAt: "2023-12-05",
      riskLevel: "Low",
      expectedReturn: "10-15%"
    },
    {
      id: "3",
      title: "MediHealth App",
      category: "Healthcare",
      image: "https://i.pinimg.com/1200x/53/5c/43/535c438a97e013eb40e0505e72cdd9e8.jpg",
      description: "AI-powered healthcare app for remote diagnostics and patient monitoring.",
      status: "completed",
      progress: 100,
      funding: {
        raised: 100000,
        goal: 100000,
        backers: 215,
        daysLeft: 0,
      },
      createdAt: "2023-10-15",
      riskLevel: "High",
      expectedReturn: "25-35%"
    },
    {
      id: "4",
      title: "Smart City Infrastructure",
      category: "Technology",
      image: "https://i.pinimg.com/736x/5b/f3/4f/5bf34f5285a30c1c3277b991abca2761.jpg",
      description: "IoT-based smart city solutions for traffic management and energy optimization.",
      status: "active",
      progress: 60,
      funding: {
        raised: 72000,
        goal: 120000,
        backers: 167,
        daysLeft: 12,
      },
      createdAt: "2023-11-20",
      riskLevel: "Medium",
      expectedReturn: "18-25%"
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'funding':
        return b.funding.raised - a.funding.raised;
      case 'progress':
        return b.progress - a.progress;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const filters = [
    { id: "all", name: "All Projects", count: projects.length },
    { id: "active", name: "Active", count: projects.filter(p => p.status === 'active').length },
    { id: "completed", name: "Completed", count: projects.filter(p => p.status === 'completed').length },
    { id: "draft", name: "Drafts", count: 0 },
  ];

  const stats = {
    totalProjects: projects.length,
    totalFunding: projects.reduce((sum, p) => sum + p.funding.raised, 0),
    totalBackers: projects.reduce((sum, p) => sum + p.funding.backers, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="md:hidden">
        <TabHeader
          name="My Projects"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
        />
      </div>

      <motion.div 
        className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 md:pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Investment Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Track, manage, and optimize your investment opportunities with comprehensive analytics
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Total Projects', value: stats.totalProjects, icon: <Target size={24} />, color: 'purple' },
              { label: 'Total Invested', value: `$${stats.totalFunding.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'green' },
              { label: 'Total Backers', value: stats.totalBackers.toLocaleString(), icon: <Users size={24} />, color: 'blue' },
              { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: <TrendingUp size={24} />, color: 'orange' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${
                  stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  stat.color === 'green' ? 'from-green-500 to-green-600' :
                  stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  'from-orange-500 to-orange-600'
                } text-white mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search your projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="funding">Highest Funding</option>
                  <option value="progress">Most Progress</option>
                </select>
                
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-lg">
                  <Plus size={18} />
                  New Project
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2" variants={itemVariants}>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md'
              }`}
            >
              {filter.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div variants={containerVariants}>
          {sortedProjects.length === 0 ? (
            <motion.div 
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20"
              variants={itemVariants}
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No projects found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or create your first investment project
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold">
                Create New Project
              </button>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
            }>
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-48">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' : 
                        project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                        project.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {project.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-sm text-purple-600 font-semibold">{project.category}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            project.status === 'completed' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                            'bg-gradient-to-r from-purple-500 to-blue-500'
                          }`}
                          style={{ width: `${Math.min(project.progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">${project.funding.raised.toLocaleString()} raised</span>
                        <span className="font-semibold text-gray-900">
                          ${project.funding.goal.toLocaleString()} goal
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{project.funding.backers} backers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{project.status === 'completed' ? 'Completed' : `${project.funding.daysLeft} days left`}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm">
                        <span className="text-gray-500">Expected Return: </span>
                        <span className="font-semibold text-green-600">{project.expectedReturn}</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Mobile Bottom Navigation */}
      <TabBar />
    </div>
  );
}

export default Projects;