"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Grid,
    IconButton,
    BottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    Paper
} from "@mui/material";
import {
    Home,
    Article,
    Build,
    Policy,
    Info,
    ContactPhone
} from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const IconNavBar = () => {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
    const [value, setValue] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { label: 'الرئيسية', icon: <Home />, href: '/' },
        { label: 'المقالات', icon: <Article />, href: '/articles' },
        { label: 'خدماتنا', icon: <Build />, href: '/service' },
        { label: 'الخصوصية', icon: <Policy />, href: '/policy' },
        { label: 'من نحن', icon: <Info />, href: '/about' },
        { label: 'اتصل بنا', icon: <ContactPhone />, href: '/contact' },
    ];

    if (!mounted || !isMobile) return null;

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: '#006c35',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                width: '100%'
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                sx={{
                    backgroundColor: 'transparent',
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    '& .MuiBottomNavigationAction-label': {
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontSize: '0.75rem',
                        mt: 0.5
                    }
                }}
            >
                {navItems.map((item, index) => (
                    <Link key={index} href={item.href} passHref legacyBehavior>
                        <BottomNavigationAction
                            label={item.label}
                            icon={item.icon}
                            sx={{
                                minWidth: 0,
                                flexGrow: 1,
                                px: 1,
                                color: '#fff',
                                '&.Mui-selected': {
                                    color: '#E9F5F0'
                                }
                            }}
                        />
                    </Link>
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default IconNavBar;