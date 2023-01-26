import { Box } from "@mui/material";
import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SignUp } from "./components/SignUp";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Box>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserAuthContextProvider>
    </Box>
  );
}

export default App;
