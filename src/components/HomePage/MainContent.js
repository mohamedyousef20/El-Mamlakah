"use client";

import { Box, Button, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import HomePageAboutUs from './HomePageAboutUs';

const MainContent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile

    const handleOpenVideoModal = () => {
        // Logic to open the video modal
        console.log("Open video modal");
    };

    return (
        <>
            {/* Main Content Section */}
            <Grid item xs={12} md={12}>
                <Box textAlign="center" py={isMobile ? 4 : 8}> {/* Adjust padding for mobile */}
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        color="primary"
                        sx={{
                            fontSize: isMobile ? '2rem' : '3rem', // Smaller font size for mobile
                            fontWeight: 'bold',
                            fontFamily: "'Tajawal', sans-serif",
                            lineHeight: isMobile ? 1.2 : 1.5, // Smaller line height for mobile
                        }}
                    >
                        مرحباً بكم في مؤسسة المملكة
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        color="text.secondary"
                        mb={4}
                        sx={{
                            fontSize: isMobile ? '1.25rem' : '1.5rem', // Smaller font size for mobile
                            fontFamily: "'Tajawal', sans-serif",
                            lineHeight: isMobile ? 1.3 : 1.6, // Smaller line height for mobile
                        }}
                    >
                        نقدم أفضل الحلول لعملائنا
                    </Typography>
                    <HomePageAboutUs />
                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'medium' : 'large'} // Adjust button size for mobile
                        onClick={handleOpenVideoModal}
                        sx={{
                            mt: 2,
                            fontFamily: "'Tajawal', sans-serif",
                        }}
                    >
                        شاهد الفيديو التعريفي
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default MainContent;