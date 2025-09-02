import { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // <-- Add this

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const MarqueeSection = lazy(() => import('./components/Marquee'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractivePlayground = lazy(() => import('./components/InteractivePlayground'));
const PageLoader = lazy(() => import('./components/PageLoader'));
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase')); // <-- Add this
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage')); // <-- Add this
const VideoLink = lazy(() => import('./components/VideoLink')); // <-- Add this

function App() {
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');

  // Create theme based on mode
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#4299e1', // Blue from the logo
      },
      secondary: {
        main: '#1a365d', // Navy from the logo background
      },
      background: {
        default: themeMode === 'light' ? '#ffffff' : '#121212',
        paper: themeMode === 'light' ? '#f7fafc' : '#1e1e1e',
      },
      text: {
        primary: themeMode === 'light' ? '#1a202c' : '#f7fafc',
        secondary: themeMode === 'light' ? '#4a5568' : '#a0aec0',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.75rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '2.25rem',
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

  // Toggle theme mode
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

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
      {/* <CustomCursor position={cursorPosition} type={cursorType} /> */}
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
        <Router>
          <Navbar toggleTheme={toggleTheme} themeMode={themeMode} onCursorChange={handleCursorChange} />
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection themeMode={themeMode} onCursorChange={handleCursorChange} />
                  <MarqueeSection onCursorChange={handleCursorChange} />
                  <ServicesSection onCursorChange={handleCursorChange} />
                  <InteractivePlayground onCursorChange={handleCursorChange} />
                  {/* Show limited projects on homepage */}
                  <ProjectsShowcase
                    themeMode={themeMode}
                    onCursorChange={handleCursorChange}
                    limit={3}
                    showHeader={true}
                  />
                  {/* Standalone video component example */}
                  {/* <VideoLink
                    videoUrl="https://youtube.com/watch?v=..."
                    title="Project Demo"
                    variant="button"
                    themeMode={themeMode}
                  /> */}
                  <ContactSection onCursorChange={handleCursorChange} />
                  <Footer onCursorChange={handleCursorChange} />
                </>
              }
            />
            {/* Products page - show all projects */}
            <Route
              path="/products"
              element={
                <>
                  <ProjectsShowcase
                    themeMode={themeMode}
                    onCursorChange={handleCursorChange}
                  />
                  <Footer onCursorChange={handleCursorChange} />
                </>
              }
            />
            {/* Product detail page */}
            <Route
              path="/products/:productname"
              element={
                <>
                  <ProductDetailPage themeMode={themeMode} />
                  <Footer onCursorChange={handleCursorChange} />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <ContactSection themeMode={themeMode} />
                  <Footer onCursorChange={handleCursorChange} />
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <ServicesSection themeMode={themeMode} />
                  <Footer onCursorChange={handleCursorChange} />
                </>
              }
            />
            
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;