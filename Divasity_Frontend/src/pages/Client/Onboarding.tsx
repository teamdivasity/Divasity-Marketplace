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
    <div className="fixed inset-0 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200">
        <div 
          className="h-full bg-[#8A0C86] transition-all duration-300" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
      
      {/* Slides container */}
      <div className="flex-1 overflow-x-hidden">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className={`h-[70vh] w-full  flex flex-col items-center justify-center p-8`}>
                <div className='flex justify-center items-center pt-20'>
                <img 
                src={slide.image} 
                alt={slide.title}
                className="h-[30vh]"
              />
                </div>

              <h2 className="text-[26px] font-[700] text-center py-6 text-gray-800 font-poppins">{slide.title}</h2>
              <p className="text-center text-[20px] text-gray-600 mb-8 md:max-w-full max-w-md  font-opensans">{slide.description}</p>
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Navigation buttons */}
      <div className="p-4 flex justify-between items-center">
        <button 
          onClick={goToPrev}
          className={`px-6 py-2 rounded-full ${currentSlide === 0 ? 'invisible' : 'text-gray-600'}`}
        >
          Back
        </button>
        
        {currentSlide < slides.length - 1 ? (
          <button 
            onClick={goToNext}
            className="px-8 py-3 bg-dpurple text-white rounded-[10px] font-medium"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="px-8 py-3 bg-dpurple text-white rounded-[10px] font-medium"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}