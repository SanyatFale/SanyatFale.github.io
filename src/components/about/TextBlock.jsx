import { useState, useEffect } from 'react';
import ContactLinks from './ContactLinks';
import { PurpleText, CommentText } from './CodingTitle';

const TextBlock = ({ data, shouldAnimate = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  return (
    <div className={`
      std max-w-2xl font-mono text-lg leading-relaxed text-gray-300 transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
    `}>
      
      {/* First Fold - Contact and Description */}
      <div className="mb-12">
        
        {/* Contact Links */}
        <ContactLinks links={data.links} cv={data.cv} />

        {/* Main Description */}
        <div className="mb-6">
          {data.description.map((line, index) => (
            <p key={index} className="mb-4 last:mb-0">
              <PurpleText>{line}</PurpleText>
            </p>
          ))}
        </div>

        {/* Subtitles and Current Position */}
        <div className="text-gray-400">
          {data.subtitles.map((subtitle, index) => (
            <div key={index}>
              <CommentText>{subtitle}</CommentText>
            </div>
          ))}
          {data.experiences && data.experiences[0] && (
            <div className="mt-2">
              <CommentText>
                {data.experiences[0].position} @ {data.experiences[0].company}
              </CommentText>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBlock;
