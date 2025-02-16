"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
    Grid,
    IconButton,
    styled,
    Stack
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    WhatsApp as WhatsAppIcon,
    Phone as PhoneIcon,
    Add as AddIcon
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import Link from 'next/link';
import ProtectedComponent from '@/components/ProtectedComponent';

const ArticleCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    padding: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0, 108, 53, 0.2)'
    }
}));

const StyledButton = styled(Button)({
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    fontWeight: 600,
    backgroundColor: '#006c35',
    '&:hover': {
        backgroundColor: '#005a2b'
    }
});

export default function ArticlesPage() {
    const [open, setOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [articles, setArticles] = useState([]); // initial empty array
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Fetch companies (if needed) and articles
    // Assuming companies are needed for the dropdown in your admin panel:
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/v1/company");
                if (!res.ok) {
                    throw new Error("فشل في تحميل الشركات.");
                }
                const data = await res.json();
                setCompanies(data.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setNotification({
                    open: true,
                    message: 'حدث خطأ أثناء تحميل الشركات!',
                    severity: 'error'
                });
                setCompanies([]);
            }
        };

        fetchCompanies();
    }, []);

    // Fetch articles when the component mounts
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/v1/articles");
                if (!res.ok) {
                    throw new Error("فشل في تحميل المقالات.");
                }
                const data = await res.json();
                setArticles(data.data || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setNotification({
                    open: true,
                    message: 'حدث خطأ أثناء تحميل المقالات!',
                    severity: 'error'
                });
            }
        };

        fetchArticles();
    }, []);


    const handleOpen = (article = null) => {
        setEditingArticle(article);
        setOpen(true);
    };

    const handleClose = () => {
        setEditingArticle(null);
        setOpen(false);
    };

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const articleData = {
            title: formData.get('title'),
            content: formData.get('content'),
        };

        if (editingArticle) {
            setArticles(articles.map(article =>
                article.id === editingArticle.id ? { ...article, ...articleData } : article
            ));
        } else {
            setArticles([...articles, {
                ...articleData,
                id: Date.now(),
                whatsappClicks: 0,
                phoneClicks: 0
            }]);
        }

        handleClose();
    };

    const handleDelete = (id) => {
        setArticles(articles.filter(article => article.id !== id));
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <ProtectedComponent>

            <Stack direction="row">
                <AdminSideBar />
                <Container sx={{ my: 5 }}>
                    <Box sx={{ direction: 'rtl' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 4,
                            alignItems: 'center',
                        }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                    fontWeight: 700,
                                    color: 'green'
                                }}
                            >
                                المقالات
                            </Typography>
                            <Link href={'/admin/insert/article'}>
                                <StyledButton
                                    variant="contained"
                                    onClick={() => handleOpen()}
                                    startIcon={<AddIcon />}
                                >
                                    مقال جديد
                                </StyledButton>
                            </Link>
                        </Box>

                        <Grid container spacing={2}>
                            {articles.map((article) => (
                                <Grid item xs={12} sm={6} md={4} key={article.id}>
                                    <ArticleCard>
                                        <Box sx={{ p: 2 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    color: '#006c35'
                                                }}
                                            >
                                                {article.title}
                                            </Typography>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 2
                                            }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <WhatsAppIcon sx={{
                                                        color: '#006c35',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                            color: '#9CA3AF'
                                                        }}
                                                    >
                                                        {article.whatsappClicks}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PhoneIcon sx={{
                                                        color: '#006c35',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                            color: '#9CA3AF'
                                                        }}
                                                    >
                                                        {article.phoneClicks}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                gap: 1
                                            }}>
                                                <IconButton
                                                    onClick={() => handleOpen(article)}
                                                    sx={{ color: '#006c35' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDelete(article.id)}
                                                    sx={{ color: '#ef4444' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </ArticleCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>

                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </ProtectedComponent>
     
    );
}
