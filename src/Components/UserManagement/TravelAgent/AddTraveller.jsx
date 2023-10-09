import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTraveller = () => {
  const [formData, setFormData] = useState({
    NIC: '',
    UName: '',
    FName: '',
    LName: '',
    Email: '',
    Password: '',
    RePassword: '',
    CNumber: '',
    UserType: "Traveller"
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nicRegex = /^[0-9]{10,12}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const isValidPassword = (password) => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    };

  if (!nicRegex.test(formData.NIC.toUpperCase())) {
    alert('Invalid NIC number. Please enter a valid NIC number.');
    return;
  }

  if (!phoneRegex.test(formData.CNumber)) {
    alert('Invalid phone number. Please enter a 10-digit phone number.');
    return;
  }

    if (formData.Password !== formData.RePassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (!isValidPassword(formData.Password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.');
      return;
    }
  
    axios.post('/api/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      // Handles the successful creation of a user. Logs the response, displays an alert, and redirects to a dashboard.
      console.log('Success:', response.data);
      alert('User Created successfully!');
      history.push('/travelagentdashboard');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('NIC is already in use. Please enter a different NIC.');
    });
  };

  return (
    <Container className="text-center mt-5" style={{width: "1200px"}}>
  <Row className="justify-content-center">
    <Col md={6}>
    <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Create New Traveller</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="NIC" style={{margin: "25px"}}>
          <Form.Control
            type="text"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            placeholder="NIC"
            required
          />
        </Form.Group>
        <Form.Group controlId="UName" style={{margin: "25px"}}>
          <Form.Control
            type="text"
            name="UName"
            value={formData.UName}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </Form.Group>
        <Form.Group controlId="FName" style={{margin: "25px"}}>
          <Form.Control
            type="text"
            name="FName"
            value={formData.FName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="LName" style={{margin: "25px"}}>
          <Form.Control
            type="text"
            name="LName"
            value={formData.LName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="Email" style={{margin: "25px"}}>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="CNumber" style={{margin: "25px"}}>
          <Form.Control
            type="text"
            name="CNumber"
            value={formData.CNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </Form.Group>
        <Form.Group controlId="Password" style={{margin: "25px"}}>
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="RePassword" style={{margin: "25px"}}>
          <Form.Control
            type="password"
            name="RePassword"
            value={formData.RePassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
            required
          />
        </Form.Group>
        <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Submit</Button>
              </Col>
            </Row>
      </Form>
      </Card.Body>
  </Card>
    </Col>
  </Row>
</Container>
  );
};

export default AddTraveller;