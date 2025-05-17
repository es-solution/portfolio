import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = ({ onCursorChange }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Parallax effect references
    const parallaxRef1 = useRef(null);
    const parallaxRef2 = useRef(null);
    const parallaxRef3 = useRef(null);

    // Start animations when component comes into view
    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    // Handle parallax effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (parallaxRef1.current) {
                parallaxRef1.current.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
            if (parallaxRef2.current) {
                parallaxRef2.current.style.transform = `translateY(${scrollY * -0.05}px)`;
            }
            if (parallaxRef3.current) {
                parallaxRef3.current.style.transform = `translateY(${scrollY * 0.07}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const shapeVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 0.8,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    };

    return (
        <Box
            id="home"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                pt: { xs: 8, md: 0 },
            }}
        >
            {/* Background Elements - Parallax Effect */}
            <Box
                ref={parallaxRef1}
                sx={{
                    position: 'absolute',
                    right: '10%',
                    top: '15%',
                    zIndex: -1,
                }}
            >
                <motion.div
                    variants={shapeVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <Box
                        sx={{
                            width: 180,
                            height: 180,
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            background: 'linear-gradient(45deg, rgba(66, 153, 225, 0.4) 0%, rgba(26, 54, 93, 0.2) 100%)',
                        }}
                    />
                </motion.div>
            </Box>

            <Box
                ref={parallaxRef2}
                sx={{
                    position: 'absolute',
                    left: '5%',
                    bottom: '20%',
                    zIndex: -1,
                }}
            >
                <motion.div
                    variants={shapeVariants}
                    initial="hidden"
                    animate={controls}
                    transition={{ delay: 0.3 }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
                            background: 'linear-gradient(45deg, rgba(26, 54, 93, 0.3) 0%, rgba(66, 153, 225, 0.1) 100%)',
                        }}
                    />
                </motion.div>
            </Box>

            <Box
                ref={parallaxRef3}
                sx={{
                    position: 'absolute',
                    left: '30%',
                    top: '10%',
                    zIndex: -1,
                }}
            >
                <motion.div
                    variants={shapeVariants}
                    initial="hidden"
                    animate={controls}
                    transition={{ delay: 0.6 }}
                >
                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: '40% 60% 60% 40% / 40% 50% 50% 60%',
                            background: 'linear-gradient(45deg, rgba(66, 153, 225, 0.2) 0%, rgba(26, 54, 93, 0.1) 100%)',
                        }}
                    />
                </motion.div>
            </Box>

            {/* Main Content */}
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={6}
                    alignItems="center"
                    ref={ref}
                >
                    <Grid item xs={12} md={6}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={controls}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    sx={{ fontWeight: 600, letterSpacing: 2 }}
                                >
                                    CUSTOM SOFTWARE DEVELOPMENT
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 3,
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        background: 'linear-gradient(45deg, #4299e1 0%, #1a365d 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    We Build Your Software
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h5"
                                    color="textSecondary"
                                    sx={{ mb: 4, fontWeight: 400 }}
                                >
                                    Custom, powerful, and designed for your unique business challenges
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href="#services"
                                        onMouseEnter={() => onCursorChange('button')}
                                        onMouseLeave={() => onCursorChange('default')}
                                        sx={{
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                            boxShadow: 4,
                                        }}
                                    >
                                        Our Services
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        href="#contact"
                                        onMouseEnter={() => onCursorChange('button')}
                                        onMouseLeave={() => onCursorChange('default')}
                                        sx={{
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                </Box>
                            </motion.div>
                        </motion.div>
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={controls}
                            variants={{
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                onMouseEnter={() => onCursorChange('interactive')}
                                onMouseLeave={() => onCursorChange('default')}
                            >
                                // Placeholder for hero image 
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 400,
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, #4299e1 0%, #1a365d 100%)',
                                        boxShadow: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img src="" alt="" />
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid> */}
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;