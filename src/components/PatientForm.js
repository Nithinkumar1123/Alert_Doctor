import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const PatientForm = () => {
  const [name, setName] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  // ✅ Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !bedNumber || !roomNumber || !message) {
      setAlertMessage('Please fill in all fields.');
      setAlertType('danger');
      return;
    }

    try {
      const { error } = await supabase.from('alerts').insert([
        { name, bed_number: bedNumber, room_number: roomNumber, message }
      ]);

      if (error) {
        console.error('Error inserting alert:', error.message);
        setAlertMessage('Failed to send alert.');
        setAlertType('danger');
      } else {
        setAlertMessage('🚨 Alert sent successfully!');
        setAlertType('success');

        // ✅ Clear form fields
        setName('');
        setBedNumber('');
        setRoomNumber('');
        setMessage('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setAlertMessage('An unexpected error occurred.');
      setAlertType('danger');
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <div
        className="min-vh-100 d-flex align-items-center"
        style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10} sm={12}>
              <Card className="shadow-lg border-0 rounded-lg">
                <Card.Body className="p-5">
                  <h2 className="text-center text-primary mb-4">🚑 Patient Alert Form</h2>

                  {/* ✅ Alert Message */}
                  {alertMessage && (
                    <Alert
                      variant={alertType}
                      onClose={() => setAlertMessage('')}
                      dismissible
                    >
                      {alertMessage}
                    </Alert>
                  )}

                  {/* ✅ Form */}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>👤 Patient Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>🛏️ Bed Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter bed number"
                            value={bedNumber}
                            onChange={(e) => setBedNumber(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>🏥 Room Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter room number"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>📢 Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* ✅ Submit Button */}
                    <div className="d-grid">
                      <Button
                        variant="danger"
                        type="submit"
                        className="btn-lg"
                        style={{ transition: 'all 0.3s' }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 10px 20px rgba(220, 53, 69, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
                        }}
                      >
                        🚨 Send Alert
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PatientForm;
