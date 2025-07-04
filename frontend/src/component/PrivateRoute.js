// src/component/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');
  if (!isLoggedIn) {
    // 🚫 If not logged in, send to login page
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, allow access
  return children;
}
