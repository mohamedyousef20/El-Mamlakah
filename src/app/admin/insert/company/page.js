"use client";

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Container,
    Alert,
    MenuItem,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: '8px',
}));

export default function AddCompanyPage() {
    // Define regions and their corresponding provinces
    const regions = {
        "منطقة الرياض": ["الرياض", "الخرج", "الدوادمي", "الزلفي", "المجمعة"],
        "منطقة مكة": ["مكة المكرمة", "جدة", "الطائف", "القنفذة"],
        "المنطقة الشرقية": ["الدمام", "الخبر", "الأحساء", "الجبيل"],
        "منطقة المدينة": ["المدينة المنورة", "ينبع"],
        "منطقة عسير": ["أبها", "خميس مشيط", "بلجرشي"],
        "منطقة تبوك": ["تبوك", "دوبة", "العمورة"],
        "منطقة حائل": ["حائل", "القريات", "شعلان"],
        "منطقة الحدود الشمالية": ["عرعر", "رفحاء"],
        "منطقة جازان": ["جازان", "صبيا", "أبو عريش"],
        "منطقة نجران": ["نجران", "شرورة"],
        "منطقة الباحة": ["الباحة", "المخوة"],
        "منطقة الجوف": ["سكاكا", "دومة الجندل"],
        "منطقة القصيم": ["بريدة", "عنيزة", "الزبيدة", "القناطر"],
    };

    // Sample services array; later you can fetch these from an API
    const [services, setServices] = useState([
        { id: 1, name: 'خدمة 1' },
        { id: 2, name: 'خدمة 2' },
    ]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        service: '',
        area: '',
        province: '',
    });
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Get area names from regions object keys
    const areas = Object.keys(regions);
    // Get provinces for selected area
    const provinces = formData.area ? regions[formData.area] : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const companyData = {
                name: formData.name,
                phone: formData.phone,
                whatsapp: formData.whatsapp,
                service: formData.service,
                area: formData.area,
                province: formData.province,
            };

            // API call
            const response = await fetch('http://localhost:5500/api/v1/company', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyData)
            });

            if (!response.ok) {
                throw new Error("فشل في إضافة الشركة.");
            }

            const data = await response.json();
            console.log("Response from server:", data);
            setNotification(prev => ({ ...prev, open: false })); // Close first to trigger re-render
            setTimeout(() => {
                setNotification({
                    open: true,
                    message: 'تم إضافة الشركة بنجاح!',
                    severity: 'success'
                });
            }, 100); // Delay opening


            // Reset form
            setFormData({
                name: '',
                phone: '',
                whatsapp: '',
                service: '',
                area: '',
                province: '',
            });
        } catch (error) {
            console.error("Error submitting company:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء إضافة الشركة!',
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
            <StyledPaper elevation={3}>
                <Typography variant="h4" color="#111827" gutterBottom>
                    إضافة شركة جديدة
                </Typography>

                {notification.open && (
                    <Alert
                        severity={notification.severity}
                        sx={{ mb: 2 }}
                        onClose={handleCloseNotification}
                    >
                        {notification.message}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="اسم الشركة"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="رقم الهاتف"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="رقم الواتساب"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="الخدمة"
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                required
                            >
                                {services.map((service) => (
                                    <MenuItem key={service.id} value={service.id}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="المنطقة"
                                value={formData.area}
                                onChange={(e) =>
                                    setFormData({ ...formData, area: e.target.value, province: '' })
                                }
                                required
                            >
                                {areas.map((area) => (
                                    <MenuItem key={area} value={area}>
                                        {area}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="المحافظة"
                                value={formData.province}
                                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                required
                                disabled={!formData.area}
                            >
                                {provinces.map((province) => (
                                    <MenuItem key={province} value={province}>
                                        {province}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    backgroundColor: '#006c35',
                                    '&:hover': {
                                        backgroundColor: '#005128',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? 'جاري الإضافة...' : 'إضافة الشركة'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
        </Container>
    );
}
