"use client";

import React, { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    styled,
    useMediaQuery
} from '@mui/material';
import {
    Menu as MenuIcon,
    Article as ArticleIcon,
    Business as BusinessIcon,
    Build as BuildIcon,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#006c35',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: '#fff'
        }
    },
    '&.Mui-selected': {
        backgroundColor: '#006c35',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: '#fff'
        }
    }
}));

export default function AdminNavBar({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');

    const menuItems = [
        { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/admin/dashboard/overview' },
        { text: 'المقالات', icon: <ArticleIcon />, path: '/admin/dashboard/articles' },
        { text: 'الشركات', icon: <BusinessIcon />, path: '/admin/dashboard/companies' },
        { text: 'الخدمات', icon: <BuildIcon />, path: '/admin/dashboard/services' },
    ];

    const drawer = (
        <Box sx={{
            width: 240,
            bgcolor: '#111827',
            color: '#fff',
            height: '100%',
            direction: 'rtl'
        }}>
            <Toolbar sx={{ minHeight: '64px!important' }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#fff',
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 600
                    }}
                >
                    القائمة
                </Typography>
            </Toolbar>
            <Divider sx={{ bgcolor: '#ffffff20' }} />
            <List sx={{ p: 2 }}>
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StyledListItem button>
                            <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                    fontWeight: 500
                                }}
                            />
                        </StyledListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: '#111827',
                    boxShadow: 'none',
                    borderBottom: '1px solid #ffffff20'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', direction: 'rtl' }}>
                    {/* Home Page Link */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "'Noto Kufi Arabic', sans-serif",
                                fontWeight: 700,
                                color: '#fff'
                            }}
                        >
                            الذهاب الى الموقع
                        </Typography>
                    </Link>

                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ color: '#fff' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            flexGrow: 1,
                            justifyContent: 'flex-end'
                        }}>
                            {menuItems.map((item) => (
                                <Link href={item.path} key={item.text} style={{ textDecoration: 'none' }}>
                                    <StyledListItem button sx={{ width: 'auto' }}>
                                        <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                fontWeight: 500,
                                                color: '#fff'
                                            }}
                                        />
                                    </StyledListItem>
                                </Link>
                            ))}
                        </Box>
                    )}

                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                            fontWeight: 700,
                            color: '#fff'
                        }}
                    >
                        نظام الإدارة
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    anchor="right"
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Render children (e.g., page content) */}
            <Box sx={{ mt: '64px' }}>
                {children}
            </Box>
        </Box>
    );
}
