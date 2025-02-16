"use client";

import React, { useState, useEffect } from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Stack,
    Button,
    useTheme,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Fade,
    useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from "./Logo";

const NavBar = () => {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAboutModal, setOpenAboutModal] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAboutModal = () => {
        handleMenuClose();
        setOpenAboutModal(!openAboutModal);
    };

    const navItems = [
        { label: 'الرئيسية', href: '/' },
        { label: 'خدماتنا', href: '/service' },
        { label: 'المقالات', href: '/articles' },
        { label: 'سياسة الخصوصية', href: '/policy' },
        { label: 'من نحن', href:'/about' },
        { label: 'اتصل بنا', href: '/contact' },
    ];

    if (!mounted) return null;

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    background: 'linear-gradient(45deg, rgba(0,108,53,0.3) 20%, rgba(17,24,39,0.6) 90%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor:'pointer'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{
                            flexDirection: "row",
                            py: isMobile ? 1 : 1.5,
                            justifyContent: "space-between",
                        }}
                    >
                        {isMobile ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                                <IconButton
                                    sx={{
                                        color: '#fff',
                                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                                    }}
                                    aria-label="menu"
                                    onClick={handleMenuClick}
                                    size="large"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }}
                            >
                                {navItems.map((item, index) => (
                                    item.href ? (
                                        <Link key={index} href={item.href} passHref legacyBehavior>
                                            <Button
                                                sx={{
                                                    color: '#fff',
                                                    fontSize: '1.1rem',
                                                    fontFamily: 'Cairo, Tajawal, sans-serif',
                                                    fontWeight: 500,
                                                    padding: '8px 16px',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            key={index}
                                            onClick={item.onClick}
                                            sx={{
                                                color: '#fff',
                                                fontSize: '1.1rem',
                                                fontFamily: 'Cairo, Tajawal, sans-serif',
                                                fontWeight: 500,
                                                padding: '8px 16px',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                ))}
                            </Stack>
                        )}

                        <Logo />

                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Menu */}
            {mounted && isMobile && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: '#fff',
                            width: '300px',
                            mt: 1
                        }
                    }}
                >
                    {navItems.map((item, index) => (
                        item.href ? (
                            <Link
                                key={index}
                                href={item.href}
                                passHref
                                legacyBehavior
                            >
                                <MenuItem
                                    onClick={handleMenuClose}
                                    sx={{
                                        py: 1.5,
                                        fontFamily: 'Cairo, Tajawal, sans-serif',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 108, 53, 0.1)',
                                            paddingLeft: '24px'
                                        }
                                    }}
                                >
                                    {item.label}
                                </MenuItem>
                            </Link>
                        ) : (
                            <MenuItem
                                key={index}
                                onClick={item.onClick}
                                sx={{
                                    py: 1.5,
                                    color: '#111827',
                                    fontFamily: 'Cairo, Tajawal, sans-serif',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 108, 53, 0.1)',
                                        paddingLeft: '24px'
                                    }
                                }}
                            >
                                {item.label}
                            </MenuItem>
                        )
                    ))}
                </Menu>
            )}

          
        </>
    );
};

export default NavBar;