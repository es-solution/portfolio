import { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const TechnologiesMarquee = lazy(() => import('./components/TechnologiesMarquee'));
const FrameworksMarquee = lazy(() => import('./components/FrameworksMarquee'));
const MarqueeSection = lazy(() => import('./components/Marquee')); // Updated to new Marquee
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractivePlayground = lazy(() => import('./components/InteractivePlayground'));
const PageLoader = lazy(() => import('./components/PageLoader'));

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');

  // Create single theme without light/dark mode
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#4299e1', // Blue from the logo
      },
      secondary: {
        main: '#1a365d', // Navy from the logo background
      },
      background: {
        default: 'transparent', // Transparent - using global background
        paper: 'transparent', // Transparent - using global background
      },
      text: {
        primary: '#ffffff', // White text for dark background
        secondary: '#cccccc', // Light gray text
      },
    },
    typography: {
      fontFamily: '"League Spartan", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '5rem',
      },
      h2: {
        fontWeight: 700,
        fontSize: '3.5rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '2.75rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '2rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle cursor type change based on elements hovered
  const handleCursorChange = (type) => {
    setCursorType(type);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#000000',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* <CustomCursor position={cursorPosition} type={cursorType} /> */}
        <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
          <Navbar onCursorChange={handleCursorChange} />
          <HeroSection onCursorChange={handleCursorChange} />
           <MarqueeSection onCursorChange={handleCursorChange} />
          {/* <TechnologiesMarquee onCursorChange={handleCursorChange} /> */}
          <ServicesSection onCursorChange={handleCursorChange} />
          {/* <FrameworksMarquee onCursorChange={handleCursorChange} /> */}
          <InteractivePlayground onCursorChange={handleCursorChange} />
          <ProductsSection onCursorChange={handleCursorChange} />
          <ContactSection onCursorChange={handleCursorChange} />
          <Footer onCursorChange={handleCursorChange} />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App;