import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <div className="flex items-center gap-4">
        <a 
          href="/" 
          className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-mono text-sm"
          title="Home"
        >
          .is()
        </a>
        <a 
          href="/blog" 
          className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-mono text-sm"
          title="Blog"
        >
          .blog()
        </a>
        <span className="text-primary-400 opacity-50 font-mono text-sm cursor-default">
          .about()
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
