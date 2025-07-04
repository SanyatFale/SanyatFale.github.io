import React, { useState } from 'react';
import { CodingTitle } from './CodingTitle.jsx';
import TextBlock from './TextBlock.jsx';
import AboutGrid from './AboutGrid.jsx';

const AnimatedAboutContent = ({ aboutData }) => {
  const [showTextBlock, setShowTextBlock] = useState(false);

  const handleTitleAnimationComplete = () => {
    setShowTextBlock(true);
  };

  return (
    <>
      {/* Main Title - Static positioning, no sliding animation */}
      <div className="mb-8" style={{ transform: 'none', transition: 'none' }}>
        <CodingTitle
          functionName={aboutData.title}
          parameter={aboutData.name}
          onAnimationComplete={handleTitleAnimationComplete}
          className="static-title"
        />
      </div>

      {/* Text Block Content */}
      <div className="mb-12">
        <TextBlock 
          data={aboutData} 
          shouldAnimate={showTextBlock}
        />
      </div>

      {/* About Grid */}
      <div className={`transition-all duration-1000 ease-out ${
        showTextBlock ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <AboutGrid
          skills={aboutData.skills}
          experiences={aboutData.experiences}
          languages={aboutData.languages}
          busy={aboutData.busy}
        />
      </div>
    </>
  );
};

export default AnimatedAboutContent;
