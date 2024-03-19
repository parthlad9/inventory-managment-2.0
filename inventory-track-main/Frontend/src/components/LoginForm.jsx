import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Button, Card } from 'react-bootstrap';

const LoginForm = ({ updateAuthStatus }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      updateAuthStatus(true);
      navigate('/cameras');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop id="login-video">
        <source src="/vid/SLbanner.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <style>
        {`
          #login-video {
            position: fixed;
            right: 0;
            bottom: 0;
            minWidth: '100%';
            minHeight: '100%';
            width: 100%;
            height: 100%;
            object-fit: cover; /* Cover the entire screen */
            z-index: 1; /* Make sure it's behind other elements */
          }

          .login-page {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #b41616;
          }

          .form-container {
            position: relative;
            width: 100%; /* Full width to center the box */
            max-width: 480px; /* Max width for the form */
            z-index: 2;
          }

          .form-box {
            padding: 40px;
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
            border-radius: 10px; /* Rounded corners */
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); /* Soft shadow for depth */
            margin: 0 auto; /* Auto margins for horizontal centering */
          }
          .form-control, .btn-primary {
            border-radius: 20px; /* Rounded inputs and button */
          }

          .btn-primary {
            background-color: rgb(255,29,0); /* Vivid color for the button */
            border: none;
            padding: 10px 20px;
            font-size: 18px;
            margin-top: 10px;
          }

          .btn-primary:hover {
            background-color: rgb(237, 70, 73) /* Darker shade for hover state */
          }

          .form-control:focus {
            border-color: #6200ea;
            box-shadow: none; /* No shadow on focus to keep modern look */
          }

          .alert {
            margin-bottom: 20px; /* Space between alert and form elements */
          }
        `}
      </style>
      <div className="form-container">
        <Card className="form-box">
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required 
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
