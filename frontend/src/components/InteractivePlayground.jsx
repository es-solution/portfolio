// File: src/components/InteractivePlayground.jsx
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import LightRays from './LightRays';

const InteractivePlayground = ({ onCursorChange }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const controls = useAnimation(); // For Framer Motion text animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // State for hover, managed by React for triggering cursor changes etc.
  const [isHoveringState, setIsHoveringState] = useState(false);
  // Ref for isHovering, to be used inside the animation loop to avoid stale closures
  const isHoveringRef = useRef(isHoveringState);

  useEffect(() => {
    isHoveringRef.current = isHoveringState;
  }, [isHoveringState]);

  // Refs for Three.js objects and animation state mutable within useEffect
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const geometriesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  const hasMorphedOnThisHoverRef = useRef(false);
  const currentGeometryIndexRef = useRef(0);
  const isMorphingCooldownRef = useRef(false); // Cooldown for the morph action itself

  const playfulColorsContainerRef = useRef({
    colors: [],
    currentIndex: 0,
  });
  
  const rotationStateRef = useRef({
    baseSpeedZ: 0.003, // Base continuous spin speed
    currentSpeedZ: 0.003,
    speedBoostTimeoutId: null,
  });

  // Start Framer Motion animations when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Three.js setup and animation loop
  useEffect(() => {
    if (!canvasRef.current) return;

    const currentCanvas = canvasRef.current; 

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      currentCanvas.clientWidth / currentCanvas.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: currentCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(currentCanvas.clientWidth, currentCanvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Dispose old geometries if effect re-runs
    geometriesRef.current.forEach(g => g.dispose());
    geometriesRef.current = [
      new THREE.IcosahedronGeometry(1.2, 0), // Slightly larger, simplest
      new THREE.IcosahedronGeometry(1.2, 1), // Medium complexity
      new THREE.IcosahedronGeometry(1.2, 3), // Higher complexity
    ];
    currentGeometryIndexRef.current = 0; 
    
    // Dispose old material if any
    if (materialRef.current) materialRef.current.dispose(); 
    const initialColor = new THREE.Color(theme.palette.primary.main);
    const initialEmissive = new THREE.Color(theme.palette.primary.light);

    const material = new THREE.MeshStandardMaterial({
      color: initialColor,
      wireframe: true,
      emissive: initialEmissive,
      emissiveIntensity: 0.4, // Slightly more glow
    });
    materialRef.current = material;
    
    // Initialize playful colors
    playfulColorsContainerRef.current.colors = [
        { color: initialColor.clone(), emissive: initialEmissive.clone() },
        { color: new THREE.Color('#FF69B4'), emissive: new THREE.Color('#FFC0CB') }, // Hot Pink, Light Pink emissive
        { color: new THREE.Color('#00FFFF'), emissive: new THREE.Color('#AFEEEE') }, // Cyan, Pale Turquoise emissive
        { color: new THREE.Color('#7FFF00'), emissive: new THREE.Color('#98FB98') }, // Chartreuse, Pale Green emissive
        { color: new THREE.Color('#FFD700'), emissive: new THREE.Color('#FAFAD2') }, // Gold, Light Goldenrod Yellow emissive
        { color: new THREE.Color('#9370DB'), emissive: new THREE.Color('#E6E6FA') }, // Medium Purple, Lavender emissive
    ];
    playfulColorsContainerRef.current.currentIndex = 0;

    if (meshRef.current) {
        scene.remove(meshRef.current); // Remove old mesh if effect re-runs
    }
    const mesh = new THREE.Mesh(geometriesRef.current[currentGeometryIndexRef.current], material);
    scene.add(mesh);
    meshRef.current = mesh;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); 
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); 
    directionalLight.position.set(2.5, 2.5, 5);
    scene.add(directionalLight);
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range based on window center
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      
      if (!meshRef.current || !materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current ) return;

      targetX = mouseX * 0.4; // Mouse influence on X rotation
      targetY = mouseY * 0.4; // Mouse influence on Y rotation
      
      meshRef.current.rotation.y += 0.03 * (targetX - meshRef.current.rotation.y); // Smooth Y rotation
      meshRef.current.rotation.x += 0.03 * (targetY - meshRef.current.rotation.x); // Smooth X rotation
      meshRef.current.rotation.z += rotationStateRef.current.currentSpeedZ; // Continuous Z rotation
      
      if (isHoveringRef.current && !isMorphingCooldownRef.current && !hasMorphedOnThisHoverRef.current) {
        isMorphingCooldownRef.current = true;
        hasMorphedOnThisHoverRef.current = true;
        
        currentGeometryIndexRef.current = (currentGeometryIndexRef.current + 1) % geometriesRef.current.length;
        meshRef.current.geometry = geometriesRef.current[currentGeometryIndexRef.current];
        
        setTimeout(() => {
          isMorphingCooldownRef.current = false; 
        }, 600); // Morph cooldown
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
    const handleResize = () => {
      if (!currentCanvas || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = currentCanvas.clientWidth / currentCanvas.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(currentCanvas.clientWidth, currentCanvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      if (rotationStateRef.current.speedBoostTimeoutId) {
          clearTimeout(rotationStateRef.current.speedBoostTimeoutId);
      }
      
      geometriesRef.current.forEach(geometry => geometry.dispose());
      geometriesRef.current = [];

      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }
      if (meshRef.current && sceneRef.current) {
        sceneRef.current.remove(meshRef.current);
        meshRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [theme.palette.primary.main, theme.palette.primary.light]);


  const handleMouseEnter = () => {
    setIsHoveringState(true);
    onCursorChange('interactive');
    hasMorphedOnThisHoverRef.current = false; 
  };

  const handleMouseLeave = () => {
    setIsHoveringState(false);
    onCursorChange('default');
  };

  const handleClick = () => {
    if (!meshRef.current || !materialRef.current || !playfulColorsContainerRef.current.colors.length) return;

    const colorsContainer = playfulColorsContainerRef.current;
    colorsContainer.currentIndex = (colorsContainer.currentIndex + 1) % colorsContainer.colors.length;
    const newColorTheme = colorsContainer.colors[colorsContainer.currentIndex];
    
    materialRef.current.color.set(newColorTheme.color);
    materialRef.current.emissive.set(newColorTheme.emissive);

    const rotationState = rotationStateRef.current;
    rotationState.currentSpeedZ = rotationState.baseSpeedZ * 12; // Speed boost
    
    if (rotationState.speedBoostTimeoutId) {
        clearTimeout(rotationState.speedBoostTimeoutId);
    }
    rotationState.speedBoostTimeoutId = setTimeout(() => {
        rotationState.currentSpeedZ = rotationState.baseSpeedZ; // Reset to base speed
    }, 750); // Boost duration
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 3, md: 2 }, 
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 320, sm: 350, md: 400 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* LightRays Background Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          fadeDistance={1}
          saturation={1}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
        />
      </Box>

      <Container sx={{ textAlign: 'center', mb: 2, mt: {xs: 2, md: 0}, position: 'relative', zIndex: 2 }}>

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
              mb: 1,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.75rem' }
            }}
         >
            Reach out to us and let's create something amazing together!
         </Typography>
         <Typography 
            variant="h6" 
            align="center" 
            color="textSecondary"
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' }
            }}
         >
            {/* Hover to transform, click to splash color & speed! */}
         </Typography>
        </motion.div>
      </Container>

      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: '100%', 
          height: { xs: 200, sm: 220, md: 250 }, 
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 280, sm: 350, md: 400 }, 
            height: '100%', 
            cursor: isHoveringState ? 'pointer' : 'default',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick} 
        >
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } 
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'block', 
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InteractivePlayground;