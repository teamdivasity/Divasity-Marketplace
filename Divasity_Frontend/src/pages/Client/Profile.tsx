import { useState, useRef, useEffect } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { TabBar } from "../../components/Header/TabBar";
import { DesktopHeader } from "../../components/Header/DesktopHeader";
import {
  User, Camera, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Globe, Github, Linkedin, Twitter,
  Shield, Bell, Settings, Award, TrendingUp, Target, Star, Share2, Activity,
  Wallet, Users, CheckCircle2, Building2, Briefcase, GraduationCap, Clock
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
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+2349039220171',
    address: ' Lagos, Nigeria',
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

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (userData.id) {
          const updatedProfile = {
            ...profileData,
            id: userData.id,
            firstName: userData.firstName || profileData.firstName,
            lastName: userData.lastName || profileData.lastName,
            email: userData.email || profileData.email,
            phone: userData.telephone || profileData.phone,
            address: userData.address || profileData.address,
            role: userData.role || profileData.role,
            dateJoined: userData.createdAt || profileData.dateJoined,
          };
          setProfileData(updatedProfile);
          setEditForm(updatedProfile);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 relative">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)`,
        }}></div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <TabHeader
          name="Profile"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
          icon={<Settings className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 pb-24 md:pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern Header Card */}
        <motion.div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 mb-8 overflow-hidden" variants={itemVariants}>
          {/* Cover Section */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-200"
              >
                <Camera size={20} />
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
            
            {/* Floating Elements */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">Professional Profile</span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-1 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    <User size={48} className="text-gray-400" />
                  </div>
                </div>
                {profileData.verified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg">
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  {isEditing ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                        className="text-3xl font-bold bg-white/50 border border-gray-300 rounded-xl px-4 py-2 backdrop-blur-sm"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        className="text-3xl font-bold bg-white/50 border border-gray-300 rounded-xl px-4 py-2 backdrop-blur-sm"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {profileData.role}
                  </span>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="font-medium">{profileData.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>Member since {new Date(profileData.dateJoined).toLocaleDateString()}</span>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-xl resize-none bg-white/50 backdrop-blur-sm"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">{profileData.bio}</p>
                )}
              </div>

              <div className="mt-6 lg:mt-0 flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      <Edit3 size={18} />
                      Edit Profile
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg">
                      <Share2 size={18} />
                      Share Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={itemVariants}>
          {[
            { 
              label: 'Total Invested', 
              value: `$${profileData.stats.totalInvestments.toLocaleString()}`, 
              icon: <Wallet size={24} />, 
              gradient: 'from-emerald-500 to-teal-600',
              bg: 'from-emerald-50 to-teal-50',
              change: '+12.5%'
            },
            { 
              label: 'Active Projects', 
              value: profileData.stats.activeProjects, 
              icon: <Target size={24} />, 
              gradient: 'from-blue-500 to-indigo-600',
              bg: 'from-blue-50 to-indigo-50',
              change: '+3 this month'
            },
            { 
              label: 'Total Returns', 
              value: `$${profileData.stats.totalReturns.toLocaleString()}`, 
              icon: <TrendingUp size={24} />, 
              gradient: 'from-purple-500 to-pink-600',
              bg: 'from-purple-50 to-pink-50',
              change: '+8.2%'
            },
            { 
              label: 'Success Rate', 
              value: `${profileData.stats.successRate}%`, 
              icon: <Award size={24} />, 
              gradient: 'from-orange-500 to-red-600',
              bg: 'from-orange-50 to-red-50',
              change: '+2.1%'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Modern Navigation Tabs */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-lg overflow-x-auto">
            <div className="flex space-x-2">
              {[
                { id: 'overview', name: 'Overview', icon: <User size={20} /> },
                { id: 'activity', name: 'Activity', icon: <Activity size={20} /> },
                { id: 'achievements', name: 'Achievements', icon: <Award size={20} /> },
                { id: 'settings', name: 'Settings', icon: <Settings size={20} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
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
              <div className="lg:col-span-2 space-y-8">
                {/* Professional Summary */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Professional Summary</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <GraduationCap size={20} className="text-purple-600" />
                        Skills & Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 hover:shadow-md transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target size={20} className="text-blue-600" />
                        Investment Focus
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 hover:shadow-md transition-all duration-200"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="space-y-4">
                    {profileData.recentActivity.map((activity, index) => (
                      <motion.div 
                        key={activity.id} 
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white shadow-lg">
                          <Activity size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">{activity.description}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        {activity.amount && (
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600">
                              ${activity.amount.toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-500">Investment</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Professional Network */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Network</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                      <p className="text-3xl font-bold text-blue-600">{profileData.stats.followers}</p>
                      <p className="text-sm font-medium text-gray-600">Followers</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                      <p className="text-3xl font-bold text-purple-600">{profileData.stats.following}</p>
                      <p className="text-sm font-medium text-gray-600">Following</p>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Connect With Me</h4>
                    {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-200">
                          {platform === 'website' && <Globe size={18} className="text-gray-700" />}
                          {platform === 'linkedin' && <Linkedin size={18} className="text-blue-600" />}
                          {platform === 'twitter' && <Twitter size={18} className="text-blue-400" />}
                          {platform === 'github' && <Github size={18} className="text-gray-800" />}
                        </div>
                        <span className="font-medium text-gray-700 capitalize group-hover:text-gray-900 transition-colors">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white">
                      <Mail size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Info</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                        <Mail size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                      <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                        <Phone size={18} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{profileData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                      <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                        <MapPin size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{profileData.address}</p>
                      </div>
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
              {profileData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 relative overflow-hidden hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -6, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-5 rounded-full -mr-16 -mt-16`} />
                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white mb-6 shadow-lg`}>
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-md uppercase tracking-wide`}>
                        {achievement.rarity}
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Earned on</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
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
              {/* Security & Account Settings */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Security & Account</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Secure your account with an extra layer of protection</p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                        <Bell size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Smart Notifications</p>
                        <p className="text-sm text-gray-600">Get personalized updates about your portfolio</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy & Preferences */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
                    <Settings size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Privacy & Preferences</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">Profile Visibility</p>
                      <p className="text-sm text-gray-600">Control who can see your profile information</p>
                    </div>
                    <select className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white font-medium text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Connections Only</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">Investment Activity</p>
                      <p className="text-sm text-gray-600">Show your investment history to others</p>
                    </div>
                    <select className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white font-medium text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all">
                      <option>Visible</option>
                      <option>Hidden</option>
                      <option>Summary Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <TabBar />
    </div>
  );
}