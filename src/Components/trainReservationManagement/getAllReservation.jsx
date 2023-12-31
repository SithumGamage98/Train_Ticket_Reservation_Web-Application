import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Table, Button, Card, Container } from 'react-bootstrap';

const GetAllReservation = () => {
  const { userId, setUser } = useContext(UserContext);

  const [reservations, setReservations] = useState([]);
  const [cancellationLoading, setCancellationLoading] = useState(false);

  const handleCancel = (id, reservationDate, bookingDate) => {
    const reservationDateObj = new Date(reservationDate);
    const bookingDateObj = new Date(bookingDate);
  
    const differenceInMilliseconds = reservationDateObj - bookingDateObj;
  
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    if (differenceInDays < 5) {
      alert("Cancellation is allowed only if reservation date is within 5 days of booking date.");
      return;
    }
  
    setCancellationLoading(true);
    axios.put(`/api/reservations/cancel/${id}`)
      .then(response => {
        // Logs the successful cancellation message, updates the reservations list, and displays an alert.
        console.log(`Booking with ID ${id} has been cancelled.`);
        setReservations(prevReservations => prevReservations.filter(res => res.ID !== id));
        alert("Reservation has been cancelled.");
      })
      .catch(error => {
        alert("Cancellation is allowed only if reservation date is within 5 days of booking date.");
      })
      .finally(() => {
        setCancellationLoading(false);
      });
  };  

  useEffect(() => {
    const savedUserId = Cookies.get('userId');

    if (!userId && savedUserId) {
      setUser(savedUserId);
    }
    if (userId) {
      axios.get(`/api/reservations/getall/${userId}`)
        .then(response => {
          setReservations(response.data);
          localStorage.setItem('reservations', JSON.stringify(response.data)); // Store data in localStorage
        })
        .catch(error => {
          console.error('Error fetching reservations:', error);
        });
    } else {
      // Retrieve data from localStorage
      const savedReservations = JSON.parse(localStorage.getItem('reservations'));
      if (savedReservations) {
        setReservations(savedReservations);
      }
    }
  }, [userId, setUser]);

  return (
    <Container className="text-center mt-5" style={{height: "700px"}}>
      <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>You Reservations</Card.Title>
  <Table striped bordered hover style={{ marginTop: '20px', width:"75%" }} className="mx-auto">
    <thead>
      <tr>
        <th>ID</th>
        <th>Traveler Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {reservations.map(reservation => (
  <tr key={reservation.ID}>
    <td>{reservation.TrainID}</td>
    <td>{reservation.TravelerName}</td>
    <td>
      <Button
        variant="warning"
        as={Link}
        to={`/reservationview/${reservation.ID}`}
        style={{ color: 'white', marginRight: '5px', textDecoration: 'none' }}
      >
        View Reservation
      </Button>
      <Button
        variant="link"
        as={Link}
        to={`/reservationupdate/${reservation.ID}`}
        style={{ background: 'green', color: 'white', textDecoration: 'none' }}
      >
        Update Reservation
      </Button>
      <Button
        variant="danger"
        onClick={() => handleCancel(reservation.ID, reservation.ReservationDate, reservation.BookingDate)}
        disabled={cancellationLoading}
        style={{ marginLeft: '5px' }}
      >
        Cancel Reservation
      </Button>
    </td>
  </tr>
))}
    </tbody>
  </Table>
  </Card.Body>
  </Card>
  </Container>
  );
};

export default GetAllReservation;