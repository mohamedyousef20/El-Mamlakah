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
import AdminNavBar from '@/components/AdminSideBar';

// Helper function: convert a data URL (base64 string) into a File object.
function dataURItoFile(dataURI, filename) {
    const arr = dataURI.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error("Invalid dataURI");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// Theme and styled components
const theme = createTheme({
    palette: {
        primary: { main: '#006C35' },
        background: { default: '#F4F4F4', paper: '#FFFFFF' },
        text: { primary: '#333333' },
    },
});

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
        coverImage: null,
        paragraphs: [{ header: '', content: '', image: null }],
        company: '',
    });

    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Fetch companies when the component mounts
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/company`);
                if (!res.ok) {
                    throw new Error("فشل في تحميل الشركات.");
                }
                const company = await res.json();
                setCompanies(company.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setNotification({
                    open: true,
                    message: 'حدث خطأ أثناء تحميل الشركات!',
                    severity: 'error'
                });
                setCompanies([]);
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (e, index) => {
        const { name, value, files } = e.target;

        if (name === 'coverImage') {
            setFormData({ ...formData, [name]: files[0] });
            return;
        }

        if (name.startsWith('paragraphs')) {
            const paragraphField = name.split('.')[1];
            const updatedParagraphs = [...formData.paragraphs];

            if (files) {
                updatedParagraphs[index][paragraphField] = files[0];
            } else {
                updatedParagraphs[index][paragraphField] = value;
            }

            setFormData({ ...formData, paragraphs: updatedParagraphs });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddParagraph = () => {
        setFormData({
            ...formData,
            paragraphs: [...formData.paragraphs, { header: '', content: '', image: null }]
        });
    };

    const handleRemoveParagraph = (index) => {
        const updatedParagraphs = formData.paragraphs.filter((_, i) => i !== index);
        setFormData({ ...formData, paragraphs: updatedParagraphs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = new FormData();
            dataToSend.append("title", formData.title);
            dataToSend.append("company", formData.company);

            // Handle cover image
            if (formData.coverImage) {
                if (formData.coverImage instanceof File) {
                    dataToSend.append("coverImage", formData.coverImage);
                } else {
                    const fileObj = dataURItoFile(formData.coverImage, 'cover-image.jpg');
                    dataToSend.append("coverImage", fileObj);
                }
            }

            // Handle paragraphs
            formData.paragraphs.forEach((paragraph, index) => {
                dataToSend.append(`paragraphs[${index}][header]`, paragraph.header);
                dataToSend.append(`paragraphs[${index}][content]`, paragraph.content);

                if (paragraph.image) {
                    if (paragraph.image instanceof File) {
                        dataToSend.append(`paragraphs[${index}][image]`, paragraph.image);
                    } else {
                        const fileObj = dataURItoFile(paragraph.image, `paragraph-${index}.jpg`);
                        dataToSend.append(`paragraphs[${index}][image]`, fileObj);
                    }
                }
            });

            // Log FormData entries to the console
            console.log("FormData Entries:");
            for (let [key, value] of dataToSend.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`${API_BASE_URL}/api/v1/articles`, {
                method: "POST",
                body: dataToSend
            });

            if (!response.ok) {
                throw new Error("فشل في نشر المقال.");
            }

            const responseData = await response.json();
            console.log("Response from server:", responseData);

            setNotification({
                open: true,
                message: 'تم نشر المقال بنجاح!',
                severity: 'success'
            });

            // Reset form
            setFormData({
                title: '',
                coverImage: null,
                paragraphs: [{ header: '', content: '', image: null }],
                company: '',
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
                <AdminNavBar />

                <Container maxWidth="lg">
                    <StyledPaper elevation={3}>
                        <Typography variant="h4" component="h1" gutterBottom color="primary">
                            إضافة مقال جديد
                        </Typography>

                        <StyledForm onSubmit={handleSubmit}>
                            {/* Cover Image Upload */}
                            <Box sx={{ mb: 3 }}>
                                <Button variant="contained" component="label">
                                    تحميل صورة الغلاف
                                    <input
                                        type="file"
                                        name="coverImage"
                                        hidden
                                        accept="image/*"
                                        onChange={handleChange}
                                        required
                                    />
                                </Button>
                                {formData.coverImage && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        الملف المحدد: {formData.coverImage.name || 'تم اختيار الملف'}
                                    </Typography>
                                )}
                            </Box>

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
                                        name="paragraphs.header"
                                        value={paragraph.header}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        label="محتوى الفقرة"
                                        name="paragraphs.content"
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
                                        تحميل صورة الفقرة (اختياري)
                                        <input
                                            type="file"
                                            name="paragraphs.image"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </Button>

                                    {paragraph.image && (
                                        <Typography variant="body2">
                                            الملف المحدد: {paragraph.image.name || 'تم اختيار الملف'}
                                        </Typography>
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
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: '#006c35',
                                    '&:hover': {
                                        backgroundColor: '#005128',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? 'جاري الإضافة...' : 'إضافة الخدمة'}
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