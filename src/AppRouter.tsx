import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampusNavigator from './App'; // Your main campus navigator
import StudentCorner from './StudentCorner';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampusNavigator />} />
        <Route path="/student-corner" element={<StudentCorner />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
