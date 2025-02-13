import React from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Stack,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import { Phone, WhatsApp } from '@mui/icons-material';

const theme = createTheme({
  direction: 'rtl',
  fontFamily: "'Noto Kufi Arabic', sans-serif",

  palette: {
    primary: {
      main: '#006C35', // Primary Green
    },
    background: {
      default: '#F4F4F4', // Light Gray
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#666666', // Slightly lighter gray
    },
  },
  typography: {
    fontFamily: "'Noto Kufi Arabic', sans-serif",
  },
});




const oneArticle = async ({ params }) => {
  const { slug } = params; // Access the dynamic route parameter (slug)
  // Fetch the specific article from the API
  const res = await fetch(`http://localhost:5500/api/v1/articles/${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const article = data.data;
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={12}>
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Buttons for Call & WhatsApp */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              justifyContent="space-between"
              mb={3}
              alignItems="center"
            >
              <Typography variant='h6' sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {article.company.phone} <Phone />
              </Typography>
              <Button
                variant="contained"
                component="a"
                href={`tel:${article.company.phone}`}
                sx={{
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  bgcolor: '#006C35',
                  '&:hover': { bgcolor: '#005829' },
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                اتصل الآن: <Phone />
              </Button>
           
              <Button
                variant="contained"
                component="a"
                href={`https://wa.me/${article.company.whatsapp}`}
                sx={{
                  fontSize: { xs: '0.875rem', md: '1.25rem' },
                  bgcolor: '#006C35',
                  '&:hover': { bgcolor: '#005829' },
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                دردشة واتساب <WhatsApp />
              </Button>
            </Stack>

            {/* Article Title */}
            <Typography variant="h1" sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 3,
              color: '#006C35',
              fontWeight: 700
            }}>
              {article.title}
            </Typography>

            {/* Table of Contents */}
            <Box mb={3}>
              <Typography variant="h6" sx={{
                mb: 2,
                color: '#006C35',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}>
                محتويات المقال
              </Typography>
              <List>
                {article.paragraphs?.map((section) => (
                  <ListItem
                    key={section.id}
                    component="a"
                    href={`#${section._id}`}
                    sx={{
                      color: '#333333',
                      textAlign:"right",
                      textDecoration:"underline",
                      px: 0,
                      '&:hover': { color: '#006C35' },
                    }}
                  >
                    <ListItemText
                      primary={section.header}
                      primaryTypographyProps={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        sx: { lineHeight: 1.4 }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Article Sections */}
            {article.paragraphs?.map((section) => (
              <Box key={section._id} id={section._id} mb={4}>
                <Typography variant="h2" sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  mb: 2,
                  color: '#006C35'
                }}>
                  {section.header}
                </Typography>
                {section.image && (
                  <img
                    src={section.image}
                    alt={`صورة ${section.header}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: { xs: '200px', md: '400px' },
                      borderRadius: '8px',
                      marginBottom: '16px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <Typography paragraph sx={{
                  color: '#333333',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  textAlign: 'justify'
                }}>
                  {section.content || '...'}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}
export default oneArticle

{/* Comments Section */ }
{/* <Box mb={4}>
              <Typography variant="h6" sx={{ mb: 3, color: '#006C35', fontSize: '1.25rem' }}>
                التعليقات
              </Typography>
              <Stack spacing={2}>
                {comments.map((comment, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      backgroundColor: '#F4F4F4',
                      borderRadius: '8px',
                      fontSize: '1.25rem',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.date}
                    </Typography>
                    <Typography>{comment.comment}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid> */}

