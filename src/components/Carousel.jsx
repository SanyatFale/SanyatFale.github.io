import { useState, useRef, useEffect } from 'react';

const Carousel = ({ 
  items, 
  title, 
  renderItem, 
  itemsPerView = 3, 
  autoScroll = false, 
  autoScrollInterval = 5000,
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && totalItems > itemsPerView) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, autoScrollInterval);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, maxIndex, autoScrollInterval, totalItems, itemsPerView]);

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
    pauseAutoScroll();
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    pauseAutoScroll();
  };

  const pauseAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      setIsAutoScrolling(false);
    }
  };

  const resumeAutoScroll = () => {
    if (autoScroll) {
      setIsAutoScrolling(true);
    }
  };

  // Handle responsive items per view
  const getResponsiveItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return itemsPerView;
    }
    return itemsPerView;
  };

  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(getResponsiveItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setResponsiveItemsPerView(getResponsiveItemsPerView());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [itemsPerView]);

  if (!items || items.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No items to display</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
          
          {/* Navigation Controls */}
          {totalItems > responsiveItemsPerView && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous items"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next items"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
      >
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / responsiveItemsPerView)}%)`
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / responsiveItemsPerView}%` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {totalItems > responsiveItemsPerView && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                pauseAutoScroll();
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary-600 dark:bg-primary-400'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
