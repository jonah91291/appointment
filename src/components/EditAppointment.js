import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const EditAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await axios.get(`/api/appointments/${appointmentId}/`);
      const { date, time_slot } = response.data;
      setDate(new Date(date));
      setTimeSlot(time_slot);
    };

    const fetchAvailableTimeSlots = async () => {
      const response = await axios.get(`/api/available_timeslots/${appointmentId}/`);
      setAvailableTimeSlots(response.data);
    };

    fetchAppointment();
    fetchAvailableTimeSlots();
  }, [appointmentId]);

  const handleEditAppointment = async () => {
    try {
      await axios.put(`/api/appointments/${appointmentId}/`, {
        date,
        time_slot: timeSlot,
      });
      navigate(`/appointment/${appointmentId}`);
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Edit Appointment</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                inline
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Time Slot</Form.Label>
              <Form.Control
                as="select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleEditAppointment} block>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAppointment;
