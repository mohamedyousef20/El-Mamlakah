import React from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const CompanySelect = ({
    companies,
    selectedCompany,
    onChange,
    showNewCompanyForm,
    onToggleForm
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
                select
                label="الشركة"
                name="company"
                value={selectedCompany || ''}
                onChange={onChange}
                required={!showNewCompanyForm}
                fullWidth
                variant="outlined"
                disabled={showNewCompanyForm || companies.length === 0}
            >
                {companies.length === 0 ? (
                    <MenuItem value="">
                        لا توجد شركات. يرجى إضافة واحدة.
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
                variant="outlined"
                onClick={onToggleForm}
            >
                {showNewCompanyForm ? 'إلغاء' : 'إضافة شركة جديدة'}
            </Button>
        </Box>
    );
};

export default CompanySelect;
