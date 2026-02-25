import { useState, useEffect } from 'react';

const ProfilePicture = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        pointer-events-none z-0 transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}

        relative mx-auto mt-16 w-40 h-40
        lg:fixed lg:mt-0 lg:mx-0 lg:top-1/2 lg:-left-12 lg:-translate-y-1/2 lg:w-[40vw] lg:h-[40vw]
      `}
    >
      {/* Photo — full colour, no filters */}
      <div
        className="w-full h-full rounded-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/images/your-photo.jpg')`,
          backgroundPosition: 'center top',
        }}
      />

      {/* Fade right edge to black — desktop only (text overlaps photo there) */}
      <div
        className="hidden lg:block absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, transparent 45%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.92) 85%)'
        }}
      />
    </div>
  );
};

export default ProfilePicture;
