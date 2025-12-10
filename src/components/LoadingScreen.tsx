import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoadingScreen = () => {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <img 
          src="/Red and White Simple Food Logo (1).png" 
          alt="RedPuppet" 
          className="h-24 w-auto mx-auto mb-8 animate-pulse"
        />
        <Loader2 className="h-8 w-8 text-red-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading your filmmaker network...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;