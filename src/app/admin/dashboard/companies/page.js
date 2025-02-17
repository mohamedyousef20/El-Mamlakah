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
    styled,
    Stack
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Phone as PhoneIcon,
    WhatsApp
} from '@mui/icons-material';
import AdminSideBar from '@/components/AdminSideBar';
import Link from 'next/link';
import ProtectedComponent from '@/components/ProtectedComponent';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import UpdateDialog from '@/components/UpdateDialog';

const CompanyCard = styled(Paper)(({ theme }) => ({
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    padding: theme.spacing(2),
    border: '1px solid rgba(255,255,255,0.1)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,108,53,0.2)'
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

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    // State for the update dialog
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/company`);
                if (!res.ok) {
                    throw new Error("فشل في تحميل الشركات.");
                }
                const data = await res.json();
                setCompanies(data.data || []);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setNotification({
                    open: true,
                    message: error.message || 'حدث خطأ أثناء تحميل الشركات!',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Delete Logic
    const openDeleteDialog = (company) => {
        setCompanyToDelete({ id: company._id });
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!companyToDelete) return;
        try {
            const res = await fetch("${API_BASE_URL}/api/v1/company/delete", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(companyToDelete)
            });
            if (!res.ok) {
                throw new Error("فشل في حذف الشركة");
            }
            // Remove the deleted company from the state (compare _id)
            setCompanies(companies.filter(company => company._id !== companyToDelete.id));
            setNotification({
                open: true,
                message: 'تم حذف الشركة بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error deleting company:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء حذف الشركة!',
                severity: 'error'
            });
        } finally {
            setDeleteDialogOpen(false);
            setCompanyToDelete(null);
        }
    };

    // Update Logic: Open update dialog and prefill form
    const openUpdateCompanyDialog = (company) => {
        setEditingCompany(company);
        setOpenUpdateDialog(true);
    };

    // When the reusable update dialog is submitted, handle the update.
    const handleUpdate = async (updatedData) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/company/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingCompany._id,
                    ...updatedData
                })
            });
            if (!res.ok) {
                throw new Error("فشل في تحديث الشركة");
            }
            const updatedResponse = await res.json();
            // Assuming your API returns the updated company data in updatedResponse.data
            const updatedCompany = updatedResponse.data;
            setCompanies(companies.map(company => company._id === editingCompany._id ? updatedCompany : company));
            setNotification({
                open: true,
                message: 'تم تحديث الشركة بنجاح!',
                severity: 'success'
            });
        } catch (error) {
            console.error("Error updating company:", error);
            setNotification({
                open: true,
                message: 'حدث خطأ أثناء تحديث الشركة!',
                severity: 'error'
            });
        } finally {
            setOpenUpdateDialog(false);
            setEditingCompany(null);
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
                                الشركات
                            </Typography>
                            <Link href="/admin/insert/company" passHref>
                                <StyledButton variant="contained" startIcon={<AddIcon />}>
                                    شركة جديدة
                                </StyledButton>
                            </Link>
                        </Box>

                        {loading ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {companies.map((company) => (
                                    <Grid item xs={12} sm={6} md={4} key={company._id}>
                                        <CompanyCard>
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
                                                    {company.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <WhatsApp sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                        {company.whatsapp}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <PhoneIcon sx={{ color: '#006c35', mr: 1, fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Noto Kufi Arabic', sans-serif", color: '#9CA3AF' }}>
                                                        {company.phone}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{
                                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                                    mb: 1,
                                                    color: '#9CA3AF'
                                                }}>
                                                    المنطقة: {company.area} - المحافظة: {company.province}
                                                </Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: 1,
                                                    mt: 2
                                                }}>
                                                    <IconButton
                                                        sx={{ color: '#006c35' }}
                                                        onClick={() => openUpdateCompanyDialog(company)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{ color: '#ef4444' }}
                                                        onClick={() => openDeleteDialog(company)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </CompanyCard>
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
                description="هل أنت متأكد أنك تريد حذف هذه الشركة؟"
                confirmButtonText="حذف"
                cancelButtonText="إلغاء"
            />

            {/* Reusable Update Dialog */}
            <UpdateDialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
                onSubmit={handleUpdate}
                title="تحديث الشركة"
                initialValues={
                    editingCompany
                        ? {
                            name: editingCompany.name,
                            phone: editingCompany.phone || '',
                            whatsapp: editingCompany.whatsapp || '',
                            area: editingCompany.area || '',
                            province: editingCompany.province || ''
                        }
                        : {}
                }
                labels={{
                    name: "اسم الشركة",
                    whatsapp: "الوتس آب",
                    phone: "الهاتف",
                    area: "المنطقة",
                    province: "المحافظة"
                }}
            />
        </ProtectedComponent>
    );
}
