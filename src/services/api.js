import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

export const login = (credentials) => axios.post('/login/', credentials);
export const fetchDoctors = () => axios.get('/doctors/');
export const fetchAppointments = () => axios.get('/appointments/');
export const createAppointment = (appointment) => axios.post('/appointments/', appointment);
export const editAppointment = (appointmentId, appointment) => axios.put(`/appointments/${appointmentId}/`, appointment);
export const deleteAppointment = (appointmentId) => axios.delete(`/appointments/${appointmentId}/`);
