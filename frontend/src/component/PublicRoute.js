// src/component/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');
  if (isLoggedIn) {
    // 🔁 If logged in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
}

  // 👌 Otherwise, allow access
  return children;
}
