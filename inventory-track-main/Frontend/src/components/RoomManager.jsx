import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomForm from "./RoomForm";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const RoomManager = ({ updateAuthStatus }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    BuildingCode: "",
    Room: "",
    TagNumber: "",
    AssetDescription: "",
    SerialID: "",
    // Add Camera details if part of the room form
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    updateAuthStatus(false);
    navigate('/login');
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms");
        setRooms(response.data);
      } catch (error) {
        toast({
          title: "Error fetching rooms",
          description: error.toString(),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchRooms();
  }, []);

  const saveRoom = async (e) => {
    e.preventDefault();
    const endpoint = editingRoomId ? `http://localhost:3000/rooms/${editingRoomId}` : "http://localhost:3000/rooms";
    const method = editingRoomId ? 'put' : 'post';

    try {
      const response = await axios[method](endpoint, newRoom);
      if (editingRoomId) {
        setRooms(prev => prev.map(room => room._id === editingRoomId ? response.data : room));
      } else {
        setRooms(prev => [...prev, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/rooms/${id}`);
      setRooms(prev => prev.filter(room => room._id !== id));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const setEditingRoom = (room) => {
    setNewRoom({
      BuildingCode: room.Building.code,
      Room: room.Room,
      TagNumber: room.TagNumber,
      AssetDescription: room.AssetDescription,
      SerialID: room.SerialID,
      // Handle setting camera details if included
    });
    setEditingRoomId(room._id);
  };

  const resetForm = () => {
    setNewRoom({
      BuildingCode: "",
      Room: "",
      TagNumber: "",
      AssetDescription: "",
      SerialID: "",
      // Reset Camera details if part of the form
    });
    setEditingRoomId(null);
  };

  return (
    <Container fluid className="p-5" style={{ backgroundImage: `url('https://www.uh.edu/sugarland/_images/zoom-virtual-backgrounds/university-of-houston-at-sugar-land_zoom-virtual-background_albert-and-mamie-george-building-1.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Row>
        <Col md={12}>
          <Button variant="danger" onClick={logout}>Logout</Button>
          <RoomForm newRoom={newRoom} handleInputChange={handleInputChange} handleSubmit={saveRoom} editing={!!editingRoomId} />
          <hr />
          {rooms.map((room) => (
            <Card key={room._id} className="mb-3">
              <Card.Body>
              <Card.Title>{room.Building ? room.Building.$oid : ''} - {room.Room}</Card.Title>

                <Card.Text>Tag Number: {room.TagNumber}</Card.Text>
                <Card.Text>Asset Description: {room.AssetDescription}</Card.Text>
                <Card.Text>Serial ID: {room.SerialID}</Card.Text>
                {/* Render Camera details if included */}
                <Button variant="primary" onClick={() => setEditingRoom(room)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => deleteRoom(room._id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RoomManager;

