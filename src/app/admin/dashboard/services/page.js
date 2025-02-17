"use client";
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    Grid,
    IconButton,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    styled,
    Stack
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Phone as PhoneIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import Link from 'next/link';
import ProtectedComponent from '@/components/ProtectedComponent';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { API_BASE_URL } from '@/lib/apiConfig';

const ServiceCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    padding: theme.spacing(2),
    border: '1px solid rgba(255,255,255,0.1)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0, 108, 53, 0.2)'
    }
}));

const StyledButton = styled(Button)({
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    fontWeight: 600,
    backgroundColor: '#006c35',
    '&:hover': {
        backgroundColor: '#005a2b'
    }
});

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    // State for updating service
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [updateData, setUpdateData] = useState({
        name: '',
        desc: '',

    });

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/service`);
                if (!res.ok) {
                    throw new Error("فشل في تحميل الخدمات.");
                }
                const data = await res.json();
                setServices(data.data || []);
            } catch (error) {
                console.error("Error fetching services:", error);
                setNotification({
                    open: true,
                    message: error.message || 'حدث خطأ أثناء تحميل الخدمات!',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Delete Logic
    const openDeleteDialog = (service) => {
        setServiceToDelete({ id: service._id });
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!serviceToDelete) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/service/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceToDelete)
            });
            if (!res.ok) {
                throw new Error("فشل في حذف الخدمة");
            }
            // Remove the deleted service from the state (compare _id)
            setServices(services.filter(service => service._id !== serviceToDelete.id));
            setNotification({
                open: true,
                message: 'تم حذف الخدمة بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error deleting service:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء حذف الخدمة!',
                severity: 'error'
            });
        } finally {
            setDeleteDialogOpen(false);
            setServiceToDelete(null);
        }
    };

    // Update Logic: Open update dialog and prefill form
    const openUpdateServiceDialog = (service) => {
        setEditingService(service);
        setUpdateData({
            name: service.name,
            desc: service.desc || '',
        });
        setOpenUpdateDialog(true);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/service/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingService._id,
                    ...updateData
                })
            });
            if (!res.ok) {
                throw new Error("فشل في تحديث الخدمة");
            }
            const updatedResponse = await res.json();
            // Assuming your API returns the updated service data in updatedResponse.data
            const updatedService = updatedResponse.data;
            setServices(services.map(service => service._id === editingService._id ? updatedService : service));
            setNotification({
                open: true,
                message: 'تم تحديث الخدمة بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error updating service:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء تحديث الخدمة!',
                severity: 'error'
            });
        } finally {
            setOpenUpdateDialog(false);
            setEditingService(null);
        }
    };

    return (
        <ProtectedComponent>
            <Stack direction="row">
                <AdminSideBar />
                <Container sx={{ my: 5 }}>
                    <Box sx={{ direction: 'rtl' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                        }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                    fontWeight: 700,
                                    color: 'green'
                                }}
                            >
                                الخدمات
                            </Typography>
                            <Link href="/admin/insert/service" passHref>
                                <StyledButton variant="contained" startIcon={<AddIcon />}>
                                    خدمة جديدة
                                </StyledButton>
                            </Link>
                        </Box>

                        {loading ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {services.map((service) => (
                                    <Grid item xs={12} sm={6} md={4} key={service._id}>
                                        <ServiceCard>
                                            <Box sx={{ p: 2 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                        fontWeight: 600,
                                                        mb: 2,
                                                        color: '#006c35'
                                                    }}
                                                >
                                                    {service.name}
                                                </Typography>
                                                {service.email && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <EmailIcon sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                        <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                            {service.email}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {service.phone && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <PhoneIcon sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                        <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                            {service.phone}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {service.area && service.province && (
                                                    <Typography variant="body2" sx={{
                                                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                        mb: 1,
                                                        color: '#9CA3AF'
                                                    }}>
                                                        المنطقة: {service.area} - المحافظة: {service.province}
                                                    </Typography>
                                                )}
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: 1,
                                                    mt: 2
                                                }}>
                                                    <IconButton
                                                        sx={{ color: '#006c35' }}
                                                        onClick={() => openUpdateServiceDialog(service)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{ color: '#ef4444' }}
                                                        onClick={() => openDeleteDialog(service)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </ServiceCard>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Container>
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Stack>

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="تأكيد الحذف"
                description="هل أنت متأكد أنك تريد حذف هذه الخدمة؟"
                confirmButtonText="حذف"
                cancelButtonText="إلغاء"
            />

            {/* Update Service Dialog */}
            {/* Update Service Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} fullWidth>
                <DialogTitle>تحديث الخدمة</DialogTitle>
                <Box component="form" onSubmit={handleUpdate}>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="اسم الخدمة"
                            value={updateData.name}
                            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="الوصف"
                            multiline
                            rows={4}
                            value={updateData.desc}
                            onChange={(e) => setUpdateData({ ...updateData, desc: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpdateDialog(false)}>إلغاء</Button>
                        <Button type="submit" variant="contained" color="primary">تحديث</Button>
                    </DialogActions>
                </Box>
            </Dialog>


        </ProtectedComponent>
    );
}
