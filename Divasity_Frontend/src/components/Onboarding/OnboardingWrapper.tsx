import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Onboarding } from '../../pages/Client/Onboarding';

export function OnboardingWrapper() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const navigate = useNavigate();

  // Check localStorage to see if onboarding has been completed
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
      navigate('/signin');
    }
  }, [navigate]);

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/signin');
  };

  if (!showOnboarding) {
    return null;
  }

  return <Onboarding onComplete={handleComplete} />;
}