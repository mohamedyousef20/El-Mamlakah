// OneArticle.jsx (server component)
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import InteractiveButtons from '../../../components/AtricleButton';
import { API_BASE_URL } from '@/lib/apiConfig';

const OneArticle = async ({ params }) => {
  const { slug } = params;

  let article = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/articles/${slug}`,
      { cache: "no-store" });
    if (!res.ok) {
      throw new Error("فشل في تحميل المقالات.");
    }
    const data = await res.json();
     article = data.data;


  } catch (error) {
    throw new Error("فشل في تحميل المقالات.");

  }



  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {/* <Paper
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#FFFFFF',
            }}
          > */}
          {/* Use the InteractiveButtons client component */}
          <InteractiveButtons
            phone={article.company.phone}
            whatsapp={article.company.whatsapp}
            slug={slug}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              mb: 3,
              color: '#006C35',
              fontWeight: 700,
            }}
          >
            {article.title}
          </Typography>

          {/* Table of Contents */}
          <Box mb={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: '#006C35',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              محتويات المقال
            </Typography>
            <List>
              {article.paragraphs?.map((section) => (
                <ListItem
                  key={section._id}
                  component="a"
                  href={`#${section._id}`}
                  sx={{
                    color: '#333333',
                    textAlign: "right",
                    textDecoration: "underline",
                    px: 0,
                    '&:hover': { color: '#006C35' },
                  }}
                >
                  <ListItemText
                    primary={section.header}
                    primaryTypographyProps={{
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      sx: { lineHeight: 1.4 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Article Sections */}
          {article.paragraphs?.map((section) => (
            <Box key={section._id} id={section._id} mb={4}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  mb: 2,
                  color: '#006C35',
                }}
              >
                {section.header}
              </Typography>
              {section.image && (
                <img
                  src={section.image}
                  alt={`صورة ${section.header}`}
                  style={{
                    width: '90%',
                    margin: "0 auto",
                    height: 'auto',
                    maxHeight: '400px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <Typography
                paragraph
                sx={{
                  color: '#333333',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  textAlign: 'justify',
                }}
              >
                {section.content || '...'}
              </Typography>
            </Box>
          ))}
          {/* </Paper> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OneArticle;
