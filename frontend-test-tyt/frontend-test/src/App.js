import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CodProvider } from './context/CodContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EventList from './components/EventList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <AuthProvider>
      <CodProvider>
        <Router>
          <Routes>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/eventos" element={<EventList />} /> 
            <Route path="*" element={<Navigate to="/eventos" />} />
          </Routes>
        </Router>
      </CodProvider>
    </AuthProvider>
  );
};

export default App;
