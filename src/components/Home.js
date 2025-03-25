import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Image, Card } from "react-bootstrap";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
    <Navbar />
    
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        color: "#343a40",
        padding: "50px 0",
      }}
    >
      <Container>
        <Row className="g-5 align-items-center">

          {/* Left Section: Text and Buttons */}
          <Col lg={6} md={6} className="text-center text-md-start">
            <div
              className="fade-in"
              style={{
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              <h1 className="display-3 fw-bold text-primary mb-4">
                🏥 Hospital Communication System
              </h1>
              <p className="lead text-secondary mb-4">
                Streamline patient-doctor communication with real-time alerts, 
                seamless notifications, and secure messaging.
              </p>

              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                
                {/* Login Button */}
                <Link to="/login" className="text-decoration-none">
                  <Button
                    size="lg"
                    className="btn shadow-lg px-4 py-2"
                    style={{
                      background: "linear-gradient(135deg, #007bff, #0056b3)",
                      color: "#fff",
                      border: "none",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-5px)";
                      e.target.style.boxShadow = "0 12px 24px rgba(0, 123, 255, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 5px 15px rgba(0, 123, 255, 0.3)";
                    }}
                  >
                    🚀 Login
                  </Button>
                </Link>

                {/* Signup Button */}
                <Link to="/signup" className="text-decoration-none">
                  <Button
                    size="lg"
                    className="btn shadow-lg px-4 py-2"
                    style={{
                      background: "linear-gradient(135deg, #28a745, #218838)",
                      color: "#fff",
                      border: "none",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-5px)";
                      e.target.style.boxShadow = "0 12px 24px rgba(40, 167, 69, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 5px 15px rgba(40, 167, 69, 0.3)";
                    }}
                  >
                    🌟 Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </Col>

          {/* Right Section: Image with Card */}
          <Col lg={6} md={6} className="text-center">
            <Card
              className="shadow-lg border-0 rounded-4"
              style={{
                overflow: "hidden",
                transition: "transform 0.4s",
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                alt="Hospital"
                fluid
                className="img-fluid"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default Home;
