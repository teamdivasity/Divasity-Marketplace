import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Onboarding } from '../../pages/Client/Onboarding';
import { isAuthenticated } from '../../utils/auth';

export function OnboardingWrapper() {
  const [showOnboarding] = useState(true);
  const navigate = useNavigate();

  // Check localStorage to see if onboarding has been completed
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    const authenticated = isAuthenticated();
    
    if (authenticated) {
      navigate('/dashboard', { replace: true });
    } else if (onboardingCompleted === 'true') {
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/signin', { replace: true });
  };

  if (!showOnboarding) {
    return null;
  }

  return <Onboarding onComplete={handleComplete} />;
}