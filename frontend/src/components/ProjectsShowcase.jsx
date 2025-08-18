import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Grid,
  useTheme,
  alpha,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Launch as LaunchIcon,
  PlayArrow as PlayIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Sample project data - you can replace this with your actual data
const projectsData = [
  {
    id: 1,
    title: "CatalogCraft",
    slug: "catalogcraft",
    description: "AI-powered catalogue digitization platform with barcode scanning, voice input, multilingual support, and YOLO-based automation.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/UzgPLnQs99U",
    liveUrl: "https://panel.mait.ac.in:3019/",
    technologies: ["React", "Django", "PostgreSQL", "YOLO", "AI/ML"],
    category: "E-Commerce",
    featured: true,
    status: "Live",
    year: 2024
  },
  {
    id: 2,
    title: "Sangrakshan",
    slug: "sangrakshan",
    description: "XR-based disaster response training platform with immersive VR/AR simulations for military and emergency response.",
    image: "projects/sang.png",
    videoUrl: "",
    liveUrl: "",
    technologies: ["Unity 3D", "Oculus SDK", "ARKit", "C#", "AI/ML"],
    category: "AR/VR Training",
    featured: true,
    status: "Development",
    year: 2024
  },
  {
    id: 3,
    title: "ElectrInfo",
    slug: "electrinfo",
    description: "Smart power consumption portal with real-time analytics, efficiency tips, and interactive charts for users.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://exploring-solver.github.io/Electrinfo_tailwind/",
    technologies: ["HTML5", "TailwindCSS", "JavaScript", "Chart.js"],
    category: "Information Portal",
    featured: false,
    status: "Live",
    year: 2024
  },
  {
    id: 4,
    title: "LandInfo",
    slug: "landinfo",
    description: "Land resource management system with mapping, crop recommendations, and digital documentation.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://exploring-solver.github.io/LanfInfo_tailwind/",
    technologies: ["JavaScript", "TailwindCSS", "Maps API"],
    category: "Resource Management",
    featured: false,
    status: "Live",
    year: 2024
  },
  {
    id: 5,
    title: "Fog Battlefield",
    slug: "fog-battlefield",
    description: "Gaming lobby and matchmaking platform with real-time stats, tournaments, and chat integration.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://fog-battlefield-1n2.netlify.app/",
    technologies: ["React.js", "Express.js", "MongoDB", "Socket.io"],
    category: "Gaming",
    featured: true,
    status: "Live",
    year: 2024
  },
  {
    id: 6,
    title: "Bylexa",
    slug: "bylexa",
    description: "AI-powered IoT automation middleware with voice control, NLP, and plugin-based extensibility.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://bylexa-user.netlify.app/",
    technologies: ["Python", "FastAPI", "NLP", "IoT"],
    category: "IoT/AI",
    featured: true,
    status: "Live",
    year: 2024
  },
  {
    id: 7,
    title: "EnoBridge",
    slug: "enobridge",
    description: "Secure decentralized cross-chain bridge with Merkle-proof verification and decentralized validation.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://enobridge2.netlify.app/",
    technologies: ["Solidity", "Web3.js", "Ethereum", "Polygon"],
    category: "Blockchain/DeFi",
    featured: false,
    status: "Development",
    year: 2024
  },
  {
    id: 8,
    title: "Zero Chain",
    slug: "zerochain",
    description: "Gamified blockchain learning platform with smart contract challenges, NFT rewards, and leaderboards.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://zerochainhvs.netlify.app/",
    technologies: ["React.js", "Solidity", "Web3.js", "IPFS"],
    category: "Education/Blockchain",
    featured: true,
    status: "Live",
    year: 2024
  },
  {
    id: 9,
    title: "ByteLocker",
    slug: "bytelocker",
    description: "AI-powered video analytics system with facial recognition, crowd analysis, and automated threat detection.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://bytelocker.netlify.app/",
    technologies: ["Python", "YOLO", "OpenCV", "TensorFlow"],
    category: "Security/AI",
    featured: true,
    status: "Live",
    year: 2024
  },
  {
    id: 10,
    title: "MarketPulse",
    slug: "marketpulse",
    description: "Comprehensive digital marketing management platform with campaign tracking, analytics, and reporting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/@esolutionss",
    liveUrl: "https://marketpulse1.netlify.app/",
    technologies: ["Express.js", "Node.js", "MongoDB", "AdminJS"],
    category: "Business/Marketing",
    featured: false,
    status: "Live",
    year: 2024
  }
];


