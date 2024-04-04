
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllWords } from '../firebase/gameAPI';

const WordList = () => {
  const { currentUser } = useAuth();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Check the user's role
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      getDoc(userDocRef).then((doc) => {
        if (doc.exists() && doc.data().role === 'admin') {
          setIsAdmin(true);
          // Fetch words only if user is admin
          const fetchWords = async () => {
            const wordData = await getAllWords();
            setWords(wordData);
            setLoading(false);
          };
          fetchWords().catch(console.error);
        } else {
          setLoading(false);
        }
      });
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access denied. You do not have permission to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Past and Future Words</h2>
      <ul className="space-y-2">
        {words.map(word => (
          <li key={word.id} className="p-2 bg-gray-800 rounded">
            <p className="font-bold">{word.word}</p>
            <p>{word.definition}</p>
            {/* Render hints or any other data if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
