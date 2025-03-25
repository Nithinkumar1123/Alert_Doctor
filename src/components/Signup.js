import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ Supabase signup with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // ✅ Insert the user into the "users" table with their role
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ email, role }]);

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    alert('Account created successfully!');
    setLoading(false);
    navigate('/login');
  };

  return (
    <>
   <Navbar />
    <div
      className="d-flex align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        color: '#343a40',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={7} sm={9}>
            <Card className="shadow-lg rounded-4 p-4 border-0" style={{ background: '#fff' }}>
              <Card.Body>
                <h2 className="text-center text-success mb-4">📝 Sign Up</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSignup}>
                  {/* Email Input */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="shadow-sm"
                    />
                  </Form.Group>

                  {/* Password Input */}
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="shadow-sm"
                    />
                  </Form.Group>

                  {/* Role Dropdown */}
                  <Form.Group className="mb-4">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="shadow-sm"
                      required
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Signup Button */}
                  <div className="d-grid">
                    <Button
                      type="submit"
                      size="lg"
                      className="btn btn-gradient"
                      style={{
                        background: 'linear-gradient(135deg, #28a745, #218838)',
                        color: '#fff',
                        border: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(40, 167, 69, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                      }}
                      disabled={loading}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-3">
                  Already have an account? <a href="/login" className="text-primary">Login</a>
                </p>
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

export default Signup;
