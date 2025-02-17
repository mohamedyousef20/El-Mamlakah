"use client";

import React, { useEffect, useState } from 'react';
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
import AdminNavBar from '@/components/AdminSideBar';
import { API_BASE_URL } from '@/lib/apiConfig';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: '8px',
}));

export default function AddCompanyPage() {
    // تعريف المناطق والمحافظات
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

    // حالة الخدمات المُسترجعة
    const [services, setServices] = useState([]);
    // حالة الخطأ عند جلب الخدمات
    const [error, setError] = useState('');
    // حالة التحميل
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/service`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data?.data ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // حالة بيانات النموذج
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        service: '',
        area: '',
        province: '',
    });

    // حالة الإشعارات
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // استخراج أسماء المناطق من الكائن regions
    const areas = Object.keys(regions);
    // استخراج المحافظات بناءً على المنطقة المحددة
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

            // إجراء الاتصال بواجهة API لإضافة الشركة
            const response = await fetch(`${API_BASE_URL}/api/v1/company`, {
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
            setNotification({
                open: true,
                message: 'تم إضافة الشركة بنجاح!',
                severity: 'success'
            });

            // إعادة تعيين بيانات النموذج
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
            <AdminNavBar />
            <StyledPaper elevation={3}>
                <Typography variant="h4" color="#111827" gutterBottom>
                    إضافة شركة جديدة
                </Typography>

                {/* عرض رسالة الخطأ إذا حدث أثناء جلب الخدمات */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

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
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="رقم الهاتف"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="رقم الواتساب"
                                value={formData.whatsapp}
                                onChange={(e) =>
                                    setFormData({ ...formData, whatsapp: e.target.value })
                                }
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="الخدمة"
                                value={formData.service}
                                onChange={(e) =>
                                    setFormData({ ...formData, service: e.target.value })
                                }
                                required
                            >
                                {services.map((service) => (
                                    <MenuItem key={service._id} value={service._id}>
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
                                    setFormData({
                                        ...formData,
                                        area: e.target.value,
                                        province: '',
                                    })
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
                                onChange={(e) =>
                                    setFormData({ ...formData, province: e.target.value })
                                }
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
