import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      setError('Failed to fetch user data.');
      setLoading(false);
      return;
    }

    // ✅ Store role in localStorage
    localStorage.setItem('userRole', userData.role);

    // ✅ Redirect based on role
    setLoading(false);
    if (userData.role === 'doctor') {
      navigate('/doctor');
    } else {
      navigate('/patient');
    }
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
                <h2 className="text-center text-primary mb-4">🔐 Login</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
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

                  <Form.Group className="mb-4">
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

                  <div className="d-grid">
                    <Button
                      type="submit"
                      size="lg"
                      className="btn btn-gradient"
                      style={{
                        background: 'linear-gradient(135deg, #007bff, #0056b3)',
                        color: '#fff',
                        border: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(0, 123, 255, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
                      }}
                      disabled={loading}
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-3">
                  Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
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

export default Login;
