"use client"
import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    styled,
    CircularProgress
} from '@mui/material';
import {
    Article as ArticleIcon,
    Business as BusinessIcon,
    Build as BuildIcon,
    WhatsApp as WhatsAppIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import ProtectedComponent from '@/components/ProtectedComponent';

const StatCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0, 108, 53, 0.2)'
    },
    border: '1px solid rgba(255, 255, 255, 0.1)'
}));

export default function DashboardPage() {
    const [stats, setStats] = useState({
        articles: 0,
        companies: 0,
        services: 0,
  
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel
                const [articlesRes, servicesRes, companiesRes] = await Promise.all([
                    fetch('http://localhost:5500/api/v1/articles'),
                    fetch('http://localhost:5500/api/v1/service'),
                    fetch('http://localhost:5500/api/v1/company')
                ]);

                if (!articlesRes.ok || !servicesRes.ok || !companiesRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [articlesData, servicesData, companiesData] = await Promise.all([
                    articlesRes.json(),
                    servicesRes.json(),
                    companiesRes.json()
                ]);

                // Calculate total clicks
                const totalClicks = companiesData.data.reduce((acc, company) => ({
                    whatsapp: acc.whatsapp + (company.whatsappClicks || 0),
                    phone: acc.phone + (company.phoneClicks || 0)
                }), { whatsapp: 0, phone: 0 });

                setStats({
                    articles: articlesData.count || articlesData.data?.length || 0,
                    companies: companiesData.count || companiesData.data?.length || 0,
                    services: servicesData.count || servicesData.data?.length || 0,
                
                });

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const statsConfig = [
        { title: 'المقالات', count: stats.articles, icon: <ArticleIcon /> },
        { title: 'الشركات', count: stats.companies, icon: <BusinessIcon /> },
        { title: 'الخدمات', count: stats.services, icon: <BuildIcon /> },
      
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} sx={{ color: '#006c35' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="error">
                    خطأ في تحميل البيانات: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <ProtectedComponent>
            <Box sx={{ direction: 'rtl', p: 3 }}>
                <AdminSideBar />
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        color: '#111827',
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 700,
                        textAlign: 'right'
                    }}
                >
                    نظرة عامة
                </Typography>
                <Grid container spacing={2}>
                    {statsConfig.map((stat) => (
                        <Grid item xs={12} sm={6} md={4} key={stat.title}>
                            <StatCard>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2
                                    }}>
                                        <Box sx={{
                                            bgcolor: '#006c35',
                                            p: 2,
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {React.cloneElement(stat.icon, {
                                                sx: {
                                                    fontSize: 32,
                                                    color: '#fff'
                                                }
                                            })}
                                        </Box>
                                        <Box sx={{ textAlign: 'left' }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                    fontWeight: 500,
                                                    color: '#9CA3AF',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                {stat.title}
                                            </Typography>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                    fontWeight: 700,
                                                    color: '#fff'
                                                }}
                                            >
                                                {stat.count}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </StatCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ProtectedComponent>
      
    );
}