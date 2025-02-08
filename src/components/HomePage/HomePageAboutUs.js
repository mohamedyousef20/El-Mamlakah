import React from 'react';
import { Paper, Typography, Container, Box, Button, useTheme } from '@mui/material';

const HomePageAboutUs = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: '#F4F4F4',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                [theme.breakpoints.down('sm')]: {
                    padding: '1rem', // Reduce padding on small screens
                }
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                {/* Logo Section */}
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: "bold",
                        color: "#006C35",
                        letterSpacing: "2px",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                        fontSize: { xs: '1.8rem', sm: '2.5rem' } // Smaller font size on mobile
                    }}
                >
                    المملكة
                </Typography>

                {/* Paper Component for Content */}
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: '#FFFFFF',
                        padding: '2rem',
                        width: '100%',
                        textAlign: 'center',
                        [theme.breakpoints.down('sm')]: {
                            padding: '1.5rem', // Reduce padding for mobile
                        }
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#006C35',
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            marginBottom: '1.5rem',
                            fontSize: { xs: '1.5rem', sm: '2rem' } // Smaller font size on mobile
                        }}
                    >
                        مؤسسة المملكة لخدمات المقاولات العامة و الخدمات المنزلية
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: '#333333',
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            marginBottom: '1.5rem',
                            fontSize: { xs: '1.2rem', sm: '1.5rem' } // Adjust size for mobile
                        }}
                    >
                        من هم المملكة؟
                    </Typography>

                    {/* Responsive Body Text */}
                    {[
                        "نحن مجموعة من المتخصصين في مجموعة من المجالات التي تساعدك في مجالات حياتك اليومية.",
                        "لذلك ستوفر المؤسسة لك كل من ” خدمات المقاولات العامة – خدمات نقل الاثاث – خدمات نقل العفش – خدمات تخزين الاثاث – خدمات النظافة – خدمات مكافحة الحشرات – خدمات كشف التسربات ”…",
                        "يسر مؤسسة المملكة أن توفر كل احتياجات عملائها الكرام."
                    ].map((text, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                color: '#333333',
                                fontSize: { xs: '16px', sm: '20px', md: '25px' }, // Smaller font on mobile
                                fontWeight: '400',
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                lineHeight: { xs: '1.5', sm: '1.8' }, // Smaller line height on mobile
                                textAlign: 'right',
                            }}
                            paragraph
                        >
                            {text}
                        </Typography>
                    ))}

                    {/* Contact Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#006C35',
                            color: '#FFFFFF',
                            fontSize: { xs: '16px', sm: '20px' }, // Reduce button font size on mobile
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            padding: { xs: '8px 20px', sm: '10px 30px' }, // Adjust padding
                            marginTop: '2rem',
                            '&:hover': {
                                backgroundColor: '#004C27',
                            },
                        }}
                    >
                        اتصل بنا
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default HomePageAboutUs;
