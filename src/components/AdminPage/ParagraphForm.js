import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ParagraphForm = ({ paragraph, index, onChange, onRemove }) => {
    return (
        <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                الفقرة {index + 1}
            </Typography>

            <TextField
                label="عنوان الفقرة"
                name={`paragraphs.title`}
                value={paragraph.title}
                onChange={(e) => onChange(e, index)}
                required
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <TextField
                label="محتوى الفقرة"
                name={`paragraphs.content`}
                value={paragraph.content}
                onChange={(e) => onChange(e, index)}
                required
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Button variant="contained" component="label" sx={{ bgcolor: 'primary.main', mb: 2 }}>
                تحميل صورة الفقرة
                <input
                    type="file"
                    name={`paragraphs.image`}
                    hidden
                    accept="image/*"
                    onChange={(e) => onChange(e, index)}
                />
            </Button>

            {paragraph.image && (
                <Typography variant="body2">الملف المحدد: {paragraph.image.name}</Typography>
            )}

            {index > 0 && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onRemove(index)}
                    sx={{ mt: 2 }}
                >
                    حذف الفقرة
                </Button>
            )}
        </Box>
    );
};

export default ParagraphForm;