const ProjectsShowcase = ({ themeMode, onCursorChange, limit = null, showHeader = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoError, setVideoError] = useState(false);

  // Filter and limit projects if needed
  const displayProjects = limit ? projectsData.slice(0, limit) : projectsData;
  const featuredProjects = displayProjects.filter(project => project.featured);

  // Auto-advance carousel for featured projects
  useEffect(() => {
    if (featuredProjects.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredProjects.length]);

  // Helper to check for valid YouTube embed or video link
  const isValidVideoUrl = (url) => {
    if (!url) return false;
    // Accepts YouTube embed or direct video links (mp4/webm), extend as needed
    return (
      url.includes('youtube.com/embed/') ||
      url.match(/\.(mp4|webm)$/i)
    );
  };

  const handleVideoPlay = (videoUrl, liveUrl) => {
    if (isValidVideoUrl(videoUrl)) {
      setSelectedVideo(videoUrl);
      setVideoDialogOpen(true);
      setVideoError(false);
    } else {
      setSelectedVideo(liveUrl || '');
      setVideoDialogOpen(true);
      setVideoError(true);
    }
  };

  const handleViewProject = (slug) => {
    navigate(`/products/${slug}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: themeMode === 'dark'
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '3%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`,
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          {showHeader && (
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 2,
                    display: 'block',
                  }}
                >
                  OUR WORK
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    background: themeMode === 'dark'
                      ? 'linear-gradient(45deg, #ffffff 30%, #a0a0a0 90%)'
                      : 'linear-gradient(45deg, #1a202c 30%, #4a5568 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Featured Projects
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: 'auto' }}
                >
                  Discover our latest innovative solutions that drive business success
                  and deliver exceptional user experiences.
                </Typography>
              </Box>
            </motion.div>
          )}

          {/* Featured Projects Carousel */}
          {featuredProjects.length > 0 && (
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 8 }}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: themeMode === 'dark'
                      ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                    boxShadow: theme.shadows[12],
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,padding: '20px'}}>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              position: 'relative',
                              height: { xs: 300, md: 500 },
                              background: `url(${featuredProjects[currentSlide]?.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
                              }}
                            />
                            <IconButton
                              onClick={() => handleVideoPlay(featuredProjects[currentSlide]?.videoUrl, featuredProjects[currentSlide]?.liveUrl)}
                              onMouseEnter={() => onCursorChange?.('button')}
                              onMouseLeave={() => onCursorChange?.('default')}
                              sx={{
                                position: 'relative',
                                zIndex: 2,
                                width: 80,
                                height: 80,
                                background: alpha(theme.palette.primary.main, 0.9),
                                color: 'white',
                                '&:hover': {
                                  background: theme.palette.primary.main,
                                  transform: 'scale(1.1)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <PlayIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ p: { xs: 3, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2 }}>
                              <Chip
                                label={featuredProjects[currentSlide]?.status}
                                color={featuredProjects[currentSlide]?.status === 'Live' ? 'success' : 'warning'}
                                size="small"
                                sx={{ mb: 2 }}
                              />
                              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                {featuredProjects[currentSlide]?.title}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ mb: 3, lineHeight: 1.6 }}
                            >
                              {featuredProjects[currentSlide]?.description}
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {featuredProjects[currentSlide]?.technologies.slice(0, 4).map((tech, index) => (
                                  <Chip
                                    key={index}
                                    label={tech}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      borderColor: alpha(theme.palette.primary.main, 0.3),
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                              <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => handleViewProject(featuredProjects[currentSlide]?.slug)}
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                sx={{ borderRadius: 3 }}
                              >
                                View Project
                              </Button>
                              <Button
                                variant="outlined"
                                endIcon={<LaunchIcon />}
                                href={featuredProjects[currentSlide]?.liveUrl}
                                target="_blank"
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                sx={{ borderRadius: 3 }}
                              >
                                Live Demo
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  {featuredProjects.length > 1 && (
                    <>
                      <IconButton
                        onClick={prevSlide}
                        sx={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: alpha(theme.palette.background.paper, 0.8),
                          '&:hover': { background: theme.palette.background.paper },
                        }}
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                      <IconButton
                        onClick={nextSlide}
                        sx={{
                          position: 'absolute',
                          right: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: alpha(theme.palette.background.paper, 0.8),
                          '&:hover': { background: theme.palette.background.paper },
                        }}
                      >
                        <ChevronRightIcon />
                      </IconButton>

                      {/* Dots Indicator */}
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
                        {featuredProjects.map((_, index) => (
                          <Box
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              background: index === currentSlide
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
              </Box>
            </motion.div>
          )}

          {/* All Projects Grid */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} justifyContent="center">
              {displayProjects.map((project, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={project.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    style={{
                      width: "100%",
                      maxWidth: 420, // Limit card width for consistency
                      flexGrow: 1,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onHoverStart={() => setHoveredCard(project.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        maxWidth: 420, // Ensure card doesn't stretch too wide
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: themeMode === 'dark'
                          ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                          : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        transform: hoveredCard === project.id ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: hoveredCard === project.id ? theme.shadows[16] : theme.shadows[4],
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="240"
                          image={project.image}
                          alt={project.title}
                          sx={{
                            transition: 'transform 0.3s ease',
                            transform: hoveredCard === project.id ? 'scale(1.05)' : 'scale(1)',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            display: 'flex',
                            gap: 1,
                          }}
                        >
                          <Chip
                            label={project.category}
                            size="small"
                            sx={{
                              background: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            }}
                          />
                        </Box>
                        <IconButton
                          onClick={() => handleVideoPlay(project.videoUrl, project.liveUrl)}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: alpha(theme.palette.primary.main, 0.8),
                            color: 'white',
                            opacity: hoveredCard === project.id ? 1 : 0,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: theme.palette.primary.main,
                              transform: 'translate(-50%, -50%) scale(1.1)',
                            },
                          }}
                        >
                          <PlayIcon />
                        </IconButton>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {project.title}
                          </Typography>
                          <Chip
                            label={project.status}
                            size="small"
                            color={project.status === 'Live' ? 'success' : 'warning'}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, lineHeight: 1.5 }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{
                                fontSize: '0.7rem',
                                height: 24,
                                borderColor: alpha(theme.palette.text.secondary, 0.3),
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 3, pt: 0 }}>
                        <Button
                          size="small"
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleViewProject(project.slug)}
                          onMouseEnter={() => onCursorChange?.('button')}
                          onMouseLeave={() => onCursorChange?.('default')}
                          sx={{ borderRadius: 2, mr: 1 }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          endIcon={<LaunchIcon />}
                          href={project.liveUrl}
                          target="_blank"
                          onMouseEnter={() => onCursorChange?.('button')}
                          onMouseLeave={() => onCursorChange?.('default')}
                          sx={{ borderRadius: 2 }}
                        >
                          Live Demo
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* View All Projects Button */}
          {limit && (
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/products')}
                  onMouseEnter={() => onCursorChange?.('button')}
                  onMouseLeave={() => onCursorChange?.('default')}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    },
                  }}
                >
                  View All Projects
                </Button>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {videoError ? "Oops!" : "Project Demo"}
          </Typography>
          <IconButton
            onClick={() => setVideoDialogOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {videoError ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Oops, seems the video link is broken.<br />
                No worries, the live demo is still up!
              </Typography>
              {selectedVideo && (
                <Button
                  variant="contained"
                  color="primary"
                  href={selectedVideo}
                  target="_blank"
                  sx={{ mt: 2 }}
                  endIcon={<LaunchIcon />}
                >
                  View Live Demo
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={selectedVideo}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                title="Project Demo Video"
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectsShowcase;