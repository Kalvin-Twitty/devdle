// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdqW9Px9c7qxG5EIDk5LWHvncImxTAFKM",
  authDomain: "devdle.firebaseapp.com",
  projectId: "devdle",
  storageBucket: "devdle.appspot.com",
  messagingSenderId: "386945147917",
  appId: "1:386945147917:web:f876be54467c3104bc6144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;