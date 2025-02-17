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
import ServiceSection from '@/components/ServiceSection';
import { Email, Facebook, Instagram, LinkedIn, PhoneAndroid, Twitter } from '@mui/icons-material';
import { Phone } from 'lucide-react';
import MainContent from '@/components/MainContent';
import YouTubeVideo from '@/components/VideoSection';
import AdminDashboardButton from '@/components/AdminDashboardButton';
import { API_BASE_URL } from '@/lib/apiConfig';


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
  let services = {};
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/service`);
    if (!res.ok) {
      throw new Error("فشل في التحميل .");

    }
    const data = await res.json();
    services = data.data;

  } catch (error) {
    throw new Error("فشل في التحميل .");

  }

  console.log(services)

  return (
    <Container>
      <Box >
        {/* Logo Section */}
        {/* <Box bgcolor="background.paper" py={{ xs: 2, md: 3 }} textAlign="center">
        <Container maxWidth="lg">
          <Logo />
        </Container>
      </Box> */}

        {/* Contact and Social Media Section */}
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
                  {/* Replace the following with an icon if needed */}
                  <PhoneAndroid />+966 123 456 789
                </Typography>
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#111827', fontFamily: "'Tajawal', sans-serif", fontSize: ".75rem" }}
                >
                  elmamlaka@gmail.com<Email />
                </Typography>
              </Stack>

              {/* Social Media Icons */}
              <Stack direction="row" spacing={1} sx={{ mt: { xs: 1, md: 2 } }}>
                <IconButton color="primary" size="small" sx={{ color: "#006c35" }}>
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small" sx={{ color: "#006c35" }}>
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton color="primary" size="small" sx={{ color: "#006c35" }}>
                  <Instagram fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <AdminDashboardButton />
        {/* Main Content (Placeholder) */}
        <Container sx={{ my: 4 }}>
          <Grid container spacing={4}>

            <MainContent />
          </Grid>
        </Container>

        <YouTubeVideo />
        {/* Service Section */}
        <ServiceSection services={services} />

        {/* Modals would normally be interactive. As a server component, they render in their closed state. */}
        <Box sx={{ display: 'none' }}>
          {/* For example, if you had a modal component, you would render it here as closed or handled by a client component */}
        </Box>
      </Box>
    </Container>

  )
}

export default page
