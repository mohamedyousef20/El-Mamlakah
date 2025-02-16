// app/page.jsx (or your server component file)
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Paper,
  createTheme,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import ServiceSection from '@/components/ServiceSection';
import { Email, Facebook, Instagram, Twitter, PhoneAndroid } from '@mui/icons-material';
import { Phone } from 'lucide-react';
import MainContent from '@/components/MainContent';
import YouTubeVideo from '@/components/VideoSection';
import AdminDashboardButton from '@/components/AdminDashboardButton';

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

const page = async () => {
  const res = await fetch("http://localhost:5500/api/v1/service");
  const data = await res.json();
  const services = data.data;
  console.log(services);

  return (
    <Container>
      <Box>
        {/* Top Bar: Contact and Social Media Section */}
        <Box bgcolor="background.default" py={{ xs: 1, md: 2 }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={{ xs: 1, md: 2 }}
            >
              {/* Contact Information */}
              <Stack
                direction={{ xs: "row", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                gap={2}
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#006C35', fontFamily: "'Tajawal', sans-serif", fontSize: ".75rem" }}
                >
                  <PhoneAndroid />009660534831302
                </Typography>
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#111827', fontFamily: "'Tajawal', sans-serif", fontSize: ".75rem" }}
                >
                  elmamlaka@company.com <Email />
                </Typography>
              </Stack>

              {/* Social Media Icons */}
              <Stack direction="row" spacing={1} sx={{ mt: { xs: 1, md: 2 } }}>
                <IconButton color="primary" size="small" sx={{ color: "#006C35" }}>
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small" sx={{ color: "#006C35" }}>
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small" sx={{ color: "#006C35" }}>
                  <Instagram fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

     
        <Box>
          <AdminDashboardButton />
        </Box>
        {/* Main Content Section */}
        <Container sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <MainContent />
          </Grid>
        </Container>

        <YouTubeVideo />

        {/* Service Section */}
        <ServiceSection services={services} />

        {/* Additional Modals (if any) */}
        <Box sx={{ display: 'none' }}>
          {/* Modal components rendered here */}
        </Box>
      </Box>
    </Container>
  );
};

export default page;
