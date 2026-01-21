import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch rooms');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="w-75 mx-auto my-4">
      <h2>Available Rooms</h2>
      <div className="d-flex flex-wrap gap-3">
        {rooms.map((room) => (
          <Card key={room._id} style={{ width: '320px' }}>
            <Card.Img
              variant="top"
              src={`${API_URL}/uploads/${room.image}`}
              height={200}
            />
            <Card.Body>
              <Card.Title>{room.title}</Card.Title>
              <Card.Text>{room.desc}</Card.Text>
              <Card.Text>Price: ${room.price}</Card.Text>
              <Card.Text>Rating: {room.rating}</Card.Text>
              <Button
                variant="success"
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem('user'));
                  if (!user) {
                    navigate('/user-login', { state: { from: `/book-room/${room._id}` } });
                  } else {
                    navigate(`/book-room/${room._id}`);
                  }
                }}
              >
                Book Room
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
