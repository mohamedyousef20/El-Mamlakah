"use client";

import React, { useState } from "react";
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
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAboutModal, setOpenAboutModal] = useState(false);

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
        { label: 'خدماتنا', href: '/api/services' },
        { label: 'المقالات', href: '/api/articles' },
        { label: 'سياسة الخصوصية', href: '/api/policy' },
        { label: 'من نحن', onClick: handleAboutModal },
        { label: 'اتصل بنا', href: '/api/contact' },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: '#111827',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{
                            flexDirection: "row",
                            py: isMobile ? 1 : 1.5,
                            justifyContent: "space-between",
                            background: 'linear-gradient(45deg, rgba(0, 108, 53, 0.3) 30%, rgba(17, 24, 39, 0.6) 90%)',


                        }}
                    >
                        {isMobile ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                                    <IconButton
                                        sx={{
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                            }
                                        }}
                                        aria-label="menu"
                                        onClick={handleMenuClick}
                                        size="large"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        sx: {
                                            backgroundColor: '#fff',
                                            width: '250px',
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
                                                style={{ textDecoration: 'none', color: '#111827' }}
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
                            </>
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
                                        <Link key={index} href={item.href} passHref>
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

            {/* About Modal */}
            <Dialog
                open={openAboutModal}
                onClose={handleAboutModal}
                TransitionComponent={Fade}
                transitionDuration={300}
                PaperProps={{
                    sx: {
                        maxWidth: '500px',
                        width: '100%',
                        m: 2,
                        position: 'relative'
                    }
                }}
            >
                <IconButton
                    onClick={handleAboutModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#111827',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 108, 53, 0.1)',
                            transform: 'rotate(90deg)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle>
                    <Typography
                        sx={{
                            color: '#111827',
                            fontWeight: 600,
                            fontSize: '1.5rem',
                            fontFamily: 'Cairo, Tajawal, sans-serif',
                            mb: 1
                        }}
                    >
                        من نحن
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        paragraph
                        sx={{
                            color: '#111827',
                            fontSize: '1.1rem',
                            fontFamily: 'Cairo, Tajawal, sans-serif',
                            lineHeight: 1.7
                        }}
                    >
                        نحن شركة رائدة في مجال [مجال الشركة] منذ عام [سنة التأسيس].
                        نسعى دائماً لتقديم أفضل الخدمات لعملائنا مع الحفاظ على أعلى معايير الجودة.
                    </Typography>
                    <Typography
                        sx={{
                            color: '#111827',
                            fontSize: '1.1rem',
                            fontFamily: 'Cairo, Tajawal, sans-serif',
                            lineHeight: 1.7
                        }}
                    >
                        رؤيتنا هي [الرؤية] ورسالتنا هي [الرسالة]. نحن نؤمن بـ [القيم].
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleAboutModal}
                        sx={{
                            color: '#006c35',
                            fontSize: '1rem',
                            fontFamily: 'Cairo, Tajawal, sans-serif',
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 108, 53, 0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        إغلاق
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NavBar;