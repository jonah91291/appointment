import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Calendar = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      const response = await axios.get(`/api/available_timeslots/${doctorId}/`);
      setAvailableTimeSlots(response.data);
    };
    fetchAvailableTimeSlots();
  }, [doctorId]);

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post('/api/appointments/', {
        doctor: doctorId,
        date,
        time_slot: timeSlot,
      });
      navigate(`/appointment/${response.data.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Book Appointment</h2>
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
            <Button variant="primary" onClick={handleBookAppointment} block>
              Book
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Calendar;
