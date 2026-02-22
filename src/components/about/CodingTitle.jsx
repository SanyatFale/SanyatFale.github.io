import { useState, useEffect, useRef, useCallback } from 'react';

const CodingTitle = ({ functionName, parameter, className = "", onAnimationComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasAnimated = useRef(false);
  const onAnimationCompleteRef = useRef(onAnimationComplete);

  const fullText = `${functionName}(${parameter})`;

  // Update the ref when the callback changes
  useEffect(() => {
    onAnimationCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  useEffect(() => {
    // Prevent animation from running multiple times
    if (hasAnimated.current) return;

    hasAnimated.current = true;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsComplete(true);
          if (onAnimationCompleteRef.current) {
            onAnimationCompleteRef.current();
          }
        }, 300);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [fullText]); // Remove onAnimationComplete from dependencies

  // Parse the display text to apply different colors
  const renderText = () => {
    const match = displayText.match(/^([^(]*)\(([^)]*)\)?$/);
    if (match) {
      const [, func, param] = match;
      const hasClosingParen = displayText.endsWith(')');
      return (
        <>
          <span className="text-gray-200">{func}</span>
          <span className="text-gray-400">(</span>
          <span className="text-primary-400 font-normal">{param}</span>
          {hasClosingParen && <span className="text-gray-400">)</span>}
        </>
      );
    }
    return <span className="text-gray-200">{displayText}</span>;
  };

  return (
    <h1
      className={`
        title font-mono font-bold text-gray-200
        text-4xl md:text-5xl lg:text-6xl
        leading-tight tracking-tight
        ${className}
      `}
      style={{
        wordSpacing: '-0.1em',
        letterSpacing: '-0.05em',
        wordBreak: 'break-word',
        hyphens: 'auto',
        // Prevent any sliding animations - keep title static
        transform: 'none',
        transition: 'none'
      }}
    >
      {renderText()}
      {!isComplete && <span className="animate-pulse text-primary-400">|</span>}
    </h1>
  );
};

const CommentText = ({ children, className = "" }) => {
  return (
    <span className={`text-gray-500 font-mono text-sm ${className}`}>
      // {children}
    </span>
  );
};

const PurpleText = ({ children, className = "" }) => {
  return (
    <span className={`text-primary-400 ${className}`}>
      {children}
    </span>
  );
};

const GrayText = ({ children, className = "" }) => {
  return (
    <span className={`text-gray-400 ${className}`}>
      {children}
    </span>
  );
};

const CodeBlock = ({ children, className = "" }) => {
  return (
    <div className={`
      max-w-2xl font-mono text-lg leading-relaxed text-gray-300
      ${className}
    `}>
      {children}
    </div>
  );
};

const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`
      text-xl font-mono font-semibold text-gray-200 mb-4
      ${className}
    `}>
      {children}
    </h2>
  );
};

export { 
  CodingTitle, 
  CommentText, 
  PurpleText, 
  GrayText, 
  CodeBlock, 
  SectionTitle 
};
