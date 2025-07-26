import { useState } from 'react';
import { Heart, Share2, Bookmark, TrendingUp, Users, Calendar, MapPin, Eye, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { InvestmentModal } from './InvestmentModal';

interface ProjectCardProps {
  project: any;
  onView?: (id: string) => void;
  onInvest?: (id: string) => void;
}

export function ProjectCard({ project, onView, onInvest }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);

  const progressPercentage = Math.round((project.funding?.raised / project.funding?.goal) * 100) || 0;
  const daysLeft = project.funding?.daysLeft || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'active' ? 'bg-green-100 text-green-700' :
            project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked ? 'bg-purple-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Bookmark size={16} />
          </button>
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
        {daysLeft > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {daysLeft} days left
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{project.title}</h3>
            <p className="text-sm text-purple-600 font-medium">{project.category}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">
              ${project.funding?.raised?.toLocaleString() || 0}
            </span>
            <span className="text-sm text-gray-500">
              {progressPercentage}% of ${project.funding?.goal?.toLocaleString() || 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{project.funding?.backers || 0} backers</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} />
            <span className="text-green-600">+12% this week</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowDetailsModal(true)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            onClick={() => setShowInvestModal(true)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            Invest Now
          </button>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{(project.likes || 24) + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProjectDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        project={project}
        onInvest={() => {
          setShowDetailsModal(false);
          setShowInvestModal(true);
        }}
      />
      
      <InvestmentModal
        isOpen={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        project={project}
        onInvest={(amount, rewardId) => {
          console.log('Investment:', { amount, rewardId, projectId: project.id });
          onInvest?.(project.id);
        }}
      />
    </motion.div>
  );
}