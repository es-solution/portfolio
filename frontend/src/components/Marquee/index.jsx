// File: src/components/Marquee/index.jsx
import { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import MarqueeComponent from './MarqueeComponent';

const MarqueeSection = ({ onCursorChange }) => {
  const theme = useTheme();
  
  // Apply theme variables to root element
  const updateThemeVariables = () => {
    document.documentElement.style.setProperty(
      '--background-color', 
      theme.palette.mode === 'light' ? '#ffffff' : '#121212'
    );
    
    document.documentElement.style.setProperty(
      '--heading-color', 
      theme.palette.mode === 'light' ? '#333333' : '#ffffff'
    );
    
    document.documentElement.style.setProperty(
      '--text-color', 
      theme.palette.mode === 'light' ? '#555555' : '#dddddd'
    );
  };
  
  // Update CSS variables when theme changes
  if (typeof window !== 'undefined') {
    updateThemeVariables();
  }
  
  return (
    <Box 
      id="technologies"
      sx={{ 
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(240, 249, 255, 0.6)' 
          : 'rgba(10, 25, 41, 0.6)',
      }}
    >
      <MarqueeComponent onCursorChange={onCursorChange} />
    </Box>
  );
};

export default memo(MarqueeSection);