import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/firebaseConfig';
import { signInWithGoogle, signOut, handleRedirectResult } from '../firebase/authService';
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
        const user = await handleRedirectResult();
        if (user) {
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          console.log("User document exists:", userDoc.exists());
          console.log("User admin status:", userDoc.data()?.admin);

          if (!userDoc.exists()) {
            await addNewUserWithDisplayNameCheck(user.uid, {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          } else if (userDoc.data()?.admin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          setCurrentUser(user);
          setUserDocumentId(user.uid);
          console.log("Current user:", user);
          console.log("Is admin:", userDoc.data()?.admin === true);
        }
      } catch (error) {
        console.error("Error during auth redirect process:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the process
      }
    };

    processRedirect();
  }, []);

  const signIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentUser(null);
    setIsAdmin(false);
    setUserDocumentId(null);
    setLoading(true);
    console.log("User signed out");
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