"use client";
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const UpdateArticleDialog = ({
    open,
    onClose,
    onSubmit,
    title = "تحديث المقال",
    initialValues = {},
    labels = {}
}) => {
    const [formValues, setFormValues] = useState({
        title: "",
        paragraphs: []
    });

    // When initialValues change, update the form state.
    useEffect(() => {
        setFormValues({
            title: initialValues.title || "",
            paragraphs: initialValues.paragraphs || []
        });
    }, [initialValues]);

    const handleTitleChange = (e) => {
        setFormValues((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleParagraphChange = (index, field, value) => {
        const updatedParagraphs = [...formValues.paragraphs];
        updatedParagraphs[index] = {
            ...updatedParagraphs[index],
            [field]: value,
        };
        setFormValues((prev) => ({ ...prev, paragraphs: updatedParagraphs }));
    };

    const handleAddParagraph = () => {
        setFormValues((prev) => ({
            ...prev,
            paragraphs: [...prev.paragraphs, { header: "", content: "" }],
        }));
    };

    const handleRemoveParagraph = (index) => {
        const updatedParagraphs = formValues.paragraphs.filter(
            (_, i) => i !== index
        );
        setFormValues((prev) => ({ ...prev, paragraphs: updatedParagraphs }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {/* Article title */}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        label={labels.title || "عنوان المقال"}
                        value={formValues.title}
                        onChange={handleTitleChange}
                    />
                    {/* Dynamic paragraphs */}
                    {formValues.paragraphs.map((para, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 2,
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                p: 2,
                            }}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                name={`paragraphs[${index}].header`}
                                label={labels.header || "عنوان الفقرة"}
                                value={para.header}
                                onChange={(e) =>
                                    handleParagraphChange(index, "header", e.target.value)
                                }
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name={`paragraphs[${index}].content`}
                                label={labels.content || "المحتوى"}
                                multiline
                                rows={4}
                                value={para.content}
                                onChange={(e) =>
                                    handleParagraphChange(index, "content", e.target.value)
                                }
                            />
                            <IconButton onClick={() => handleRemoveParagraph(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={handleAddParagraph}>
                        إضافة فقرة جديدة
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>إلغاء</Button>
                    <Button type="submit" variant="contained" color="primary">
                        تحديث
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateArticleDialog;
