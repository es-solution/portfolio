import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Modal,
    IconButton,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    alpha,
    Fade,
    Backdrop,
} from '@mui/material';
import {
    Close as CloseIcon,
    PlayArrow as PlayIcon,
    Launch as LaunchIcon,
    Download as DownloadIcon,
    CheckCircle as CheckIcon,
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    Schedule as ScheduleIcon,
    Psychology as PsychologyIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ShowcaseLanding = ({ themeMode, onCursorChange }) => {
    const theme = useTheme();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({
        competehub: 0,
        convovault: 0,
    });

    // Show modal on page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setModalOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Sample images for carousel
    const projectImages = {
        competehub: [
            'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
        ],
        convovault: [
            'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        ],
    };

    const nextImage = (project) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [project]: (prev[project] + 1) % projectImages[project].length
        }));
    };

    const prevImage = (project) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [project]: prev[project] === 0 ? projectImages[project].length - 1 : prev[project] - 1
        }));
    };

    const IntroModal = () => (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div in={modalOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 },
                        bgcolor: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        borderRadius: 4,
                        boxShadow: 24,
                        p: 4,
                        outline: 'none',
                    }}
                >
                    <IconButton
                        onClick={() => setModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'text.secondary',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                textAlign: 'center',
                                background: themeMode === 'dark'
                                    ? 'linear-gradient(45deg, #ffffff 30%, #a0a0a0 90%)'
                                    : 'linear-gradient(45deg, #1a202c 30%, #4a5568 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            ✨ Try our latest projects!
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, textAlign: 'center', lineHeight: 1.6 }}
                        >
                            Explore innovative solutions that are reshaping how we learn, work, and organize digital content.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={() => {
                                    setModalOpen(false);
                                    document.getElementById('competehub').scrollIntoView({ behavior: 'smooth' });
                                }}
                                sx={{ borderRadius: 3, py: 1.5 }}
                                // onMouseEnter={() => onCursorChange?.('button')}
                                // onMouseLeave={() => onCursorChange?.('default')}
                            >
                                Explore CompeteHub
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                onClick={() => {
                                    setModalOpen(false);
                                    document.getElementById('convovault').scrollIntoView({ behavior: 'smooth' });
                                }}
                                sx={{ borderRadius: 3, py: 1.5 }}
                                // onMouseEnter={() => onCursorChange?.('button')}
                                // onMouseLeave={() => onCursorChange?.('default')}
                            >
                                Discover ConvoVault
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </div>
        </Modal>
    );

    const ImageCarousel = ({ project, images, height = 400 }) => (
        <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height={height}
                    image={images[currentImageIndex[project]]}
                    alt={`${project} screenshot`}
                    sx={{ objectFit: 'cover' }}
                />
            </Card>

            {images.length > 1 && (
                <>
                    <IconButton
                        onClick={() => prevImage(project)}
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
                        onClick={() => nextImage(project)}
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
                                onClick={() => setCurrentImageIndex(prev => ({ ...prev, [project]: index }))}
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: currentImageIndex[project] === index
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
                pt: 8,
                background: themeMode === 'dark'
                    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh',
            }}
        >
            <IntroModal />

            {/* Hero Section */}
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', py: 8 }}>
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
                            Showcase
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ maxWidth: 800, mx: 'auto', fontWeight: 300, lineHeight: 1.6 }}
                        >
                            Discover our latest innovations that are transforming digital experiences
                        </Typography>
                    </Box>
                </motion.div>

                {/* CompeteHub Section */}
                <motion.div
                    id="competehub"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 12 }}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <ImageCarousel
                                    project="competehub"
                                    images={projectImages.competehub}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Chip
                                    label="Latest Project"
                                    color="primary"
                                    sx={{ mb: 3, fontSize: '0.9rem', py: 2 }}
                                />
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                    }}
                                >
                                    What if studying felt like gaming?
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ mb: 4, fontWeight: 300 }}
                                >
                                    Introducing CompeteHub – Exam prep meets gaming.
                                </Typography>

                                {/* Problem Background */}
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Card
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                background: alpha(theme.palette.error.main, 0.1),
                                                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="h6" color="error.main" sx={{ mb: 1 }}>
                                                23 hours/week
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Students waste procrastinating & gaming
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Card
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                background: alpha(theme.palette.error.main, 0.1),
                                                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="h6" color="error.main" sx={{ mb: 1 }}>
                                                30+ hours
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                General studies waste – more than a part-time job
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>

                                {/* Issues List */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Exam prep today is broken:
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { issue: 'Boring', detail: 'Classic excuse' },
                                            { issue: 'Hard to stay motivated', detail: 'Discipline & obsession are the only answer' },
                                            { issue: 'Isolating', detail: 'Everyone needs a friendly peer' },
                                            { issue: 'Competing with dopamine', detail: 'Games & web series > studying' },
                                        ].map((item, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 6,
                                                            height: 6,
                                                            borderRadius: '50%',
                                                            bgcolor: 'error.main',
                                                            mr: 2,
                                                            mt: 1,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                            {item.issue}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.detail}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>

                                {/* Solution Pitch */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                                        The Solution:
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        CompeteHub makes studying competitive & fun with our revolutionary{' '}
                                        <strong>5v5 real-time multiplayer gamemode</strong>.
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    href="https://competehub.essolutions.dev"
                                    target="_blank"
                                    startIcon={<PlayIcon />}
                                    sx={{
                                        borderRadius: 3,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                >
                                    🚀 Try CompeteHub Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </motion.div>

                {/* ConvoVault Section */}
                <motion.div
                    id="convovault"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ mb: 8 }}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                                <Chip
                                    label="AI Tool"
                                    color="secondary"
                                    sx={{ mb: 3, fontSize: '0.9rem', py: 2 }}
                                />
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                    }}
                                >
                                    ChatSync – AI Chat Organizer
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ mb: 4, fontWeight: 300 }}
                                >
                                    Organize and sync all your AI chatbot histories in one place.
                                </Typography>

                                {/* Problem Statement */}
                                <Card
                                    sx={{
                                        p: 3,
                                        mb: 4,
                                        background: alpha(theme.palette.warning.main, 0.1),
                                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        The Problem:
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Users have scattered conversations across ChatGPT, Claude, Perplexity, etc. 
                                        No universal way to sync/manage. Offline browsing is missing.
                                    </Typography>
                                </Card>

                                {/* Features */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Key Features:
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {[
                                            'Cross-platform chat scraping',
                                            'Offline-first storage',
                                            'Manual + auto sync',
                                            'Email/password authentication',
                                            'Chat addition + categorization',
                                            'Search and filtering',
                                        ].map((feature, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <CheckIcon
                                                        sx={{ color: 'success.main', mr: 1, fontSize: 18 }}
                                                    />
                                                    <Typography variant="body2">{feature}</Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>

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
                                    ⬇️ Download ConvoVault (ZIP)
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                                <ImageCarousel
                                    project="convovault"
                                    images={projectImages.convovault}
                                />
                            </Grid>
                        </Grid>

                        {/* Extension Capabilities */}
                        <Box sx={{ mt: 8 }}>
                            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                                Extension Capabilities
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <PsychologyIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Smart Detection
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Content scripts detect new chats automatically
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <ScheduleIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Auto Sync
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Background sync every 5 minutes
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <LaunchIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Clean UI
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Popup UI with organized tabs
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            textAlign: 'center',
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <TrendingUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Real-time Stats
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Live analytics and insights
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Supported Platforms */}
                        <Box sx={{ mt: 8 }}>
                            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                                Supported Platforms
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    borderRadius: 3,
                                    background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600 }}>Platform</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Extraction Method</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            { platform: 'ChatGPT', method: 'Extract sidebar links' },
                                            { platform: 'Claude', method: 'Extract sidebar + recents' },
                                            { platform: 'Perplexity', method: 'Extract sidebar + library' },
                                        ].map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontWeight: 600 }}>{row.platform}</TableCell>
                                                <TableCell color="text.secondary">{row.method}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Future Enhancements */}
                        <Box sx={{ mt: 8 }}>
                            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
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
                                                p: 2,
                                                textAlign: 'center',
                                                background: alpha(theme.palette.info.main, 0.1),
                                                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="body1" color="info.main">
                                                {enhancement}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ShowcaseLanding;