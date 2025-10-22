import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'; // <-- ADD THIS
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    useTheme,
    Alert,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactSection = ({ onCursorChange }) => {
    const theme = useTheme();
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const formRef = useRef();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_49auj24',      // Replace with your EmailJS service ID
                'your_template_id',     // Replace with your EmailJS template ID
                formRef.current,
                'your_public_key'       // Replace with your EmailJS public key
            )
            .then(
                () => {
                    setStatus('success');
                    formRef.current.reset();
                },
                (error) => {
                    console.error(error.text);
                    setStatus('error');
                }
            );
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
        <Box id="contact" sx={{ py: 6 }} ref={ref}>
            <Container maxWidth="lg">
                <motion.div variants={{ visible: { opacity: 1 } }} initial="hidden" animate={controls}>
                    <Grid 
                        container 
                        spacing={3}
                        sx={{ 
                            display: 'flex', 
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {/* Message Form */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flex: { md: 1 } }}>
                            <motion.div style={{ width: '100%', display: 'flex' }}>
                                <Paper 
                                    elevation={theme.palette.mode === 'light' ? 1 : 4} 
                                    sx={{ 
                                        p: { xs: 3, md: 4 }, 
                                        borderRadius: 3,
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h4" gutterBottom sx={{ 
                                        fontWeight: 600, 
                                        mb: 3,
                                        fontSize: { xs: '1.75rem', md: '2rem' }
                                    }}>
                                        Send a Message
                                    </Typography>

                                    <Box 
                                        component="form" 
                                        noValidate 
                                        sx={{ 
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1
                                        }} 
                                        ref={formRef} 
                                        onSubmit={handleSubmit}
                                    >
                                        <TextField required fullWidth label="Your Name" name="from_name" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField required fullWidth label="Your Email" name="reply_to" type="email" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField 
                                            required 
                                            fullWidth 
                                            multiline 
                                            rows={3} 
                                            label="Your Message" 
                                            name="message" 
                                            variant="outlined" 
                                            sx={{ mb: 3, flexGrow: 1 }} 
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            endIcon={<SendIcon />}
                                            sx={{ 
                                                py: 1.5, 
                                                textTransform: 'none', 
                                                fontWeight: 600, 
                                                fontSize: '1rem',
                                                mt: 'auto' 
                                            }}
                                        >
                                            Send Message
                                        </Button>

                                        {status && (
                                            <Alert severity={status} sx={{ mt: 2 }}>
                                                {status === 'success' ? 'Message sent successfully!' : 'Oops! Something went wrong.'}
                                            </Alert>
                                        )}
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* Contact Info */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flex: { md: 1 } }}>
                            <motion.div style={{ width: '100%', display: 'flex' }}>
                                <Paper
                                    elevation={theme.palette.mode === 'light' ? 1 : 4}
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h4" gutterBottom sx={{ 
                                        fontWeight: 600, 
                                        mb: 4,
                                        fontSize: { xs: '1.75rem', md: '2rem' }
                                    }}>
                                        Contact Information
                                    </Typography>

                                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Box>
                                            {/* Location Info */}
                                            <Box sx={{ mb: 4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <LocationOnIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
                                                    <Typography variant="h6">
                                                        Our Location
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                                                    {/* 123 Tech Park, Innovation Street
                      <br /> */}
                                                    Delhi India
                                                </Typography>
                                            </Box>

                                            {/* Email Info */}
                                            <Box sx={{ mb: 3.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <EmailIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
                                                    <Typography variant="h6">
                                                        Email Us
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                                                    contact.essolutions@gmail.com
                                                    <br />
                                                    {/* support@essolutions.com */}
                                                </Typography>
                                            </Box>

                                            {/* Phone Info */}
                                            <Box sx={{ mb: 3.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <PhoneIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
                                                    <Typography variant="h6">
                                                        WhatsApp Us
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                                                    +91 92113 12466
                                                    <br />
                                                    {/* +91 12345 67890 */}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                We're available 24/7 message us on whatsapp.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ContactSection;