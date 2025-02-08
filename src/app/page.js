"use client";
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  DialogContentText,
  Drawer,
  Grid,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import ServiceSearchSection from '@/components/HomePage/ServiceSearchSection';
import HomePageAboutUs from '@/components/HomePage/HomePageAboutUs';
import ServiceSection from '@/components/HomePage/ServiceSection';
import Link from 'next/link';
import MainContent from '@/components/HomePage/MainContent';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#006C35',
    },
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Tajawal, sans-serif',
  },
});

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.down('md'));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseVideoModal = () => setOpenVideoModal(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Drawer content for mobile navigation
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontWeight: "bold",
          color: "#006C35",
          letterSpacing: "2px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        المملكة
      </Typography>

      <Stack spacing={2}>
        <Button color="inherit">الرئيسية</Button>
        <Button color="inherit">خدماتنا</Button>

        <Link href={'/articles'}>
          <Button color="inherit">المقالات</Button>
        </Link>
        <Button color="inherit" onClick={handleOpenModal}>من نحن</Button>
        <Button color="inherit">اتصل بنا</Button>
        <Button variant="contained" color="primary">
          تعرف علينا
        </Button>
      </Stack>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box dir="rtl">
        {/* Top Bar */}
        <Box bgcolor="background.paper" py={1}>
          <Container>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={{ xs: 1, sm: 0 }}
            >
              {/* Contact Information */}
              <Stack
                direction="row"
                spacing={2}
                mb={{ xs: 2, sm: 0 }}  // margin bottom on mobile
                alignItems="center"
                justifyContent="center"  // centers the content horizontally
              >
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#006C35', cursor: 'pointer' }}  // phone text color and pointer cursor
                >
                  <Phone sx={{ mr: 1 }} fontSize="small" />
                  +966 123 456 789
                </Typography>
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#333333', cursor: 'pointer' }}  // email text color and pointer cursor
                >
                  <Email sx={{ mr: 1 }} fontSize="small" />
                  info@company.com
                </Typography>
              </Stack>

              {/* Social Media Icons */}
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" size="small">
                  <Facebook />
                </IconButton>
                <IconButton color="primary" size="small">
                  <Twitter />
                </IconButton>
                <IconButton color="primary" size="small">
                  <Instagram />
                </IconButton>
                <IconButton color="primary" size="small">
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Navigation Bar */}
        <AppBar position="static" color="default" elevation={1}>
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h3"
                // align="center"
                sx={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: "bold",
                  color: "#006C35",
                  letterSpacing: "2px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  flexGrow: 1,
                }}
              >
                المملكة
              </Typography>


              {isMobile ? (
                <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button color="inherit">الرئيسية</Button>
                  <Button color="inherit">خدماتنا</Button>

                  <Link href={'/articles'}>
                    <Button color="inherit">المقالات</Button>
                  </Link>

                  <Button color="inherit" onClick={handleOpenModal}>من نحن</Button>
                  <Button color="inherit">اتصل بنا</Button>
                  <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    تعرف علينا
                  </Button>
                </Stack>
              )}
            </Toolbar>

          </Container>

        </AppBar>
        <ServiceSearchSection />

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Main Content with Aside */}
        <Container sx={{ my: 4 }}>
          <Grid container spacing={4}>

            <MainContent />
          </Grid>
        </Container>
        <ServiceSection />
        {/* Company Info Modal */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              من نحن
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography paragraph>
              نحن شركة رائدة في مجال [مجال الشركة] منذ عام [سنة التأسيس]. نسعى دائماً لتقديم أفضل الخدمات لعملائنا مع الحفاظ على أعلى معايير الجودة.
            </Typography>
            <Typography paragraph>
              رؤيتنا هي [الرؤية] ورسالتنا هي [الرسالة]. نحن نؤمن بـ [القيم].
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              إغلاق
            </Button>
          </DialogActions>
        </Dialog>

        {/* Video Modal */}
        <Dialog open={openVideoModal} onClose={handleCloseVideoModal} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              الفيديو التعريفي
              <IconButton onClick={handleCloseVideoModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" justifyContent="center" py={2}>
              <img
                src="/api/placeholder/640/360"
                alt="فيديو تعريفي"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseVideoModal} color="primary">
              إغلاق
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}