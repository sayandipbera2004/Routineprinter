import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button, Container, Select, MenuItem, FormControl, InputLabel, TextField, Typography, Box } from '@mui/material';
import RoutineTable from './RoutineTable';
import ReactDOM from 'react-dom';

const Routine = ({ userData }) => {
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleBackgroundChange = (e) => {
    setBackgroundImage(e.target.files[0]);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add background image if present
    if (backgroundImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        addContent(doc, pageWidth);
        doc.save('routine.pdf');
      };
      reader.readAsDataURL(backgroundImage);
    } else {
      addContent(doc, pageWidth);
      doc.save('routine.pdf');
    }
  };

  const addContent = (doc, pageWidth) => {
    const titleWidth = doc.getTextWidth(`Class Routine for ${userData.year} ${userData.department} ${userData.section}`);
    doc.text(`Class Routine for ${userData.year} ${userData.department} ${userData.section}`, (pageWidth - titleWidth) / 2, 10);

    const nameWidth = doc.getTextWidth(`NAME: ${userData.name}`);
    doc.text(`NAME: ${userData.name}`, (pageWidth - nameWidth) / 2, 20);

    // Create a routine table
    const routineTable = document.createElement('div');
    document.body.appendChild(routineTable);
    ReactDOM.render(<RoutineTable theme={theme} userData={userData} />, routineTable);

    const table = routineTable.querySelector('table');
    autoTable(doc, { html: table, startY: 30 });

    const footerText = `Created by Sayandip Bera (ECE/22/18)`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerWidth) / 2, doc.internal.pageSize.getHeight() - 10);

    // Clean up
    ReactDOM.unmountComponentAtNode(routineTable);
    document.body.removeChild(routineTable);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Class Routine
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Theme</InputLabel>
        <Select
          value={theme}
          onChange={handleThemeChange}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="ocean">Ocean</MenuItem>
          <MenuItem value="sunset">Sunset</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Background Image</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundChange}
        />
      </FormControl>
      <Box marginTop={2}>
        <RoutineTable theme={theme} userData={userData} />
      </Box>
      <Box className="button-container" marginTop={2}>
        <Button onClick={handleDownload} variant="contained" color="primary">
          Download as PDF
        </Button>
      </Box>
    </Container>
  );
};

export default Routine;
