import React from 'react';
import { supabase } from '../shared/utils/supabaseClient';

export const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optionally redirect to home page after sign out
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-all"
    >
      Sign Out
    </button>
  );
};
