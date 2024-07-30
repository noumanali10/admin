import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "../src/Components/Autherization/Signin";
// Example additional page
import Building from "../src/Components/Building";
import { AuthProvider } from "./MiddleWare/AuthContext";
import ProtectedRoute from "./MiddleWare/ProtectedRoute";
import Confirmation from "./Services/Confirmation";


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
              element={<ProtectedRoute element={<Building />} />}
            />
             <Route
              path="/Coms"
              element={<ProtectedRoute element={<Confirmation/>} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
