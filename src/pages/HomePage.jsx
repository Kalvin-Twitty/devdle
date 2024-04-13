import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';

const HomePage = () => {
  const { userDocumentId } = useAuth();
  const [patchNotes, setPatchNotes] = useState([]);

  useEffect(() => {
    const fetchPatchNotes = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'commits'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map(doc => ({
        timestamp: new Date(doc.data().timestamp).toLocaleString(),
        sha: doc.data().sha,
        message: doc.data().message,
        author: doc.data().author,
      }));
      setPatchNotes(notes);
    };

    fetchPatchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Codele</h1>
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl">
        <h2 className="text-3xl font-semibold mb-3">Patch Notes:</h2>
        <article className="space-y-2">
         {patchNotes.map(note => (
          <div key={note.message}>
          <p className="font-bold">{note.sha.slice(0, 7)}:</p>
          <p>{note.message}</p>
          <p className="text-sm italic">Author: {note.author}, Date: {note.timestamp}</p>
          <hr className="my-2" />
        </div>
  ))}
</article>
      </section>
      <footer className="mt-6">
        {userDocumentId ? (
          <a href={`/profile/${userDocumentId}`} className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out">View Profile</a>
        ) : (
          <a href="/game/daily" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out">Start playing</a>
        )}
      </footer>
    </div>
  );
};

export default HomePage;
