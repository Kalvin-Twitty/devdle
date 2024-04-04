import React, { createContext, useContext, useState } from 'react';
import { signInWithGoogle } from '../firebase/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = async () => {
    try {
      const user = await signInWithGoogle(); // Wait for the signInWithGoogle to resolve
      setCurrentUser(user); // Set the current user with the result
    } catch (error) {
      console.error(error);
      // Handle errors, such as showing an error message
    }
  };

  // Sign out method
  const handleSignOut = () => {
    signOut().then(() => {
      // On successful sign-out, clear the current user
      setCurrentUser(null);
    }).catch((error) => {
      console.error(error);
    });
  };


  const value = {
    currentUser,
    signIn,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
