import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AboutPage() {
    // Define your slides with image paths and text content
    const slides = [
        {
            image: "https://unsplash.com/photos/man-standing-beside-window-el0VzdWE6PE", // update image path if needed
            title: "مرحبا بكم في موقعنا",
            subtitle: "اكتشف أفضل الشركات والخدمات في المملكة",
        },
        {
            image: "https://unsplash.com/photos/a-couple-of-men-standing-next-to-each-other-on-a-floor-czcyP4hJ-MI",
            title: "حلول مبتكرة",
            subtitle: "نوفر لك أحدث التقنيات للعثور على شركاء النجاح",
        },
        {
            image: "/images/slide3.jpg",
            title: "جودة واحترافية",
            subtitle: "معايير عالية تضمن لك خدمات استثنائية",
        },
    ];

    return (
        <Box>
            {/* Hero Slider Section */}
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: { xs: "50vh", md: "70vh" },
                }}
            >
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0,
                            animation: `fade 15s infinite`,
                            animationDelay: `${index * 5}s`,
                            transition: "opacity 1s ease-in-out",
                        }}
                    >
                        {/* Overlay with gradient */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                    "linear-gradient(45deg, rgba(0,108,53,0.6) 30%, rgba(17,24,39,0.6) 90%)",
                            }}
                        />
                        <Container
                            sx={{
                                position: "relative",
                                zIndex: 2,
                                textAlign: "center",
                                color: "#fff",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                px: 2,
                            }}
                        >
                            <Typography variant="h3" sx={{
                                fontWeight: "bold",
                                fontFamily: "'Noto Kufi Arabic', sans-serif",
                            }}>
                                {slide.title}
                            </Typography>
                            <Typography variant="h5"
                                sx={{
                                    mt: 2,
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",


                                }}>
                                {slide.subtitle}
                            </Typography>
                        </Container>
                    </Box>
                ))}
            </Box>

            {/* Content Section */}
            <Container sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    sx={{ color: "#111827", mb: 2, textAlign: "center" }}
                >
                    من نحن
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "#111827",
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        textAlign: "justify",
                    }}
                >
                    شركة المملكة هي منصة مبتكرة توفر معلومات شاملة وموثوقة عن الشركات التي
                    تقدم خدمات متنوعة في المملكة العربية السعودية. نسعى لتوفير بيانات دقيقة تشمل
                    تقييمات العملاء وآراء الخبراء لضمان اختيار أفضل الشركات والخدمات.
                </Typography>

                {/* قسم الرؤية والهدف */}
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: "#111827", mb: 1, fontWeight: "bold", textAlign: "center" }}
                    >
                        رؤيتنا
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#111827",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            textAlign: "justify",
                        }}
                    >
                        رؤيتنا هي أن نصبح المصدر الأول للمعلومات المتخصصة حول الشركات والخدمات
                        في المملكة، حيث نوفر منصة متطورة تمكن العملاء من اتخاذ قرارات مستنيرة واختيار
                        أفضل مقدمي الخدمات، مما يسهم في تعزيز التنمية المستدامة في السوق السعودي.
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: "#111827", mb: 1, fontWeight: "bold", textAlign: "center" }}
                    >
                        هدفنا
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#111827",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            textAlign: "justify",
                        }}
                    >
                        هدفنا هو تقديم معلومات دقيقة وموثوقة تساعد العملاء على الوصول إلى أفضل
                        الشركات والخدمات في المملكة، من خلال تحديث مستمر لبيانات السوق وضمان الشفافية
                        والثقة في كل عملية بحث واختيار.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
} 