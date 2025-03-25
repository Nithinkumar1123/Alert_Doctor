import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="shadow-lg"
    >
      <Container>
        {/* ✅ Logo and Title */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🏥 Hospital Alert System
        </Navbar.Brand>

        {/* ✅ Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* ✅ Patient Link */}
            <Nav.Link
              as={Link}
              to="/patient"
              className="mx-2"
              style={{ 
                transition: 'all 0.3s', 
                color: '#ffffff' 
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffc107';  // Hover effect
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🧑‍⚕️ Patient
            </Nav.Link>

            {/* ✅ Doctor Link */}
            <Nav.Link
              as={Link}
              to="/doctor"
              className="mx-2"
              style={{ 
                transition: 'all 0.3s', 
                color: '#ffffff' 
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#28a745';  // Hover effect
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              👨‍⚕️ Doctor
            </Nav.Link>

            {/* ✅ Sign Up Button */}
            <Nav.Link as={Link} to="/signup" className="ms-3">
              <Button 
                variant="outline-success" 
                className="px-4 py-2"
                style={{ 
                  transition: 'all 0.3s' 
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                  e.target.style.color = '#fff';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(40, 167, 69, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#28a745';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📝 Sign Up
              </Button>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
