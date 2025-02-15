"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    CardContent,
    IconButton,
    Typography,
    styled,
    Stack,
    Container
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    WhatsApp as WhatsAppIcon,
    Phone as PhoneIcon,
    Add as AddIcon
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';

const ArticleCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0, 108, 53, 0.2)'
    },
    border: '1px solid rgba(255, 255, 255, 0.1)'
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
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: 'عنوان المقال الأول',
            content: 'محتوى المقال الأول',
            whatsappClicks: 45,
            phoneClicks: 23,
        },
        // Add more sample articles
    ]);

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

    return (
        <Stack>
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
                        <StyledButton
                            variant="contained"
                            onClick={() => handleOpen()}
                            startIcon={<AddIcon />}
                        >
                            مقال جديد
                        </StyledButton>
                    </Box>

                    <Grid container spacing={3}>
                        {articles.map((article) => (
                            <Grid item xs={12} sm={6} md={4} key={article.id}>
                                <ArticleCard>
                                    <CardContent>
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
                                    </CardContent>
                                </ArticleCard>
                            </Grid>
                        ))}
                    </Grid>

                </Box>
            </Container>
        </Stack>
    );
}