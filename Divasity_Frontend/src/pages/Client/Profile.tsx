import { useState, useRef } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import {
  User, Camera, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Globe, Github, Linkedin, Twitter,
  Shield, Bell, Lock, Eye, EyeOff, Upload, Download, Settings, Award, TrendingUp, Target,
  Briefcase, GraduationCap, Star, Heart, Bookmark, Share2, MoreHorizontal, Activity,
  CreditCard, Wallet, History, PieChart, BarChart3, Users, MessageCircle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../../constants";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar: string;
  coverImage: string;
  dateJoined: string;
  lastActive: string;
  verified: boolean;
  role: string;
  skills: string[];
  interests: string[];
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  stats: {
    totalInvestments: number;
    activeProjects: number;
    totalReturns: number;
    successRate: number;
    followers: number;
    following: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    date: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
    amount?: number;
  }>;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    bio: 'Passionate investor and entrepreneur focused on sustainable technology and innovative solutions. Always looking for the next big opportunity to make a positive impact.',
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/800/300',
    dateJoined: '2023-01-15',
    lastActive: '2024-01-20T10:30:00Z',
    verified: true,
    role: 'Premium Investor',
    skills: ['Investment Analysis', 'Risk Assessment', 'Market Research', 'Due Diligence', 'Portfolio Management'],
    interests: ['Clean Energy', 'FinTech', 'Healthcare', 'AI/ML', 'Blockchain'],
    socialLinks: {
      website: 'https://johndoe.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe'
    },
    stats: {
      totalInvestments: 45230,
      activeProjects: 12,
      totalReturns: 8750,
      successRate: 87,
      followers: 1250,
      following: 340
    },
    achievements: [
      {
        id: '1',
        title: 'Early Adopter',
        description: 'One of the first 100 users on the platform',
        icon: <Star className="text-yellow-500" size={20} />,
        date: '2023-01-15',
        rarity: 'legendary'
      },
      {
        id: '2',
        title: 'Smart Investor',
        description: 'Achieved 80%+ success rate on investments',
        icon: <TrendingUp className="text-green-500" size={20} />,
        date: '2023-06-20',
        rarity: 'epic'
      },
      {
        id: '3',
        title: 'Community Builder',
        description: 'Helped 50+ new investors get started',
        icon: <Users className="text-blue-500" size={20} />,
        date: '2023-09-10',
        rarity: 'rare'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'investment',
        description: 'Invested in GreenTech Solutions',
        date: '2024-01-18T14:30:00Z',
        amount: 5000
      },
      {
        id: '2',
        type: 'achievement',
        description: 'Earned "Smart Investor" badge',
        date: '2024-01-17T09:15:00Z'
      },
      {
        id: '3',
        type: 'follow',
        description: 'Started following EcoTech Innovations',
        date: '2024-01-16T16:45:00Z'
      }
    ]
  });

  const [editForm, setEditForm] = useState(profileData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
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
          name="Profile"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
          icon={<Settings className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cover Image */}
        <motion.div className="relative mb-8" variants={itemVariants}>
          <div className="h-64 rounded-2xl overflow-hidden relative">
            <img 
              src={images.ProfileBanner} 
              alt="Professional background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <Camera size={20} />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 bg-purple-600 rounded-full p-1 shadow-xl">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <User size={48} className="text-gray-400" />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Header */}
        <motion.div className="mb-8 pt-16" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                      className="text-2xl font-bold bg-white border border-gray-300 rounded-lg px-3 py-1"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                      className="text-2xl font-bold bg-white border border-gray-300 rounded-lg px-3 py-1"
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                )}
                {profileData.verified && (
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {profileData.role}
                </span>
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{profileData.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {new Date(profileData.dateJoined).toLocaleDateString()}</span>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 max-w-2xl">{profileData.bio}</p>
              )}
            </div>

            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Share2 size={18} />
                    Share
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" variants={itemVariants}>
          {[
            { label: 'Total Invested', value: `$${profileData.stats.totalInvestments.toLocaleString()}`, icon: <Wallet size={20} />, color: 'green' },
            { label: 'Active Projects', value: profileData.stats.activeProjects, icon: <Target size={20} />, color: 'blue' },
            { label: 'Total Returns', value: `$${profileData.stats.totalReturns.toLocaleString()}`, icon: <TrendingUp size={20} />, color: 'purple' },
            { label: 'Success Rate', value: `${profileData.stats.successRate}%`, icon: <Award size={20} />, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className={`inline-flex p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 mb-2`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
            {[
              { id: 'overview', name: 'Overview', icon: <User size={18} /> },
              { id: 'activity', name: 'Activity', icon: <Activity size={18} /> },
              { id: 'achievements', name: 'Achievements', icon: <Award size={18} /> },
              { id: 'settings', name: 'Settings', icon: <Settings size={18} /> }
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
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {profileData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Activity size={16} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        {activity.amount && (
                          <span className="text-sm font-medium text-green-600">
                            ${activity.amount.toLocaleString()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Social Links */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
                  <div className="space-y-3">
                    {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {platform === 'website' && <Globe size={20} className="text-gray-600" />}
                        {platform === 'linkedin' && <Linkedin size={20} className="text-blue-600" />}
                        {platform === 'twitter' && <Twitter size={20} className="text-blue-400" />}
                        {platform === 'github' && <Github size={20} className="text-gray-800" />}
                        <span className="text-sm text-gray-700 capitalize">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Network */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Network</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{profileData.stats.followers}</p>
                      <p className="text-sm text-gray-600">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{profileData.stats.following}</p>
                      <p className="text-sm text-gray-600">Following</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{profileData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{profileData.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {profileData.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10 rounded-full -mr-10 -mt-10`} />
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white mb-4`}>
                      {achievement.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Account Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield size={20} className="text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell size={20} className="text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your investments</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Profile Visibility</span>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Investment History</span>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Visible</option>
                      <option>Hidden</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}