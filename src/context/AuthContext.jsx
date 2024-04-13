import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signInWithGoogle, signOut, handleRedirectResult, signInAnonymously as firebaseSignInAnonymously, auth } from '../firebase/authService'; // Import 'auth' here
import { addNewUserWithDisplayNameCheck } from '../firebase/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDocumentId, setUserDocumentId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processRedirect = async () => {
      try {
        const user = await handleRedirectResult();
        if (user) {
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
    
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
        } else {
          console.log("No user from redirect, likely not logged in");
        }
      } catch (error) {
        console.error("Error during auth redirect process:", error);
      } finally {
        setLoading(false);
      }
    };

    processRedirect();
  }, []);

  const signInAnonymously = async () => {
    setLoading(true);
    try {
      const result = await firebaseSignInAnonymously(auth); // Use 'auth' directly here
      if (result && result.user) {
        setCurrentUser(result.user);
        setUserDocumentId(result.user.uid);
        console.log("Signed in anonymously", result.user);
      } else {
        console.log("No user data returned on anonymous sign-in.");
      }
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentUser(null);
    setIsAdmin(false);
    setUserDocumentId(null);
    setLoading(true);
  };

  const value = {
    currentUser,
    userDocumentId,
    isAdmin,
    loading,
    signIn,
    signOut: handleSignOut,
    signInAnonymously,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
