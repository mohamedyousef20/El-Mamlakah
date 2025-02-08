
"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem, Box } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    // State for the "خدمات المؤسسة" dropdown menu
    const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
    const [subSubMenuAnchorEl, setSubSubMenuAnchorEl] = useState(null);

    // Open the "خدمات المؤسسة" dropdown menu
    const handleServicesMenuOpen = (event) => {
        setServicesAnchorEl(event.currentTarget);
    };

    // Close the "خدمات المؤسسة" dropdown menu
    const handleServicesMenuClose = () => {
        setServicesAnchorEl(null);
        setSubMenuAnchorEl(null);
        setSubSubMenuAnchorEl(null);
    };

    // Open the nested submenu
    const handleSubMenuOpen = (event) => {
        setSubMenuAnchorEl(event.currentTarget);
    };

    // Close the nested submenu
    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
    };

    // Open the nested sub-submenu
    const handleSubSubMenuOpen = (event) => {
        setSubSubMenuAnchorEl(event.currentTarget);
    };

    // Close the nested sub-submenu
    const handleSubSubMenuClose = () => {
        setSubSubMenuAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#006C35', direction: 'rtl' }}> {/* Primary Green */}
            <Container>
                <Toolbar sx={{ direction: 'rtl' }}>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif", // Arabic font
                        }}
                    >
                        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            المؤسسة
                        </Link>
                    </Typography>

                    {/* Navigation Links */}
                    <Button
                        color="inherit"
                        sx={{
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '&:hover': {
                                backgroundColor: '#004d00', // Darker green on hover
                            },
                        }}
                    >
                        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            الرئيسية
                        </Link>
                    </Button>

                    {/* خدمات المؤسسة Dropdown Menu */}
                    <Button
                        color="inherit"
                        sx={{
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '&:hover': {
                                backgroundColor: '#004d00', // Darker green on hover
                            },
                        }}
                        onClick={handleServicesMenuOpen}
                    >
                        خدمات المؤسسة
                    </Button>
                    <Menu
                        anchorEl={servicesAnchorEl}
                        open={Boolean(servicesAnchorEl)}
                        onClose={handleServicesMenuClose}
                        sx={{ direction: 'rtl' }}
                    >
                        <MenuItem
                            onMouseEnter={handleSubMenuOpen}
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة ١
                        </MenuItem>
                        <MenuItem
                            onMouseEnter={handleSubMenuOpen}
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة ٢
                        </MenuItem>
                        <MenuItem
                            onMouseEnter={handleSubMenuOpen}
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة ٣
                        </MenuItem>
                    </Menu>

                    {/* Nested Submenu */}
                    <Menu
                        anchorEl={subMenuAnchorEl}
                        open={Boolean(subMenuAnchorEl)}
                        onClose={handleSubMenuClose}
                        sx={{ direction: 'rtl', marginLeft: '16px' }} // Adjust margin for horizontal positioning
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <MenuItem
                            onMouseEnter={handleSubSubMenuOpen}
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة الفرعية ١
                        </MenuItem>
                        <MenuItem
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة الفرعية ٢
                        </MenuItem>
                    </Menu>

                    {/* Nested Sub-Submenu */}
                    <Menu
                        anchorEl={subSubMenuAnchorEl}
                        open={Boolean(subSubMenuAnchorEl)}
                        onClose={handleSubSubMenuClose}
                        sx={{ direction: 'rtl', marginLeft: '16px' }} // Adjust margin for horizontal positioning
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <MenuItem
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة الفرعية الفرعية ١
                        </MenuItem>
                        <MenuItem
                            sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                color: '#333333', // Dark Gray
                                '&:hover': {
                                    backgroundColor: '#F4F4F4', // Light Gray on hover
                                },
                            }}
                        >
                            الخدمة الفرعية الفرعية ٢
                        </MenuItem>
                    </Menu>

                    {/* Other Navigation Links */}
                    <Button
                        color="inherit"
                        sx={{
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '&:hover': {
                                backgroundColor: '#004d00', // Darker green on hover
                            },
                        }}
                    >
                        <Link href="/articles" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            المقالات
                        </Link>
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '&:hover': {
                                backgroundColor: '#004d00', // Darker green on hover
                            },
                        }}
                    >
                        <Link href="/about" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            عن المؤسسة
                        </Link>
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            color: 'white',
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '&:hover': {
                                backgroundColor: '#004d00', // Darker green on hover
                            },
                        }}
                    >
                        <Link href="/contact" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            إتصل بنا
                        </Link>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;