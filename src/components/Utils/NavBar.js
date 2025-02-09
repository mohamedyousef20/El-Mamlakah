"use client";

import React, { useState } from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Stack,
    Button,
    useMediaQuery,
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
    Slide,
    Fade,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ServiceSearchSection from "../HomePage/ServiceSearchSection";

const NavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAboutModal, setOpenAboutModal] = useState(false);
    const [openSearchSection, setOpenSearchSection] = useState(false);

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

    const handleSearchSection = () => {
        handleMenuClose();
        setOpenSearchSection(!openSearchSection);
    };

    const navItems = [
        { label: 'الرئيسية', href: '/' },
        { label: 'خدماتنا', href: '/services' },
        { label: 'المقالات', href: '/articles' },
        { label: 'سياسة الخصوصية', href: '/policy' },
        { label: 'من نحن', onClick: handleAboutModal },
        { label: 'اتصل بنا', href: '/contact' },
    ];

    return (
        <>
            <AppBar position="static" color="default" elevation={1}>
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{
                            flexDirection: "row",
                            py: isMobile ? 1 : 0,
                            justifyContent: "space-between"
                        }}
                    >
                        {isMobile ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 20 ,justifyContent:'space-around'}}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={handleMenuClick}
                                        size="large"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleSearchSection}
                                        startIcon={<SearchIcon />}
                                        sx={{
                                            minWidth: "120px",
                                            fontSize: '0.75rem',
                                            padding: '4px 8px'
                                        }}
                                    >
                                        ابحث عن خدمة
                                    </Button>
                                </Box>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    TransitionComponent={Slide}
                                    sx={{
                                        '& .MuiList-root': {
                                            py: 0,
                                        },
                                        '& .MuiMenuItem-root': {
                                            minHeight: '40px',
                                        }
                                    }}
                                >
                                    {navItems.map((item, index) => (
                                        item.href ? (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                passHref
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                <MenuItem onClick={handleMenuClose}>
                                                    {item.label}
                                                </MenuItem>
                                            </Link>
                                        ) : (
                                            <MenuItem
                                                key={index}
                                                onClick={item.onClick}
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
                                    justifyContent: "space-between"
                                }}
                            >
                                <Stack direction="row" spacing={2}>
                                    {navItems.map((item, index) => (
                                        item.href ? (
                                            <Link key={index} href={item.href} passHref>
                                                <Button color="inherit" size="medium">
                                                    {item.label}
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                key={index}
                                                color="inherit"
                                                size="medium"
                                                onClick={item.onClick}
                                            >
                                                {item.label}
                                            </Button>
                                        )
                                    ))}
                                </Stack>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={handleSearchSection}
                                    startIcon={<SearchIcon />}
                                >
                                    ابحث عن خدمة
                                </Button>
                            </Stack>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* About Modal */}
            <Dialog
                open={openAboutModal}
                onClose={handleAboutModal}
                TransitionComponent={Fade}
                transitionDuration={300}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        من نحن
                        <IconButton onClick={handleAboutModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography paragraph>
                        نحن شركة رائدة في مجال [مجال الشركة] منذ عام [سنة التأسيس].
                        نسعى دائماً لتقديم أفضل الخدمات لعملائنا مع الحفاظ على أعلى معايير الجودة.
                    </Typography>
                    <Typography>
                        رؤيتنا هي [الرؤية] ورسالتنا هي [الرسالة]. نحن نؤمن بـ [القيم].
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAboutModal} color="primary">
                        إغلاق
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Search Section */}
            <Slide direction="down" in={openSearchSection} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        zIndex: 1200,
                        p: 2
                    }}
                >
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <IconButton onClick={handleSearchSection} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {/* Add your ServiceSearchSection component here */}
                            <ServiceSearchSection />


                    </Container>
                </Box>
            </Slide>
        </>
    );
};

export default NavBar;