"use client"
import React, { useEffect, useState } from "react";
import {
    Box,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    useTheme,
    CircularProgress,
    Alert
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useRouter } from "next/navigation";

const ServiceAreaProvinceSelector = () => {
    const router = useRouter();

    // Use these parameters in your fetch request
  
    // Define regions and their corresponding provinces
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
        "منطقة القصيم": ["بريدة", "عنيزة", "الزبيدة", "القناطر"],
    };
    // State hooks for selections
    const [selectedService, setSelectedService] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [availableProvinces, setAvailableProvinces] = useState([]);

    // State for API data
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:5500/api/v1/service");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data?.data ?? []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress sx={{ color: '#006C35' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 4 }}>
                Failed to load services: {error}
            </Alert>
        );
    }

    console.log("services", services)

    // Update service selection
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    // When the user selects an area, update available provinces accordingly
    const handleAreaChange = (e) => {
        const area = e.target.value;
        setSelectedArea(area);
        setSelectedProvince(""); // Reset province selection
        setAvailableProvinces(regions[area] || []);
    };

    // Update province selection
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
    };

    // When the user confirms the selection, log the values (or trigger filtering/routing)
    const handleSubmit = () => {
        console.log(selectedArea)
        console.log(selectedService)
        console.log(selectedProvince)

        router.push(`/articles?service=${encodeURIComponent(selectedService)}&area=${encodeURIComponent(selectedArea)}&province=${encodeURIComponent(selectedProvince)}`);
    };

    return (
        <Box sx={{
            maxWidth: '800px',
            margin: '0 auto',
            p: { xs: 2, md: 4 },
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)'
        }}>
            <Typography variant="h4" sx={{
                fontFamily: "'Noto Sans Arabic', sans-serif",
                color: '#006C35',
                fontWeight: 700,
                textAlign: 'center',
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
                اختر الخدمة والمنطقة والمحافظة
            </Typography>

            <Stack spacing={3} sx={{ width: '100%' }}>
                {/* Service Selection */}
                <FormControl fullWidth sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E5E7EB' },
                        '&:hover fieldset': { borderColor: '#006C35' },
                        '&.Mui-focused fieldset': { borderColor: '#006C35' }
                    }
                }}>
                    <InputLabel sx={{
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        color: '#6B7280',
                        transformOrigin: 'right',
                        left: 'unset',
                        right: '14px',
                        '&.Mui-focused': { color: '#006C35' }
                    }}>
                        اختر الخدمة
                    </InputLabel>
                    <Select
                        value={selectedService}
                        onChange={handleServiceChange}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            color: '#111827',
                            textAlign: 'right',
                            '& .MuiSelect-icon': {
                                color: '#006C35',
                                right: 'unset',
                                left: '14px'
                            }
                        }}
                    >
                        {services.map((serv, index) => (
                            <MenuItem key={index} value={serv.name} sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                justifyContent: 'flex-end',
                                '&.Mui-selected': { backgroundColor: '#E9F5F0' }
                            }}>
                                {serv.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Area Selection */}
                <FormControl fullWidth sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E5E7EB' },
                        '&:hover fieldset': { borderColor: '#006C35' },
                        '&.Mui-focused fieldset': { borderColor: '#006C35' }
                    }
                }}>
                    <InputLabel sx={{
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        color: '#6B7280',
                        transformOrigin: 'right',
                        left: 'unset',
                        right: '14px',
                        '&.Mui-focused': { color: '#006C35' }
                    }}>
                        اختر المنطقة
                    </InputLabel>
                    <Select
                        value={selectedArea}
                        onChange={handleAreaChange}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            color: '#111827',
                            textAlign: 'right',
                            '& .MuiSelect-icon': {
                                color: '#006C35',
                                right: 'unset',
                                left: '14px'
                            }
                        }}
                    >
                        {Object.keys(regions).map((area, index) => (
                            <MenuItem key={index} value={area} sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                justifyContent: 'flex-end',
                                '&.Mui-selected': { backgroundColor: '#E9F5F0' }
                            }}>
                                {area}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Province Selection */}
                <FormControl fullWidth sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': { borderColor: '#E5E7EB' },
                        '&:hover fieldset': { borderColor: '#006C35' },
                        '&.Mui-focused fieldset': { borderColor: '#006C35' }
                    }
                }}>
                    <InputLabel sx={{
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        color: '#6B7280',
                        transformOrigin: 'right',
                        left: 'unset',
                        right: '14px',
                        '&.Mui-focused': { color: '#006C35' }
                    }}>
                        اختر المحافظة
                    </InputLabel>
                    <Select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        IconComponent={KeyboardArrowDownRoundedIcon}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            color: '#111827',
                            textAlign: 'right',
                            '& .MuiSelect-icon': {
                                color: '#006C35',
                                right: 'unset',
                                left: '14px'
                            }
                        }}
                    >
                        {availableProvinces.map((prov, index) => (
                            <MenuItem key={index} value={prov} sx={{
                                fontFamily: "'Noto Sans Arabic', sans-serif",
                                justifyContent: 'flex-end',
                                '&.Mui-selected': { backgroundColor: '#E9F5F0' }
                            }}>
                                {prov}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{
                        bgcolor: '#006C35',
                        color: '#fff',
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        borderRadius: '8px',
                        py: 2,
                        fontSize: '1rem',
                        fontWeight: 700,
                        '&:hover': {
                            bgcolor: '#005A2B',
                            boxShadow: '0px 4px 12px rgba(0, 108, 53, 0.3)'
                        },
                        '&:active': { transform: 'scale(0.98)' }
                    }}
                >
                    تأكيد الاختيار
                </Button>
            </Stack>
        </Box>
    );
};

export default ServiceAreaProvinceSelector;
