import { TabHeader } from '../../components/Header/TabHeader';
import { 
  Bell, 
  Plus, 
  Filter, 
  Search, 
  Users, 
  Clock, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'completed';
  raised: string;
  target: string;
  progress: number;
  investors: number;
  daysLeft: number;
  createdAt: string;
  image: string;
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'EcoTech Solutions',
      description: 'Sustainable technology for clean energy solutions',
      status: 'active',
      raised: 'Ξ 2,300',
      target: 'Ξ 5,000',
      progress: 46,
      investors: 45,
      daysLeft: 12,
      createdAt: '2023-10-15',
      image: '/api/placeholder/300/200',
    },
    {
      id: '2',
      title: 'AgriConnect Platform',
      description: 'Connecting farmers with modern agricultural tools',
      status: 'active',
      raised: 'Ξ 1,800',
      target: 'Ξ 3,500',
      progress: 51,
      investors: 32,
      daysLeft: 8,
      createdAt: '2023-11-02',
      image: '/api/placeholder/300/200',
    },
    {
      id: '3',
      title: 'MediTech Innovations',
      description: 'AI-powered diagnostic tools for rural healthcare',
      status: 'draft',
      raised: 'Ξ 0',
      target: 'Ξ 2,500',
      progress: 0,
      investors: 0,
      daysLeft: 0,
      createdAt: '2023-12-05',
      image: '/api/placeholder/300/200',
    },
    {
      id: '4',
      title: 'EduAccess Platform',
      description: 'Making quality education accessible to all',
      status: 'completed',
      raised: 'Ξ 4,000',
      target: 'Ξ 4,000',
      progress: 100,
      investors: 78,
      daysLeft: 0,
      createdAt: '2023-08-20',
      image: '/api/placeholder/300/200',
    },
  ];

  const filteredProjects = projects.filter(project => 
    (statusFilter === 'all' || project.status === statusFilter) &&
    (project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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

  const toggleDropdown = (id: string) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name='My Projects'
          containerStyle='flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200'
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
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Projects
            </h1>
            <p className="text-gray-600">Manage and track your fundraising projects</p>
          </div>
          <Link 
            to="/projects/create"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Create Project
          </Link>
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
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'active' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'draft' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('draft')}
              >
                Draft
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'completed' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div variants={itemVariants}>
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500">No projects found matching your criteria.</p>
              <Link 
                to="/projects/create"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors mt-4"
              >
                <Plus size={18} />
                Create New Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 lg:w-1/5">
                      <div className="aspect-video md:h-full bg-gradient-to-r from-purple-400 to-blue-500 relative">
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              Created on {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {project.title}
                          </h3>
                        </div>
                        
                        <div className="relative">
                          <button 
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => toggleDropdown(project.id)}
                          >
                            <MoreVertical size={18} className="text-gray-500" />
                          </button>
                          
                          {showDropdown === project.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                              <div className="py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                  <Edit size={14} />
                                  Edit Project
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                                  <Trash2 size={14} />
                                  Delete Project
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2 flex-grow">
                        {project.description}
                      </p>
                      
                      <div className="space-y-3">
                        {/* Progress Bar */}
                        {project.status !== 'draft' && (
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
                        )}
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            {project.status !== 'draft' && (
                              <>
                                <span className="flex items-center gap-1 text-gray-600">
                                  <Users size={14} />
                                  {project.investors}
                                </span>
                                <span className="text-gray-600">
                                  {project.raised} / {project.target}
                                </span>
                              </>
                            )}
                            {project.status === 'active' && (
                              <span className="flex items-center gap-1 text-gray-600">
                                <Clock size={14} />
                                {project.daysLeft} days left
                              </span>
                            )}
                          </div>
                          <Link 
                            to={`/projects/${project.id}`}
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                          >
                            {project.status === 'draft' ? 'Complete Setup' : 'View Details'}
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
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