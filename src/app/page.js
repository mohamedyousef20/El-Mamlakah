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
  Close as CloseIcon,
} from '@mui/icons-material';
import ServiceSearchSection from '@/components/HomePage/ServiceSearchSection';
import HomePageAboutUs from '@/components/HomePage/HomePageAboutUs';
import ServiceSection from '@/components/HomePage/ServiceSection';
import Link from 'next/link';
import MainContent from '@/components/HomePage/MainContent';
import NavBar from '@/components/Utils/NavBar';
import AnimatedLogo from '@/components/Utils/AnimatedLogo';

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
    // Responsive font sizes
    h3: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
    button: {
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
    },
  },
});

export default function HomePage() {

  const [openModal, setOpenModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.down('md'));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseVideoModal = () => setOpenVideoModal(false);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box dir="rtl">
        {/* Logo Section */}
        <Box bgcolor="background.paper" py={isMobile ? 2 : 3} textAlign="center">
          <Container maxWidth="lg">
            <AnimatedLogo />
          </Container>
        </Box>

        {/* Contact and Social Media Section */}
        <Box bgcolor="background.default" py={isMobile ? 1 : 2}>
          <Container maxWidth="lg">
            <Stack
              direction={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={isMobile ? 1 : 2}
            >
              {/* Contact Information */}
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={isMobile ? 1 : 2}
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#006C35' }}
                >
                  <Phone sx={{ mr: 0.5, fontSize: isMobile ? '0.8rem' : '1rem' }} />
                  +966 123 456 789
                </Typography>
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#333333' }}
                >
                  <Email sx={{ mr: 0.5, fontSize: isMobile ? '0.8rem' : '1rem' }} />
                  info@company.com
                </Typography>
              </Stack>

              {/* Social Media Icons */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: isMobile ? 1 : 0 }}
              >
                <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                  <Facebook fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
                <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                  <Twitter fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
                <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                  <Instagram fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
                <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                  <LinkedIn fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <NavBar />


        {/* Main Content */}
        <Container sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <MainContent />
          </Grid>
        </Container>

        <ServiceSection />

        {/* Modals */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              m: isMobile ? 2 : 4
            }
          }}
        >
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

        <Dialog
          open={openVideoModal}
          onClose={handleCloseVideoModal}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              m: isMobile ? 2 : 4
            }
          }}
        >
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