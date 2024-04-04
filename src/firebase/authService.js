import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './firebaseConfig';

const provider = new GoogleAuthProvider();
const auth = getAuth(app); // Ensure you pass the Firebase app instance to getAuth

export const signInWithGoogle = () => {
  // Explicitly return the promise here
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // The signed-in user info.
      
      return result.user; // Return the user object for further processing
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
      throw error; // Rethrow or handle errors appropriately
    });
};

export const signOut = () => {
  auth.signOut().then(() => {
    // Sign-out successful.
    // Update UI or redirect as needed
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
};

