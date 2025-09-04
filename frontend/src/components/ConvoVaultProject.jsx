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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Download as DownloadIcon,
    Launch as LaunchIcon,
    CheckCircle as CheckIcon,
    Psychology as PsychologyIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    ArrowBack as ArrowBackIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
    Storage as StorageIcon,
    Sync as SyncIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ConvoVaultProject = ({ themeMode, onCursorChange }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample images for carousel
    const projectImages = [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
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
                    alt="ConvoVault screenshot"
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
                                        ? theme.palette.secondary.main
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
                            label="AI Tools • Beta"
                            color="secondary"
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
                            ConvoVault
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ maxWidth: 800, mx: 'auto', fontWeight: 300, lineHeight: 1.6, mb: 4 }}
                        >
                            The ultimate AI chat organizer. Sync and manage all your ChatGPT, Claude, and Perplexity conversations in one place.
                        </Typography>
                        <a href='/cvt/extension.zip'>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<DownloadIcon />}
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
                                Download ConvoVault
                            </Button>
                        </a>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<LaunchIcon />}
                            sx={{ borderRadius: 3, px: 4, py: 1.5, fontSize: '1.1rem' }}
                            onMouseEnter={() => onCursorChange?.('button')}
                            onMouseLeave={() => onCursorChange?.('default')}
                        >
                            View Documentation
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
                        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 700, mb: 3 }}
                            >
                                AI Chat Management Made Simple
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}
                            >
                                ConvoVault is a powerful Chrome extension and desktop application that
                                organizes all your AI chatbot conversations. Never lose track of important
                                conversations across different AI platforms again.
                            </Typography>

                            {/* Key Stats */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                                            10K+
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Chats Synced
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                                            3
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Platforms
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                                            500+
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Users
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                            <ImageCarousel images={projectImages} />
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
                        <Card
                            sx={{
                                p: 6,
                                background: alpha(theme.palette.warning.main, 0.1),
                                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                                borderRadius: 4,
                            }}
                        >
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                The Problem
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', fontWeight: 400 }}>
                                AI users have scattered conversations across multiple platforms
                            </Typography>
                            <Grid container spacing={4}>
                                {[
                                    'Conversations lost across ChatGPT, Claude, Perplexity',
                                    'No universal way to sync or manage chats',
                                    'Offline browsing capabilities missing',
                                    'Difficulty finding specific conversations',
                                    'No centralized chat analytics or insights'
                                ].map((problem, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <Box
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    bgcolor: 'warning.main',
                                                    mr: 2,
                                                    mt: 1,
                                                }}
                                            />
                                            <Typography variant="body1" color="text.secondary">
                                                {problem}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
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
                                'Cross-platform chat scraping',
                                'Offline-first storage',
                                'Manual + auto sync',
                                'Email/password authentication',
                                'Chat addition + categorization',
                                'Search and filtering',
                            ].map((feature, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {feature}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* Extension Capabilities */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            Extension Capabilities
                        </Typography>
                        <Grid container spacing={4}>
                            {[
                                {
                                    icon: <PsychologyIcon color="secondary" sx={{ fontSize: 40 }} />,
                                    title: 'Smart Detection',
                                    description: 'Content scripts detect new chats automatically'
                                },
                                {
                                    icon: <ScheduleIcon color="secondary" sx={{ fontSize: 40 }} />,
                                    title: 'Auto Sync',
                                    description: 'Background sync every 5 minutes'
                                },
                                {
                                    icon: <LaunchIcon color="secondary" sx={{ fontSize: 40 }} />,
                                    title: 'Clean UI',
                                    description: 'Popup UI with organized tabs'
                                },
                                {
                                    icon: <TrendingUpIcon color="secondary" sx={{ fontSize: 40 }} />,
                                    title: 'Real-time Stats',
                                    description: 'Live analytics and insights'
                                }
                            ].map((capability, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Box sx={{ mb: 2 }}>{capability.icon}</Box>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            {capability.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {capability.description}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* Supported Platforms */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            Supported Platforms
                        </Typography>
                        <TableContainer
                            component={Paper}
                            sx={{
                                borderRadius: 3,
                                background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Platform</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Extraction Method</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { platform: 'ChatGPT', method: 'Extract sidebar links', status: 'Active' },
                                        { platform: 'Claude', method: 'Extract sidebar + recents', status: 'Active' },
                                        { platform: 'Perplexity', method: 'Extract sidebar + library', status: 'Active' },
                                    ].map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>{row.platform}</TableCell>
                                            <TableCell color="text.secondary" sx={{ fontSize: '1rem' }}>{row.method}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    color="success"
                                                    size="small"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </motion.div>

                {/* Future Enhancements */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
                            Future Enhancements
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                'Tagging system',
                                'Export/import',
                                'Multi-device sync',
                                'Advanced search',
                                'Chat analytics',
                                'More providers',
                            ].map((enhancement, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            background: alpha(theme.palette.info.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Typography variant="h6" color="info.main" sx={{ fontWeight: 600 }}>
                                            {enhancement}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>

                {/* Download Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Card
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            background: alpha(theme.palette.secondary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                            borderRadius: 4,
                        }}
                    >
                        <StorageIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 3 }} />
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                            Ready to Organize Your AI Chats?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                            Download ConvoVault now and start managing all your AI conversations in one centralized location.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href='/cvt/extension.zip'
                            >

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<DownloadIcon />}
                                    sx={{
                                        borderRadius: 3,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                >
                                    Download Extension
                                </Button>
                            </a>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<LaunchIcon />}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                }}
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                            >
                                View Source Code
                            </Button>
                        </Box>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ConvoVaultProject;
