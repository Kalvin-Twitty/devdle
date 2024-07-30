import { getAuth, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebaseSignInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};
