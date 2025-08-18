// File: src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import GooeyNav from './GooeyNav';

const Navbar = ({ onCursorChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation links
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          transition: 'all 0.3s ease',
          top: '20px', // Move navbar down from the very top
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{
            padding: '12px 20px',
            minHeight: '70px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Custom Navbar Background with Glassy Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isScrolled
                  ? 'rgba(0, 0, 0, 0.25)'
                  : 'rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)', // For Safari support
                borderRadius: '50px 50px 50px 50px', // Fully rounded on both sides
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Reduced shadow for subtlety
                zIndex: 0,
              }}
            />

            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                height: '100%',
              }}
              onMouseEnter={() => onCursorChange('logo')}
              onMouseLeave={() => onCursorChange('default')}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: 'League Spartan, sans-serif',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                ES SOLUTIONS
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation - GooeyNav */}
            {!isMobile && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                mr: 3, // Add more margin to fit within the rounded corner
              }}>
                <GooeyNav
                  items={navLinks}
                  particleCount={5}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={1300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </Box>
            )}

            {/* Mobile Navigation Button */}
            {isMobile && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
              }}>
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                  sx={{ color: '#ffffff' }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            color: '#ffffff',
          },
        }}
      >
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ffffff' }}>
            ES SOLUTIONS
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  href={link.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    textAlign: 'center',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Toolbar offset for fixed position - adjusted for the new top position */}
      <Toolbar sx={{ minHeight: '90px' }} />
    </>
  );
};

export default Navbar;