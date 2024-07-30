import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from '../firebase/authService';
import { addNewUserWithDisplayNameCheck } from '../firebase/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDocumentId, setUserDocumentId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the current user is an admin
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const processRedirect = async () => {
      try {
        // Handle redirect result if needed
      } catch (error) {
        console.error("Error during auth redirect process:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the process
      }
    };

    processRedirect();
  }, []);

  const signIn = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      // Add additional logic if needed
    } catch (error) {
      console.error("Error during sign in:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      setIsAdmin(false);
      setUserDocumentId(null);
      setLoading(true);
      console.log("User signed out");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const value = {
    currentUser,
    userDocumentId,
    isAdmin,
    loading, // Include loading state in the context value
    signIn,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
