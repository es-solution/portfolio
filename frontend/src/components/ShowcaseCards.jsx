import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Launch as LaunchIcon,
    Psychology as PsychologyIcon,
    Storage as StorageIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ShowcaseCards = ({ themeMode, onCursorChange }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const projects = [
        {
            id: 'notnta',
            title: 'CompeteHub (NotNTA)',
            subtitle: 'Exam prep meets gaming',
            description: 'Revolutionary 5v5 real-time multiplayer gamemode that makes studying competitive and fun.',
            category: 'EdTech',
            status: 'Live',
            icon: <SchoolIcon />,
            image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
            color: theme.palette.primary.main,
            stats: [
                // { label: 'Active Users', value: '' },
                // { label: 'Questions', value: '50K+' },
                // { label: 'Success Rate', value: '85%' }
            ],
            tags: ['React', 'Node.js', 'Socket.io', 'Gaming', 'Education']
        },
        {
            id: 'convovault',
            title: 'ConvoVault',
            subtitle: 'AI Chat Organizer',
            description: 'Organize and sync all your AI chatbot histories from ChatGPT, Claude, Perplexity in one place.',
            category: 'AI Tools',
            status: 'Beta',
            icon: <StorageIcon />,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
            color: theme.palette.primary.main,
            stats: [
                // { label: 'Chats Synced', value: '10K+' },
                // { label: 'Platforms', value: '3' },
                // { label: 'Users', value: '500+' }
            ],
            tags: ['Chrome Extension', 'AI', 'Sync', 'Organization']
        }
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -10, scale: 1.02 }
    };

    return (
        <Box
            sx={{
                pt: 12,
                pb: 8,
                background: themeMode === 'dark'
                    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="lg">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                            Our Showcase
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ maxWidth: 800, mx: 'auto', fontWeight: 300, lineHeight: 1.6 }}
                        >
                            Discover innovative solutions that are transforming digital experiences
                        </Typography>
                    </Box>
                </motion.div>

                {/* Projects Grid */}
                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} md={6} key={project.id}>
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        background: themeMode === 'dark'
                                            ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                            : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                        border: `1px solid ${alpha(project.color, 0.2)}`,
                                        boxShadow: `0 20px 40px ${alpha(project.color, 0.1)}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            boxShadow: `0 30px 60px ${alpha(project.color, 0.2)}`,
                                            border: `1px solid ${alpha(project.color, 0.4)}`,
                                        }
                                    }}
                                    onClick={() => navigate(`/showcase/${project.id}`)}
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                >
                                    {/* Project Image */}
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={project.image}
                                        alt={project.title}
                                        sx={{ 
                                            objectFit: 'cover',
                                            borderBottom: `2px solid ${alpha(project.color, 0.3)}`
                                        }}
                                    />

                                    <CardContent sx={{ p: 4 }}>
                                        {/* Header */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        bgcolor: alpha(project.color, 0.1),
                                                        color: project.color,
                                                    }}
                                                >
                                                    {project.icon}
                                                </Box>
                                                <Box>
                                                    <Chip
                                                        label={project.status}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: project.status === 'Live' ? 'success.main' : 'warning.main',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            mb: 1
                                                        }}
                                                    />
                                                    <Chip
                                                        label={project.category}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ ml: 1 }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Title and Description */}
                                        <Typography
                                            variant="h4"
                                            sx={{ fontWeight: 700, mb: 1, color: project.color }}
                                        >
                                            {project.title}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                            sx={{ mb: 3, fontWeight: 400 }}
                                        >
                                            {project.subtitle}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ mb: 4, lineHeight: 1.6 }}
                                        >
                                            {project.description}
                                        </Typography>

                                        {/* Stats */}
                                        <Grid container spacing={2} sx={{ mb: 4 }}>
                                            {project.stats.map((stat, statIndex) => (
                                                <Grid item xs={4} key={statIndex}>
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{ fontWeight: 700, color: project.color }}
                                                        >
                                                            {stat.value}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{ fontSize: '0.75rem' }}
                                                        >
                                                            {stat.label}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        {/* Tags */}
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                            {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                                <Chip
                                                    key={tagIndex}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha(project.color, 0.1),
                                                        color: project.color,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            ))}
                                            {project.tags.length > 4 && (
                                                <Chip
                                                    label={`+${project.tags.length - 4}`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha(theme.palette.text.secondary, 0.1),
                                                        color: 'text.secondary',
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        {/* Action Button */}
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            endIcon={<LaunchIcon />}
                                            sx={{
                                                borderRadius: 3,
                                                py: 1.5,
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                bgcolor: project.color,
                                                '&:hover': {
                                                    bgcolor: alpha(project.color, 0.8),
                                                }
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/showcase/${project.id}`);
                                            }}
                                            onMouseEnter={() => onCursorChange?.('button')}
                                            onMouseLeave={() => onCursorChange?.('default')}
                                        >
                                            Explore {project.title}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 2 }}
                        >
                            Have a project in mind?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                        >
                            Let's collaborate and bring your innovative ideas to life. 
                            We specialize in cutting-edge technology solutions.
                        </Typography>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/contact')}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                            }}
                            onMouseEnter={() => onCursorChange?.('button')}
                            onMouseLeave={() => onCursorChange?.('default')}
                        >
                            Get In Touch
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ShowcaseCards;
