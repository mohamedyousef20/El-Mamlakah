import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const MainContent = () => {
    return (
        <Grid item xs={12}>
            <Box
                textAlign="center"
                sx={{
                    py: { xs: 6, md: 10 },
                    px: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: { xs: '60vh', md: '80vh' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: "#111827",
                    borderRadius: '3px',
                    color: '#fff',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(0, 108, 53, 0.3) 30%, rgba(17, 24, 39, 0.6) 90%)',
                        zIndex: 1,
                    },
                    '&:hover': {
                        '&:before': {
                            background: 'linear-gradient(45deg, rgba(0, 108, 53, 0.4) 30%, rgba(17, 24, 39, 0.7) 90%)',
                        }
                    }
                }}
            >
                {/* Content Container */}
                <Box
                    position="relative"
                    zIndex={2}
                    sx={{
                        maxWidth: 800,
                        margin: '0 auto',
                        px: 2
                    }}
                >
                    <Typography
                        variant="h1"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                            fontWeight: 800,
                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                            lineHeight: 1.2,
                            letterSpacing: { xs: '-0.5px', md: '-1px' },
                            mb: 3,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        مرحباً بكم في مؤسسة المملكة
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                            lineHeight: 1.6,
                            maxWidth: 600,
                            margin: '0 auto',
                            mb: 4,
                            letterSpacing: '0.2px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        منصتك الموثوقة للبحث عن أفضل الشركات والخدمات في مختلف المجالات مثل التنظيف، البناء، الصيانة، وغيرها! نحن نوفر لك تجربة بحث سهلة وسريعة للعثور على الشركات الموثوقة بالقرب منك، مع تفاصيل شاملة حول الخدمات المقدمة، التقييمات، وآراء العملاء.                    </Typography>
                    <Link href="/search" passHref>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                cursor: 'pointer',
                                bgcolor: "#006c35",
                                px: 5,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontFamily: "'Noto Kufi Arabic', sans-serif",
                                fontWeight: 600,
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
                                }
                            }}
                        >
                            طلب خدمة
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Grid>
    );
};

export default MainContent;