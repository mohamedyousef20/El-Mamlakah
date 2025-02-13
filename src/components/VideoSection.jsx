"use client";

import React, { useState } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';

const YouTubeVideo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const featuredVideo = {
        videoId: "ADnc2XaGSpE",
        title: "شاهد الفيديو التعريفى",
        description: "This is the main featured video description."
    };
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                py: 4
            }}
        >
            <Container maxWidth="lg">
                {featuredVideo.title && (
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontFamily: 'Tajawal, sans-serif',
                            fontWeight: 600,
                            color: '#111827',
                            
                        }}
                    >
                        {featuredVideo.title}
                    </Typography>
                )}
{/* 
                {featuredVideo.description && (
                    <Typography
                        sx={{
                            mb: 3,
                            fontFamily: 'Cairo, Tajawal, sans-serif',
                            color: '#4B5563',
                            fontSize: '1.1rem'
                        }}
                    >
                        {featuredVideo.description}
                    </Typography>
                )} */}

                <Box
                    sx={{
                        position: 'relative',
                        paddingTop: '56.25%', // 16:9 Aspect Ratio
                        width: '100%',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                >
                    {isLoading && (
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    )}

                    <iframe
                        src={`https://www.youtube.com/embed/${featuredVideo.videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 0,
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default YouTubeVideo;