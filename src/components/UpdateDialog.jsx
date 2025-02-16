"use client";
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

const UpdateDialog = ({
    open,
    onClose,
    onSubmit,
    title = "تحديث",
    initialValues = {},
    labels = {},
}) => {
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
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
                    {Object.keys(initialValues).map((key) => (
                        <TextField
                            key={key}
                            margin="normal"
                            fullWidth
                            name={key}
                            label={labels[key] || key}
                            value={formValues[key] || ""}
                            onChange={handleChange}
                        />
                    ))}
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

export default UpdateDialog;
