import { CircleArrowLeft } from "lucide-react";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";


export default function NewsDetails() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6 w-full fixed bg-white shadow-sm z-10" onClick={() => navigate(-1)}>
        <CircleArrowLeft size={28} className="text-gray-700 hover:text-purple-600 transition-colors cursor-pointer" />
        <h3 className="font-poppins text-lg font-semibold text-gray-900">
          More on Education
        </h3>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8">
        {/* Article Image */}
        <div className="px-6 mb-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={images.Logo} alt="News Image" className="w-full sm:h-[50vh] h-[40vh] object-cover" />
          </div>
        </div>
        
        {/* Article Content */}
        <div className="px-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* Article Header */}
            <div className="mb-6">
              <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                More on Education
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>Published on Dec 15, 2023</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
            
            {/* Article Body */}
            <div className="prose max-w-none">
              <p className="font-poppins text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium commodi perspiciatis nam ullam voluptates suscipit
                laudantium quas ex assumenda, dolore distinctio, veniam dolores quae
                porro sed nulla. Porro a consequatur nam non unde sunt
                necessitatibus nisi, distinctio dolores recusandae voluptate
                inventore tempora illum, exercitationem cum omnis cupiditate libero?
                Labore repellendus amet quasi eius facilis unde ipsa quo nostrum, ut
                in?
              </p>
              
              <p className="font-poppins text-gray-700 text-base sm:text-lg leading-relaxed">
                Continue reading to discover more insights about educational innovations
                and their impact on modern learning environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
