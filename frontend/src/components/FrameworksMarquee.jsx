// File: src/components/FrameworksMarquee.jsx
import { useEffect, useCallback, memo } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Framework icons and names - reduced for better performance
const frameworks = [
  { name: 'React', icon: 'react' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Vue.js', icon: 'vue' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Express', icon: 'express' },
  { name: 'Django', icon: 'django' },
  { name: 'Spring Boot', icon: 'spring' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'TensorFlow', icon: 'tensorflow' },
  { name: 'Flutter', icon: 'flutter' },
  { name: 'React Native', icon: 'react-native' },
  { name: 'Electron', icon: 'electron' },
];

// Memoized framework item to prevent unnecessary re-renders
const FrameworkItem = memo(({ framework, onCursorChange }) => {
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
          '& > .framework-icon': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          }
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box 
        className="framework-icon"
        sx={{ 
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          borderRadius: '16px',
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(30, 41, 59, 0.8)',
          boxShadow: 1, // Reduced shadow for better performance
          transition: 'transform 0.2s', // Move transition here for better performance
        }}
      >
        {/* Placeholder for actual framework icons */}
        <Typography 
          color="primary"
          sx={{ 
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          {framework.name.charAt(0)}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {framework.name}
      </Typography>
    </Box>
  );
});

// Make sure to set display name for memo component
FrameworkItem.displayName = 'FrameworkItem';

const FrameworksMarquee = ({ onCursorChange }) => {
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
      sx={{ 
        py: 10,
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? 'rgba(240, 249, 255, 0.3)' 
            : 'rgba(10, 25, 41, 0.3)',
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
            Frameworks We Work With
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
            Building with the most powerful and innovative frameworks
          </Typography>
        </motion.div>
      </Container>

      {/* Optimized Marquee effect - moving left (opposite direction to technologies) */}
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
          initial={{ x: '-50%' }}
          animate={{ x: '0%' }}
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
          {[...frameworks, ...frameworks].map((framework, index) => (
            <FrameworkItem 
              key={`${framework.name}-${index}`} 
              framework={framework} 
              onCursorChange={onCursorChange} 
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default memo(FrameworksMarquee); // Memoize the entire component