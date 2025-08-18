import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Chip,
    Card,
    CardMedia,
    IconButton,
    Breadcrumbs,
    Link,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    alpha,
    Skeleton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Launch as LaunchIcon,
    GitHub as GitHubIcon,
    CheckCircle as CheckIcon,
    Timeline as TimelineIcon,
    Code as CodeIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    NavigateNext as NavigateNextIcon,
    Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import VideoLink from './VideoLink'; // Import the VideoLink component
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';

// Sample detailed project data - replace with your actual data source
const projectsDetailData = {
    "catalogcraft": {
        "id": 1,
        "title": "CatalogCraft",
        "slug": "catalogcraft",
        "tagline": "AI-Powered Catalogue Digitization Platform",
        "description": "Revolutionary platform for digitizing Indian catalogues with AI-powered features including barcode scanning, voice input, and multilingual support. Built for the Build for Bharat hackathon.",
        "longDescription": "CatalogCraft addresses the challenge of digitalizing and enhancing product catalogs with cutting-edge technologies. The platform offers seamless integration of text, voice, and image input capabilities across multiple Indian languages. Features include YOLO-based object detection for automatic catalog filling, vector image search, and comprehensive analytics. The solution significantly reduces manual effort in catalog creation while maintaining high accuracy and standardization.",
        "images": [
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/UzgPLnQs99U",
        "liveUrl": "https://panel.mait.ac.in:3019/",
        "githubUrl": "https://github.com/exploring-solver/CatalogCraft",
        "technologies": [
            "React", "Material-UI", "TailwindCSS", "Django", "PostgreSQL",
            "Node.js", "MongoDB", "Kotlin", "YOLO", "AI/ML", "Computer Vision"
        ],
        "category": "E-Commerce",
        "status": "Live",
        "year": 2024,
        "duration": "6 months",
        "teamSize": "4 developers",
        "client": "Build for Bharat Hackathon",
        "features": [
            "Barcode Scanning Integration",
            "Voice Input with Indic Language Support",
            "Vector Image Search Technology",
            "YOLO Model for Automatic Item Detection",
            "Mapping to Master Catalogue",
            "Download Analytics Reports",
            "Taxonomy Adherence System",
            "Catalog Templates Library",
            "Seamless Multilingual Support",
            "Robust Multi-language Chatbot",
            "Dual Backend Support (Django & Node.js)",
            "Bulk Data Addition Capabilities"
        ],
        "challenges": [
            "Processing inefficiency and time constraints in manual catalog creation",
            "Maintaining catalog integrity and image quality standards",
            "Implementing standardization across diverse product categories",
            "Handling multiple input interfaces seamlessly"
        ],
        "solutions": [
            "Implemented AI-powered automation to reduce manual processing time",
            "Built robust image processing pipeline with quality validation",
            "Created flexible taxonomy system supporting standardized and non-standardized products",
            "Developed unified interface combining text, voice, and image inputs"
        ],
        "results": [
            "65% reduction in catalog creation time",
            "90% improvement in data accuracy",
            "Support for 1000+ SKUs processing",
            "Seamless integration with ONDC platform"
        ],
        "testimonial": {
            "text": "CatalogCraft revolutionized our product catalog management. The AI-powered features saved us countless hours while maintaining exceptional accuracy.",
            "author": "Team Progmatic",
            "position": "Build for Bharat Hackathon Winners"
        }
    },
    "sangrakshan": {
        "id": 2,
        "title": "Sangrakshan",
        "slug": "sangrakshan",
        "tagline": "XR-Based Disaster Response Training Platform",
        "description": "Advanced VR/AR training platform for CBRN disaster response, offering immersive simulations for military and emergency response teams with cost-effective remote training capabilities.",
        "longDescription": "Sangrakshan addresses CBRN Disasters aftermath by offering XR-based disaster response training through lifelike simulations. The platform enhances troop preparedness in handling hazardous environments effectively while significantly reducing training costs and infrastructure requirements. Built specifically for NDRF India, it combines cutting-edge VR technology with practical training methodologies.",
        "images": [
            "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1626387346567-7a19d97b4d17?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://sangrakshan-demo.com",
        "githubUrl": "",
        "technologies": [
            "Unity 3D", "Oculus SDK", "ARKit", "ARCore", "C#",
            "Blender", "AI/ML", "Computer Vision", "WebXR", "Cloud Computing"
        ],
        "category": "AR/VR Training",
        "status": "Development",
        "year": 2024,
        "duration": "10 months",
        "teamSize": "5 developers",
        "client": "NDRF India",
        "features": [
            "VR World for Immersive Training Experience",
            "AR Models for Equipment and Machinery Learning",
            "Posture Tracking for Tactical Exercises",
            "AI Chatbot for Tutorials and Learning",
            "Cross-Platform Device Compatibility",
            "Comprehensive Training Dashboard",
            "Real-time Performance Analytics",
            "Multi-scenario Disaster Simulations",
            "Remote Training Capabilities",
            "Cost-effective Training Solutions"
        ],
        "challenges": [
            "Expensive traditional training setups with complex logistics",
            "Safety concerns in real CBRN disaster training scenarios",
            "Lack of standardized learning resources for disaster response",
            "Outdated learning methods causing training inefficiencies"
        ],
        "solutions": [
            "Developed immersive VR simulations replacing costly physical setups",
            "Created safe virtual environments for hazardous scenario training",
            "Built comprehensive learning modules with standardized protocols",
            "Implemented modern XR technology for engaging training experiences"
        ],
        "results": [
            "65% reduction in real factory setup costs",
            "80% product completion achieved",
            "Enhanced troop preparedness levels",
            "Significant reduction in training infrastructure needs"
        ],
        "testimonial": {
            "text": "Sangrakshan has transformed our disaster response training methodology. The immersive simulations provide realistic training scenarios without the associated risks and costs.",
            "author": "NDRF Training Division",
            "position": "National Disaster Response Force"
        }
    },
    "electrinfo": {
        "id": 3,
        "title": "ElectrInfo",
        "slug": "electrinfo",
        "tagline": "Smart Power Consumption Information Portal",
        "description": "Comprehensive web platform providing detailed information about power consumption patterns, energy efficiency tips, and electrical systems optimization for residential and commercial users.",
        "longDescription": "ElectrInfo serves as a comprehensive resource for understanding and managing power consumption across various sectors. The platform provides real-time data visualization, energy efficiency recommendations, and detailed analytics to help users optimize their electrical usage and reduce costs.",
        "images": [
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://electrinfo-demo.com",
        "githubUrl": "",
        "technologies": ["HTML5", "TailwindCSS", "JavaScript", "Chart.js", "CSS3"],
        "category": "Information Portal",
        "status": "Live",
        "year": 2024,
        "duration": "2 months",
        "teamSize": "2 developers",
        "client": "Personal Project",
        "features": [
            "Power Consumption Analytics Dashboard",
            "Energy Efficiency Calculator",
            "Appliance Power Rating Database",
            "Cost Estimation Tools",
            "Responsive Design for All Devices",
            "Interactive Charts and Graphs",
            "Energy Saving Tips Library",
            "Consumption Pattern Analysis"
        ],
        "challenges": [
            "Organizing complex electrical data in user-friendly format",
            "Creating responsive design for various screen sizes",
            "Implementing interactive data visualization"
        ],
        "solutions": [
            "Developed intuitive UI with clear data categorization",
            "Used TailwindCSS for responsive design implementation",
            "Integrated Chart.js for interactive data presentation"
        ],
        "results": [
            "100% responsive across all devices",
            "Improved user understanding of power consumption",
            "Clean and intuitive user interface"
        ]
    },
    "landinfo": {
        "id": 4,
        "title": "LandInfo",
        "slug": "landinfo",
        "tagline": "Land Resource Management System",
        "description": "Digital platform for comprehensive land resource management, providing tools for land assessment, documentation, and agricultural planning with modern web technologies.",
        "longDescription": "LandInfo revolutionizes land resource management by providing a centralized platform for land documentation, assessment, and planning. The system helps landowners, farmers, and government agencies manage land resources efficiently with detailed analytics and reporting capabilities.",
        "images": [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://landinfo-demo.com",
        "githubUrl": "",
        "technologies": ["HTML5", "TailwindCSS", "JavaScript", "CSS3", "Maps API"],
        "category": "Resource Management",
        "status": "Live",
        "year": 2024,
        "duration": "3 months",
        "teamSize": "2 developers",
        "client": "Agricultural Department",
        "features": [
            "Land Documentation System",
            "Resource Assessment Tools",
            "Agricultural Planning Module",
            "Interactive Land Mapping",
            "Crop Recommendation System",
            "Weather Integration",
            "Report Generation",
            "Mobile-First Design"
        ],
        "challenges": [
            "Handling complex land data relationships",
            "Creating intuitive mapping interfaces",
            "Ensuring data accuracy and validation"
        ],
        "solutions": [
            "Implemented structured data models for land information",
            "Integrated mapping APIs for visual land representation",
            "Built comprehensive validation systems for data integrity"
        ],
        "results": [
            "Streamlined land documentation process",
            "Improved agricultural planning efficiency",
            "Enhanced data accessibility for stakeholders"
        ]
    },
    "fog-battlefield": {
        "id": 5,
        "title": "Fog Battlefield",
        "slug": "fog-battlefield",
        "tagline": "Gaming Lobby & Matchmaking Platform",
        "description": "Modern gaming lobby interface with real-time matchmaking, player statistics, and tournament management. Built with React.js frontend and Express.js backend with MongoDB integration.",
        "longDescription": "Fog Battlefield provides a comprehensive gaming platform with advanced lobby management, real-time player matchmaking, and tournament organization capabilities. The platform features modern UI design with seamless backend integration for optimal gaming experience.",
        "images": [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://fog-battlefield-1n2.netlify.app/",
        "githubUrl": "",
        "technologies": ["React.js", "Express.js", "MongoDB", "Socket.io", "Node.js", "JWT"],
        "category": "Gaming",
        "status": "Live",
        "year": 2024,
        "duration": "4 months",
        "teamSize": "3 developers",
        "client": "Gaming Community",
        "features": [
            "Real-time Matchmaking System",
            "Player Statistics Dashboard",
            "Tournament Management",
            "Live Chat Integration",
            "Leaderboard System",
            "Team Formation Tools",
            "Game History Tracking",
            "Achievement System"
        ],
        "challenges": [
            "Implementing real-time multiplayer connectivity",
            "Managing concurrent user sessions",
            "Optimizing database queries for gaming statistics"
        ],
        "solutions": [
            "Integrated Socket.io for real-time communication",
            "Implemented efficient session management with JWT",
            "Optimized MongoDB queries with proper indexing"
        ],
        "results": [
            "Smooth real-time gaming experience",
            "Efficient player matchmaking algorithm",
            "Comprehensive gaming statistics tracking"
        ]
    },
    "bylexa": {
        "id": 6,
        "title": "Bylexa",
        "slug": "bylexa",
        "tagline": "AI-Powered IoT Automation Middleware",
        "description": "Extensible AI-powered automation middleware enabling voice control of IoT devices, operating systems, and custom hardware through unified API with natural language processing capabilities.",
        "longDescription": "Bylexa is a comprehensive automation middleware that bridges the gap between AI-powered voice commands and IoT device control. The platform features an extensible plugin architecture allowing developers to create specialized modules for industry-specific automation needs while leveraging built-in AI capabilities for sophisticated natural language processing and device management.",
        "images": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://bylexa-demo.com",
        "githubUrl": "",
        "technologies": ["Python", "FastAPI", "Machine Learning", "NLP", "IoT", "Tkinter", "PyPI"],
        "category": "IoT/AI",
        "status": "Live",
        "year": 2024,
        "duration": "8 months",
        "teamSize": "2 developers",
        "client": "Open Source Community",
        "features": [
            "Voice Control for IoT Devices",
            "Natural Language Processing Engine",
            "Extensible Plugin Architecture",
            "Cross-platform Compatibility",
            "Unified API for Device Control",
            "AI-powered Command Interpretation",
            "Custom Hardware Integration",
            "Web GUI Interface",
            "Tkinter Desktop Application",
            "PyPI Package Distribution"
        ],
        "challenges": [
            "Creating universal API for diverse IoT devices",
            "Implementing accurate natural language understanding",
            "Ensuring cross-platform compatibility",
            "Managing plugin ecosystem architecture"
        ],
        "solutions": [
            "Developed standardized API protocols for device communication",
            "Integrated advanced NLP models for command interpretation",
            "Built comprehensive testing framework for multiple platforms",
            "Created plugin SDK with detailed documentation"
        ],
        "results": [
            "Published pip package with growing adoption",
            "Successful integration with major IoT platforms",
            "Active developer community contributing plugins",
            "95% accuracy in voice command recognition"
        ]
    },
    "enobridge": {
        "id": 7,
        "title": "EnoBridge",
        "slug": "enobridge",
        "tagline": "Secure Decentralized Cross-Chain Bridge",
        "description": "Revolutionary cross-chain bridge solution addressing security vulnerabilities with decentralized relayer validation, individual pool management, and Merkle-proof-based verification for trust-minimized transactions.",
        "longDescription": "EnoBridge tackles the critical security issues plaguing existing cross-chain bridges by implementing innovative decentralized validation mechanisms. Unlike traditional bridges vulnerable to single points of failure, EnoBridge removes monopolistic control through configurable relayer validation, separate pool management to minimize cross-asset risks, and emergency controls at multiple levels. The platform ensures secure, trust-minimized, and resilient cross-chain transactions through advanced cryptographic verification.",
        "images": [
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://enobridge-demo.com",
        "githubUrl": "",
        "technologies": ["Solidity", "Web3.js", "Ethereum", "Polygon", "Merkle Trees", "Cryptography"],
        "category": "Blockchain/DeFi",
        "status": "Development",
        "year": 2024,
        "duration": "12 months",
        "teamSize": "4 developers",
        "client": "DeFi Community",
        "features": [
            "Decentralized Relayer Validation",
            "Individual Pool Management",
            "Merkle-proof-based Verification",
            "Emergency Control Systems",
            "Multi-level Governance",
            "Cross-asset Risk Minimization",
            "On-chain Verification",
            "Configurable Security Thresholds",
            "Multi-chain Compatibility",
            "Trust-minimized Architecture"
        ],
        "challenges": [
            "Addressing vulnerabilities from past bridge exploits (Ronin, Wormhole, Nomad)",
            "Eliminating single points of failure in cross-chain transactions",
            "Implementing efficient yet secure validation mechanisms",
            "Managing complex governance and validator role separation"
        ],
        "solutions": [
            "Implemented decentralized validation removing reliance on single operators",
            "Created individual pool architecture preventing cross-contamination of assets",
            "Developed Merkle-proof system for transparent on-chain verification",
            "Built sophisticated governance framework with clear role separation"
        ],
        "results": [
            "Successfully eliminated single operator dependencies",
            "Achieved significant reduction in cross-asset exposure risks",
            "Implemented robust emergency response mechanisms",
            "Enhanced security through cryptographic verification"
        ]
    },
    "zerochain": {
        "id": 8,
        "title": "Zero Chain",
        "slug": "zerochain",
        "tagline": "Interactive Blockchain Learning Platform",
        "description": "Dynamic blockchain education platform featuring smart contract challenges, contests, NFT rewards, and collaborative labs designed to make blockchain learning exciting and interactive through gamification.",
        "longDescription": "Zero Chain revolutionizes blockchain education by creating an engaging platform where users solve smart contract challenges, participate in timed competitions, and earn NFTs as proof of their skills. Unlike traditional static learning platforms, Zero Chain fosters a vibrant community through leaderboards, collaborative labs, and hackathon-style events focused purely on mastering blockchain concepts and development skills.",
        "images": [
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://zerochain-demo.com",
        "githubUrl": "",
        "technologies": ["React.js", "Solidity", "Web3.js", "IPFS", "Node.js", "MongoDB"],
        "category": "Education/Blockchain",
        "status": "Live",
        "year": 2024,
        "duration": "6 months",
        "teamSize": "3 developers",
        "client": "Blockchain Education Community",
        "features": [
            "Smart Contract Challenge System",
            "Timed Programming Contests",
            "NFT Achievement Rewards",
            "Interactive Leaderboards",
            "Collaborative Development Labs",
            "Skill-based Point System",
            "Community-driven Content",
            "Real-time Code Validation",
            "Progress Tracking Dashboard",
            "Hackathon-style Events"
        ],
        "challenges": [
            "Making complex blockchain concepts accessible to beginners",
            "Creating engaging gamification without compromising educational value",
            "Implementing fair and secure contest mechanisms",
            "Building scalable infrastructure for concurrent users"
        ],
        "solutions": [
            "Developed progressive learning paths with difficulty scaling",
            "Integrated reward systems aligned with learning objectives",
            "Implemented blockchain-based verification for contest integrity",
            "Built robust backend architecture supporting real-time interactions"
        ],
        "results": [
            "High user engagement with completion rates above 80%",
            "Active community contributing challenges and solutions",
            "Successful NFT reward distribution system",
            "Growing user base in blockchain education sector"
        ]
    },
    "bytelocker": {
        "id": 9,
        "title": "ByteLocker",
        "slug": "bytelocker",
        "tagline": "AI-Powered Video Analytics & Security System",
        "description": "Intelligent video analytics package transforming existing CCTV infrastructure into proactive security and monitoring systems using computer vision, facial recognition, and crowd analysis for automated threat detection.",
        "longDescription": "ByteLocker revolutionizes security monitoring by leveraging existing CCTV networks for comprehensive crowd management, crime prevention, and work monitoring. The system integrates advanced computer vision algorithms, Vision Language Models (vLM), facial recognition, pose detection, and crowd analysis to enable automated threat detection, behavioral analysis, and real-time security responses through intelligent video processing.",
        "images": [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://bytelocker-demo.com",
        "githubUrl": "",
        "technologies": ["Python", "YOLO", "OpenCV", "TensorFlow", "Moondream VLM", "Computer Vision"],
        "category": "Security/AI",
        "status": "Live",
        "year": 2024,
        "duration": "7 months",
        "teamSize": "4 developers",
        "client": "Security Solutions Provider",
        "features": [
            "Real-time Video Analytics Processing",
            "Facial Recognition System",
            "Crowd Density Analysis",
            "Behavioral Pattern Detection",
            "Automated Threat Identification",
            "Security Dashboard Interface",
            "Vision Language Model Integration",
            "YOLO-based Object Detection",
            "Pose Detection Analysis",
            "Alert Generation System",
            "Existing CCTV Integration",
            "Multi-camera Monitoring"
        ],
        "challenges": [
            "Processing multiple video streams in real-time",
            "Ensuring high accuracy in facial recognition across diverse conditions",
            "Managing false positive rates in threat detection",
            "Integrating with legacy CCTV systems"
        ],
        "solutions": [
            "Implemented efficient video processing pipeline with GPU acceleration",
            "Enhanced recognition algorithms with diverse training datasets",
            "Developed adaptive threshold systems reducing false alarms",
            "Created universal connectors for various CCTV protocols"
        ],
        "results": [
            "95% accuracy in facial recognition under optimal conditions",
            "Real-time processing of up to 16 concurrent video streams",
            "60% reduction in false positive security alerts",
            "Successful integration with 10+ different CCTV brands"
        ]
    },
    "marketpulse": {
        "id": 10,
        "title": "MarketPulse",
        "slug": "marketpulse",
        "tagline": "Comprehensive Digital Marketing Management Platform",
        "description": "Full-featured digital marketing management software providing campaign management, client analytics, and comprehensive reporting tools with admin dashboard for marketing agencies and businesses.",
        "longDescription": "MarketPulse serves as a complete digital marketing management solution, offering agencies and businesses the tools needed to manage campaigns, track client progress, analyze performance metrics, and generate detailed reports. The platform features a robust admin panel, client management system, and analytics dashboard designed to streamline marketing operations and improve client relationships.",
        "images": [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop"
        ],
        "videoUrl": "https://www.youtube.com/@esolutionss",
        "liveUrl": "https://marketpulse-demo.com",
        "githubUrl": "",
        "technologies": ["Express.js", "Node.js", "MongoDB", "AdminJS", "bcrypt", "JWT"],
        "category": "Business/Marketing",
        "status": "Live",
        "year": 2024,
        "duration": "5 months",
        "teamSize": "3 developers",
        "client": "Digital Marketing Agencies",
        "features": [
            "Campaign Management System",
            "Client Portfolio Management",
            "Analytics Dashboard",
            "Performance Reporting Tools",
            "Admin Panel with Role Management",
            "User Authentication System",
            "File Upload Management",
            "Settings Configuration",
            "Multi-user Access Control",
            "Data Visualization Charts",
            "Client Communication Tools",
            "Automated Report Generation"
        ],
        "challenges": [
            "Managing complex campaign data relationships",
            "Implementing secure multi-user authentication",
            "Creating intuitive admin interface for non-technical users",
            "Handling large volumes of marketing analytics data"
        ],
        "solutions": [
            "Designed normalized database schema for efficient data management",
            "Implemented JWT-based authentication with role-based access control",
            "Integrated AdminJS for user-friendly administrative interface",
            "Optimized database queries and implemented data pagination"
        ],
        "results": [
            "Streamlined campaign management for marketing teams",
            "Improved client reporting efficiency by 70%",
            "Enhanced data security with robust authentication",
            "Successful deployment with multi-tenant architecture"
        ]
    }
}
  // Add more projects here...

const isValidVideoUrl = (url) => {
    if (!url) return false;
    return (
        url.includes('youtube.com/embed/') ||
        url.match(/\.(mp4|webm)$/i)
    );
};

const ProductDetailPage = ({ themeMode, onCursorChange }) => {
    const theme = useTheme();
    const { productname } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        // Simulate API call to fetch project details
        const fetchProject = () => {
            setLoading(true);
            setTimeout(() => {
                const projectData = projectsDetailData[productname];
                setProject(projectData);
                setLoading(false);
            }, 1000);
        };

        fetchProject();
    }, [productname]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project?.title,
                    text: project?.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    // Handler for video play
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

    if (loading) {
        return (
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Skeleton variant="text" width="60%" height={60} />
                    <Skeleton variant="rectangular" width="100%" height={400} sx={{ my: 4 }} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Skeleton variant="text" width="100%" height={200} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rectangular" width="100%" height={300} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }

    if (!project) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Project Not Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        The project you're looking for doesn't exist or has been moved.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/products')}
                        startIcon={<ArrowBackIcon />}
                    >
                        Back to Projects
                    </Button>
                </Container>
            </Box>
        );
    }

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
            <Container maxWidth="lg">
                {/* Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        sx={{ mb: 4 }}
                    >
                        <Link
                            color="inherit"
                            href="/"
                            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Home
                        </Link>
                        <Link
                            color="inherit"
                            href="/products"
                            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Projects
                        </Link>
                        <Typography color="text.primary">{project.title}</Typography>
                    </Breadcrumbs>
                </motion.div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <Box>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 1,
                                        background: themeMode === 'dark'
                                            ? 'linear-gradient(45deg, #ffffff 30%, #a0a0a0 90%)'
                                            : 'linear-gradient(45deg, #1a202c 30%, #4a5568 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {project.title}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    sx={{ mb: 2, fontWeight: 300 }}
                                >
                                    {project.tagline}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                    onClick={() => navigate('/products')}
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                    sx={{
                                        background: alpha(theme.palette.background.paper, 0.8),
                                        '&:hover': { background: theme.palette.background.paper },
                                    }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleShare}
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                    sx={{
                                        background: alpha(theme.palette.background.paper, 0.8),
                                        '&:hover': { background: theme.palette.background.paper },
                                    }}
                                >
                                    <ShareIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                            <Chip
                                label={project.status}
                                color={project.status === 'Live' ? 'success' : 'warning'}
                            />
                            <Chip label={project.category} variant="outlined" />
                            <Chip label={project.year} variant="outlined" />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                            <Button
                                variant="contained"
                                endIcon={<LaunchIcon />}
                                href={project.liveUrl}
                                target="_blank"
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                sx={{ borderRadius: 3 }}
                            >
                                View Live Site
                            </Button>
                            {project.githubUrl && (
                                <Button
                                    variant="outlined"
                                    endIcon={<GitHubIcon />}
                                    href={project.githubUrl}
                                    target="_blank"
                                    onMouseEnter={() => onCursorChange?.('button')}
                                    onMouseLeave={() => onCursorChange?.('default')}
                                    sx={{ borderRadius: 3 }}
                                >
                                    View Code
                                </Button>
                            )}
                        </Box>
                    </Box>
                </motion.div>

                {/* Main Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Box sx={{ mb: 6 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                overflow: 'hidden',
                                background: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
                                boxShadow: theme.shadows[16],
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={project.images[selectedImage]}
                                    alt={project.title}
                                    sx={{
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                    }}
                                />

                                {/* Video Play Button Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 2,
                                    }}
                                >
                                    <IconButton
                                        onClick={() => handleVideoPlay(project.videoUrl, project.liveUrl)}
                                        sx={{
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
                                        onMouseEnter={() => onCursorChange?.('button')}
                                        onMouseLeave={() => onCursorChange?.('default')}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.2"/>
                                            <polygon points="16,13 28,20 16,27" fill="currentColor"/>
                                        </svg>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>

                        {/* Image Thumbnails */}
                        {project.images.length > 1 && (
                            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
                                {project.images.map((image, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 60,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index
                                                ? `3px solid ${theme.palette.primary.main}`
                                                : '3px solid transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={`${project.title} ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </motion.div>

                {/* Content Grid */}
                <Grid container spacing={6}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Project Overview */}
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                    Project Overview
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.8, fontSize: '1.1rem', mb: 3 }}
                                >
                                    {project.description}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}
                                >
                                    {project.longDescription}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* Key Features */}
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                    Key Features
                                </Typography>
                                <Grid container spacing={2}>
                                    {project.features.map((feature, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <CheckIcon
                                                    sx={{
                                                        color: theme.palette.success.main,
                                                        mr: 2,
                                                        fontSize: 20,
                                                    }}
                                                />
                                                <Typography variant="body1">{feature}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* Challenges & Solutions */}
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                    Challenges & Solutions
                                </Typography>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'error.main' }}>
                                            Challenges
                                        </Typography>
                                        <List dense>
                                            {project.challenges.map((challenge, index) => (
                                                <ListItem key={index} sx={{ px: 0 }}>
                                                    <ListItemText
                                                        primary={challenge}
                                                        sx={{ color: 'text.secondary' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                                            Solutions
                                        </Typography>
                                        <List dense>
                                            {project.solutions.map((solution, index) => (
                                                <ListItem key={index} sx={{ px: 0 }}>
                                                    <ListItemText
                                                        primary={solution}
                                                        sx={{ color: 'text.secondary' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Results */}
                            <Box sx={{ mb: 6 }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                                    Results & Impact
                                </Typography>
                                <Grid container spacing={3}>
                                    {project.results.map((result, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Card
                                                sx={{
                                                    p: 3,
                                                    background: themeMode === 'dark'
                                                        ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                        : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                                    borderRadius: 3,
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: theme.palette.success.main,
                                                    }}
                                                >
                                                    {result}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            {/* Testimonial */}
                            {project.testimonial && (
                                <Box sx={{ mb: 6 }}>
                                    <Card
                                        sx={{
                                            p: 4,
                                            background: themeMode === 'dark'
                                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.6 }}
                                        >
                                            "{project.testimonial.text}"
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            — {project.testimonial.author}, {project.testimonial.position}
                                        </Typography>
                                    </Card>
                                </Box>
                            )}
                        </motion.div>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {/* Project Details */}
                            <Card
                                sx={{
                                    p: 3,
                                    mb: 4,
                                    background: themeMode === 'dark'
                                        ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                        : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                    Project Details
                                </Typography>
                                <List dense>
                                    <ListItem sx={{ px: 0, py: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <TimelineIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Duration"
                                            secondary={project.duration}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <CodeIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Team Size"
                                            secondary={project.teamSize}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <SecurityIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Client"
                                            secondary={project.client}
                                        />
                                    </ListItem>
                                </List>
                            </Card>

                            {/* Technologies */}
                            <Card
                                sx={{
                                    p: 3,
                                    background: themeMode === 'dark'
                                        ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                        : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                    Technologies Used
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {project.technologies.map((tech, index) => (
                                        <Chip
                                            key={index}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                borderColor: alpha(theme.palette.primary.main, 0.3),
                                                color: theme.palette.primary.main,
                                                '&:hover': {
                                                    background: alpha(theme.palette.primary.main, 0.1),
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Box
                        sx={{
                            mt: 8,
                            mb: 6,
                            p: 6,
                            textAlign: 'center',
                            background: themeMode === 'dark'
                                ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                            Ready to Start Your Project?
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                        >
                            Let's discuss how we can bring your vision to life with cutting-edge technology
                            and innovative solutions.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/contact')}
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                }}
                            >
                                Start a Project
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/products')}
                                onMouseEnter={() => onCursorChange?.('button')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                }}
                            >
                                View More Projects
                            </Button>
                        </Box>
                    </Box>
                </motion.div>

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
            </Container>
        </Box>
    );
};

export default ProductDetailPage;