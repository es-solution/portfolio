// File: src/components/Marquee/MarqueeComponent.jsx
import { useRef, memo } from 'react';
import { Box, Typography, Container } from '@mui/material';
import './marquee.css';

// Technology data
const technologies = [
  { name: 'JavaScript (JS)', icon: 'fa-brands fa-js', color: '#f7df1e' },
  { name: 'TypeScript (TS)', icon: 'fa-solid fa-code', color: '#3178c6' },
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
  { name: 'PHP', icon: 'fa-brands fa-php', color: '#777bb4' },
  { name: 'C++', icon: 'fa-solid fa-c', color: '#044f88' }, // no official FA icon; fallback
  { name: 'Java', icon: 'fa-brands fa-java', color: '#007396' },
  { name: 'C# (C Sharp)', icon: 'fa-solid fa-code', color: '#5C2D91' }, // fallback
  { name: 'Swift', icon: 'fa-brands fa-swift', color: '#FA7343' },
];

// Framework data
const frameworks = [
  { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
  { name: 'Flutter', icon: 'fa-brands fa-google', color: '#02569B' }, // No official, use Google
  { name: 'React Native', icon: 'fa-brands fa-react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'fa-solid fa-n', color: '#000000' }, // fallback
  { name: 'Laravel', icon: 'fa-brands fa-laravel', color: '#FF2D20' },
  { name: 'Angular', icon: 'fa-brands fa-angular', color: '#DD0031' },
  { name: 'Vue.js', icon: 'fa-brands fa-vuejs', color: '#4FC08D' },
  { name: 'Django', icon: 'fa-brands fa-python', color: '#092E20' }, // fallback
];


// Icon mapping - simplified first letter icons but you can replace with actual icons
const getIconComponent = (iconClass, color) => {
  return (
    <i 
      className={iconClass + ' tech-icon'} 
      style={{ color , display:'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}
      aria-hidden="true"
    ></i>
  );
};


const MarqueeComponent = ({ onCursorChange }) => {
  const techMarqueeRef = useRef(null);
  const frameworkMarqueeRef = useRef(null);

  return (
    <Box className="tech-marquee-container">
      {/* Languages Marquee */}
      <div className="tech-marquee-section">
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            className="marquee-heading"
            sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}
          >
            Languages We Work With
          </Typography>
        </Container>
        
        <div className="marquee-wrapper">
          <div 
            className="marquee-content" 
            ref={techMarqueeRef}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
          >
            {/* Quadruple the items for smoother looping */}
            {[...Array(4)].map((_, i) => (
              technologies.map((tech, index) => (
                <div className="tech-item" key={`tech-${i}-${index}`}>
                  {getIconComponent(tech.icon, tech.color)}
                  <span>{tech.name}</span>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>

      {/* Frameworks Marquee - Reverse Direction */}
      <div className="tech-marquee-section">
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            className="marquee-heading"
            sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}
          >
            Frameworks We Work With
          </Typography>
        </Container>
        
        <div className="marquee-wrapper">
          <div 
            className="marquee-content marquee-reverse" 
            ref={frameworkMarqueeRef}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
          >
            {/* Quadruple the items for smoother looping */}
            {[...Array(4)].map((_, i) => (
              frameworks.map((framework, index) => (
                <div className="tech-item" key={`framework-${i}-${index}`}>
                  {getIconComponent(framework.icon, framework.color)}
                  <span>{framework.name}</span>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default memo(MarqueeComponent);