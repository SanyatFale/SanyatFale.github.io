import React, { useState, useEffect } from 'react';

const VerticalLine = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the drop animation after the title animation starts
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed z-50 pointer-events-none transition-all duration-1500 ease-out
        top-0 bottom-0 w-px
        left-[calc(25vw-1rem)] lg:left-[calc(30vw-1rem)] max-lg:left-6
        ${isVisible ? 'transform-none opacity-40 scale-y-100' : '-translate-y-full opacity-0 scale-y-0'}
      `}
      style={{
        background: `linear-gradient(
          to bottom,
          transparent 0%,
          #60a5fa 10%,
          #60a5fa 90%,
          transparent 100%
        )`
      }}
    />
  );
};

export default VerticalLine;
