import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const MainContent = () => {
    const slides = [
        {
            image: "https://unsplash.com/photos/man-standing-beside-window-el0VzdWE6PE", // update image path if needed
            title: "مرحبا بكم في موقعنا",
            subtitle: "اكتشف أفضل الشركات والخدمات في المملكة",
        },
        {
            image: "https://unsplash.com/photos/a-couple-of-men-standing-next-to-each-other-on-a-floor-czcyP4hJ-MI",
            title: "حلول مبتكرة",
            subtitle: "نوفر لك أحدث التقنيات للعثور على شركاء النجاح",
        },
        {
            image: "/images/slide3.jpg",
            title: "جودة واحترافية",
            subtitle: "معايير عالية تضمن لك خدمات استثنائية",
        },
    ];

    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: { xs: "50vh", md: "70vh" },
                }}
            >
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0,
                            animation: `fade 15s infinite`,
                            animationDelay: `${index * 5}s`,
                            transition: "opacity 1s ease-in-out",
                        }}
                    >
                        {/* Overlay with gradient */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                    "linear-gradient(45deg, rgba(0,108,53,0.6) 30%, rgba(17,24,39,0.6) 90%)",
                            }}
                        />
                        <Container
                            sx={{
                                position: "relative",
                                zIndex: 2,
                                textAlign: "center",
                                color: "#fff",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                px: 2,
                            }}
                        >
                            <Typography variant="h3" sx={{
                                fontWeight: "bold",
                                fontFamily: "'Noto Kufi Arabic', sans-serif",
                            }}>
                                {slide.title}
                            </Typography>
                            <Typography variant="h5"
                                sx={{
                                    mt: 2,
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",


                                }}>
                                {slide.subtitle}
                            </Typography>
                        </Container>
                    </Box>
                ))}
            </Box>
        </Grid>
    );
};

export default MainContent;