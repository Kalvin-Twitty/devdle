import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '../firebase/userService';

const ProfilePage = () => {
  const { userId } = useParams(); // Get the userId from the URL params
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userData = await getUserData(userId); // Fetch user data using userId
        setUserProfile(userData);
      } else {
        console.log("No userId provided in the URL");
        // Handle the case where userId is not provided
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userProfile) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl">
        <div className="flex items-center mb-4">
          <img src={userProfile.photoURL} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <h2 className="text-2xl font-semibold">{userProfile.displayName}</h2>
        </div>
        <p className="text-gray-300 mb-2">Email: {userProfile.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
