import { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box, Modal, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load components for performance
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
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const VideoLink = lazy(() => import('./components/VideoLink'));
const ShowcaseCards = lazy(() => import('./components/ShowcaseCards'));
const NotNTAProject = lazy(() => import('./components/NotNTAProject'));
const ConvoVaultProject = lazy(() => import('./components/ConvoVaultProject'));
const Blog = lazy(() => import('./pages/Blog'));


function App() {
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [modalOpen, setModalOpen] = useState(true);

  // Create theme
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: '#4299e1' },
      secondary: { main: '#1a365d' },
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
      h1: { fontWeight: 700, fontSize: '3.5rem' },
      h2: { fontWeight: 600, fontSize: '2.75rem' },
      h3: { fontWeight: 600, fontSize: '2.25rem' },
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

  // Cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => setCursorPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  const handleCursorChange = (type) => setCursorType(type);

  // Top Modal (CompeteHub + ConvoVault promo) - Simple implementation to prevent flickering
  const TopModal = () => {
    if (!modalOpen) return null;
    
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
        onClick={() => setModalOpen(false)}
      >
        <Box
          sx={{
            backgroundColor: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            maxWidth: 400,
            border: `1px solid ${themeMode === 'dark' ? '#4299e1' : '#e2e8f0'}`,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8, 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              textAlign: 'center',
              color: 'text.primary'
            }}
          >
            Try ConvoVault & CompeteHub Now!
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="https://competehub.essolutions.dev"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderRadius: 2, 
                py: 1.2,
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  transition: 'transform 0.2s ease'
                }
              }}
            >
              Try CompeteHub
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              component="a"
              href="/cvt/extension.zip"
              download="convovault-extension.zip"
              sx={{ 
                borderRadius: 2, 
                py: 1.2,
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  transition: 'transform 0.2s ease'
                }
              }}
            >
              Download ConvoVault Extension
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  if (loading) return <PageLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <CustomCursor position={cursorPosition} type={cursorType} /> */}
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }>
        <Router>
          <Navbar toggleTheme={toggleTheme} themeMode={themeMode} onCursorChange={handleCursorChange} />
          <TopModal />
          <Routes>
            {/* Home */}
            <Route path="/" element={
              <>
                <HeroSection themeMode={themeMode} onCursorChange={handleCursorChange} />
                <MarqueeSection onCursorChange={handleCursorChange} />
                <ServicesSection onCursorChange={handleCursorChange} />
                <InteractivePlayground onCursorChange={handleCursorChange} />
                <ProjectsShowcase themeMode={themeMode} onCursorChange={handleCursorChange} limit={3} showHeader />
                <ContactSection onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Products */}
            <Route path="/products" element={
              <>
                <ProjectsShowcase themeMode={themeMode} onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Product Detail */}
            <Route path="/products/:productname" element={
              <>
                <ProductDetailPage themeMode={themeMode} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Contact */}
            <Route path="/contact" element={
              <>
                <ContactSection themeMode={themeMode} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Services */}
            <Route path="/services" element={
              <>
                <ServicesSection themeMode={themeMode} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Showcase */}
            <Route path="/showcase" element={
              <>
                <ShowcaseCards themeMode={themeMode} onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Showcase: NotNTA */}
            <Route path="/showcase/notnta" element={
              <>
                <NotNTAProject themeMode={themeMode} onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* Showcase: ConvoVault */}
            <Route path="/showcase/convovault" element={
              <>
                <ConvoVaultProject themeMode={themeMode} onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />

            {/* ✅ Blog Page */}
            <Route path="/blog" element={
              <>
                <Blog themeMode={themeMode} onCursorChange={handleCursorChange} />
                <Footer onCursorChange={handleCursorChange} />
              </>
            } />
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
