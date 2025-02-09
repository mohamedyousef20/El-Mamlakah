"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Desktop Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

// Mobile-specific Animations (Faster & Less movement)
const fadeInUpMobile = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleInMobile = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const AnimatedLogo = () => {
    return (
        <Box
            component="div"
            sx={{
                textAlign: 'center',
                animation: `${fadeInUp} 0.6s ease-out, ${scaleIn} 0.5s ease-out`,
                '@media (max-width: 600px)': {
                    animation: `${fadeInUpMobile} 0.4s ease-out, ${scaleInMobile} 0.3s ease-out`,
                },
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: "bold",
                    color: "#006C35",
                    letterSpacing: "2px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                    '@media (max-width: 600px)': {
                        fontSize: '1.75rem', // Smaller font for mobile
                        letterSpacing: "1px", // Less spacing for compact look
                    },
                }}
            >
                المملكة
            </Typography>
        </Box>
    );
};

export default AnimatedLogo;
