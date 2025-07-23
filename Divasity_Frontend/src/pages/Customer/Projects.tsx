import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  Plus, Search, Filter, Grid, List, Calendar, Users, DollarSign, TrendingUp, Eye, Edit,
  MoreHorizontal, Share2, Bookmark, Star, Clock, Target, Award, AlertCircle, CheckCircle2,
  Pause, Play, Archive, Trash2, Download, Upload, BarChart3, PieChart, Activity, Zap,
  Globe, MapPin, Tag, Heart, MessageCircle, ThumbsUp, ExternalLink, Settings, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  raised: number;
  target: number;
  progress: number;
  investors: number;
  daysLeft: number;
  createdDate: string;
  lastUpdated: string;
  image: string;
  tags: string[];
  location: string;
  minInvestment: number;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  fundingType: 'equity' | 'debt' | 'reward';
  stage: 'seed' | 'series-a' | 'series-b' | 'growth';
  team: Array<{
    name: string;
    role: string;
    avatar: string;
  }>;
  analytics: {
    views: number;
    likes: number;
    shares: number;
    bookmarks: number;
    conversionRate: number;
    avgInvestment: number;
  };
}

export function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'EcoCharge: Solar-Powered EV Stations',
      description: 'Revolutionary network of solar-powered electric vehicle charging stations designed to accelerate sustainable transportation adoption across urban and rural areas.',
      category: 'Clean Energy',
      status: 'active',
      raised: 125000,
      target: 500000,
      progress: 25,
      investors: 89,
      daysLeft: 45,
      createdDate: '2024-01-01',
      lastUpdated: '2024-01-20',
      image: '/api/placeholder/400/300',
      tags: ['Solar', 'EV', 'Sustainability', 'Infrastructure'],
      location: 'San Francisco, CA',
      minInvestment: 1000,
      expectedROI: 18.5,
      riskLevel: 'medium',
      fundingType: 'equity',
      stage: 'series-a',
      team: [
        { name: 'Sarah Chen', role: 'CEO', avatar: '/api/placeholder/40/40' },
        { name: 'Mike Johnson', role: 'CTO', avatar: '/api/placeholder/40/40' },
        { name: 'Lisa Wang', role: 'CFO', avatar: '/api/placeholder/40/40' }
      ],
      analytics: {
        views: 12500,
        likes: 342,
        shares: 89,
        bookmarks: 156,
        conversionRate: 7.2,
        avgInvestment: 1404
      }
    },
    {
      id: '2',
      title: 'MedAI: AI-Powered Diagnostic Platform',
      description: 'Advanced machine learning platform that assists healthcare professionals in early disease detection and diagnosis through medical imaging analysis.',
      category: 'Healthcare',
      status: 'active',
      raised: 89500,
      target: 300000,
      progress: 30,
      investors: 67,
      daysLeft: 32,
      createdDate: '2023-12-15',
      lastUpdated: '2024-01-19',
      image: '/api/placeholder/400/300',
      tags: ['AI', 'Healthcare', 'Machine Learning', 'Diagnostics'],
      location: 'Boston, MA',
      minInvestment: 2500,
      expectedROI: 24.2,
      riskLevel: 'high',
      fundingType: 'equity',
      stage: 'seed',
      team: [
        { name: 'Dr. Michael Rodriguez', role: 'Founder', avatar: '/api/placeholder/40/40' },
        { name: 'Anna Kim', role: 'Lead Engineer', avatar: '/api/placeholder/40/40' }
      ],
      analytics: {
        views: 8900,
        likes: 267,
        shares: 45,
        bookmarks: 89,
        conversionRate: 5.8,
        avgInvestment: 1336
      }
    },
    {
      id: '3',
      title: 'Urban Farming Solutions',
      description: 'Vertical farming technology for urban food production using hydroponic systems and LED lighting.',
      category: 'Agriculture',
      status: 'completed',
      raised: 200000,
      target: 200000,
      progress: 100,
      investors: 145,
      daysLeft: 0,
      createdDate: '2023-08-01',
      lastUpdated: '2023-12-31',
      image: '/api/placeholder/400/300',
      tags: ['Agriculture', 'Vertical Farming', 'Sustainability', 'Urban'],
      location: 'Seattle, WA',
      minInvestment: 500,
      expectedROI: 15.7,
      riskLevel: 'low',
      fundingType: 'reward',
      stage: 'growth',
      team: [
        { name: 'James Wilson', role: 'Founder', avatar: '/api/placeholder/40/40' }
      ],
      analytics: {
        views: 15600,
        likes: 445,
        shares: 123,
        bookmarks: 234,
        conversionRate: 12.1,
        avgInvestment: 1379
      }
    }
  ];

  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);

  useEffect(() => {
    filterProjects();
  }, [activeTab, searchQuery, sortBy]);

  const filterProjects = () => {
    let filtered = projects;

    if (activeTab !== 'all') {
      filtered = filtered.filter(project => project.status === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'funding':
        filtered.sort((a, b) => b.raised - a.raised);
        break;
      case 'investors':
        filtered.sort((a, b) => b.investors - a.investors);
        break;
    }

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const totalStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalRaised: projects.reduce((sum, p) => sum + p.raised, 0),
    totalInvestors: projects.reduce((sum, p) => sum + p.investors, 0),
    avgROI: projects.reduce((sum, p) => sum + p.expectedROI, 0) / projects.length
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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="md:hidden">
        <TabHeader
          name="My Projects"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
          icon={<Bell className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
            <p className="text-gray-600">Manage and track your investment projects</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <BarChart3 size={18} />
              Analytics
            </button>
            <Link
              to="/projects/create"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              New Project
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12" variants={itemVariants}>
          {[
            { label: 'Total Projects', value: totalStats.totalProjects, icon: <Target size={20} />, color: 'purple' },
            { label: 'Active Projects', value: totalStats.activeProjects, icon: <Activity size={20} />, color: 'green' },
            { label: 'Total Raised', value: `$${totalStats.totalRaised.toLocaleString()}`, icon: <DollarSign size={20} />, color: 'blue' },
            { label: 'Total Investors', value: totalStats.totalInvestors, icon: <Users size={20} />, color: 'orange' },
            { label: 'Avg ROI', value: `${totalStats.avgROI.toFixed(1)}%`, icon: <TrendingUp size={20} />, color: 'indigo' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className={`inline-flex p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 mb-2`}>
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics Panel */}
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <PieChart size={32} className="text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Performance Overview</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BarChart3 size={32} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Funding Progress</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Activity size={32} className="text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Engagement Metrics</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search */}
        <motion.div className="mb-10 space-y-6" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-white border border-gray-300 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="progress">By Progress</option>
              <option value="funding">By Funding</option>
              <option value="investors">By Investors</option>
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
            {[
              { id: 'all', name: 'All Projects', count: projects.length },
              { id: 'active', name: 'Active', count: projects.filter(p => p.status === 'active').length },
              { id: 'draft', name: 'Draft', count: projects.filter(p => p.status === 'draft').length },
              { id: 'completed', name: 'Completed', count: projects.filter(p => p.status === 'completed').length },
              { id: 'paused', name: 'Paused', count: projects.filter(p => p.status === 'paused').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.name}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.id ? 'bg-purple-200' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div variants={itemVariants}>
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">Create your first project to get started</p>
              <Link
                to="/projects/create"
                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={18} />
                Create Project
              </Link>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  whileHover={{ y: -2 }}
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
                          : "https://i.pinimg.com/1200x/f4/58/0c/f4580cceb8889a3b6fd97f6b9a4a7a38.jpg"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {/* Progress Indicator */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <div className="flex justify-between text-white text-xs mb-1">
                            <span>{project.progress}% funded</span>
                            <span>{project.daysLeft} days left</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-1">
                            <div 
                              className="bg-white h-1 rounded-full transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
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
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {project.category}
                          </span>
                          <span>•</span>
                          <MapPin size={12} />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="font-medium">4.8</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Raised</p>
                        <p className="font-semibold text-gray-900">${project.raised.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Investors</p>
                        <p className="font-semibold text-gray-900">{project.investors}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected ROI</p>
                        <p className="font-semibold text-green-600">{project.expectedROI}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Risk Level</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                          {project.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <div key={index} className="w-6 h-6 bg-purple-600 rounded-full border-2 border-white"></div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {project.team.length} team member{project.team.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{project.analytics.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{project.analytics.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        Updated {new Date(project.lastUpdated).toLocaleDateString()}
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                      >
                        View Details
                        <ExternalLink size={14} />
                      </Link>
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