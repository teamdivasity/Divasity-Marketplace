import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Search, Filter, Grid, List, Star, Bookmark, Share2, TrendingUp, Users, Clock, DollarSign,
  MapPin, Tag, ChevronDown, SlidersHorizontal, Heart, Eye, ArrowUpRight, Zap, Award,
  Shield, Target, Calendar, BarChart3, Briefcase, Globe, Smartphone, Leaf, Cpu, Stethoscope
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  raised: number;
  target: number;
  progress: number;
  investors: number;
  daysLeft: number;
  image: string;
  category: string;
  location: string;
  founder: string;
  founderImage: string;
  tags: string[];
  rating: number;
  reviews: number;
  minInvestment: number;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  featured: boolean;
  trending: boolean;
  verified: boolean;
  fundingType: 'equity' | 'debt' | 'reward';
  stage: 'seed' | 'series-a' | 'series-b' | 'growth';
}

const categories = [
  { id: 'all', name: 'All Projects', icon: <Grid size={20} />, count: 156 },
  { id: 'technology', name: 'Technology', icon: <Cpu size={20} />, count: 45 },
  { id: 'healthcare', name: 'Healthcare', icon: <Stethoscope size={20} />, count: 32 },
  { id: 'fintech', name: 'FinTech', icon: <DollarSign size={20} />, count: 28 },
  { id: 'sustainability', name: 'Sustainability', icon: <Leaf size={20} />, count: 24 },
  { id: 'mobile', name: 'Mobile Apps', icon: <Smartphone size={20} />, count: 19 },
  { id: 'ecommerce', name: 'E-commerce', icon: <Globe size={20} />, count: 15 }
];

const mockProjects: Project[] = [
  {
    id: "1",
    title: "EcoCharge: Solar-Powered EV Stations",
    description: "Revolutionary network of solar-powered electric vehicle charging stations designed to accelerate sustainable transportation adoption across urban and rural areas.",
    shortDesc: "Solar-powered EV charging network for sustainable transportation",
    raised: 125000,
    target: 500000,
    progress: 25,
    investors: 89,
    daysLeft: 45,
    image: "/api/placeholder/400/300",
    category: "sustainability",
    location: "San Francisco, CA",
    founder: "Sarah Chen",
    founderImage: "/api/placeholder/50/50",
    tags: ["Clean Energy", "Transportation", "IoT"],
    rating: 4.8,
    reviews: 34,
    minInvestment: 1000,
    expectedROI: 18.5,
    riskLevel: 'medium',
    featured: true,
    trending: true,
    verified: true,
    fundingType: 'equity',
    stage: 'series-a'
  },
  {
    id: "2",
    title: "MedAI: AI-Powered Diagnostic Platform",
    description: "Advanced machine learning platform that assists healthcare professionals in early disease detection and diagnosis through medical imaging analysis.",
    shortDesc: "AI-powered medical diagnosis and imaging analysis",
    raised: 89500,
    target: 300000,
    progress: 30,
    investors: 67,
    daysLeft: 32,
    image: "/api/placeholder/400/300",
    category: "healthcare",
    location: "Boston, MA",
    founder: "Dr. Michael Rodriguez",
    founderImage: "/api/placeholder/50/50",
    tags: ["AI", "Healthcare", "Machine Learning"],
    rating: 4.9,
    reviews: 28,
    minInvestment: 2500,
    expectedROI: 24.2,
    riskLevel: 'high',
    featured: true,
    trending: false,
    verified: true,
    fundingType: 'equity',
    stage: 'seed'
  },
  {
    id: "3",
    title: "CryptoSecure: Blockchain Security Suite",
    description: "Comprehensive blockchain security platform providing advanced threat detection, smart contract auditing, and real-time monitoring for DeFi protocols.",
    shortDesc: "Advanced blockchain security and smart contract auditing",
    raised: 67800,
    target: 200000,
    progress: 34,
    investors: 45,
    daysLeft: 28,
    image: "/api/placeholder/400/300",
    category: "fintech",
    location: "Austin, TX",
    founder: "Alex Thompson",
    founderImage: "/api/placeholder/50/50",
    tags: ["Blockchain", "Security", "DeFi"],
    rating: 4.6,
    reviews: 19,
    minInvestment: 5000,
    expectedROI: 32.1,
    riskLevel: 'high',
    featured: false,
    trending: true,
    verified: true,
    fundingType: 'equity',
    stage: 'series-a'
  }
];

export function Marketplace() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);

  useEffect(() => {
    filterProjects();
  }, [selectedCategory, searchQuery, sortBy]);

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.daysLeft - a.daysLeft);
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'amount':
        filtered.sort((a, b) => b.raised - a.raised);
        break;
      case 'roi':
        filtered.sort((a, b) => b.expectedROI - a.expectedROI);
        break;
    }

    setFilteredProjects(filtered);
  };

  const toggleBookmark = (projectId: string) => {
    setBookmarkedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-yellow-50/30 to-purple-100/30 relative overflow-hidden">

      <div className="md:hidden">
        <TabHeader
          name="Marketplace"
          containerStyle="flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200"
          icon={<Search className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Investment Marketplace
            </h1>
            <p className="text-gray-600 text-lg">Discover and invest in innovative projects shaping the future</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div className="mb-10 space-y-6" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects, founders, or technologies..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="progress">Most Funded</option>
                <option value="amount">Highest Amount</option>
                <option value="roi">Best ROI</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors shadow-lg ${
                showFilters 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white/90'
              }`}
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-yellow-600 text-white'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/20'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 text-lg font-medium">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                whileHover={{ y: -4 }}
                layout
              >
                {/* Project Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-video'}`}>
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src={project.id === '1' 
                        ? "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&crop=center"
                        : project.id === '2'
                        ? "https://i.pinimg.com/736x/b7/23/60/b72360e3917de1f3f7a8f8c1de6ccacf.jpg"
                        : "https://i.pinimg.com/736x/f7/7c/67/f77c6768b729ef714d7ab13f0b2729cb.jpg"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {project.featured && (
                        <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Star size={12} className="mr-1" />
                          Featured
                        </span>
                      )}
                      {project.trending && (
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <TrendingUp size={12} className="mr-1" />
                          Trending
                        </span>
                      )}
                      {project.verified && (
                        <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Shield size={12} className="mr-1" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => toggleBookmark(project.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          bookmarkedProjects.includes(project.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Heart size={16} fill={bookmarkedProjects.includes(project.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>

                    {/* Days Left */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {project.daysLeft} days left
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{project.location}</span>
                        <span>•</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                          {project.stage.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="font-medium">{project.rating}</span>
                      <span className="text-gray-500">({project.reviews})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {viewMode === 'list' ? project.description : project.shortDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

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
                      <span className="text-gray-600">${project.raised.toLocaleString()} raised</span>
                      <span className="text-gray-600">Goal: ${project.target.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-600">{project.investors} investors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={14} className="text-gray-400" />
                      <span className="text-gray-600">{project.expectedROI}% ROI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="text-gray-600">Min: ${project.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                        {project.riskLevel} risk
                      </span>
                    </div>
                  </div>

                  {/* Founder */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.founder}</p>
                        <p className="text-xs text-gray-500">Founder</p>
                      </div>
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

          {/* Load More */}
          {filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl text-gray-700 hover:bg-white/90 transition-colors shadow-lg">
                Load More Projects
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}