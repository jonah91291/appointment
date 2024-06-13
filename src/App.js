import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import DoctorList from './components/DoctorList';
import Calendar from './components/Calendar';
import AppointmentCard from './components/AppointmentCard';
import EditAppointment from './components/EditAppointment';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/calendar/:doctorId" element={<Calendar />} />
        <Route path="/appointment/:appointmentId" element={<AppointmentCard />} />
        <Route path="/edit_appointment/:appointmentId" element={<EditAppointment />} />
      </Routes>
    </Router>
  );
};

export default App;
