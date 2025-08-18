// File: src/components/TechnologiesMarquee.jsx
import { useEffect, useCallback, memo } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Technology icons and names - reduced number for better performance
const technologies = [
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Python', icon: 'python' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Java', icon: 'java' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'C#', icon: 'csharp' },
  { name: 'PHP', icon: 'php' },
  { name: 'Go', icon: 'go' },
  { name: 'Rust', icon: 'rust' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Docker', icon: 'docker' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Azure', icon: 'azure' },
];

// Memoized technology item to prevent unnecessary re-renders
const TechItem = memo(({ tech, onCursorChange }) => {
  const handleMouseEnter = useCallback(() => {
    onCursorChange('interactive');
  }, [onCursorChange]);

  const handleMouseLeave = useCallback(() => {
    onCursorChange('default');
  }, [onCursorChange]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        mx: 4,
        willChange: 'transform', // Optimize for animations
        '&:hover': {
          '& > .tech-icon': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          }
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box 
        className="tech-icon"
        sx={{ 
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Single white background
          boxShadow: 1, // Reduced shadow for better performance
          transition: 'transform 0.2s', // Move transition here for better performance
        }}
      >
        {/* Placeholder for actual tech icons */}
        <Typography 
          color="primary"
          sx={{ 
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          {tech.name.charAt(0)}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {tech.name}
      </Typography>
    </Box>
  );
});

// Make sure to set display name for memo component
TechItem.displayName = 'TechItem';

const TechnologiesMarquee = ({ onCursorChange }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Start animations when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box 
      id="technologies"
      sx={{ 
        py: 10,
        // Background removed - using global background
      }}
      ref={ref}
    >
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
            }}
          >
            Technologies We Work With
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="textSecondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
            }}
          >
            Our expertise spans a wide range of cutting-edge technologies
          </Typography>
        </motion.div>
      </Container>

      {/* Optimized Marquee effect */}
      <Box 
        sx={{ 
          overflow: 'hidden',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            zIndex: 2,
            width: 100,
            height: '100%',
            pointerEvents: 'none',
          },
          '&::before': {
            left: 0,
            background: (theme) => `linear-gradient(90deg, ${theme.palette.background.default} 0%, transparent 100%)`,
          },
          '&::after': {
            right: 0,
            background: (theme) => `linear-gradient(90deg, transparent 0%, ${theme.palette.background.default} 100%)`,
          },
        }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80, // Slower animation for better performance
              ease: 'linear',
            },
          }}
          style={{
            display: 'flex',
            width: 'fit-content',
            willChange: 'transform', // Optimize for animations
          }}
        >
          {/* Duplicate the array for seamless looping, but using a smaller dataset */}
          {[...technologies, ...technologies].map((tech, index) => (
            <TechItem 
              key={`${tech.name}-${index}`} 
              tech={tech} 
              onCursorChange={onCursorChange} 
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default memo(TechnologiesMarquee); // Memoize the entire component