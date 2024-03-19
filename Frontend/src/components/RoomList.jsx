import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const RoomList = ({ rooms, deleteRoom, setEditingRoom }) => {
  return (
    <Accordion defaultActiveKey="0">
      {rooms.map((room, index) => (
        <Card key={room._id}>
          <Accordion.Toggle as={Card.Header} eventKey={`${index}`} style={{textAlign: 'center'}}>
            <strong>{room.Building.code} - {room.Room}</strong>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body>
              {/* Displaying room details */}
              <p>Tag Number: {room.TagNumber}</p>
              <p>Asset Description: {room.AssetDescription}</p>
              <p>Serial ID: {room.SerialID}</p>
              {/* Assuming each room could have multiple cameras, you might want to list them here */}
              {room.Cameras && room.Cameras.map((camera, cameraIndex) => (
                <div key={cameraIndex}>
                  <p>Instructor IP: {camera.IPAddress_Instructor}</p>
                  <p>Student IP: {camera.IPAddress_Student}</p>
                </div>
              ))}
              <Button variant="primary" onClick={() => setEditingRoom(room)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => deleteRoom(room._id)}>Delete</Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default RoomList;
