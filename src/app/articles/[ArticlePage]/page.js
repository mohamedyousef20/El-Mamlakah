'use client';

import { useState, useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const theme = createTheme({
    direction: 'rtl',
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
        fontFamily: 'Tajawal, Arial, sans-serif',
    },
});

const TableOfContents = styled(Paper)({
    padding: '20px',
    marginBottom: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const ArticleSection = styled(Box)({
    marginBottom: '32px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const RelatedArticle = styled(Paper)({
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
});

const SectionImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export default function ArticlePage() {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        comment: '',
    });
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        {
            id: 'intro',
            title: 'مقدمة عن الموضوع',
            image: '//fakeimg.pl/350x200/?text=World&font=lobster',
        },
        {
            id: 'section1',
            title: 'القسم الأول',
            image: '//fakeimg.pl/350x200/?text=World&font=lobster',
        },
        {
            id: 'section2',
            title: 'القسم الثاني',
            image: '//fakeimg.pl/350x200/?text=World&font=lobster',
        },
        {
            id: 'section3',
            title: 'القسم الثالث',
            image: '//fakeimg.pl/350x200/?text=World&font=lobster',
        },
        {
            id: 'conclusion',
            title: 'الخاتمة',
            image: '//fakeimg.pl/350x200/?text=World&font=lobster',
        },
    ];

    const relatedArticles = [
        { title: 'مقال ذو صلة 1', url: '#' },
        { title: 'مقال ذو صلة 2', url: '#' },
        { title: 'مقال ذو صلة 3', url: '#' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
                }
                return false;
            });
            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* Main Content */}
                    <Grid item xs={12} md={12}>
                        {/* Wrap all sections in one Paper */}
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            {/* Buttons for Call & WhatsApp */}
                            <Stack direction="row" spacing={2} justifyContent="space-between" mb={3}>
                                <Button
                                    variant="contained"
                                    component="a"
                                    href="tel:01555681495"
                                    sx={{ fontSize: '1.25rem', bgcolor: '#006C35', '&:hover': { bgcolor: '#005829' } }}
                                >
                                    اتصل الآن: 01555681495
                                </Button>
                                <Button
                                    variant="contained"
                                    component="a"
                                    href="https://wa.me/01555681495"
                                    sx={{ fontSize: '1.25rem', bgcolor: '#006C35', '&:hover': { bgcolor: '#005829' } }}
                                >
                                    دردشة واتساب: 01555681495
                                </Button>
                            </Stack>

                            {/* Article Title */}
                            <Typography variant="h1" sx={{ fontSize: '2.5rem', mb: 3, color: '#006C35', fontWeight: 700 }}>
                                شركة تنظيف بمحايل عسير
                            </Typography>


                            {/* Table of Contents */}
                            <TableOfContents>
                                <Typography variant="h6" sx={{ mb: 2, color: '#006C35', fontSize: '1.25rem' }}>
                                    محتويات المقال
                                </Typography>
                                <List>
                                    {sections.map((section) => (
                                        <ListItem
                                            key={section.id}
                                            component="a"
                                            href={`#${section.id}`}
                                            sx={{
                                                color: activeSection === section.id ? '#006C35' : 'inherit',
                                                textDecoration: 'none',
                                                '&:hover': { color: '#006C35' },
                                            }}
                                        >
                                            <ListItemText primary={section.title} primaryTypographyProps={{ fontSize: '1.25rem' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </TableOfContents>

                            {/* Article Sections */}
                            {sections.map((section) => (
                                <ArticleSection key={section.id} id={section.id}>
                                    <Typography variant="h2" sx={{ fontSize: '1.75rem', mb: 2, color: '#006C35' }}>
                                        {section.title}
                                    </Typography>
                                    {section.image && (
                                        <SectionImage src={section.image} alt={`صورة ${section.title}`} />
                                    )}
                                    <Typography paragraph sx={{ color: '#333333', lineHeight: 1.8, fontSize: '1.25rem' }}>
                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى.
                                    </Typography>
                                </ArticleSection>
                            ))}

                            {/* Rating Section */}
                            <ArticleSection>
                                <Typography variant="h6" sx={{ mb: 2, color: '#006C35', fontSize: '1.25rem' }}>
                                    هل أعجبك المقال؟
                                </Typography>
                                <Rating
                                    value={rating}
                                    onChange={(_, newValue) => setRating(newValue)}
                                    size="large"
                                    sx={{
                                        direction: 'rtl', // ensure the stars fill from right to left
                                        '& .MuiRating-iconFilled': {
                                            color: '#006C35',
                                        },
                                    }}
                                />
                            </ArticleSection>

                            {/* Comments Section */}
                            <ArticleSection>
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
                                <Box component="form" sx={{ mt: 4 }}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="الاسم"
                                            fullWidth
                                            required
                                            InputLabelProps={{ style: { fontSize: '1.25rem', textAlign: 'right' } }}
                                            inputProps={{ style: { textAlign: 'right', fontSize: '1.25rem' } }}
                                        />
                                        <TextField
                                            label="البريد الإلكتروني"
                                            type="email"
                                            fullWidth
                                            required
                                            InputLabelProps={{ style: { fontSize: '1.25rem', textAlign: 'right' } }}
                                            inputProps={{ style: { textAlign: 'right', fontSize: '1.25rem' } }}
                                        />
                                        <TextField
                                            label="التعليق"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            required
                                            InputLabelProps={{ style: { fontSize: '1.25rem', textAlign: 'right' } }}
                                            inputProps={{ style: { textAlign: 'right', fontSize: '1.25rem' } }}
                                        />
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#006C35',
                                                '&:hover': { bgcolor: '#005829' },
                                                fontSize: '1.25rem',
                                            }}
                                        >
                                            إرسال التعليق
                                        </Button>
                                    </Stack>
                                </Box>
                            </ArticleSection>
                        </Paper>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={12}>
                        <Paper
                            sx={{
                                p: 2,
                                mb: 3,
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, color: '#006C35', fontSize: '1.5rem' }}>
                                مقالات ذات صلة
                            </Typography>
                            <Stack spacing={2}>
                                {relatedArticles.map((article, index) => (
                                    <RelatedArticle key={index}>
                                        <Link href={article.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: '1.25rem' }}>
                                                {article.title}
                                            </Typography>
                                        </Link>
                                    </RelatedArticle>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
