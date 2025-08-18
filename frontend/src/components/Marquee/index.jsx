// File: src/components/Marquee/index.jsx
import { memo } from 'react';
import { Box } from '@mui/material';
import MarqueeComponent from './MarqueeComponent';

const MarqueeSection = ({ onCursorChange }) => {
  return (
    <Box 
      id="technologies"
      sx={{ 
        // Background removed - using global background
      }}
    >
      <MarqueeComponent onCursorChange={onCursorChange} />
    </Box>
  );
};

export default memo(MarqueeSection);