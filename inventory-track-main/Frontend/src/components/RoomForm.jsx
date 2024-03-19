import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const RoomForm = ({ newRoom, handleInputChange, handleSubmit, editing }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                {/* First row for Building Code */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="BuildingCode" className="text-white">Building Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="BuildingCode"
                            name="BuildingCode"
                            value={newRoom.BuildingCode}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Room" className="text-white">Room</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Room"
                            name="Room"
                            value={newRoom.Room}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Second row for Room details */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="TagNumber" className="text-white">Tag Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="TagNumber"
                            name="TagNumber"
                            value={newRoom.TagNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="AssetDescription" className="text-white">Asset Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="AssetDescription"
                            name="AssetDescription"
                            value={newRoom.AssetDescription}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Third row for Serial ID and optional camera information */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="SerialID" className="text-white">Serial ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SerialID"
                            name="SerialID"
                            value={newRoom.SerialID}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {/* Assuming you will dynamically add camera fields as needed */}
            </div>

            {/* Button */}
            <div className="form-group text-center mt-4">
                <button type="submit" className="btn btn-primary">
                    {editing ? "Update Room" : "Add Room"}
                </button>
            </div>
        </form>
    );
};

export default RoomForm;
