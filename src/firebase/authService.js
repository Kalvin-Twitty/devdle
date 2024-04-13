import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously
} from 'firebase/auth';
import app from './firebaseConfig';

const provider = new GoogleAuthProvider();
export const auth = getAuth(app); // Get and export the authentication object

// Initiates sign-in with Google using redirect
export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider);
};

// Handles the results from the redirect sign-in
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      return result.user; // Returns the user object from Firebase Auth
    } else {
      // Handle the case where no user is returned
      console.log("No user from redirect, likely not logged in");
      return null;
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
    throw error;
  }
};

// Signs out the current user
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log("Sign-out successful.");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

// Signs in a user anonymously
export const signInAnonymously = async () => {
  try {
    const result = await firebaseSignInAnonymously(auth);
    return result; // Assuming you want to return the result object
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};
