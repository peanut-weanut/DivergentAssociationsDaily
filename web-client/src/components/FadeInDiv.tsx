import { useState, useEffect } from 'react';

interface FadeInDivProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInDiv = ({ children, delay = 0 }: FadeInDivProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className={`
          transition-opacity duration-1000
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

export default FadeInDiv;
