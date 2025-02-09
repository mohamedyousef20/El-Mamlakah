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
    MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// Create a custom theme using the specified colors
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

// You can also use a styled form if you wish
const StyledForm = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));

const AddCompany = () => {
    // Form state for company data
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        whatsapp: "",
        category: "",
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5500/api/v1/company", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("فشل في إضافة الشركة.");
            }

            const result = await response.json();
            console.log("Response from server:", result);

            setNotification({
                open: true,
                message: "تمت إضافة الشركة بنجاح!",
                severity: "success",
            });

            // Reset form
            setFormData({
                name: "",
                phone: "",
                whatsapp: "",
                category: "",
            });
        } catch (error) {
            console.error("Error:", error);
            setNotification({
                open: true,
                message: error.message || "حدث خطأ أثناء إضافة الشركة.",
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
                            إضافة شركة جديدة
                        </Typography>
                        <StyledForm onSubmit={handleSubmit}>
                            <TextField
                                label="اسم الشركة"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="الهاتف"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="واتساب"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                select
                                label="الفئة (معرف الفئة)"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            >
                                {/* Optionally, you can map through a list of categories fetched from an API */}
                                <MenuItem value="60a1234567890abcdef12345">فئة 1</MenuItem>
                                <MenuItem value="60a1234567890abcdef12346">فئة 2</MenuItem>
                                <MenuItem value="60a1234567890abcdef12347">فئة 3</MenuItem>
                            </TextField>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ bgcolor: "primary.main", color: "#FFFFFF", "&:hover": { bgcolor: "#005528" } }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "إضافة الشركة"}
                            </Button>
                        </StyledForm>
                    </StyledPaper>
                </Container>
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default AddCompany;
