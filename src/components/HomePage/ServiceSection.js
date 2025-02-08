import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const ServiceSection = () => {
    const items = [
        {
            image: 'https://source.unsplash.com/random/150x150?construction',
            header: 'خدمات مقاولات عامة',
            text: 'تقدم مؤسسة النخبة شركات مقاولات بجميع انحاء المملكة العربية السعودية مع المحافظة علي أن تمتلك كل شركة من شركات المقاولات مهندسين متخصصين في المقام الاول.',
        },
        {
            image: 'https://source.unsplash.com/random/150x150?architecture',
            header: 'تصميمات معمارية',
            text: 'نقوم بتصميم أحدث وأفضل التصميمات المعمارية بجودة عالية ودقة متناهية، لضمان إرضاء جميع عملائنا.',
        },
        {
            image: 'https://source.unsplash.com/random/150x150?engineering',
            header: 'الإشراف الهندسي',
            text: 'نضمن لك أفضل الإشراف الهندسي من خلال فريق من المتخصصين لضمان تنفيذ المشاريع بجودة عالية.',
        },
        {
            image: 'https://source.unsplash.com/random/150x150?interior',
            header: 'التشطيبات والديكور',
            text: 'نقدم لك أفضل خدمات التشطيبات والديكور العصري بأفضل المواد وبأعلى معايير الجودة.',
        },
        {
            image: 'https://source.unsplash.com/random/150x150?renovation',
            header: 'التجديدات والصيانة',
            text: 'نقدم خدمات تجديد المباني وصيانتها لضمان أطول فترة استخدام بجودة ممتازة.',
        },
        {
            image: 'https://source.unsplash.com/random/150x150?planning',
            header: 'إدارة المشاريع',
            text: 'نوفر لك خطط إدارة مشاريع متكاملة لضمان نجاح وتنفيذ المشاريع بكفاءة.',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                padding: 3,
                                pt: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                            }}
                        >
                            {/* Avatar positioned half out of the card */}
                            <Avatar
                                alt={item.header}
                                src={item.image}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    position: 'absolute',
                                    top: -50,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    border: '4px solid white',
                                }}
                            />
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    mt: 4,
                                    fontWeight: 'bold',
                                    fontFamily: 'Tajawal, Arial, sans-serif', // Arabic-friendly font
                                }}
                            >
                                {item.header}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontFamily: 'Tajawal, Arial, sans-serif', // Arabic-friendly font
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ServiceSection;
