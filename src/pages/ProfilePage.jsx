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
    <div>
      <h1>Profile Page</h1>
      <h2>Hello, {userProfile.displayName}</h2>
    </div>
  );
};

export default ProfilePage;