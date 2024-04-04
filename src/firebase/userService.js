import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';
import app from './firebaseConfig';

// Function to update the user's display name in both Firebase Auth and Firestore
export const updateDisplayName = async (newDisplayName) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const db = getFirestore(app);

  if (user) {
    try {
      // Update Firebase Authentication
      await updateProfile(user, { displayName: newDisplayName });
      console.log("Display name updated in Firebase Auth");

      // Update Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { displayName: newDisplayName }, { merge: true });
      console.log("Display name updated in Firestore");
    } catch (error) {
      console.error("Error updating display name:", error);
      throw error;
    }
  }
};

// Function to enforce unique display names and add new user to Firestore
export const addNewUserWithDisplayNameCheck = async (userId, userData) => {
  const db = getFirestore(app);
  const usersRef = query(collection(db, "users"), where("displayName", "==", userData.displayName));

  const querySnapshot = await getDocs(usersRef);
  if (!querySnapshot.empty) {
    // Display name is taken
    throw new Error("Display name is taken. Please choose another.");
  } else {
    // Display name is unique, proceed to add user to Firestore
    const newUserRef = doc(db, "users", userId); // Use UID as document ID for direct reference
    await setDoc(newUserRef, userData);
    console.log("User added to Firestore with unique display name.");
  }
};

// Function to check if a user document exists in Firestore
export const checkIfUserExists = async (userId) => {
  const db = getFirestore(app);
  const userDocRef = doc(db, "users", userId);
  const docSnap = await getDoc(userDocRef);
  return docSnap.exists();
};

// Function to get user data from Firestore
export const getUserData = async (userId) => {
  const db = getFirestore(app);
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Return user data if it exists
  } else {
    console.log("No such user!");
    return null;
  }
};
