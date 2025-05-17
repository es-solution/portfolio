// File: src/components/ServicesSection.jsx
import { useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    useTheme
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Service data
const services = [
    {
        title: 'AI Agents',
        description: 'Custom AI agents designed to learn and execute tasks specific to your workflow.',
        icon: 'ai-agents',
    },
    {
        title: 'E-commerce Solutions',
        description: 'Tailored e-commerce platforms for your brand, products, and customer journey.',
        icon: 'ecommerce',
    },
    {
        title: 'CRM & ERP Systems',
        description: 'Custom modules for CRMs, ERPs to perfectly match your operational flow.',
        icon: 'crm-erp',
    },
    {
        title: 'Blockchain/AI Solutions',
        description: 'Bespoke blockchain or advanced AI solutions built from the ground up.',
        icon: 'blockchain-ai',
    },
    {
        title: 'Mobile Applications',
        description: 'Native or cross-platform apps with features tailored to your users and business goals.',
        icon: 'mobile-apps',
    },
    {
        title: 'Chrome Extensions',
        description: 'Custom Chrome extensions to automate tasks specific to your teams daily web activity.',
        icon: 'chrome-extensions',
    },
    {
        title: 'Prediction Models',
        description: 'Custom prediction models tailored to your data and business questions.',
        icon: 'prediction-models',
    },
    {
        title: 'Cloud Solutions',
        description: 'Tailored cloud architecture, migration, and management for your infrastructure needs.',
        icon: 'cloud-solutions',
    },
    {
        title: 'CI/CD Pipelines',
        description: 'Custom CI/CD pipelines for faster, safer releases of your applications.',
        icon: 'cicd',
    },
];
const getImageFilename = (iconKey) => {
    const map = {
        'ai-agents': 'aiagent.jpg',
        'ecommerce': 'ecomm.jpg',
        'crm-erp': 'crmerp.jpg',
        'blockchain-ai': 'blockchain.jpg',
        'mobile-apps': 'mobileapp.jpg',
        'chrome-extensions': 'chromext.jpg',
        'prediction-models': 'aiagent.jpg', // Use aiagent.jpg or your own if missing
        'cloud-solutions': 'cloud.jpg',
        'cicd': 'cicd.jpg', // or 'cicdpipeline.jpg' if you prefer that
    };
    return map[iconKey] || 'default.jpg'; // fallback
};

const ServicesSection = ({ onCursorChange }) => {
    const theme = useTheme();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

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
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
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
        <Box
            id="services"
            sx={{
                py: 10,
            }}
            ref={ref}
        >
            <Container maxWidth="lg">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Our Services
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        sx={{
                            maxWidth: 800,
                            mx: 'auto',
                            mb: 8,
                        }}
                    >
                        We don't just sell software, we build <em>your</em> software. Custom, powerful, and designed for <em>your</em> unique business challenges.
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div style={{display:'flex',flexWrap:'wrap' ,alignItems:'center', justifyContent:'center', gap:'20px'}} item xs={12} sm={6} md={4}>
                        {services.map((service, index) => (
                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} item xs={12} sm={6} md={4} key={index}>
                                <motion.div variants={itemVariants}>
                                    <Card
                                        elevation={theme.palette.mode === 'light' ? 1 : 3}
                                        sx={{
                                            height: 300,
                                            width: 300,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: 8,
                                            },
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                        }}
                                        onMouseEnter={() => onCursorChange('interactive')}
                                        onMouseLeave={() => onCursorChange('default')}
                                    >
                                        <CardMedia
                                            sx={{
                                                height: 140,
                                                width: 300,
                                                backgroundColor: 'primary.light',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            height="140"
                                            width="100"
                                            image={`/services/${getImageFilename(service.icon)}`}
                                            alt={service.title}
                                        >
                                            {/* Placeholder for service icons */}
                                            <Typography
                                                variant="h4"
                                                component="div"
                                                color="white"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                {service.title.charAt(0)}
                                            </Typography>
                                        </CardMedia>
                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                            <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                                                {service.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {service.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ServicesSection;