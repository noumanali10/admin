import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
 // Example additional page
import Building from '../src/Components/building';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buildings" element={<Building />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
