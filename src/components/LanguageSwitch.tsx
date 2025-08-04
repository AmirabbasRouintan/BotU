import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitch: React.FC = () => {
  const { language, toggleLanguage, isRTL } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
      aria-label={language === 'en' ? 'Switch to Persian' : 'Switch to English'}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? 'FA' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitch;