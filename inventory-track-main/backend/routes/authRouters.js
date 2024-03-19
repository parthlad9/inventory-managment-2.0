// routes/authRoutes.js
const express = require('express');
const User = require('./user'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
