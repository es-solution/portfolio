import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    useTheme,
    alpha,
} from '@mui/material';
import {
    PlayArrow as PlayIcon,
    Launch as LaunchIcon,
    CheckCircle as CheckIcon,
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    Schedule as ScheduleIcon,
    ArrowBack as ArrowBackIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotNTAProject = ({ themeMode, onCursorChange }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample images for carousel
    const projectImages = [
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => prev === 0 ? projectImages.length - 1 : prev - 1);
    };

    const ImageCarousel = ({ images, height = 400 }) => (
        <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height={height}
                    image={images[currentImageIndex]}
                    alt="CompeteHub screenshot"
                    sx={{ objectFit: 'cover' }}
                />
            </Card>

            {images.length > 1 && (
                <>
                    <IconButton
                        onClick={prevImage}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            '&:hover': { bgcolor: theme.palette.background.paper },
                        }}
                        onMouseEnter={() => onCursorChange?.('button')}
                        onMouseLeave={() => onCursorChange?.('default')}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                        onClick={nextImage}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            '&:hover': { bgcolor: theme.palette.background.paper },
                        }}
                        onMouseEnter={() => onCursorChange?.('button')}
                        onMouseLeave={() => onCursorChange?.('default')}
                    >
                        <NavigateNextIcon />
                    </IconButton>

                    {/* Dots indicator */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        {images.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: currentImageIndex === index
                                        ? theme.palette.primary.main
                                        : alpha(theme.palette.common.white, 0.5),
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );

    return (
        <Box
            sx={{
                pt: 10,
                pb: 8,
                background: themeMode === 'dark'
                    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="lg">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/showcase')}
                        sx={{ mb: 4, borderRadius: 3 }}
                        onMouseEnter={() => onCursorChange?.('button')}
                        onMouseLeave={() => onCursorChange?.('default')}
                    >
                        Back to Showcase
                    </Button>
                </motion.div>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="EdTech • Live"
                            color="primary"
                            sx={{ mb: 3, fontSize: '1rem', py: 2.5, px: 3 }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                background: themeMode === 'dark'
                                    ? 'linear-gradient(45deg, #ffffff 30%, #a0a0a0 90%)'
                                    : 'linear-gradient(45deg, #1a202c 30%, #4a5568 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            CompeteHub (NotNTA)
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ maxWidth: 800, mx: 'auto', fontWeight: 300, lineHeight: 1.6, mb: 4 }}
                        >
                            What if studying felt like gaming? Exam prep meets competitive gaming.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            href="https://panel.mait.ac.in:3001"
                            target="_blank"
                            startIcon={<PlayIcon />}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontSize: '1.2rem',
                                mr: 2
                            }}
                            onMouseEnter={() => onCursorChange?.('button')}
                            onMouseLeave={() => onCursorChange?.('default')}
                        >
                            🚀 Try CompeteHub Now
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<LaunchIcon />}
                            sx={{ borderRadius: 3, px: 4, py: 1.5, fontSize: '1.1rem' }}
                            onMouseEnter={() => onCursorChange?.('button')}
                            onMouseLeave={() => onCursorChange?.('default')}
                        >
                            View Demo
                        </Button>
                    </Box>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
                        <Grid item xs={12} md={6}>
                            <ImageCarousel images={projectImages} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 700, mb: 3 }}
                            >
                                Revolutionary Learning Experience
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}
                            >
                                CompeteHub transforms traditional exam preparation into an engaging, 
                                competitive gaming experience. Our revolutionary 5v5 real-time multiplayer 
                                gamemode makes studying addictive and effective.
                            </Typography>

                            {/* Key Stats */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                            2.5K+
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Active Students
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                            50K+
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Questions Solved
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                            85%
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Success Rate
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </motion.div>

                {/* Problem Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                            The Problem We're Solving
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Card
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        background: alpha(theme.palette.error.main, 0.1),
                                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                        borderRadius: 3,
                                    }}
                                >
                                    <Typography variant="h5" color="error.main" sx={{ mb: 2, fontWeight: 600 }}>
                                        23 hours/week
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Students waste procrastinating & gaming instead of studying
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        background: alpha(theme.palette.error.main, 0.1),
                                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                        borderRadius: 3,
                                    }}
                                >
                                    <Typography variant="h5" color="error.main" sx={{ mb: 2, fontWeight: 600 }}>
                                        30+ hours
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        General studies waste – more than a part-time job
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Issues List */}
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                                Why Traditional Exam Prep Fails:
                            </Typography>
                            <Grid container spacing={3}>
                                {[
                                    { issue: 'Boring', detail: 'Classic excuse for avoiding studies' },
                                    { issue: 'Hard to stay motivated', detail: 'Discipline & obsession are the only answer' },
                                    { issue: 'Isolating experience', detail: 'Everyone needs a friendly peer' },
                                    { issue: 'Competing with dopamine', detail: 'Games & web series > studying' },
                                ].map((item, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index}>
                                        <Card
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                                                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                {item.issue}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.detail}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </motion.div>

                {/* Solution */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Card
                            sx={{
                                p: 6,
                                background: alpha(theme.palette.success.main, 0.1),
                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                borderRadius: 4,
                                textAlign: 'center'
                            }}
                        >
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'success.main' }}>
                                Our Solution
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
                                CompeteHub makes studying competitive & fun with our revolutionary{' '}
                                <strong>5v5 real-time multiplayer gamemode</strong>.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                                Transform boring study sessions into exciting competitive matches. 
                                Challenge friends, climb leaderboards, and master exam topics through gameplay.
                            </Typography>
                        </Card>
                    </Box>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            Key Features
                        </Typography>
                        <Grid container spacing={4}>
                            {[
                                {
                                    icon: <PeopleIcon color="primary" sx={{ fontSize: 40 }} />,
                                    title: '5v5 Multiplayer Battles',
                                    description: 'Real-time competitive matches with friends and peers'
                                },
                                {
                                    icon: <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />,
                                    title: 'Progress Tracking',
                                    description: 'Detailed analytics and performance insights'
                                },
                                {
                                    icon: <ScheduleIcon color="primary" sx={{ fontSize: 40 }} />,
                                    title: 'Adaptive Learning',
                                    description: 'AI-powered question selection based on your weak areas'
                                },
                                {
                                    icon: <CheckIcon color="primary" sx={{ fontSize: 40 }} />,
                                    title: 'Gamified Rewards',
                                    description: 'Achievements, badges, and leaderboard rankings'
                                }
                            ].map((feature, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                            Ready to Transform Your Study Experience?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                            Join thousands of students who have already revolutionized their exam preparation with CompeteHub.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            href="https://panel.mait.ac.in:3001"
                            target="_blank"
                            startIcon={<PlayIcon />}
                            sx={{
                                borderRadius: 3,
                                px: 6,
                                py: 2,
                                fontSize: '1.2rem',
                            }}
                            onMouseEnter={() => onCursorChange?.('button')}
                            onMouseLeave={() => onCursorChange?.('default')}
                        >
                            Start Playing Now
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default NotNTAProject;
