import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './firebaseConfig';

export const getAllWords = async () => {
  const db = getFirestore(app);
  const wordsCol = collection(db, 'words');
  const wordSnapshot = await getDocs(wordsCol);
  const wordList = wordSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // Process the data if needed, e.g., sort by date
  wordList.sort((a, b) => a.date.toDate() - b.date.toDate());
  return wordList;
};
