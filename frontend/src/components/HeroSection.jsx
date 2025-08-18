import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LightRays from './LightRays';
import SplitText from './SplitText';
import ShinyText from './ShinyText';

const HeroSection = ({ themeMode, onCursorChange }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Parallax effect references
    const parallaxRef1 = useRef(null);
    const parallaxRef2 = useRef(null);
    const parallaxRef3 = useRef(null);

    const handleAnimationComplete = () => {
        console.log('Text animation completed!');
    };

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
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                pt: { xs: 8, md: 0 },
            }}
        >
            {/* LightRays Background Effect - Only in dark mode */}
            {themeMode === 'dark' && (
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
                        pulsating={true}
                        fadeDistance={1}
                        saturation={1}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0}
                        distortion={0}
                        className="custom-rays"
                    />
                </Box>
            )}
            {/* Background Elements - Parallax Effect (for light mode or additional effects) */}
            {themeMode === 'light' && (
                <Box
                    ref={parallaxRef1}
                    sx={{
                        position: 'absolute',
                        right: '10%',
                        top: '15%',
                        zIndex: 0,
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
                                background: themeMode === 'dark'
                                    ? 'linear-gradient(45deg, rgba(66, 153, 225, 0.2) 0%, rgba(26, 54, 93, 0.1) 100%)'
                                    : 'linear-gradient(45deg, rgba(66, 153, 225, 0.4) 0%, rgba(26, 54, 93, 0.2) 100%)',
                            }}
                        />
                    </motion.div>
                </Box>
            )
            }
            {themeMode === 'light' && (

                <Box
                    ref={parallaxRef2}
                    sx={{
                        position: 'absolute',
                        left: '5%',
                        bottom: '20%',
                        zIndex: 0,
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
                                background: themeMode === 'dark'
                                    ? 'linear-gradient(45deg, rgba(26, 54, 93, 0.2) 0%, rgba(66, 153, 225, 0.05) 100%)'
                                    : 'linear-gradient(45deg, rgba(26, 54, 93, 0.3) 0%, rgba(66, 153, 225, 0.1) 100%)',
                            }}
                        />
                    </motion.div>
                </Box>
            )
            }
            {themeMode === 'light' && (

                <Box
                    ref={parallaxRef3}
                    sx={{
                        position: 'absolute',
                        left: '30%',
                        top: '10%',
                        zIndex: 0,
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
                                background: themeMode === 'dark'
                                    ? 'linear-gradient(45deg, rgba(66, 153, 225, 0.1) 0%, rgba(26, 54, 93, 0.05) 100%)'
                                    : 'linear-gradient(45deg, rgba(66, 153, 225, 0.2) 0%, rgba(26, 54, 93, 0.1) 100%)',
                            }}
                        />
                    </motion.div>
                </Box>
            )
            }
            {/* Main Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
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
                            {/* Overline Text with SplitText */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: themeMode === 'dark' ? '#cccccc' : 'primary.main',
                                        fontFamily: 'League Spartan, sans-serif',
                                        fontWeight: 600,
                                        letterSpacing: '0.15em',
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        display: 'block',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    <SplitText
                                        text="CUSTOM SOFTWARE DEVELOPMENT"
                                        delay={50}
                                        duration={0.8}
                                        ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 30 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.8}
                                        rootMargin="0px"
                                        textAlign="left"
                                        onLetterAnimationComplete={handleAnimationComplete}
                                    />
                                </Typography>
                            </Box>

                            {/* Main Headline with SplitText and ShinyText */}
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        color: themeMode === 'dark' ? '#cccccc' : 'text.primary',
                                        fontFamily: 'League Spartan, sans-serif',
                                        fontWeight: 800,
                                        fontSize: { xs: '3.5rem', md: '5rem', lg: '6rem' },
                                        lineHeight: 1.1,
                                        display: 'block',
                                        background: themeMode === 'light' ? 'linear-gradient(45deg, #4299e1 0%, #1a365d 100%)' : 'inherit',
                                        WebkitBackgroundClip: themeMode === 'light' ? 'text' : 'unset',
                                        WebkitTextFillColor: themeMode === 'light' ? 'transparent' : 'inherit',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                                        <Box sx={{ display: 'inline' }}>
                                            <ShinyText
                                                text="We Build Your  "
                                                delay={80}
                                                duration={1}
                                                ease="power3.out"
                                                splitType="words"
                                                from={{ opacity: 0, y: 50 }}
                                                to={{ opacity: 1, y: 0 }}
                                                threshold={0.8}
                                                rootMargin="0px"
                                                textAlign="left"
                                                onLetterAnimationComplete={handleAnimationComplete}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'inline', marginLeft: '0.25em' }}>
                                            <ShinyText
                                                text="Software"
                                                disabled={false}
                                                speed={3}
                                                style={{
                                                    fontFamily: 'League Spartan, sans-serif',
                                                    fontWeight: 800,
                                                    fontSize: 'inherit',
                                                    display: 'inline'
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Typography>
                            </Box>

                            {/* Subtitle with ShinyText */}
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: themeMode === 'dark' ? '#b5b5b5' : 'text.secondary',
                                        fontFamily: 'League Spartan, sans-serif',
                                        fontWeight: 400,
                                        fontSize: { xs: '1.5rem', md: '2rem', lg: '2.25rem' },
                                        lineHeight: 1.4,
                                        display: 'block',
                                        opacity: 0.9
                                    }}
                                >
                                    <ShinyText
                                        text="Custom, Powerful Designs for your unique Business challenges"
                                        disabled={false}
                                        speed={4}
                                        style={{
                                            fontFamily: 'League Spartan, sans-serif',
                                            fontWeight: 400,
                                            fontSize: 'inherit',
                                            lineHeight: 1.4,
                                            opacity: 0.9
                                        }}
                                    />
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <motion.div variants={itemVariants}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href="#services"
                                        onMouseEnter={() => onCursorChange && onCursorChange('button')}
                                        onMouseLeave={() => onCursorChange && onCursorChange('default')}
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
                                        onMouseEnter={() => onCursorChange && onCursorChange('button')}
                                        onMouseLeave={() => onCursorChange && onCursorChange('default')}
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
                </Grid>
            </Container>
        </Box >
    );
};

export default HeroSection;