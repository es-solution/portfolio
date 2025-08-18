// File: src/components/PageLoader.jsx
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box 
          component="img"
          src="eslogo.jpg" 
          alt="ES Solutions Logo"
          sx={{ 
            width: 120, 
            height: 120,
            mb: 4
          }}
        />
      </motion.div>
      
      <Box sx={{ width: 200, position: 'relative', mb: 2 }}>
        <Box 
          sx={{ 
            width: '100%', 
            height: 4, 
            backgroundColor: '#e2e8f0',
            borderRadius: 2,
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{
            height: 4,
            backgroundColor: '#4299e1',
            position: 'absolute',
            top: 0,  
            left: 0,
            borderRadius: 2,
          }}
        />
      </Box>
      
      <Typography 
        variant="body2" 
        color="textSecondary"
        sx={{ fontWeight: 500 }}
      >
        {Math.round(progress)}% LOADING
      </Typography>
    </Box>
  );
};

export default PageLoader;