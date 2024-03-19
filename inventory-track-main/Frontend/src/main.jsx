import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  // ... your theme options
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);