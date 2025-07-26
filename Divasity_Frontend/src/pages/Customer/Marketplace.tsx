import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Star, Users, DollarSign, Target, Award } from 'lucide-react';
import { TabHeader } from '../../components/Header/TabHeader';
import { AdvancedSearch } from '../../components/Advanced/AdvancedSearch';
import { ProjectCard } from '../../components/Advanced/ProjectCard';
import { projectService } from '../../services/projectService';

export function Marketplace() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Projects', count: 156 },
    { id: 'technology', name: 'Technology', count: 45 },
    { id: 'healthcare', name: 'Healthcare', count: 32 },
    { id: 'clean-energy', name: 'Clean Energy', count: 28 },
    { id: 'agriculture', name: 'Agriculture', count: 21 },
    { id: 'education', name: 'Education', count: 18 },
    { id: 'finance', name: 'Finance', count: 12 }
  ];

  const sampleProjects = [
    {
      id: '1',
      title: 'Revolutionary Solar Panel Technology',
      description: 'Next-generation solar panels with 40% higher efficiency and 50% lower cost than traditional panels.',
      category: 'Clean Energy',
      image: 'https://i.pinimg.com/736x/e0/32/0b/e0320b736c26d63b53aeec1fbb7c689a.jpg',
      funding: { raised: 125000, goal: 200000, backers: 234, daysLeft: 15 },
      status: 'active',
      location: 'San Francisco, CA',
      featured: true,
      trending: true,
      rating: 4.8,
      riskLevel: 'Medium',
      expectedReturn: '15-25%',
      timeline: '18 months',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'AI-Powered Medical Diagnostics',
      description: 'Advanced AI system for early disease detection with 95% accuracy rate.',
      category: 'Healthcare',
      image: 'https://i.pinimg.com/1200x/53/5c/43/535c438a97e013eb40e0505e72cdd9e8.jpg',
      funding: { raised: 89000, goal: 150000, backers: 156, daysLeft: 22 },
      status: 'active',
      location: 'Boston, MA',
      featured: true,
      rating: 4.9,
      riskLevel: 'High',
      expectedReturn: '20-35%',
      timeline: '24 months',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Vertical Farming Revolution',
      description: 'Sustainable urban farming solution producing 10x more yield in 90% less space.',
      category: 'Agriculture',
      image: 'https://i.pinimg.com/1200x/f4/58/0c/f4580cceb8889a3b6fd97f6b9a4a7a38.jpg',
      funding: { raised: 67000, goal: 100000, backers: 98, daysLeft: 8 },
      status: 'active',
      location: 'Austin, TX',
      trending: true,
      rating: 4.7,
      riskLevel: 'Medium',
      expectedReturn: '12-20%',
      timeline: '12 months',
      createdAt: '2024-01-05'
    },
    {
      id: '4',
      title: 'Blockchain Supply Chain',
      description: 'Transparent supply management using blockchain technology.',
      category: 'Technology',
      image: 'https://i.pinimg.com/736x/0e/e3/81/0ee38185724fb092f1f2bf1bf9ba569b.jpg',
      funding: { raised: 45000, goal: 80000, backers: 67, daysLeft: 30 },
      status: 'active',
      location: 'Seattle, WA',
      rating: 4.6,
      riskLevel: 'High',
      expectedReturn: '18-28%',
      timeline: '15 months',
      createdAt: '2024-01-01'
    }
  ];

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        setProjects(sampleProjects);
      } catch (error) {
        console.error('Failed to fetch marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceData();
  }, []);

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
  };

  const handleViewProject = (id: string) => {
    console.log('View project:', id);
  };

  const handleInvestProject = (id: string) => {
    console.log('Invest in project:', id);
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category.toLowerCase().replace(' ', '-') === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const trendingProjects = filteredProjects.filter(p => p.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="md:hidden">
        <TabHeader
          name="Marketplace"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
        />
      </div>

      <div className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        {/* Professional Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Investment Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover innovative projects, connect with visionary entrepreneurs, and build your diversified investment portfolio
            </p>
          </div>

          {/* Enhanced Market Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Projects', value: '156', icon: <Target size={24} />, color: 'purple' },
              { label: 'Total Funding', value: '$2.4M', icon: <DollarSign size={24} />, color: 'green' },
              { label: 'Active Investors', value: '1,234', icon: <Users size={24} />, color: 'blue' },
              { label: 'Success Rate', value: '87%', icon: <Award size={24} />, color: 'orange' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
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
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md'
                }`}
              >
                {category.name}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white">
                <Star size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Opportunities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onView={handleViewProject}
                    onInvest={handleInvestProject}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Projects */}
        {trendingProjects.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onView={handleViewProject}
                    onInvest={handleInvestProject}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Investment Opportunities' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {filteredProjects.length} projects available
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No projects found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or explore different categories to find investment opportunities.
              </p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onView={handleViewProject}
                    onInvest={handleInvestProject}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}