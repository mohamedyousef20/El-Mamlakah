"use client";
import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    styled,
    Paper
} from '@mui/material';
import {
    DesignServices,
    Engineering,
    SupportAgent,
    CloudUpload,
    Security,
    Analytics
} from '@mui/icons-material';

const ServiceHero = styled(Box)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    padding: theme.spacing(8),
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #111827 60%, #006c35)',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4)
    }
}));

const ServiceCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'all 0.3s ease',
    border: '1px solid #e5e7eb',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0, 108, 53, 0.1)',
        borderColor: '#006c35'
    }
}));

const services = [
    {
        title: 'التصميم والتطوير',
        icon: <DesignServices />,
        description: 'تصميم وتطوير مواقع ويب وتطبيقات متكاملة تلبي احتياجات عملك'
    },
    {
        title: 'الحلول التقنية',
        icon: <Engineering />,
        description: 'حلول تقنية مبتكرة لتحويل أفكارك إلى واقع ملموس'
    },
    {
        title: 'الدعم الفني',
        icon: <SupportAgent />,
        description: 'دعم فني متكامل على مدار الساعة لضمان استمرارية عملك'
    },
    {
        title: 'الحوسبة السحابية',
        icon: <CloudUpload />,
        description: 'حلول سحابية آمنة وقابلة للتطوير حسب احتياجاتك'
    },
    {
        title: 'الأمن السيبراني',
        icon: <Security />,
        description: 'حماية بياناتك وأنظمتك من التهديدات الإلكترونية'
    },
    {
        title: 'التحليل والبيانات',
        icon: <Analytics />,
        description: 'تحليل البيانات واستخراج الرؤى لاتخاذ قرارات مدروسة'
    }
];

export default function ServicesPage() {
    return (
        <Box sx={{ direction: 'rtl' }}>
            {/* Hero Section */}
            <ServiceHero>
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontFamily: 'Almarai, sans-serif'
                    }}>
                        حلولنا التقنية المتكاملة
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: '#d1d5db',
                        mb: 4,
                        fontFamily: 'Almarai, sans-serif'
                    }}>
                        نقدم مجموعة واسعة من الخدمات التقنية لدعم نمو عملك الرقمي
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#006c35',
                            px: 6,
                            py: 1.5,
                            '&:hover': { bgcolor: '#005a2b' },
                            fontFamily: 'Almarai, sans-serif'
                        }}
                    >
                        ابدأ الآن
                    </Button>
                </Container>
            </ServiceHero>

            {/* Services Grid */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" sx={{
                    textAlign: 'center',
                    mb: 6,
                    color: '#111827',
                    fontFamily: 'Almarai, sans-serif',
                    fontWeight: 700
                }}>
                    خدماتنا الرئيسية
                </Typography>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ServiceCard>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{
                                        bgcolor: '#006c35',
                                        width: 56,
                                        height: 56,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3
                                    }}>
                                        {React.cloneElement(service.icon, {
                                            sx: { fontSize: 32, color: '#fff' }
                                        })}
                                    </Box>
                                    <Typography variant="h5" sx={{
                                        mb: 2,
                                        color: '#111827',
                                        fontFamily: 'Almarai, sans-serif',
                                        fontWeight: 700
                                    }}>
                                        {service.title}
                                    </Typography>
                                    <Typography sx={{
                                        color: '#6b7280',
                                        lineHeight: 1.6,
                                        fontFamily: 'Almarai, sans-serif'
                                    }}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </ServiceCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: '#111827', py: 8 }}>
                <Container maxWidth="lg">
                    <Paper sx={{
                        bgcolor: '#006c35',
                        color: '#fff',
                        borderRadius: '16px',
                        p: 6,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h4" sx={{
                            mb: 3,
                            fontFamily: 'Almarai, sans-serif',
                            fontWeight: 700
                        }}>
                            مستعد للبدء في مشروعك القادم؟
                        </Typography>
                        <Typography variant="h6" sx={{
                            mb: 4,
                            color: '#e5e7eb',
                            fontFamily: 'Almarai, sans-serif'
                        }}>
                            تواصل معنا اليوم لتنفيذ أفكارك بأفضل الحلول التقنية
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#fff',
                                color: '#006c35',
                                px: 6,
                                py: 1.5,
                                '&:hover': { bgcolor: '#f3f4f6' },
                                fontFamily: 'Almarai, sans-serif'
                            }}
                        >
                            اتصل بنا
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}