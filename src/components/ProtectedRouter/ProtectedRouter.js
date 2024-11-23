import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsAutenticated } from '../../services/User';


function ProtectedRoute({ children }) {
  if (!IsAutenticated()) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
