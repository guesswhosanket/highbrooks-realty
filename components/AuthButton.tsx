import React from 'react';
import { supabase } from '../shared/utils/supabaseClient';

export const AuthButton: React.FC = () => {
  const handleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  return (
    <button
      className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-all"
      onClick={handleAuth}
    >
      Sign in with Google
    </button>
  );
};
