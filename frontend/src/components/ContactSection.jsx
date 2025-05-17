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
        <Box id="contact" sx={{ py: 10 }} ref={ref}>
            <Container maxWidth="lg">
                {/* ... Title and Subtitle remain unchanged */}

                <motion.div variants={{ visible: { opacity: 1 } }} initial="hidden" animate={controls}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <motion.div>
                                <Paper elevation={theme.palette.mode === 'light' ? 1 : 4} sx={{ p: 4, borderRadius: 3 }}>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                        Send a Message
                                    </Typography>

                                    <Box component="form" noValidate sx={{ mt: 1 }} ref={formRef} onSubmit={handleSubmit}>
                                        <TextField required fullWidth label="Your Name" name="from_name" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField required fullWidth label="Your Email" name="reply_to" type="email" variant="outlined" sx={{ mb: 2 }} />
                                        <TextField required fullWidth multiline rows={4} label="Your Message" name="message" variant="outlined" sx={{ mb: 3 }} />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            endIcon={<SendIcon />}
                                            sx={{ py: 1.5, textTransform: 'none', fontWeight: 600, fontSize: '1rem' }}
                                        >
                                            Send Message
                                        </Button>
                                    </Box>

                                    {status === 'success' && <Alert severity="success" sx={{ mt: 3 }}>Message sent successfully!</Alert>}
                                    {status === 'error' && <Alert severity="error" sx={{ mt: 3 }}>Oops! Something went wrong.</Alert>}
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* Right side (Contact info) remains unchanged */}
                        <Grid item xs={12} md={6}>
                            <motion.div variants={itemVariants}>
                                <Paper
                                    elevation={theme.palette.mode === 'light' ? 1 : 4}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    onMouseEnter={() => onCursorChange('interactive')}
                                    onMouseLeave={() => onCursorChange('default')}
                                >
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                                        Contact Information
                                    </Typography>

                                    <Box sx={{ mb: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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

                                    <Box sx={{ mb: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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

                                    <Box sx={{ mb: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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

                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography variant="body2" color="textSecondary">
                                            We're available 24/7 message us on whatsapp.
                                        </Typography>
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
