require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  dbName: process.env.DB_NAME
})
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.error("MongoDB connection error:", err));

// Define the schemas
const buildingSchema = new mongoose.Schema({
  code: String,
  name: String
});
const Building = mongoose.model("Building", buildingSchema);

const roomSchema = new mongoose.Schema({
  Room: String,
  TagNumber: String,
  AssetDescription: String,
  SerialID: String,
  Building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building'
  },
  Cameras: [{
    IPAddress_Instructor: String,
    IPAddress_Student: String,
  }]
});
const Room = mongoose.model("Room", roomSchema);

// CRUD Operations for Buildings

// Create a new building
app.post("/buildings", async (req, res) => {
  try {
    const newBuilding = new Building(req.body);
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a building
app.put("/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json(building);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a building by ID
app.get("/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json(building);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a building
app.delete("/buildings/:id", async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json({ message: "Building deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD Operations for Rooms

// Create a new room
app.post("/rooms", async (req, res) => {
  try {
    const building = await Building.findOne({ code: req.body.BuildingCode });
    if (!building) {
      return res.status(400).json({ message: "Building not found" });
    }
    const roomData = {
      ...req.body,
      Building: building._id
    };
    const newRoom = new Room(roomData);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a room
app.put("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('Building');
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().populate('Building');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a room by ID
app.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('Building');
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a room
app.delete("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import routes for additional functionalities like authentication
const authRoutes = require('./routes/authRouters'); 
app.use('/api', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
