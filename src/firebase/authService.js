import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut } from 'firebase/auth'; // Added getRedirectResult and firebaseSignOut
import app from './firebaseConfig';

const provider = new GoogleAuthProvider();
const auth = getAuth(app); // Pass the Firebase app instance to getAuth

export const signInWithGoogle = () => {
  // Initiates sign-in with redirect
  signInWithRedirect(auth, provider);
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // The signed-in user info is now available
      return result.user; // Return the user object for further processing
    }
  } catch (error) {
    // Handle Errors here.
    console.error("Error handling redirect result:", error);
    throw error; // Rethrow or handle errors appropriately
  }
};

export const signOut = () => {
  firebaseSignOut(auth).then(() => {
    // Sign-out successful.
    // Update UI or redirect as needed
  }).catch((error) => {
    // An error happened during sign-out.
    console.error("Error during sign-out:", error);
  });
};