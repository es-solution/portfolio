// File: src/components/CustomCursor.jsx
import { useEffect, useCallback, useMemo, memo } from 'react';
import { Box } from '@mui/material';

const CustomCursor = ({ position, type }) => {
  // Memoize cursor styles to prevent recreating objects on each render
  const cursorStyles = useMemo(() => {
    const baseStyles = {
      position: 'absolute',
      pointerEvents: 'none',
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: 'width 0.2s, height 0.2s, border-radius 0.2s, background-color 0.2s, transform 0.15s ease-out',
      willChange: 'transform, width, height', // Hint for browser optimization
    };

    // Style variants based on cursor type
    switch (type) {
      case 'link':
        return {
          ...baseStyles,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(66, 153, 225, 0.25)',
          border: '2px solid #4299e1',
          mixBlendMode: 'difference',
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)`,
        };
      case 'button':
        return {
          ...baseStyles,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(66, 153, 225, 0.4)',
          border: '2px solid #4299e1',
          transform: `translate3d(${position.x - 25}px, ${position.y - 25}px, 0)`,
        };
      case 'logo':
        return {
          ...baseStyles,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          border: '2px solid #4299e1',
          transform: `translate3d(${position.x - 30}px, ${position.y - 30}px, 0)`,
        };
      case 'interactive':
        return {
          ...baseStyles,
          width: '64px',
          height: '64px',
          borderRadius: '8px',
          backgroundColor: 'rgba(66, 153, 225, 0.2)',
          border: '2px solid #4299e1',
          transform: `translate3d(${position.x - 32}px, ${position.y - 32}px, 0) rotate(45deg)`,
        };
      default:
        return {
          ...baseStyles,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid #4299e1',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
        };
    }
  }, [position.x, position.y, type]);

  // Optimize for mobile devices
  const containerStyles = useMemo(() => ({
    cursor: 'none',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    '@media (hover: none)': {
      display: 'none', // Hide on touch devices
    },
  }), []);

  // Disable default cursor on document body
  useEffect(() => {
    // Add a class to body to hide default cursor
    document.body.classList.add('custom-cursor-enabled');
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return (
    <Box sx={containerStyles}>
      <div style={cursorStyles} />
    </Box>
  );
};

// Add a style tag to the document head for global cursor styles
const StyleTag = () => {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .custom-cursor-enabled, 
      .custom-cursor-enabled * {
        cursor: none !important;
      }
      
      @media (hover: none) {
        .custom-cursor-enabled, 
        .custom-cursor-enabled * {
          cursor: auto !important;
        }
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
  
  return null;
};

// Combine components
const EnhancedCustomCursor = ({ position, type }) => {
  return (
    <>
      <StyleTag />
      <CustomCursor position={position} type={type} />
    </>
  );
};

export default memo(EnhancedCustomCursor);