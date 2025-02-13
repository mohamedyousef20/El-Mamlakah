import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react'

const ServiceSection =  ({services}) => {
   
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
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                }}
                            >
                                {service.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                                }}
                            >
                                {service.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ServiceSection
