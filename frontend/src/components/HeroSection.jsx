import { useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LightRays from './LightRays';
import SplitText from './SplitText';
import ShinyText from './ShinyText';

const HeroSection = ({ onCursorChange }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const handleAnimationComplete = () => {
        console.log('Text animation completed!');
    };



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
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#cccccc',
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

                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        color: '#cccccc',
                                        fontFamily: 'League Spartan, sans-serif',
                                        fontWeight: 800,
                                        fontSize: { xs: '3.5rem', md: '5rem', lg: '6rem' },
                                        lineHeight: 1.1,
                                        display: 'block'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                                        <Box sx={{ display: 'inline' }}>
                                            <SplitText
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

                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#b5b5b5',
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


                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;