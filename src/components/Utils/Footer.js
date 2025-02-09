import React from 'react';
import { Box, Container, Grid, Typography, IconButton, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn, Send } from '@mui/icons-material';

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: '#006C35',
    color: '#FFFFFF',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
}));

const FooterHeading = styled(Typography)({
    color: '#FFFFFF',
    fontWeight: 600,
    marginBottom: '1rem',
});

const FooterLink = styled(Typography)({
    color: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
    marginBottom: '0.5rem',
});

const SocialButton = styled(IconButton)({
    color: '#FFFFFF',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    marginRight: '0.5rem',
});

const NewsletterBox = styled(Box)({
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#FFFFFF',
        '& fieldset': {
            borderColor: '#F4F4F4',
        },
        '&:hover fieldset': {
            borderColor: '#FFFFFF',
        },
    },
});

const Footer = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
    };

    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterHeading variant="h6">عن الشركة</FooterHeading>
                        <Typography variant="body2" sx={{ color: '#F4F4F4', mb: 2 }}>
                            نحن نقدم خدمات متميزة في مجال التسويق والإعلان، ونسعى دائماً لتحقيق أفضل النتائج لعملائنا.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <SocialButton aria-label="facebook">
                                <Facebook />
                            </SocialButton>
                            <SocialButton aria-label="twitter">
                                <Twitter />
                            </SocialButton>
                            <SocialButton aria-label="instagram">
                                <Instagram />
                            </SocialButton>
                            <SocialButton aria-label="linkedin">
                                <LinkedIn />
                            </SocialButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterHeading variant="h6">روابط سريعة</FooterHeading>
                        <FooterLink variant="body2">الرئيسية</FooterLink>
                        <FooterLink variant="body2">من نحن</FooterLink>
                        <FooterLink variant="body2">خدماتنا</FooterLink>
                        <FooterLink variant="body2">اتصل بنا</FooterLink>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterHeading variant="h6">معلومات الاتصال</FooterHeading>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            الهاتف: +966 123 456 789
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            البريد: info@example.com
                        </Typography>
                        <Typography variant="body2">
                            العنوان: الرياض، المملكة العربية السعودية
                        </Typography>
                    </Grid>

                    {/* Newsletter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterHeading variant="h6">النشرة البريدية</FooterHeading>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض
                        </Typography>
                        <form onSubmit={handleSubscribe}>
                            <NewsletterBox>
                                <StyledTextField
                                    variant="outlined"
                                    placeholder="البريد الإلكتروني"
                                    size="small"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        bgcolor: '#333333',
                                        '&:hover': {
                                            bgcolor: '#444444',
                                        },
                                    }}
                                >
                                    <Send />
                                </Button>
                            </NewsletterBox>
                        </form>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    sx={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        mt: 4,
                        pt: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#F4F4F4' }}>
                        © {new Date().getFullYear()} جميع الحقوق محفوظة
                    </Typography>
                </Box>
            </Container>
        </StyledFooter>
    );
};

export default Footer;