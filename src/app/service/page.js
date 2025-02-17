"use client";
import React, { memo } from "react";
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
} from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BugReportIcon from '@mui/icons-material/BugReport';
import PoolIcon from '@mui/icons-material/Pool';
import AirIcon from '@mui/icons-material/Air';
import WeekendIcon from '@mui/icons-material/Weekend';
import { CarRental } from "@mui/icons-material";
import Link from "next/link";

const services = [
    {
        title: 'تنظيف وتعقيم المنازل والفلل والقصور',
        icon: <CleaningServicesIcon />,
        description:
            'برامج مصممة للوصل لاعلي درجات الدقة في اعمال التنظيف والتعقيم والتطهير باستخدام افضل مواد التنظيف مع عناية تامة لكافة مقتنياتك'
    },
    {
        title: 'خدمات مكافحة الحشرات والقوارض',
        icon: <BugReportIcon />,
        description:
            'نقدم لك كافة خدمات المكافحة ضد الحشرات والقوارض باستخدام واتباع افضل الطرق والوسائل للوصول الي رضاك التام في أوقات قياسية'
    },
    {
        title: 'تنظيف الخزانات والاحواض',
        icon: <PoolIcon />,
        description:
            'عمالة مخصصة للقيام بتنظيف الخزانات واحواض السباحة بافضل الوسائل'
    },
    {
        title: 'تنظيف المكيفات والستائر والسجاد',
        icon: <AirIcon />,
        description:
            'باستخدام البخار كعامل اساسي في عملية التنظيف ستحصل علي النظافة والحماية من الجراثيم'
    },
    {
        title: 'تنظيف المجالس والكنب',
        icon: <WeekendIcon />,
        description:
            'استخدام واتباع افضل الطرق والاساليب في تنظيف المجالس والكنب للوصول لاعلي درجات الدقة'
    },
    {
        title: 'تنظيف وتعقيم السيارات',
        icon: <CarRental />,
        description:
            'تنظيف وتعقيم السيارات في المكان المطلوب باحدث تقنيات التنظيف والتعقيم وباستخدام البخار'
    }
];

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

const StyledButton = styled(Button)({
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    fontWeight: 600,
    backgroundColor: '#006c35',
    '&:hover': {
        backgroundColor: '#005a2b'
    }
});

const ServicesPage = () => {
    return (
        <Box sx={{ direction: 'rtl' }}>
            {/* Hero Section */}
            <ServiceHero>
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontFamily: 'Almarai, sans-serif'
                        }}
                    >
                        المملكة لخدمات التنظيف
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#d1d5db',
                            mb: 4,
                            fontFamily: 'Almarai, sans-serif'
                        }}
                    >
                        أفضل خدمات التنظيف والتعقيم للمنازل، المكاتب، والسيارات
                    </Typography>
                    <Link href={'/contact'}>
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
                            اتصل بنا
                        </Button>
                    </Link>
                </Container>
            </ServiceHero>

            {/* Services Grid */}
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        color: '#111827',
                        fontFamily: 'Almarai, sans-serif',
                        fontWeight: 700
                    }}
                >
                    الخدمات
                </Typography>

                <Grid container spacing={2}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ServiceCard>
                                <CardContent sx={{ p: 4 }}>
                                    <Box
                                        sx={{
                                            bgcolor: '#006c35',
                                            width: 56,
                                            height: 56,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3
                                        }}
                                    >
                                        {React.cloneElement(service.icon, {
                                            sx: { fontSize: 32, color: '#fff' }
                                        })}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 2,
                                            color: '#111827',
                                            fontFamily: 'Almarai, sans-serif',
                                            fontWeight: 700
                                        }}
                                    >
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#6b7280',
                                            lineHeight: 1.6,
                                            fontFamily: 'Almarai, sans-serif'
                                        }}
                                    >
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </ServiceCard>
                        </Grid>
                    ))}
                </Grid>
                {/* CTA Section */}
                <Box sx={{ bgcolor: '#111827', py: 8, my: 5 }}>
                    <Container maxWidth="lg">
                        <Paper
                            sx={{
                                bgcolor: '#006c35',
                                color: '#fff',
                                mt: 5,
                                borderRadius: '16px',
                                p: 6,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 3,
                                    fontFamily: 'Almarai, sans-serif',
                                    fontWeight: 700
                                }}
                            >
                                هل تحتاج إلى خدمة تنظيف احترافية؟
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    color: '#e5e7eb',
                                    fontFamily: 'Almarai, sans-serif'
                                }}
                            >
                                تواصل معنا الآن للحصول على أفضل خدمات التنظيف والتعقيم بأسعار تنافسية
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
            </Container>
        </Box>
    );
};

export default memo(ServicesPage);
