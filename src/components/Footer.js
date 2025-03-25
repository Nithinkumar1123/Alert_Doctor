import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row className="gy-4">

          {/* ✅ About Section */}
          <Col md={4} className="text-center text-md-start">
            <h5 className="fw-bold">🏥 Hospital Communication System</h5>
            <p className="text-muted mb-3">
              Real-time patient-doctor communication for seamless healthcare management.
            </p>
            <Button
              variant="outline-light"
              size="sm"
              href="/contact"
              className="btn-hover"
            >
              📩 Contact Us
            </Button>
          </Col>

          {/* ✅ Made By Section */}
          <Col md={4} className="text-center d-flex flex-column justify-content-center">
            <h5 className="fw-bold">👨‍💻 Made by <span className="text-info">Gokula Bala S</span></h5>
            <p className="text-muted mb-0">Full-Stack Developer</p>
          </Col>

          {/* ✅ Social Media */}
          <Col md={4} className="text-center text-md-end">
            <h5 className="fw-bold">🌐 Connect with Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-hover">
                <FaFacebook size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-hover">
                <FaTwitter size={30} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-hover">
                <FaLinkedin size={30} />
              </a>
              <a href="mailto:hospital@contact.com" className="social-hover">
                <FaEnvelope size={30} />
              </a>
            </div>
          </Col>
        </Row>

        {/* ✅ Copyright Section */}
        <Row className="mt-4">
          <Col className="text-center">
            <p className="text-muted m-0">
              © {new Date().getFullYear()} Hospital Communication System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {/* ✅ CSS Animations */}
      <style>
        {`
          .btn-hover {
            transition: all 0.3s ease;
          }
          .btn-hover:hover {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: #fff;
          }

          .social-hover {
            color: #adb5bd;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .social-hover:hover {
            transform: translateY(-5px);
            color: #0d6efd !important;
          }

          @media (max-width: 768px) {
            .text-md-end {
              text-align: center !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
