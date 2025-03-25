import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import DoctorDashboard from './components/DoctorDashboard';
import PrivateRoute from './components/PrivateRoute';
import PatientForm from './components/PatientForm';

const App = () => {
  const userRole = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/doctor" 
          element={<PrivateRoute role="doctor" userRole={userRole}><DoctorDashboard /></PrivateRoute>} 
        />
         <Route 
          path="/patient" 
          element={<PrivateRoute role="patient" userRole={userRole}><PatientForm /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
};

export default App;
