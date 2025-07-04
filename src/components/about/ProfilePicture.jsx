import { useState, useEffect } from 'react';

const ProfilePicture = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        pic fixed pointer-events-none z-50 transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}

        /* Desktop positioning - left side */
        top-1/2 -left-12 -translate-y-1/2 w-[43vw] aspect-square

        /* Mobile positioning - top center */
        lg:top-1/2 lg:-left-12 lg:-translate-y-1/2 lg:translate-x-0 lg:rotate-0 lg:w-[43vw]
        max-lg:-top-12 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:translate-y-0 max-lg:rotate-90 max-lg:w-[70vw]
      `}
      style={{
        filter: 'grayscale(1) brightness(1)',
        mixBlendMode: 'difference'
      }}
    >
      <div
        className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
        style={{
          backgroundImage: `url('/images/your-photo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        alt="Sanyat's profile picture"
      />
    </div>
  );
};

export default ProfilePicture;
