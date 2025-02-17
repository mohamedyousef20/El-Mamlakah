"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    Grid,
    IconButton,
    Button,
    styled,
    Stack
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    WhatsApp as WhatsAppIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import Link from 'next/link';
import ProtectedComponent from '@/components/ProtectedComponent';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import UpdateArticleDialog from '@/components/UpdateArticleDialog';
import { API_BASE_URL } from '@/lib/apiConfig';

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
    const [articles, setArticles] = useState([]); // initially empty array
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);

    // State for updating article
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/articles`);
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
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Delete Logic
    const openDeleteDialog = (article) => {
        setArticleToDelete({ id: article._id });
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!articleToDelete) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/articles/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleToDelete)
            });
            if (!res.ok) {
                throw new Error("فشل في حذف المقال");
            }
            setArticles(articles.filter(article => article._id !== articleToDelete.id));
            setNotification({
                open: true,
                message: 'تم حذف المقال بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error deleting article:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء حذف المقال!',
                severity: 'error'
            });
        } finally {
            setDeleteDialogOpen(false);
            setArticleToDelete(null);
        }
    };

    // Update Logic: Open update dialog and prefill form with article data
    const openUpdateArticleDialog = (article) => {
        setEditingArticle(article);
        setOpenUpdateDialog(true);
    };

    // When the update dialog form is submitted, send a PATCH request to update the article.
    const handleUpdate = async (updatedData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/articles/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingArticle._id,
                    title: updatedData.title,
                    paragraphs: updatedData.paragraphs // updatedData.paragraphs is expected to be an array with all paragraphs updated
                })
            });
            if (!res.ok) {
                throw new Error("فشل في تحديث المقال");
            }
            const updatedResponse = await res.json();
            const updatedArticle = updatedResponse.data;
            setArticles(articles.map(article =>
                article._id === editingArticle._id ? updatedArticle : article
            ));
            setNotification({
                open: true,
                message: 'تم تحديث المقال بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error updating article:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء تحديث المقال!',
                severity: 'error'
            });
        } finally {
            setOpenUpdateDialog(false);
            setEditingArticle(null);
        }
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
                            alignItems: 'center',
                            mb: 4,
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
                                <StyledButton variant="contained" startIcon={<AddIcon />}>
                                    مقال جديد
                                </StyledButton>
                            </Link>
                        </Box>

                        {loading ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {articles.map((article) => (
                                    <Grid item xs={12} sm={6} md={4} key={article._id}>
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
                                                        sx={{ color: '#006c35' }}
                                                        onClick={() => openUpdateArticleDialog(article)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{ color: '#ef4444' }}
                                                        onClick={() => openDeleteDialog(article)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </ArticleCard>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
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

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="تأكيد الحذف"
                description="هل أنت متأكد أنك تريد حذف هذا المقال؟"
                confirmButtonText="حذف"
                cancelButtonText="إلغاء"
            />

            {/* Reusable Update Article Dialog */}
            <UpdateArticleDialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
                onSubmit={handleUpdate}
                title="تحديث المقال"
                initialValues={
                    editingArticle
                        ? {
                            title: editingArticle.title,
                            paragraphs: editingArticle.paragraphs || []
                        }
                        : {}
                }
                labels={{
                    title: "عنوان المقال",
                    header: "عنوان الفقرة",
                    content: "المحتوى"
                }}
            />
        </ProtectedComponent>
    );
}
