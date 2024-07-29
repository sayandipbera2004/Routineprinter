import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import Routine from './components/Routine';
import './styles/App.css';

const App = () => {
  const [userData, setUserData] = useState({
    name: '',
    year: '',
    department: '',
    section: ''
  });

  const [showRoutine, setShowRoutine] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRoutine(true);
  };

  const getSections = () => {
    switch (userData.department) {
      case 'CSE':
        return ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
      case 'IT':
        return ['1', '2', '3'];
      case 'ECE':
        return ['A1', 'A2', 'B1', 'B2'];
      case 'AIML':
        return ['1', '2', '3'];
      default:
        return [];
    }
  };

  return (
    <div className={`app-background ${showRoutine ? 'routine-shown' : ''}`}>
      <Container>
        <Box className="form-container">
        <div className="typography-container">
  <Typography variant="h4" component="h1" gutterBottom>
    Class Routine for CEMKians
  </Typography>
  <Typography variant="h6" component="h2" gutterBottom>
    Made by Sayandip Bera
  </Typography>
</div>
          {!showRoutine ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  value={userData.year}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="2nd Year">2nd Year</MenuItem>
                  <MenuItem value="3rd Year">3rd Year</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={userData.department}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="CSE">CSE</MenuItem>
                  <MenuItem value="AIML">AIML</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="ECE">ECE</MenuItem>
                </Select>
              </FormControl>
              {userData.department && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Section</InputLabel>
                  <Select
                    name="section"
                    value={userData.section}
                    onChange={handleChange}
                    required
                  >
                    {getSections().map((section) => (
                      <MenuItem key={section} value={section}>
                        {section}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <div className="button-container">
                <Button type="submit" variant="contained" color="primary">
                  Generate Routine
                </Button>
              </div>
            </form>
          ) : (
            <Routine userData={userData} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default App;
