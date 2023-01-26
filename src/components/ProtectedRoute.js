import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig/Firebase";

export function ProtectedRoute({ children }) {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
