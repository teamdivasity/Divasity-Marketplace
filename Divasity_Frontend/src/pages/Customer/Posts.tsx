import { TabHeader } from '../../components/Header/TabHeader';
import { 
  Bell, 
  Search, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  MoreVertical,
  Image,
  Link as LinkIcon,
  Smile,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

export function Posts() {
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Jane Cooper',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        role: 'Investor'
      },
      content: 'Just invested in the EcoTech Solutions project! Really excited about the potential impact this could have on sustainable energy solutions. Has anyone else checked it out?',
      likes: 24,
      comments: 5,
      shares: 2,
      timestamp: '2 hours ago',
      liked: true
    },
    {
      id: '2',
      author: {
        name: 'Robert Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Project Owner'
      },
      content: 'We just reached 50% of our funding goal for AgriConnect! Thank you to all our investors who believe in our vision to revolutionize agricultural technology.',
      images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'],
      likes: 56,
      comments: 12,
      shares: 8,
      timestamp: '5 hours ago',
      liked: false
    },
    {
      id: '3',
      author: {
        name: 'Sarah Williams',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'Mentor'
      },
      content: 'Hosting a webinar next week on \"How to Pitch Your Project to Investors.\" If you\'re planning to launch a project on Divasity, this might be helpful! Drop a comment if you\'re interested and I\'ll share the registration link.',
      likes: 32,
      comments: 18,
      shares: 15,
      timestamp: '1 day ago',
      liked: false
    }
  ];

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (postId: string) => {
    // In a real app, this would call an API to update the like status
    console.log(`Liked post ${postId}`);
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In a real app, this would call an API to create a new post
      console.log('New post:', newPost);
      setNewPost('');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name='Community'
          containerStyle='flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200'
          icon={<Bell className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>
      
      <motion.div 
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Community
            </h1>
            <p className="text-gray-600 text-lg">Connect with investors and project owners</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-3">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="Your avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind?"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Image size={20} className="text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <LinkIcon size={20} className="text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Smile size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePostSubmit}
                    disabled={!newPost.trim()}
                  >
                    <Send size={16} />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts */}
        <motion.div variants={itemVariants}>
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500">No posts found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -2 }}
                >
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{post.author.role}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <p className="text-gray-800 mb-6 leading-relaxed">{post.content}</p>
                    
                    {/* Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mb-6 rounded-xl overflow-hidden">
                        <img 
                          src={post.images[0]} 
                          alt="Post image" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{post.likes} likes</span>
                      <div className="flex items-center gap-4">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          post.liked ? 'text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <ThumbsUp size={18} className={post.liked ? 'fill-purple-600' : ''} />
                        Like
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <MessageCircle size={18} />
                        Comment
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <Share2 size={18} />
                        Share
                      </button>
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