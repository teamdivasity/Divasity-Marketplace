import { Bell, User } from "lucide-react";
import { TabHeader } from "../../components/Header/TabHeader";
import { images } from "../../constants";
import { Link } from "react-router-dom";

const educative = [
  {
    title: "More on Education",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab facilis iste nihil, minima reiciendis, debitis laborum commodi enim dolore aspernatur amet. Minus laudantium amet est ullam totam at voluptates tenetur quos, possimus officia, blanditiis commodi voluptas enim quasi expedita in quis. Repellendus asperiores alias quam velit id amet corrupti.",
    image: images.Logo,
  },
  {
    title: "Health Awareness",
    text: "Staying healthy is essential for growth. Learn more about maintaining a balanced lifestyle, regular checkups, and mental health awareness for long-term wellness.",
    image: images.Logo,
  },
  {K
    title: "Tech and Innovation",
    text: "Explore the rise of AI and its impact on businesses, startups, and education in Africa. Embrace change through innovation.",
    image: images.Logo,
  },
  {
    title: "Tech and Innovation",
    text: "Explore the rise of AI and its impact on businesses, startups, and education in Africa. Embrace change through innovation.",
    image: images.Logo,
  },
];

export default function NewsFeed() {
  return (
    <div>
      <TabHeader
        name="News Feed"
        containerStyle="flex-row-reverse bg-white"
        icon={<Bell />}
        icon2={<User />}
        iconContainer="flex items-center gap-2"
      />

      <div className="pt-20 px-5">
        {/* Eduative News */}
        <div>
          <h3 className="font-poppins text-[22px] font-medium">Educative</h3>
        </div>

        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 pt-4">
          {educative.map((educative, index) => (
            <div
              key={index}
              className="w-full border border-gray-400 flex gap-3 p-4 rounded-[8px]"
            >
              <img
                src={educative.image}
                alt="News"
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-poppins text-[18px] font-semibold pb-1">
                  {educative.title}
                </h3>
                <p className="font-opensans text-gray-700 pb-1 text-sm truncate">
                  {educative.text}
                </p>
                <Link to="#" className="text-dpurple underline text-sm">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Market Opportunities */}
        <div>
          <h3 className="font-poppins text-[22px] font-medium pt-6">
            Market Opportunities
          </h3>
        </div>

        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 pt-4">
          {educative.map((educative, index) => (
            <div
              key={index}
              className="w-full border border-gray-400 flex gap-3 p-4 rounded-[8px]"
            >
              <img
                src={educative.image}
                alt="News"
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-poppins text-[18px] font-semibold pb-1">
                  {educative.title}
                </h3>
                <p className="font-opensans text-gray-700 pb-1 text-sm truncate">
                  {educative.text}
                </p>
                <Link to="#" className="text-dpurple underline text-sm">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Funding */}
        <div>
          <h3 className="font-poppins text-[22px] font-medium pt-6">
            Tech Funding
          </h3>
        </div>

        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 pt-4">
          {educative.map((educative, index) => (
            <div
              key={index}
              className="w-full border border-gray-400 flex gap-3 p-4 rounded-[8px]"
            >
              <img
                src={educative.image}
                alt="News"
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-poppins text-[18px] font-semibold pb-1">
                  {educative.title}
                </h3>
                <p className="font-opensans text-gray-700 pb-1 text-sm truncate">
                  {educative.text}
                </p>
                <Link to="#" className="text-dpurple underline text-sm">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* More on Divasity.com */}
        <div>
          <h3 className="font-poppins text-[22px] font-medium pt-6">
            More on Divasity.com
          </h3>
        </div>

        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 pt-4">
          {educative.map((educative, index) => (
            <div
              key={index}
              className="w-full border border-gray-400 flex gap-3 p-4 rounded-[8px]"
            >
              <img
                src={educative.image}
                alt="News"
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-poppins text-[18px] font-semibold pb-1">
                  {educative.title}
                </h3>
                <p className="font-opensans text-gray-700 pb-1 text-sm truncate">
                  {educative.text}
                </p>
                <Link to="#" className="text-dpurple underline text-sm">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
