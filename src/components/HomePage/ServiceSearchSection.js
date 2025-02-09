"use client";
import React, { useState } from "react";
import {
    Typography,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    Paper,
    Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

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
        "منطقة القصيم": ["بريدة", "عنيزة", "الزبيدة", "القناطر"],
    };

    const [service, setService] = useState("");
    const [area, setArea] = useState("");
    const [province, setProvince] = useState("");
    const [availableProvinces, setAvailableProvinces] = useState([]);

    const services = ["تنظيف", "سباكة", "كهرباء", "نقل أثاث"];
    const areas = Object.keys(regions);

    const handleAreaChange = (e) => {
        const selectedArea = e.target.value;
        setArea(selectedArea);
        setProvince("");
        setAvailableProvinces(regions[selectedArea] || []);
    };

    const handleSearch = () => {
        console.log("Selected Service:", service);
        console.log("Selected Area:", area);
        console.log("Selected Province:", province);
    };

    return (
      <>
            
         
            {/* Search Inputs in Row Layout */}
            <Stack
                direction="row"
                alignItems="center"
                spacing={2} // Adds space between items
                mt={4}
                sx={{ flexWrap: "wrap", justifyContent: "center", gap: 3 }} // Extra spacing
            >
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        color: "#006C35",
                        fontWeight: "bold",
                        mb: 2,
                    }}
                >
                    ابحث عن خدمة
                </Typography>

                {/* Service Selection */}
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}> {/* Added margin */}
                    <InputLabel id="service-label">اختر الخدمة</InputLabel>
                    <Select
                        labelId="service-label"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                        }}
                    >
                        {services.map((serv, index) => (
                            <MenuItem key={index} value={serv}>
                                {serv}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Area Selection */}
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}> {/* Added margin */}
                    <InputLabel id="area-label">اختر المنطقة</InputLabel>
                    <Select
                        labelId="area-label"
                        value={area}
                        onChange={handleAreaChange}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                        }}
                    >
                        {areas.map((areaItem, index) => (
                            <MenuItem key={index} value={areaItem}>
                                {areaItem}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Province Selection */}
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}> {/* Added margin */}
                    <InputLabel id="province-label">اختر المحافظة</InputLabel>
                    <Select
                        labelId="province-label"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        sx={{
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#006C35" },
                        }}
                    >
                        {availableProvinces.map((prov, index) => (
                            <MenuItem key={index} value={prov}>
                                {prov}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Search Button */}
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    sx={{
                        backgroundColor: "#006C35",
                        color: "white",
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        "&:hover": { backgroundColor: "#004d00" },
                        m: 1, // Added margin
                    }}
                >
                    بحث عن الخدمة
                </Button>
            </Stack>

        </>

    );
};

export default ServiceSearchSection;
