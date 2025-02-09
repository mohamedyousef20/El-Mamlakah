import React from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const NewCompanyForm = ({
    newCompany,
    categories,
    onCompanyChange,
    onSubmit
}) => {
    return (
        <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                إضافة شركة جديدة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="اسم الشركة"
                    value={newCompany.name}
                    onChange={(e) => onCompanyChange({ ...newCompany, name: e.target.value })}
                    required
                    fullWidth
                />
                <TextField
                    label="رقم الهاتف"
                    value={newCompany.phone}
                    onChange={(e) => onCompanyChange({ ...newCompany, phone: e.target.value })}
                    required
                    fullWidth
                />
                <TextField
                    label="رقم الواتساب"
                    value={newCompany.whatsapp}
                    onChange={(e) => onCompanyChange({ ...newCompany, whatsapp: e.target.value })}
                    required
                    fullWidth
                />
                <TextField
                    select
                    label="الفئة"
                    value={newCompany.category || ''}
                    onChange={(e) => onCompanyChange({ ...newCompany, category: e.target.value })}
                    required
                    fullWidth
                >
                    {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    sx={{ mt: 2 }}
                >
                    إضافة
                </Button>
            </Box>
        </Box>
    );
};

export default NewCompanyForm;
