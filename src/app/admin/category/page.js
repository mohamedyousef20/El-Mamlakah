"use client";

import React, { useState } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    styled,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#006C35" },
        background: { default: "#F4F4F4", paper: "#FFFFFF" },
        text: { primary: "#333333" },
    },
});

// Styled Paper for the form container
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: "#FFFFFF",
}));

// Styled Form for layout
const StyledForm = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        image: "", // Will hold the File object when selected
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("desc", formData.desc);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
           

        try {
            const formDataToSend = {
                name: formData.name,
                desc: formData.desc,
                image: formData.image,

            };

            const response = await fetch("http://localhost:5500/api/v1/category", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend)
            });

            if (!response.ok) {
                throw new Error("فشل في إضافة الفئة.");
            }

            const result = await response.json();
            console.log("Response from server:", result);

            setNotification({
                open: true,
                message: "تمت إضافة الفئة بنجاح!",
                severity: "success",
            });

            // Reset form
            setFormData({
                name: "",
                desc: "",
                image: "",
            });
        } catch (error) {
            console.error("Error submitting category:", error);
            setNotification({
                open: true,
                message: error.message || "حدث خطأ أثناء إضافة الفئة!",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
                <Container maxWidth="sm">
                    <StyledPaper elevation={3}>
                        <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
                            إضافة فئة جديدة
                        </Typography>
                        <StyledForm onSubmit={handleSubmit}>
                            <TextField
                                label="اسم الفئة"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="الوصف"
                                name="desc"
                                value={formData.desc}
                                onChange={handleChange}
                                required
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                            />
                            <Button variant="contained" component="label" sx={{ bgcolor: "primary.main", mb: 2 }}>
                                تحميل صورة الفئة
                                <input type="file" name="image" hidden accept="image/*" onChange={handleChange} />
                            </Button>
                            {formData.image && (
                                <Typography variant="body2">الملف المحدد: {formData.image.name}</Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ bgcolor: "primary.main", color: "#FFFFFF", "&:hover": { bgcolor: "#005528" } }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "إضافة الفئة"}
                            </Button>
                        </StyledForm>
                    </StyledPaper>
                </Container>
                <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default AddCategory;
