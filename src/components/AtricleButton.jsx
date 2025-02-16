// InteractiveButtons.jsx
"use client";

import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Phone, WhatsApp } from "@mui/icons-material";

const InteractiveButtons = ({ phone, whatsapp, slug }) => {
    console.log(phone,whatsapp,slug)
    const handleWhatsAppClick = async () => {
        try {
            await fetch(`http://localhost:5500/api/v1/articles/${slug}/whatsapp-click`, { method: "PATCH" });
        } catch (error) {
            console.error("Error updating WhatsApp clicks:", error);
        }
    };

    const handlePhoneClick = async () => {
        try {
            await fetch(`http://localhost:5500/api/v1/articles/${slug}/phone-click`, { method: "PATCH" });
        } catch (error) {
            console.error("Error updating Phone clicks:", error);
        }
    };

    return (
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            mb={3}
            alignItems="center"
        >
            <Typography variant='h6' sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {phone} <Phone />
            </Typography>
            <Button
                variant="contained"
                component="a"
                onClick={handlePhoneClick}
                href={`tel:${phone}`}
                sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    bgcolor: '#006C35',
                    '&:hover': { bgcolor: '#005829' },
                    width: { xs: '100%', md: 'auto' }
                }}
            >
                اتصل الآن: <Phone />
            </Button>
            <Button
                variant="contained"
                component="a"
                onClick={handleWhatsAppClick}
                href={`https://wa.me/${whatsapp}`}
                sx={{
                    fontSize: { xs: '0.875rem', md: '1.25rem' },
                    bgcolor: '#006C35',
                    '&:hover': { bgcolor: '#005829' },
                    width: { xs: '100%', md: 'auto' }
                }}
            >
                دردشة واتساب <WhatsApp />
            </Button>
        </Stack>
    );
};

export default InteractiveButtons;
