import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  console.log("Private Route Check: ", currentUser, isAdmin);

  return currentUser && isAdmin ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;