"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    MenuItem,
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
    Phone as PhoneIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import Link from 'next/link';
import ProtectedComponent from '@/components/ProtectedComponent';

const ServiceCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    padding: theme.spacing(2),
    border: '1px solid rgba(255,255,255,0.1)',
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

export default function ServicesPage() {
    const [services, setServices] = useState([]); // initially empty array
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5500/api/v1/service");
                if (!res.ok) {
                    throw new Error("فشل في تحميل الخدمات.");
                }
                const data = await res.json();
                setServices(data.data || []);
            } catch (error) {
                console.error("Error fetching services:", error);
                setNotification({
                    open: true,
                    message: error.message || 'حدث خطأ أثناء تحميل الخدمات!',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = (id) => {
        setServices(services.filter(service => service._id !== id));
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
                                الخدمات
                            </Typography>
                            <Link href="/admin/insert/service" passHref>
                                <StyledButton variant="contained" startIcon={<AddIcon />}>
                                    خدمة جديدة
                                </StyledButton>
                            </Link>
                        </Box>

                        {loading ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {services.map((service) => (
                                    <Grid item xs={12} sm={6} md={4} key={service._id}>
                                        <ServiceCard>
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
                                                    {service.name}
                                                </Typography>
                                                {service.email && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <EmailIcon sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                        <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                            {service.email}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {service.phone && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <PhoneIcon sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                        <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                            {service.phone}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {service.area && service.province && (
                                                    <Typography variant="body2" sx={{
                                                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                        mb: 1,
                                                        color: '#9CA3AF'
                                                    }}>
                                                        المنطقة: {service.area} - المحافظة: {service.province}
                                                    </Typography>
                                                )}
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: 1,
                                                    mt: 2
                                                }}>
                                                    <IconButton
                                                        sx={{ color: '#006c35' }}
                                                        onClick={() => {/* Handle edit action for service */ }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{ color: '#ef4444' }}
                                                        onClick={() => handleDelete(service._id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </ServiceCard>
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
      </ProtectedComponent>
    );
}
