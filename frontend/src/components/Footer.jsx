// File: src/components/Footer.jsx
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  IconButton, 
  Divider, 
  useTheme 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = ({ onCursorChange }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Footer links
  const footerLinks = {
    services: [
      { name: 'AI Agents', href: '#ai-agents' },
      { name: 'E-commerce Solutions', href: '#ecommerce' },
      { name: 'CRM & ERP Systems', href: '#crm-erp' },
      { name: 'Mobile Applications', href: '#mobile-apps' },
      { name: 'Cloud Solutions', href: '#cloud' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Documentation', href: '#docs' },
      { name: 'FAQs', href: '#faqs' },
      { name: 'Support', href: '#support' },
    ],
  };

  // Social media links
  const socialLinks = [
    // { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
    // { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <InstagramIcon />, href: 'https://www.instagram.com/es_tech_solutions', label: 'Instagram' },
    { icon: <GitHubIcon />, href: 'https://github.com/es-solution', label: 'GitHub' },
    { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/company/es-solutionss', label: 'LinkedIn' },
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(240, 249, 255, 0.8)' 
          : 'rgba(10, 25, 41, 0.8)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo and brief description */}
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
              }}
              onMouseEnter={() => onCursorChange('logo')}
              onMouseLeave={() => onCursorChange('default')}
            >
              <Box 
                component="img"
                src="eslogo.jpg" 
                alt="ES Solutions Logo"
                sx={{ height: 40, mr: 1 }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                ES SOLUTIONS
              </Typography>
            </Box>
            
            <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 3 }}>
              We don't just sell software, we build your software. Custom, powerful, and designed for your unique business challenges.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index}
                  color="primary"
                  aria-label={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Services links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              color="textPrimary" 
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.services.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  color="textSecondary"
                  underline="hover"
                  onMouseEnter={() => onCursorChange('link')}
                  onMouseLeave={() => onCursorChange('default')}
                  sx={{ 
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Company links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              color="textPrimary" 
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.company.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  color="textSecondary"
                  underline="hover"
                  onMouseEnter={() => onCursorChange('link')}
                  onMouseLeave={() => onCursorChange('default')}
                  sx={{ 
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Resources links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              color="textPrimary" 
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.resources.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  color="textSecondary"
                  underline="hover"
                  onMouseEnter={() => onCursorChange('link')}
                  onMouseLeave={() => onCursorChange('default')}
                  sx={{ 
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Contact info */}
          <Grid item xs={12} md={2}>
            <Typography 
              variant="subtitle1" 
              color="textPrimary" 
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {/* 123 Tech Park, Innovation Street
              <br /> */}
              Delhi India
            </Typography>
            <Typography variant="body2" color="textSecondary">
              contact.essolutions@gmail.com
              <br />
              +91 92113 12466
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="textSecondary">
            © {currentYear} ES Solutions. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              href="#privacy" 
              color="textSecondary" 
              underline="hover"
              variant="body2"
              onMouseEnter={() => onCursorChange('link')}
              onMouseLeave={() => onCursorChange('default')}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#terms" 
              color="textSecondary" 
              underline="hover"
              variant="body2"
              onMouseEnter={() => onCursorChange('link')}
              onMouseLeave={() => onCursorChange('default')}
            >
              Terms of Service
            </Link>
            <Link 
              href="#cookies" 
              color="textSecondary" 
              underline="hover"
              variant="body2"
              onMouseEnter={() => onCursorChange('link')}
              onMouseLeave={() => onCursorChange('default')}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;