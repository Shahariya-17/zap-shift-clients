import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TestimonialsCarousel = () => {
  const testimonials = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    quote: `This is testimonial number ${i + 1}. Posture Pro has improved my daily routine and reduced discomfort significantly.`,
    author: `Customer ${i + 1}`,
    role: `Role ${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isPaused, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const getVisibleCards = () => {
    const cards = [];
    const total = testimonials.length;
    const order = [-2, -1, 0, 1, 2];

    order.forEach(offset => {
      const index = (currentIndex + offset + total) % total;
      const position = offset === 0 ? 'center' : offset < 0 ? 'left' : 'right';
      cards.push({ ...testimonials[index], offset, position });
    });

    return cards;
  };

  const getCardStyle = (offset) => {
    const base = 'absolute top-0 transition-all duration-500';
    if (offset === 0) return `${base} left-1/2 transform -translate-x-1/2 z-30 scale-100 blur-none`;
    if (offset === -1) return `${base} left-[8%] z-20 scale-90 blur-sm`;
    if (offset === 1) return `${base} right-[8%] z-20 scale-90 blur-sm`;
    if (offset === -2) return `${base} left-0 z-10 scale-75 opacity-40 blur-sm`;
    if (offset === 2) return `${base} right-0 z-10 scale-75 opacity-40 blur-sm`;
    return base;
  };

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Experiences</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from people who transformed their posture with our solution
          </p>
        </div>

        <div className="relative h-[360px] mb-8">
          <AnimatePresence>
            {getVisibleCards().map((card) => (
              <motion.div
                key={`${card.id}-${card.offset}`}
                className={getCardStyle(card.offset)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`bg-white p-6 rounded-2xl shadow-lg h-[320px] flex flex-col mx-auto border ${card.offset === 0 ? 'border-2 border-teal-400' : 'border-gray-200'} transition-all duration-300 w-[300px]`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={card.avatar}
                      alt={card.author}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-4 border-teal-100/50"
                    />
                    <div>
                      <p className={`font-semibold ${card.offset === 0 ? 'text-gray-900 text-base' : 'text-gray-700'}`}>
                        {card.author}
                      </p>
                      <p className={`text-sm ${card.offset === 0 ? 'text-teal-600' : 'text-gray-500'}`}>
                        {card.role}
                      </p>
                    </div>
                  </div>
                  <p className={`mb-4 italic flex-1 ${card.offset === 0 ? 'text-gray-700 text-base' : 'text-gray-500'}`}>
                    "{card.quote}"
                  </p>
                  {card.offset === 0 && (
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        Verified Customer
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-6.293l5-5a1 1 0 111.414 1.414l-5.707 5.707a1 1 0 01-1.414 0l-2.293-2.293a1 1 0 011.414-1.414L8.293 11.707z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex space-x-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-all hover:shadow-lg group"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6 text-teal-500 group-hover:text-teal-600 transition-colors" />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-all hover:shadow-lg group"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6 text-teal-500 group-hover:text-teal-600 transition-colors" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-teal-500 w-6' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;