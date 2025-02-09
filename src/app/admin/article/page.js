"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
    styled
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// تخصيص الألوان
const theme = createTheme({
    palette: {
        primary: { main: '#006C35' },
        background: { default: '#F4F4F4', paper: '#FFFFFF' },
        text: { primary: '#333333' },
    },
});

// تخصيص الأنماط
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: '#FFFFFF',
}));

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const AddArticle = () => {
    const [formData, setFormData] = useState({
        title: '',
        paragraphs: [{ title: '', content: '', image: '' }], // Initialize with one paragraph
        company: '', // Company ID
        relatedArticles: [], // Array of related article IDs
        status: 'draft'
    });

    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]); 
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    console.log(companies)

    // Fetch companies when the component mounts
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/v1/company");
                if (!res.ok) {
                    throw new Error("فشل في تحميل الشركات.");
                }
                const company = await res.json();
                console.log(company)
                // Ensure companies is always an array
                setCompanies(company.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setNotification({
                    open: true,
                    message: 'حدث خطأ أثناء تحميل الشركات!',
                    severity: 'error'
                });
                setCompanies([]); // Fallback to an empty array
            }
        };

        fetchCompanies(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs only once on mount

    // Handle changes in the form fields
    const handleChange = (e, index) => {
        const { name, value, files } = e.target;

        if (name.startsWith('paragraphs')) {
            // Handle changes in paragraphs array
            const paragraphField = name.split('.')[1]; // Extract field name (title, content, image)
            const updatedParagraphs = [...formData.paragraphs];
            updatedParagraphs[index][paragraphField] = files ? files[0] : value;
            setFormData({ ...formData, paragraphs: updatedParagraphs });
        } else {
            // Handle other fields
            setFormData({ ...formData, [name]: value });
        }
    };

    // Add a new paragraph
    const handleAddParagraph = () => {
        setFormData({
            ...formData,
            paragraphs: [...formData.paragraphs, { title: '', content: '', image: '' }]
        });
    };

    // Remove a paragraph
    const handleRemoveParagraph = (index) => {
        const updatedParagraphs = formData.paragraphs.filter((_, i) => i !== index);
        setFormData({ ...formData, paragraphs: updatedParagraphs });
    };

    // Handle article submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const articleData = {
                title: formData.title,
                company: formData.company,
                paragraphs: formData.paragraphs.map(paragraph => ({
                    title: paragraph.title,
                    content: paragraph.content,
                    // Handle image separately if needed
                })),
                relatedArticles: formData.relatedArticles
            };

            const response = await fetch("http://localhost:5500/api/v1/article", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData)
            });

            if (!response.ok) {
                throw new Error("فشل في نشر المقال.");
            }

            const data = await response.json();
            console.log("Response from server:", data);

            setNotification({
                open: true,
                message: 'تم نشر المقال بنجاح!',
                severity: 'success'
            });

            // Reset form
            setFormData({
                title: '',
                paragraphs: [{ title: '', content: '', image: '' }],
                company: '',
                relatedArticles: [],
            });
        } catch (error) {
            console.error("Error submitting article:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء النشر!',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <StyledPaper elevation={3}>
                        <Typography variant="h4" component="h1" gutterBottom color="primary">
                            إضافة مقال جديد
                        </Typography>

                        <StyledForm onSubmit={handleSubmit}>
                            <TextField
                                label="العنوان"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />

                            {/* Paragraphs Section */}
                            {formData.paragraphs.map((paragraph, index) => (
                                <Box key={index} sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1, mb: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        الفقرة {index + 1}
                                    </Typography>

                                    <TextField
                                        label="عنوان الفقرة"
                                        name={`paragraphs.title`}
                                        value={paragraph.title}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="محتوى الفقرة"
                                        name={`paragraphs.content`}
                                        value={paragraph.content}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                        fullWidth
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />

                                    <Button variant="contained" component="label" sx={{ bgcolor: 'primary.main', mb: 2 }}>
                                        تحميل صورة الفقرة
                                        <input
                                            type="file"
                                            name={`paragraphs.image`}
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </Button>

                                    {paragraph.image && (
                                        <Typography variant="body2">الملف المحدد: {paragraph.image.name}</Typography>
                                    )}

                                    {index > 0 && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveParagraph(index)}
                                            sx={{ mt: 2 }}
                                        >
                                            حذف الفقرة
                                        </Button>
                                    )}
                                </Box>
                            ))}

                            <Button variant="outlined" onClick={handleAddParagraph} sx={{ mb: 2 }}>
                                إضافة فقرة جديدة
                            </Button>

                            {/* Company Dropdown */}
                            <TextField
                                select
                                label="الشركة"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            >
                                {companies.length === 0 ? (
                                    <MenuItem value="" disabled>
                                        لا توجد شركات متاحة
                                    </MenuItem>
                                ) : (
                                    companies.map((company) => (
                                        <MenuItem key={company._id} value={company._id}>
                                            {company.name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>

                            <TextField
                                label="مقالات ذات صلة (IDs مفصولة بفاصلات)"
                                name="relatedArticles"
                                value={formData.relatedArticles.join(',')}
                                onChange={(e) => {
                                    const value = e.target.value.split(',').map(id => id.trim());
                                    setFormData({ ...formData, relatedArticles: value });
                                }}
                                fullWidth
                                variant="outlined"
                            />

                            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: '#005528' } }}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'نشر المقال'}
                            </Button>
                        </StyledForm>
                    </StyledPaper>
                </Container>

                <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default AddArticle;