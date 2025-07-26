import { X, MapPin, Calendar, Users, TrendingUp, Star } from 'lucide-react';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onInvest: () => void;
}

export function ProjectDetailsModal({ isOpen, onClose, project, onInvest }: ProjectDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-xl mb-6"
          />

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-purple-600 font-medium mb-4">{project.category}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{project.location || 'Remote'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span>{project.funding?.backers || 0} backers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star size={16} />
              <span>{project.rating || 4.5} rating</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{project.description}</p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">
                ${project.funding?.raised?.toLocaleString() || 0} raised
              </span>
              <span className="text-sm text-gray-600">
                of ${project.funding?.goal?.toLocaleString() || 0} goal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min((project.funding?.raised / project.funding?.goal) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onInvest}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}