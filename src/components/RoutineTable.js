import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { demoRoutines } from '../demoRoutines';

const RoutineTable = ({ theme, userData }) => {
  const { year, department, section } = userData;

  const timeSlots = [
    '09:00-09:50',
    '09:50-10:40',
    '10:40-11:30',
    '11:30-12:20',
    '12:20-01:40 (Tiffin)',
    '01:40-02:30',
    '02:30-03:20',
    '03:20-04:10',
    '04:10-05:00'
  ];

  const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const routineData = demoRoutines[year]?.[department]?.[section] || [];

  const themeStyles = {
    light: { backgroundColor: '#ffffff', color: '#333' },
    dark: { backgroundColor: '#2c2c2c', color: '#e0e0e0' },
    ocean: { backgroundColor: '#e0f7fa', color: '#00796b' },
    sunset: { backgroundColor: '#ffecb3', color: '#bf360c' }
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <TableContainer component={Paper} style={{ backgroundColor: currentTheme.backgroundColor, color: currentTheme.color, marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: currentTheme.color, fontWeight: 'bold', backgroundColor: currentTheme.backgroundColor }}>Time Slot</TableCell>
            {days.map((day) => (
              <TableCell key={day} style={{ color: currentTheme.color, fontWeight: 'bold', backgroundColor: currentTheme.backgroundColor }}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((slot, index) => (
            <TableRow key={slot}>
              <TableCell style={{ color: currentTheme.color, backgroundColor: currentTheme.backgroundColor }}>{slot}</TableCell>
              {routineData[index] && routineData[index].map((data, idx) => (
                <TableCell key={idx} style={{ color: currentTheme.color, backgroundColor: currentTheme.backgroundColor }}>{data || '-'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoutineTable;
