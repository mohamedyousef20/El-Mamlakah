"use client";
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    Box,
    Paper,
    Divider,
    Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ServiceSearchSection = () => {
    const regions = {
        "منطقة الرياض": ["الرياض", "الخرج", "الدوادمي", "الزلفي", "المجمعة"],
        "منطقة مكة": ["مكة المكرمة", "جدة", "الطائف", "القنفذة"],
        "المنطقة الشرقية": ["الدمام", "الخبر", "الأحساء", "الجبيل"],
        "منطقة المدينة": ["المدينة المنورة", "ينبع"],
        "منطقة عسير": ["أبها", "خميس مشيط", "بلجرشي"],
        "منطقة تبوك": ["تبوك", "دوبة", "العمورة"],
        "منطقة حائل": ["حائل", "القريات", "شعلان"],
        "منطقة الحدود الشمالية": ["عرعر", "رفحاء"],
        "منطقة جازان": ["جازان", "صبيا", "أبو عريش"],
        "منطقة نجران": ["نجران", "شرورة"],
        "منطقة الباحة": ["الباحة", "المخوة"],
        "منطقة الجوف": ["سكاكا", "دومة الجندل"],
        "منطقة القصيم": ["بريدة", "عنيزة", "الزبيدة", "القناطر"]
    };

    const [service, setService] = useState('');
    const [area, setArea] = useState('');
    const [province, setProvince] = useState('');
    const [availableProvinces, setAvailableProvinces] = useState([]);

    const services = ['تنظيف', 'سباكة', 'كهرباء', 'نقل أثاث'];
    const areas = Object.keys(regions);

    const handleAreaChange = (e) => {
        const selectedArea = e.target.value;
        setArea(selectedArea);
        setProvince('');
        setAvailableProvinces(regions[selectedArea] || []);
    };

    const handleSearch = () => {
        console.log('Selected Service:', service);
        console.log('Selected Area:', area);
        console.log('Selected Province:', province);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                mx: 2,
                my: 4,
                bgcolor: 'background.paper',
                borderRadius: 2
            }}
        >
            <Stack spacing={3} direction="column">
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        color: '#006C35',
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    البحث عن خدمة
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <FormControl fullWidth size="medium">
                    <InputLabel id="service-label" sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                        اختر الخدمة
                    </InputLabel>
                    <Select
                        labelId="service-label"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        label="اختر الخدمة"
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                        }}
                    >
                        {services.map((serv, index) => (
                            <MenuItem
                                key={index}
                                value={serv}
                                sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                            >
                                {serv}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="medium">
                    <InputLabel id="area-label" sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                        اختر المنطقة
                    </InputLabel>
                    <Select
                        labelId="area-label"
                        value={area}
                        onChange={handleAreaChange}
                        label="اختر المنطقة"
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                        }}
                    >
                        {areas.map((areaItem, index) => (
                            <MenuItem
                                key={index}
                                value={areaItem}
                                sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                            >
                                {areaItem}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="medium">
                    <InputLabel id="province-label" sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                        اختر المحافظة
                    </InputLabel>
                    <Select
                        labelId="province-label"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        label="اختر المحافظة"
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#006C35',
                            },
                        }}
                    >
                        {availableProvinces.map((prov, index) => (
                            <MenuItem
                                key={index}
                                value={prov}
                                sx={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
                            >
                                {prov}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    sx={{
                        backgroundColor: '#006C35',
                        color: 'white',
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#004d00',
                        },
                    }}
                >
                    بحث عن الخدمة
                </Button>
            </Stack>
        </Paper>
    );
};

export default ServiceSearchSection;