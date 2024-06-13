import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get('/api/doctors/');
      setDoctors(response.data);
    };
    fetchDoctors();
  }, []);

  const handleSelectDoctor = (doctorId) => {
    navigate(`/calendar/${doctorId}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Select a Doctor</h2>
          <ListGroup>
            {doctors.map((doctor) => (
              <ListGroup.Item key={doctor.id}>
                <Row className="align-items-center">
                  <Col>
                    {doctor.name} - {doctor.specialty}
                  </Col>
                  <Col className="text-right">
                    <Button
                      variant="primary"
                      onClick={() => handleSelectDoctor(doctor.id)}
                    >
                      Select
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorList;
