import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const AppointmentCard = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await axios.get(`/api/appointments/${appointmentId}/`);
      setAppointment(response.data);
    };
    fetchAppointment();
  }, [appointmentId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/appointments/${appointmentId}/`);
      navigate('/doctors');
    } catch (error) {
      console.error('Deletion failed:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit_appointment/${appointmentId}`);
  };

  return (
    appointment && (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Appointment Details</Card.Title>
                <Card.Text>
                  <strong>Doctor:</strong> {appointment.doctor.name} <br />
                  <strong>Date:</strong> {appointment.date} <br />
                  <strong>Time Slot:</strong> {appointment.time_slot}
                </Card.Text>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="secondary" className="ml-2" onClick={handleEdit}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default AppointmentCard;
