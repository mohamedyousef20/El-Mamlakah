"use client";
import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Import the router

const ServiceSearchSection = () => {
    const router = useRouter(); // Initialize the router

    // Define regions and their provinces
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

    // State for selected filters
    const [service, setService] = useState("");
    const [area, setArea] = useState("");
    const [province, setProvince] = useState("");
    const [availableProvinces, setAvailableProvinces] = useState([]);
    const [availableService, setAvailableService] = useState([]); // Define availableService state

    // Define available areas
    const areas = Object.keys(regions);

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/v1/service");
                if (!res.ok) {
                    throw new Error("فشل في تحميل الفئات.");
                }
                const data = await res.json();
                setAvailableService(data.data); // Set the fetched services
            } catch (error) {
                console.error("Error fetching services:", error);
                // Optionally, show a notification to the user
                alert("حدث خطأ أثناء تحميل الفئات!");
                setAvailableService([]); // Fallback to an empty array
            }
        };

        fetchServices(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs only once on mount

    // Handle area selection
    const handleAreaChange = (e) => {
        const selectedArea = e.target.value;
        setArea(selectedArea);
        setProvince("");
        setAvailableProvinces(regions[selectedArea] || []);
    };

    // Handle search button click
    const handleSearch = () => {
        // Construct the query string with filters
        let query = `/articles?service=${encodeURIComponent(service)}`;
        if (area) {
            query += `&area=${encodeURIComponent(area)}`;
            if (province) {
                query += `&province=${encodeURIComponent(province)}`;
            }
        }

        // Redirect to the articles page with the query parameters
        router.push(query);
    };

    return (
        <>
            {/* Search Inputs in Row Layout */}
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                mt={4}
                sx={{ flexWrap: "wrap", justifyContent: "center", gap: 3 }}
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
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}>
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
                        {availableService.map((serv, index) => (
                            <MenuItem key={index} value={serv._id}>
                                {serv.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Area Selection */}
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}>
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
                <FormControl fullWidth sx={{ maxWidth: 250, m: 1 }}>
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
                        m: 1,
                    }}
                >
                    بحث عن الخدمة
                </Button>
            </Stack>
        </>
    );
};

export default ServiceSearchSection;