import React, { createContext, useState, type ReactNode, useEffect } from 'react';

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export { AnimationContext };

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  // Load animation preference from localStorage on initial render
  useEffect(() => {
    const savedPreference = localStorage.getItem('animationsEnabled');
    if (savedPreference !== null) {
      setAnimationsEnabled(savedPreference === 'true');
    }
  }, []);

  // Save animation preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animationsEnabled', animationsEnabled.toString());
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
};