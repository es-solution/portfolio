import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const VideoLink = ({
  videoUrl,
  title = "Video",
  thumbnail = null,
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'overlay', // 'overlay', 'button', 'thumbnail'
  themeMode = 'light',
  onCursorChange = null,
  customStyles = {},
  showTitle = true,
  autoPlay = true,
  className = '',
  ...props
}) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    small: { width: 40, height: 40, iconSize: 20 },
    medium: { width: 60, height: 60, iconSize: 30 },
    large: { width: 80, height: 80, iconSize: 40 },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const handleVideoPlay = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
    }
    
    // Handle YouTube short URLs
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
    }
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
    }
    
    // Return as-is if already an embed URL
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  // Render based on variant
  const renderVideoTrigger = () => {
    switch (variant) {
      case 'button':
        return (
          <Button
            variant="contained"
            startIcon={<PlayIcon />}
            onClick={handleVideoPlay}
            onMouseEnter={() => {
              setIsHovered(true);
              onCursorChange?.('button');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              onCursorChange?.('default');
            }}
            sx={{
              borderRadius: 3,
              background: themeMode === 'dark'
                ? 'linear-gradient(45deg, #2a2a2a 0%, #3a3a3a 100%)'
                : 'linear-gradient(45deg, #4299e1 0%, #1a365d 100%)',
              boxShadow: theme.shadows[4],
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              '&:hover': {
                boxShadow: theme.shadows[8],
              },
              ...customStyles,
            }}
            className={className}
            {...props}
          >
            {showTitle ? title : 'Watch Video'}
          </Button>
        );

      case 'thumbnail':
        return (
          <Box
            onClick={handleVideoPlay}
            onMouseEnter={() => {
              setIsHovered(true);
              onCursorChange?.('button');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              onCursorChange?.('default');
            }}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: 3,
              overflow: 'hidden',
              background: thumbnail ? `url(${thumbnail})` : 'linear-gradient(45deg, #e2e8f0, #cbd5e0)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: { xs: 200, md: 300 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              ...customStyles,
            }}
            className={className}
            {...props}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
                opacity: isHovered ? 0.8 : 0.6,
                transition: 'opacity 0.3s ease',
              }}
            />
            
            {/* Play Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: currentSize.width,
                  height: currentSize.height,
                  background: alpha(theme.palette.primary.main, 0.9),
                  color: 'white',
                  '&:hover': {
                    background: theme.palette.primary.main,
                  },
                }}
              >
                <PlayIcon sx={{ fontSize: currentSize.iconSize }} />
              </IconButton>
            </motion.div>

            {/* Title Overlay */}
            {showTitle && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {title}
                </Typography>
              </Box>
            )}
          </Box>
        );

      case 'overlay':
      default:
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              onClick={handleVideoPlay}
              onMouseEnter={() => {
                setIsHovered(true);
                onCursorChange?.('button');
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                onCursorChange?.('default');
              }}
              sx={{
                width: currentSize.width,
                height: currentSize.height,
                background: alpha(theme.palette.primary.main, 0.9),
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: theme.palette.primary.main,
                  transform: 'scale(1.1)',
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                ...customStyles,
              }}
              className={className}
              {...props}
            >
              <PlayIcon sx={{ fontSize: currentSize.iconSize }} />
            </IconButton>
          </motion.div>
        );
    }
  };

  return (
    <>
      {renderVideoTrigger()}

      {/* Video Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
            borderRadius: 3,
            boxShadow: theme.shadows[24],
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe && iframe.requestFullscreen) {
                  iframe.requestFullscreen();
                }
              }}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <FullscreenIcon />
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'error.main' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box 
            sx={{ 
              position: 'relative', 
              paddingBottom: '56.25%', 
              height: 0,
              background: '#000',
            }}
          >
            <iframe
              src={embedUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={title}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoLink;