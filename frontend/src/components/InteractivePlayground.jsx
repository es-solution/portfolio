// File: src/components/InteractivePlayground.jsx
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

const InteractivePlayground = ({ onCursorChange }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [isHovering, setIsHovering] = useState(false);

  // Start animations when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create geometries
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0), // Simplest form
      new THREE.IcosahedronGeometry(1, 1), // Medium complexity
      new THREE.IcosahedronGeometry(1, 2), // Most complex
    ];
    
    // Create material with the theme's primary color
    const material = new THREE.MeshStandardMaterial({
      color: theme.palette.primary.main,
      wireframe: true,
      emissive: theme.palette.primary.light,
      emissiveIntensity: 0.3,
    });
    
    // Create mesh with initial geometry
    const mesh = new THREE.Mesh(geometries[0], material);
    scene.add(mesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);
    
    // Mouse movement tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let geometryIndex = 0;
    let morphClock = 0;
    let isMorphing = false;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation based on mouse position
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      mesh.rotation.y += 0.05 * (targetX - mesh.rotation.y);
      mesh.rotation.x += 0.05 * (targetY - mesh.rotation.x);
      
      // Constantly spinning (slow)
      mesh.rotation.z += 0.005;
      
      // If user is hovering, morph to the next geometry
      if (isHovering && !isMorphing) {
        isMorphing = true;
        morphClock = 0;
        
        // Change to the next geometry
        geometryIndex = (geometryIndex + 1) % geometries.length;
        mesh.geometry = geometries[geometryIndex];
        
        // Reset morphing after a delay
        setTimeout(() => {
          isMorphing = false;
        }, 1000);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      geometries.forEach(geometry => geometry.dispose());
      material.dispose();
      renderer.dispose();
    };
  }, [canvasRef, isHovering, theme.palette.primary]);

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
      ref={ref}
      sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container >
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
            Play With Us
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="textSecondary"
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              mb: 5,
            }}
          >
            Hover over the shape to see it transform
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            height: 400,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 500,
              height: 400,
            }}
            onMouseEnter={() => {
              setIsHovering(true);
              onCursorChange('interactive');
            }}
            onMouseLeave={() => {
              setIsHovering(false);
              onCursorChange('default');
            }}
          >
            <motion.canvas
              ref={canvasRef}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { duration: 1 } 
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InteractivePlayground;