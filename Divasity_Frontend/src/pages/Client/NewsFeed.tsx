import { Bell, User, Search, Bookmark, Clock, ChevronRight } from "lucide-react";
import { TabHeader } from "../../components/Header/TabHeader";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { projectService } from "../../services/projectService";

interface NewsItem {
  id: string;
  title: string;
  text: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "More on Education",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab facilis iste nihil, minima reiciendis, debitis laborum commodi enim dolore aspernatur amet.",
    image: images.Logo,
    category: "Education",
    date: "Dec 15, 2023",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Health Awareness",
    text: "Staying healthy is essential for growth. Learn more about maintaining a balanced lifestyle, regular checkups, and mental health awareness for long-term wellness.",
    image: images.Logo,
    category: "Health",
    date: "Dec 12, 2023",
    readTime: "4 min read"
  },
  {
    id: "3",
    title: "Tech and Innovation",
    text: "Explore the rise of AI and its impact on businesses, startups, and education in Africa. Embrace change through innovation.",
    image: images.Logo,
    category: "Technology",
    date: "Dec 10, 2023",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Funding Opportunities",
    text: "Discover new funding opportunities for startups and small businesses in the tech sector. Learn how to pitch your ideas effectively.",
    image: images.Logo,
    category: "Finance",
    date: "Dec 8, 2023",
    readTime: "3 min read"
  },
];

export default function NewsFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects({ limit: 10 });
        setProjects(response.projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  const categories = ["All", "Education", "Technology", "Health", "Finance", "Market"];
  
  const projectNews = projects.map(project => ({
    id: project.id,
    title: project.title,
    text: project.description,
    image: project.images?.[0] || images.ProjectPlaceholder,
    category: project.category,
    date: new Date(project.createdAt).toLocaleDateString(),
    readTime: "5 min read"
  }));

  const allNews = [...newsData, ...projectNews];
  
  const filteredNews = allNews.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          name="News Feed"
          containerStyle="flex-row-reverse bg-white/80 backdrop-blur-md border-b border-gray-200"
          icon={<Bell className="text-gray-600 hover:text-purple-600 transition-colors" />}
          icon2={<User className="text-gray-600 hover:text-purple-600 transition-colors" />}
          iconContainer="flex items-center gap-2"
        />
      </div>

      <motion.div 
        className="pt-6 md:pt-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              News Feed
            </h1>
            <p className="text-gray-600 text-xl">Stay updated with the latest news and opportunities</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div className="mb-10 overflow-x-auto" variants={itemVariants}>
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div variants={itemVariants}>
          {filteredNews.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500">No news found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNews.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <div className="aspect-square sm:h-full bg-gradient-to-r from-purple-400 to-blue-500 relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                          <Bookmark size={16} />
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                        {item.text}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.readTime}
                          </span>
                        </div>
                        
                        <Link 
                          to={`/news/${item.id}`}
                          className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Categories Sections */}
        {activeCategory === "All" && (
          <>
            {["Education", "Technology", "Finance"].map((category) => (
              <motion.div key={category} className="mt-16" variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  <button className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allNews
                    .filter(item => item.category === category)
                    .slice(0, 2)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/3">
                            <div className="aspect-square sm:h-full bg-gradient-to-r from-purple-400 to-blue-500 relative">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/10" />
                            </div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {item.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {item.text}
                            </p>
                            
                            <Link 
                              to={`/news/${item.id}`}
                              className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}