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
    <div>
      <Header
        name="Choose Category"
        containerStyle="bg-white h-[15vh]"
        handlePress={handleGoBack}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {categories.map((category) => {
          const isSelected = category.id === selectedId;

          return (
            <motion.div
              key={category.id}
              onClick={() => setSelectedId(category.id)}
              whileHover={{ scale: 1.05 }}
              animate={{ scale: isSelected ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`cursor-pointer border rounded-xl p-4 h-[15vh] flex items-center justify-center transition-colors duration-300
                ${isSelected
                  ? "border-dpurple bg-purple-50 text-dpurple font-medium font-opensans text-center text-[18px]"
                  : "border-gray-300 hover:border-gray-400 text-center font-medium text-[18px] font-opensans"
                }
              `}
            >
              {category.name}
            </motion.div>
          );
        })}
      </div>

      {/* Slider below categories */}
      <div className="mt-8 px-4 pt-4 overflow-hidden">
        <Slider {...settings}>
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[200px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center shadow-md"
            >
              <p className="text-lg font-medium">{item}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="px-4 pt-4">
        <CustomButton
          name="Continue"
          containerStyle="w-full text-white"
          handlePress={handleContinue} // 👈 Trigger the logic on click
        />
      </div>
    </div>
  );
}
