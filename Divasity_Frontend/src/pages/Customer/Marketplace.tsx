import { TabHeader } from '../../components/Header/TabHeader';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Star, 
  Users, 
  ArrowUpRight,
  Bookmark,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  investors: number;
  raised: string;
  target: string;
  progress: number;
  daysLeft: number;
  image: string;
  featured?: boolean;
}

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Agriculture', 'Healthcare', 'Education', 'Finance'];

  const projects: Project[] = [
    {
      id: '1',
      title: 'EcoTech Solutions',
      description: 'Sustainable technology for clean energy solutions',
      category: 'Technology',
      rating: 4.8,
      investors: 45,
      raised: 'Ξ 2,300',
      target: 'Ξ 5,000',
      progress: 46,
      daysLeft: 12,
      image: '/api/placeholder/300/200',
      featured: true,
    },
    {
      id: '2',
      title: 'AgriConnect Platform',
      description: 'Connecting farmers with modern agricultural tools',
      category: 'Agriculture',
      rating: 4.5,
      investors: 32,
      raised: 'Ξ 1,800',
      target: 'Ξ 3,500',
      progress: 51,
      daysLeft: 8,
      image: '/api/placeholder/300/200',
    },
    {
      id: '3',
      title: 'MediTech Innovations',
      description: 'AI-powered diagnostic tools for rural healthcare',
      category: 'Healthcare',
      rating: 4.7,
      investors: 28,
      raised: 'Ξ 1,200',
      target: 'Ξ 2,500',
      progress: 48,
      daysLeft: 15,
      image: '/api/placeholder/300/200',
    },
    {
      id: '4',
      title: 'EduAccess Platform',
      description: 'Making quality education accessible to all',
      category: 'Education',
      rating: 4.6,
      investors: 36,
      raised: 'Ξ 2,100',
      target: 'Ξ 4,000',
      progress: 52,
      daysLeft: 10,
      image: '/api/placeholder/300/200',
      featured: true,
    },
  ];

  const filteredProjects = projects.filter(project => 
    (selectedCategory === 'All' || project.category === selectedCategory) &&
    (project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredProjects = projects.filter(project => project.featured);

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
          name='Marketplace'
          containerStyle='flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200'
          icon={<Search className="text-gray-600 hover:text-purple-600 transition-colors" />}
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
            Discover Projects
          </h1>
          <p className="text-gray-600">Find and invest in innovative projects across various sectors</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white cursor-pointer group">
                <Filter size={18} className="text-gray-500 group-hover:text-purple-600 transition-colors" />
                <span className="text-gray-700">Filter</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div className="mb-10" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="aspect-video bg-gradient-to-r from-purple-400 to-blue-500 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Clock size={14} />
                        {project.daysLeft} days left
                      </span>
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-purple-600 transition-colors">
                        <Bookmark size={14} />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    
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
                        <button className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors">
                          Invest
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Projects</h2>
          
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="aspect-video bg-gradient-to-r from-purple-400 to-blue-500 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Clock size={14} />
                        {project.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Users size={12} />
                            {project.investors}
                          </span>
                          <span className="text-gray-600">
                            {project.raised} / {project.target}
                          </span>
                        </div>
                        <button className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors">
                          View
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}