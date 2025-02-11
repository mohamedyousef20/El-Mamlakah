// ServiceSection.server.jsx (Server Component)
// Do not include "use client" here.
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

// Fetch data on the server
const fetchServices = async () => {
    try {
        const res = await fetch("http://localhost:5500/api/v1/service");
        if (!res.ok) {
            throw new Error("فشل في تحميل الفئات.");
        }
        const data = await res.json();
        return data.data; // Return the fetched services
    } catch (error) {
        console.error("Error fetching services:", error);
        return []; // Fallback to an empty array
    }
};

export default async function ServiceSection() {
    // Fetch services on the server
    const services = await fetchServices();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 2,
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
                                alt={service.name}
                                src={service.image}
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
                                {service.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontFamily: 'Tajawal, Arial, sans-serif', // Arabic-friendly font
                                }}
                            >
                                {service.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}