import { useState, useRef } from 'react';
import { images } from '../../constants';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const slides: OnboardingSlide[] = [
    {
        id: 1,
        title: 'Welcome to Divasity',
        description: 'A marketplace where entrepreneurs connect with investors and buyers to grow their business.',
        image: images.Onboarding1,
      },
      {
        id: 2,
        title: 'Launch or Scale Easily',
        description: 'Whether you’re starting out or expanding, we make it easy to showcase your business and attract support.',
        image: images.Onboarding2,
      },
      {
        id: 3,
        title: 'Join the Marketplace',
        description: 'Create your profile, upload your business idea, and start connecting today.',
        image: images.Onboarding3,
      }      
  ];

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current: number) => setCurrentSlide(current),
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-[#8A0C86]' : 'bg-gray-300'}`} />
    )
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Progress bar */}
      <div className="h-2 w-full bg-gray-200 shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#8A0C86] to-purple-600 transition-all duration-500 ease-out" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
      
      {/* Slides container */}
      <div className="flex-1 overflow-x-hidden">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="h-full w-full flex flex-col items-center justify-center px-8 py-12">
              {/* Image Section */}
              <div className="flex justify-center items-center mb-12">
                <div className="relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="h-[30vh] max-h-80 object-contain drop-shadow-lg"
                  />
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl -z-10"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-poppins leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-opensans">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Navigation buttons */}
      <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm">
        <button 
          onClick={goToPrev}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            currentSlide === 0 
              ? 'invisible' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Back
        </button>
        
        {/* Slide indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#8A0C86] w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        {currentSlide < slides.length - 1 ? (
          <button 
            onClick={goToNext}
            className="px-8 py-3 bg-gradient-to-r from-[#8A0C86] to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-[#8A0C86] to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}