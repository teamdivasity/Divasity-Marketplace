import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { CustomButton } from "../../components/Button/CustomButton";

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "New Business" },
  { id: 2, name: "Existing Business" },
  { id: 3, name: "Shopper" },
  { id: 4, name: "Investor" },
];

const sliderItems = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
];

export function Category() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // 🔥 This function navigates to the next screen with the selected category
  const handleContinue = () => {
    if (selectedId === null) return;

    const selectedCategory = categories.find((cat) => cat.id === selectedId);
    if (!selectedCategory) return;

    // You can pass by category name or ID
    navigate(`/nextstep/${selectedCategory.name}`); // example: /next-screen/Investor
    // or navigate(`/next-screen?id=${selectedCategory.id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        name="Choose Category"
        containerStyle="bg-white h-[15vh] shadow-sm"
        handlePress={handleGoBack}
      />
      
      {/* Main Content */}
      <div className="pt-6 pb-8">
        {/* Categories Grid */}
        <div className="px-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Select your category to get started
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const isSelected = category.id === selectedId;

              return (
                <motion.div
                  key={category.id}
                  onClick={() => setSelectedId(category.id)}
                  whileHover={{ scale: 1.05 }}
                  animate={{ scale: isSelected ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`cursor-pointer border rounded-xl p-6 h-[15vh] flex items-center justify-center transition-colors duration-300 shadow-sm hover:shadow-md
                    ${isSelected
                      ? "border-dpurple bg-purple-50 text-dpurple font-medium font-opensans text-center text-[18px]"
                      : "border-gray-300 hover:border-gray-400 text-center font-medium text-[18px] font-opensans bg-white"
                    }
                  `}
                >
                  {category.name}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Slider Section */}
        <div className="px-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Featured Content</h3>
          <div className="overflow-hidden">
            <Slider {...settings}>
              {sliderItems.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="w-full h-[150px] bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-lg font-medium text-gray-800">{item}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-6">
          <CustomButton
            name="Continue"
            containerStyle="w-full text-white"
            handlePress={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
