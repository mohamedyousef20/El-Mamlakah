"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Skeleton,
    IconButton,
    Pagination,
    Stack
} from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Person as PersonIcon,
    Star as StarIcon, // Changed from BookmarkIcon to StarIcon
    PhonelinkLock,
    PhoneAndroid
} from '@mui/icons-material';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const articlesPerPage = 9;

    useEffect(() => {
        // محاكاة جلب البيانات من الخادم
        const fetchArticles = async () => {
            try {
                // هنا يمكنك استبدال هذا بطلب API حقيقي
                const dummyArticles = Array.from({ length: 20 }, (_, i) => ({
                    id: i + 1,
                    title: "السيف لأعمال التراث",
                    excerpt: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص...',
                    image: `//fakeimg.pl/350x200/?text=World&font=lobster`,
                    date: '٢٠ فبراير ٢٠٢٤',
                    phonNumber: '01555681495',
                    category: ['تقنية', 'تطوير'][i % 2],
                    reviews: Math.floor(Math.random() * 100), // Random number of reviews
                }));
                setArticles(dummyArticles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const displayedArticles = articles.slice(startIndex, endIndex);

    return (
        <Box sx={{ backgroundColor: '#F4F4F4', py: 6, minHeight: '100vh' }}>
            <Container>
                <Typography
                    variant="h3"
                    component="h1"
                    align="center"
                    sx={{
                        color: '#006C35',
                        fontWeight: 'bold',
                        mb: 6,
                        fontFamily: "'Noto Sans Arabic', sans-serif"
                    }}
                >
                    المدونة
                </Typography>

                <Grid container spacing={4} dir="rtl">
                    {loading
                        ? Array.from(new Array(6)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                                <Card sx={{ height: '100%' }}>
                                    <Skeleton variant="rectangular" height={200} />
                                    <CardContent>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" width="60%" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        : displayedArticles.map((article) => (
                            <Grid item xs={12} sm={6} md={4} key={article.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={article.image}
                                        alt={article.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={article.category}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#006C35',
                                                    color: 'white',
                                                    fontFamily: "'Noto Sans Arabic', sans-serif"
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                            sx={{
                                                color: '#333333',
                                                fontWeight: 'bold',
                                                fontFamily: "'Noto Sans Arabic', sans-serif"
                                            }}
                                        >
                                            {article.title}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
                                                fontFamily: "'Noto Sans Arabic', sans-serif"
                                            }}
                                        >
                                            {article.excerpt}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mt: 2
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneAndroid sx={{ fontSize: 20, color: '#006C35' }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                                                >
                                                    {article.phonNumber}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AccessTimeIcon sx={{ fontSize: 20, color: '#006C35' }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                                                >
                                                    {article.readTime}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#006C35',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#004d00',
                                                },
                                                fontFamily: "'Noto Sans Arabic', sans-serif"
                                            }}
                                        >
                                            اقرأ المزيد
                                        </Button>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} /> {/* Star icon for reviews */}
                                            <Typography
                                                variant="body2"
                                                sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                                            >
                                                {article.reviews} تقييم
                                            </Typography>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                {!loading && (
                    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={Math.ceil(articles.length / articlesPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: '#006C35',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#006C35 !important',
                                    color: 'white',
                                },
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default ArticleList;