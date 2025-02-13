// This is a server component – do NOT include "use client" at the top.
import React from "react";
import { Box, Container, Typography } from "@mui/material";

// Define your slides with image paths and text content
const slides = [
  {
    image: "/images/slide1.jpg", // update image path if needed
    title: "مرحبا بكم في موقعنا",
    subtitle: "اكتشف أفضل الشركات والخدمات في المملكة",
  },
  {
    image: "/images/slide2.jpg",
    title: "حلول مبتكرة",
    subtitle: "نوفر لك أحدث التقنيات للعثور على شركاء النجاح",
  },
  {
    image: "/images/slide3.jpg",
    title: "جودة واحترافية",
    subtitle: "معايير عالية تضمن لك خدمات استثنائية",
  },
];

export default function HeroSliderServer() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: { xs: "50vh", md: "70vh" },
      }}
    >
      {/* Render each slide */}
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
            // CSS animation: total duration 15s, each slide delayed by 5s sequentially
            animation: `fade 15s infinite`,
            animationDelay: `${index * 5}s`,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {/* Overlay using a gradient with your chosen colors (#006c35 and #111827) */}
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
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {slide.title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {slide.subtitle}
            </Typography>
          </Container>
        </Box>
      ))}

      {/* Global CSS for keyframes animation */}
      <style jsx global>{`
        @keyframes fade {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          35% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
}
