import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import app from './firebaseConfig';

export const getTodaysWord = async () => {
  const db = getFirestore(app);

  // Calculate the start of the current day in "America/New_York" timezone
  const todayStart = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  todayStart.setHours(0, 0, 0, 0); // Set to start of the day
  const todayStartTimestamp = Timestamp.fromDate(todayStart); // Use Timestamp.fromDate()

  // Calculate the end of the current day in "America/New_York" timezone
  const todayEnd = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  todayEnd.setHours(23, 59, 59, 999); // Set to end of the day
  const todayEndTimestamp = Timestamp.fromDate(todayEnd); // Use Timestamp.fromDate()

  // Construct the query with the date range
  const q = query(
    collection(db, 'words'),
    where("date", ">=", todayStartTimestamp),
    where("date", "<=", todayEndTimestamp)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const wordData = querySnapshot.docs[0].data(); // Assuming only one word per date
    return wordData; // Returns the word object if found
  } else {
    console.error("No word found for today's date range: " + todayStart.toLocaleDateString());
    return null; // Handle the case where no word matches today's date range
  }
};


export const updateStreak = async (user, guessedCorrectly) => {
  if (!user) return;

  const db = getFirestore(app);
  const userRef = doc(db, "users", user.uid);

  if (guessedCorrectly) {
    await updateDoc(userRef, {
      streak: increment(1),
      lastPlayed: new Date()
    });
  } else {
    await updateDoc(userRef, {
      streak: 0 // Reset streak
    });
  }
};