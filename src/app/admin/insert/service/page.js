"use client";
import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Container,
    IconButton,
    Alert,
    Snackbar,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import AdminNavBar from '@/components/AdminSideBar';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: '8px',
}));

const ImagePreview = styled(Box)({
    width: '100%',
    height: '200px',
    border: '2px dashed #006c35',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
        borderColor: '#111827',
    },
});

export default function AddServicePage() {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        image: null,
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('desc', formData.desc);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:5500/api/v1/service', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('فشل في إضافة الخدمة.');
            }

            const data = await response.json();
            console.log('Response from server:', data);

            setNotification({
                open: true,
                message: 'تم إضافة الخدمة بنجاح!',
                severity: 'success'
            });

            // Reset form
            setFormData({ name: '', desc: '', image: null });
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error submitting service:', error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء إضافة الخدمة!',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="md">
            <AdminNavBar />

            <StyledPaper elevation={3}>
                <Typography variant="h4" color="#111827" gutterBottom>
                    إضافة خدمة جديدة
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />

                    <label htmlFor="image-upload">
                        <ImagePreview>
                            {previewUrl ? (
                                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '6px'
                                        }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            clearImage();
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center' }}>
                                    <UploadIcon sx={{ fontSize: 40, color: '#006c35', mb: 1 }} />
                                    <Typography color="#006c35">اختر صورة للخدمة</Typography>
                                </Box>
                            )}
                        </ImagePreview>
                    </label>

                    <TextField
                        fullWidth
                        label="اسم الخدمة"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="وصف الخدمة"
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        required
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#006c35',
                            '&:hover': {
                                backgroundColor: '#005128',
                            },
                        }}
                        disabled={loading}
                    >
                        {loading ? 'جاري الإضافة...' : 'إضافة الخدمة'}
                    </Button>
                </form>
            </StyledPaper>

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
        </Container>
    );
}