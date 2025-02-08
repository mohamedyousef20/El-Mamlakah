import React from 'react';
import { Paper, Typography, Container, Box, Button } from '@mui/material';

const HomePageAboutUs = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#F4F4F4', // Light Gray background
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
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
                    }}
                >
                    المملكة
                </Typography>


                {/* Paper Component for Content */}
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: '#FFFFFF', // White background
                        padding: '2rem',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#006C35', // Primary Green
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            marginBottom: '1.5rem',
                        }}
                    >
                        مؤسسة المملكة لخدمات المقاولات العامة و الخدمات المنزلية
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: '#333333', // Dark Gray
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            marginBottom: '1.5rem',
                        }}
                    >
                        من هم المملكة؟
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#333333', // Dark Gray
                            fontSize: '25px', // Font size for paragraphs
                            fontWeight: '400',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            lineHeight: '1.8',
                            textAlign: 'right', // Right-align for Arabic text
                        }}
                        paragraph
                    >
                        نحن مجموعة من المتخصصين في مجموعة من المجالات التي تساعدك في مجالات حياتك اليومية .
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#333333', // Dark Gray
                            fontSize: '25px', // Font size for paragraphs
                            fontWeight: '400',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            lineHeight: '1.8',
                            textAlign: 'right', // Right-align for Arabic text
                        }}
                        paragraph
                    >
                        لذلك ستوفر المؤسسة لك كل من ” خدمات المقاولات العامة – خدمات نقل الاثاث – خدمات نقل العفش – خدمات تخزين الاثاث – خدمات النظافة – خدمات مكافحة الحشرات – خدمات كشف التسربات ”…
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#333333', // Dark Gray
                            fontSize: '25px', // Font size for paragraphs
                            fontWeight: '400',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            lineHeight: '1.8',
                            textAlign: 'right', // Right-align for Arabic text
                        }}
                        paragraph
                    >
                        يسر مؤسسة المملكةأن توفر كل احتياجات عملائها الكرام
                    </Typography>

                    {/* اتصل بنا Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#006C35', // Primary Green
                            color: '#FFFFFF', // White text
                            fontSize: '20px',
                            fontWeight: 'bold',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                            padding: '10px 30px',
                            marginTop: '2rem',
                            '&:hover': {
                                backgroundColor: '#004C27', // Darker green on hover
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