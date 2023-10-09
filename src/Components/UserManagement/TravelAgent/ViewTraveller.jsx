import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Row, Col, Button, Card } from 'react-bootstrap';

const ViewTraveller = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Defines an asynchronous function to fetch user data by its ID from the server.
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/get/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (!userId) {
    return <div>No user ID found</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5 text-center">
      <Card>
            <Card.Body>
  <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>View Travel User</Card.Title>
  <div className="text-center mb-4">
            <img src="https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?pid=ImgDet&rs=1" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
  <Table striped bordered responsive>
    <tbody>
      <tr>
        <td><strong>User NIC</strong></td>
        <td>{user.NIC}</td>
      </tr>
      <tr>
        <td><strong>Username</strong></td>
        <td>{user.UName}</td>
      </tr>
      <tr>
        <td><strong>First Name</strong></td>
        <td>{user.FName}</td>
      </tr>
      <tr>
        <td><strong>Last Name</strong></td>
        <td>{user.LName}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>{user.Email}</td>
      </tr>
      <tr>
        <td><strong>Phone Number</strong></td>
        <td>{user.CNumber}</td>
      </tr>
      <tr>
        <td><strong>User Type</strong></td>
        <td>{user.UserType}</td>
      </tr>
      <tr>
        <td><strong>Status</strong></td>
        <td>{user.UserStatus}</td>
      </tr>
    </tbody>
  </Table>
  <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
            </Card.Body>
            </Card>
</Container>
  );
};

export default ViewTraveller;