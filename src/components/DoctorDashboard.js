import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container, Card, ListGroup, Badge, Button, Row, Col, Toast, ToastContainer, Spinner, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
const DoctorDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [audio] = useState(new Audio('/alert.mp3'));  // ✅ Preload audio file
  const [showToast, setShowToast] = useState(false);  // ✅ Real-time notification
  const [toastMessage, setToastMessage] = useState('');  // ✅ Toast content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError('Failed to load alerts.');
        } else {
          setAlerts(data);
        }
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Failed to fetch alerts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();

    // ✅ Real-time subscription with sound playback
    const subscription = supabase
      .channel('realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alerts' },
        (payload) => {
          console.log('New alert received:', payload.new);

          // ✅ Automatically play sound
          audio.play().catch((error) => console.error('Audio play failed:', error));

          // ✅ Display real-time notification
          setToastMessage(
            `🚨 New Alert from ${payload.new.name}\n` +
            `🛏️ Bed: ${payload.new.bed_number}\n` +
            `🏥 Room: ${payload.new.room_number}\n` +
            `📢 Message: ${payload.new.message}`
          );
          setShowToast(true);

          // ✅ Add the alert to the list
          setAlerts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [audio]);

  // ✅ "Coming" button → Stops the sound
  const handleComing = (id) => {
    console.log(`Coming: Alert ID ${id}`);
    audio.pause();
    audio.currentTime = 0;
  };

  // ✅ "Done" button → Removes the alert
  const handleDone = async (id) => {
    console.log(`Done: Alert ID ${id}`);

    try {
      await supabase
        .from('alerts')
        .delete()
        .eq('id', id);

      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    } catch (error) {
      console.error('Failed to delete alert:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', color: '#343a40' }}
    >
      <Container className="py-5">
        <h2 className="text-center text-primary mb-4">👨‍⚕️ Doctor Dashboard</h2>

        {/* ✅ Real-time notification pop-up */}
        <ToastContainer position="top-end" className="p-3">
          <Toast 
            onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={5000} 
            autohide
            bg="warning"
          >
            <Toast.Header>
              <strong className="me-auto">🚨 New Alert</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading alerts...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : alerts.length === 0 ? (
          <p className="text-center text-muted">No alerts at the moment.</p>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className="mb-4 shadow-lg border-0">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <h4 className="text-danger">{alert.name}</h4>
                    <ListGroup className="mt-3">
                      <ListGroup.Item><strong>🛏️ Bed:</strong> {alert.bed_number}</ListGroup.Item>
                      <ListGroup.Item><strong>🏥 Room:</strong> {alert.room_number}</ListGroup.Item>
                      <ListGroup.Item><strong>📢 Message:</strong> {alert.message}</ListGroup.Item>
                    </ListGroup>
                    <Badge bg="danger" className="mt-3">Needs Attention</Badge>
                  </Col>

                  <Col md={4} className="text-end">
                    <Button
                      variant="warning"
                      className="m-2"
                      style={{ transition: 'all 0.3s' }}
                      onClick={() => handleComing(alert.id)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(255, 193, 7, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.3)';
                      }}
                    >
                      🚶‍♂️ Coming
                    </Button>

                    <Button
                      variant="success"
                      className="m-2"
                      style={{ transition: 'all 0.3s' }}
                      onClick={() => handleDone(alert.id)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(40, 167, 69, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                      }}
                    >
                      ✅ Done
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
