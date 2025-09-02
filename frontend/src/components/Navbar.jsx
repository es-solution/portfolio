// File: src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, themeMode, onCursorChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
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
        elevation={isScrolled ? 4 : 0}
        sx={{
          backgroundColor: isScrolled
            ? theme.palette.background.paper
            : 'transparent',
          transition: 'all 0.3s ease',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => onCursorChange('logo')}
              onMouseLeave={() => onCursorChange('default')}
            >
              <Box
                component="img"
                src="eslogo.jpg"
                alt="ES Solutions Logo"
                sx={{ height: 40, mr: 1 }}
              />
              <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    ml: 1
                  }}
                >
                  ES SOLUTIONS
                </Typography>
              </Link>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => onCursorChange('link')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    <Button
                      href={link.href}
                      sx={{
                        mx: 1,
                        color: theme.palette.text.primary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <IconButton
                    onClick={toggleTheme}
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </motion.div>
              </Box>
            )}

            {/* Mobile Navigation Button */}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <IconButton
                    onClick={toggleTheme}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </motion.div>
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
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
            backgroundColor: theme.palette.background.paper
          },
        }}
      >
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            ES SOLUTIONS
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.name} disablePadding>
                <ListItemButton
                  href={link.href}
                  onClick={handleDrawerToggle}
                  sx={{ textAlign: 'center' }}
                >
                  <ListItemText primary={link.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Toolbar offset for fixed position */}
      <Toolbar />
    </>
  );
};

export default Navbar;