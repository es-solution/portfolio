// File: src/components/ProductsSection.jsx
import { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  Button
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const products = [
  {
    name: 'notNTA',
    description: 'Coming soon...',
    bgColor: 'linear-gradient(135deg, #4299e1 0%, #1a365d 100%)',
  },
  {
    name: 'bylexa',
    description: 'Coming soon...',
    bgColor: 'linear-gradient(135deg, #1a365d 0%, #4299e1 100%)',
  },
];

const ProductsSection = ({ onCursorChange }) => {
  const theme = useTheme();
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

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
      id="products"
      sx={{ 
        py: 10,
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? 'rgba(240, 249, 255, 0.6)' 
            : 'rgba(10, 25, 41, 0.6)',
      }}
      ref={ref}
    >
      <Container maxWidth="lg">
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
            Upcoming Products
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="textSecondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              mb: 8,
            }}
          >
            Stay tuned for our exciting new product launches
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Grid container spacing={6} justifyContent="center">
            {products.map((product, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      minHeight: 280,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: product.bgColor,
                      color: 'white',
                      position: 'relative',
                    }}
                    onMouseEnter={() => onCursorChange('interactive')}
                    onMouseLeave={() => onCursorChange('default')}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography 
                        gutterBottom 
                        variant="h3" 
                        component="h2" 
                        sx={{ 
                          fontWeight: 800,
                          mb: 2,
                          textAlign: 'center',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          opacity: 0.9,
                          textAlign: 'center',
                          mb: 3,
                        }}
                      >
                        {product.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                          variant="outlined" 
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                              borderColor: 'white',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardContent>
                    
                    {/* Abstract background element */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 150,
                        height: 150,
                        borderRadius: '0 0 0 100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        zIndex: 0,
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 100,
                        height: 100,
                        borderRadius: '0 100% 0 0',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        zIndex: 0,
                      }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProductsSection;