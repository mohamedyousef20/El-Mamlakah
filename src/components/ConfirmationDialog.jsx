"use client";
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'تأكيد',
    description = 'هل أنت متأكد من الإجراء؟',
    confirmButtonText = 'تأكيد',
    cancelButtonText = 'إلغاء',
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancelButtonText}</Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
