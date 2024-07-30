import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Autherization/Signin";
// Example additional page
import BuildingN from "./Components/building";
import { AuthProvider } from "./MiddleWare/AuthContext";
import ProtectedRoute from "./MiddleWare/ProtectedRoute";

 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/buildings"
              element={<ProtectedRoute element={<BuildingN />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
