"use client";
import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    styled,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { Phone, Email, LocationOn, WhatsApp } from '@mui/icons-material';
// Load Almarai font from Next.js
import { Almarai } from 'next/font/google';
const almarai = Almarai({
    weight: ['300', '400', '700'],
    subsets: ['arabic'],
    display: 'swap',
});

const ContactSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(6),
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    fontFamily: almarai.style.fontFamily,
}));

const ContactCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    padding: theme.spacing(2),
    borderRadius: '12px',
    height: '100%',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)'
    },
    fontFamily: almarai.style.fontFamily,
}));

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, to: 'mohamedyousefle@gmail.com' })
            });
            if (!response.ok) throw new Error('Failed to send message');
            setNotification({
                open: true,
                message: 'تم إرسال الرسالة بنجاح!',
                severity: 'success'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء إرسال الرسالة!',
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
        <Container>
            <Box sx={{ bgcolor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#111827',
                            mb: 6,
                            textAlign: 'center',
                            fontWeight: 700,
                            fontFamily: "'Noto Kufi Arabic', sans-serif"
                        }}
                    >
                        تواصل معنا
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Contact Information */}
                        <Grid item xs={12} md={6}>
                            <ContactCard elevation={2}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        color: '#006c35',
                                        fontWeight: 600,
                                        fontFamily: "'Noto Kufi Arabic', sans-serif"
                                    }}
                                >
                                    معلومات التواصل
                                </Typography>

                                {/* Phone - click to call */}
                                <a href="tel:009660534831302" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Box sx={{
                                            bgcolor: '#006c35',
                                            borderRadius: '50%',
                                            p: 1.5,
                                            mr: 2,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Phone sx={{ color: '#fff', fontSize: 28 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                                                الهاتف
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                                009660534831302
                                            </Typography>
                                        </Box>
                                    </Box>
                                </a>

                                {/* WhatsApp - click to open chat */}
                                <a href="https://wa.me/9660534831302" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Box sx={{
                                            bgcolor: '#006c35',
                                            borderRadius: '50%',
                                            p: 1.5,
                                            mr: 2,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <WhatsApp sx={{ color: '#fff', fontSize: 28 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                                                الواتس آب
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                                9660534831302
                                            </Typography>
                                        </Box>
                                    </Box>
                                </a>

                                {/* Email */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{
                                        bgcolor: '#006c35',
                                        borderRadius: '50%',
                                        p: 1.5,
                                        mr: 2,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Email sx={{ color: '#fff', fontSize: 28 }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                                            البريد الإلكتروني
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: '#fff' }}>
                                            info@example.com
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Location */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{
                                        bgcolor: '#006c35',
                                        borderRadius: '50%',
                                        p: 1.5,
                                        mr: 2,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <LocationOn sx={{ color: '#fff', fontSize: 28 }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                                            العنوان
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: '#fff' }}>
                                            الرياض، المملكة العربية السعودية
                                        </Typography>
                                    </Box>
                                </Box>
                            </ContactCard>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={6}>
                            <ContactSection>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        label="الاسم الكامل"
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        sx={{ mb: 3 }}
                                        InputLabelProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        InputProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        label="البريد الإلكتروني"
                                        variant="outlined"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        sx={{ mb: 3 }}
                                        InputLabelProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        InputProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        label="الموضوع"
                                        variant="outlined"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        sx={{ mb: 3 }}
                                        InputLabelProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        InputProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        label="الرسالة"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        sx={{ mb: 3 }}
                                        InputLabelProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        InputProps={{ style: { fontFamily: almarai.style.fontFamily } }}
                                        required
                                    />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        disabled={loading}
                                        sx={{
                                            bgcolor: '#006c35',
                                            fontFamily: almarai.style.fontFamily,
                                            '&:hover': { bgcolor: '#005a2b' },
                                            '&.Mui-disabled': { bgcolor: '#004422' }
                                        }}
                                    >
                                        {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                                    </Button>
                                </form>
                            </ContactSection>
                        </Grid>
                    </Grid>
                </Container>

                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseNotification}
                        severity={notification.severity}
                        sx={{ fontFamily: almarai.style.fontFamily }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default ContactForm;
