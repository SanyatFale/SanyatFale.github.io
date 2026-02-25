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
        fixed pointer-events-none z-0 transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}

        top-1/2 -left-12 -translate-y-1/2 w-[40vw] aspect-square
        lg:top-1/2 lg:-left-12 lg:-translate-y-1/2 lg:translate-x-0 lg:w-[40vw]
        max-lg:top-0 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:translate-y-0 max-lg:w-[60vw]
      `}
    >
      {/* Photo — full colour, no filters */}
      <div
        className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/your-photo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Fade right edge to black so overlapping text stays readable */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, transparent 45%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.92) 85%)'
        }}
      />
    </div>
  );
};

export default ProfilePicture;
