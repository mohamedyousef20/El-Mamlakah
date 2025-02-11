"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Skeleton,
    Pagination,
    Stack,
    Paper,
    Alert,
} from "@mui/material";
import Link from "next/link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a custom theme
const theme = createTheme({
    direction: "rtl",
    palette: {
        primary: { main: "#006C35" },
        background: { default: "#F4F4F4", paper: "#FFFFFF" },
        text: { primary: "#333333", secondary: "#666666" },
    },
    typography: { fontFamily: "Tajawal, Arial, sans-serif" },
});

// Styled component for displaying an image
const SectionImage = styled("img")({
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const ClientArticleList = ({ articles = [] }) => {
    // Default articles to an empty array if undefined
    const [page, setPage] = useState(1);
    const articlesPerPage = 8;

    // Calculate displayed articles for the current page
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const displayedArticles = articles.slice(startIndex, endIndex);
    console.log("displayedArticles", displayedArticles)
    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        console.log("articles prop in client:", articles);
    }, [articles]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ backgroundColor: "#F4F4F4", py: 6, minHeight: "100vh" }}>
                <Container>
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        sx={{
                            color: "#006C35",
                            fontWeight: "bold",
                            mb: 6,
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                        }}
                    >
                        المدونة
                    </Typography>

                    <Grid container spacing={4} dir="rtl">
                        {articles.length === 0 ? (
                            // Display skeletons if articles is empty
                            Array.from(new Array(6)).map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                                    <Card sx={{ height: "100%" }}>
                                        <Skeleton variant="rectangular" height={200} />
                                        <CardContent>
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" width="60%" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            displayedArticles.map((article) => {
                                // Use the first paragraph (if available) for an excerpt
                                const firstParagraph =
                                    article.paragraphs && article.paragraphs.length > 0 ? article.paragraphs[0] : null;
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={article._id}>
                                        <Link href={`/articles/${article._id}`} passHref>
                                            <Card
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    transition: "transform 0.2s, box-shadow 0.2s",
                                                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                                                }}
                                            >
                                                {firstParagraph && firstParagraph.image ? (
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={firstParagraph.image}
                                                        alt={firstParagraph.title}
                                                    />
                                                ) : (
                                                    <Skeleton variant="rectangular" height={200} />
                                                )}
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                        sx={{
                                                            color: "#333333",
                                                            fontWeight: "bold",
                                                            fontFamily: "'Noto Sans Arabic', sans-serif",
                                                        }}
                                                    >
                                                        {article.title}
                                                    </Typography>
                                                    {firstParagraph && (
                                                        <Typography
                                                            color="text.secondary"
                                                            sx={{ mb: 2, fontFamily: "'Noto Sans Arabic', sans-serif" }}
                                                        >
                                                            {firstParagraph.content.substring(0, 100)}...
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: "#006C35",
                                                            color: "white",
                                                            "&:hover": { backgroundColor: "#004d00" },
                                                            fontFamily: "'Noto Sans Arabic', sans-serif",
                                                        }}
                                                    >
                                                        اقرأ المزيد
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })
                        )}
                    </Grid>

                    {articles.length > 0 && (
                        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                            <Pagination
                                count={Math.ceil(articles.length / articlesPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                sx={{
                                    "& .MuiPaginationItem-root": { color: "#006C35" },
                                    "& .Mui-selected": { backgroundColor: "#006C35 !important", color: "white" },
                                }}
                            />
                        </Box>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ClientArticleList;
