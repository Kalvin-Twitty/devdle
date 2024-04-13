import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const db = getFirestore();

const WORD_OF_THE_DAY_COLLECTION = 'wordOfTheDayLog';

// Function to log the user's solution of the word of the day puzzle
export const logWordOfTheDaySolution = async (userId) => {
  try {
    const wordOfTheDayRef = collection(db, WORD_OF_THE_DAY_COLLECTION);
    const userQuery = query(wordOfTheDayRef, where('userId', '==', userId));
    const userQuerySnapshot = await getDocs(userQuery);

    // Check if the user has already solved the word of the day puzzle today
    if (userQuerySnapshot.empty) {
      // If the user hasn't solved the puzzle today, add a new log entry
      await addDoc(wordOfTheDayRef, {
        userId: userId,
        date: new Date().toISOString().slice(0, 10), // Store the date in YYYY-MM-DD format
      });
      return true; // User's solution logged successfully
    } else {
      // User has already solved the puzzle today, so cannot solve it again
      return false;
    }
  } catch (error) {
    console.error('Error logging word of the day solution:', error);
    throw error;
  }
};

// Function to check if the user has already solved the word of the day puzzle today
export const hasUserSolvedWordOfTheDayToday = async (userId) => {
  try {
    const wordOfTheDayRef = collection(db, WORD_OF_THE_DAY_COLLECTION);
    const userQuery = query(wordOfTheDayRef, where('userId', '==', userId));
    const userQuerySnapshot = await getDocs(userQuery);

    // Check if the user has already solved the word of the day puzzle today
    return !userQuerySnapshot.empty;
  } catch (error) {
    console.error('Error checking word of the day solution:', error);
    throw error;
  }
};
