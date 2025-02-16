"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function AdminDashboardButton() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get("admin-token");
        setIsAdmin(!!token);
    }, []);

    if (!isAdmin) return null;

    return (
        <Link href="/admin/dashboard/overview" passHref legacyBehavior>
            <Button
                variant="contained"
                startIcon={<DashboardIcon sx={{ fontSize: 20 }} />}
                sx={{
                    px: 3,
                    py: 1,
                    bgcolor: "#111827",
                    borderRadius: "8px",
                    gap: 1,
                    "&:hover": {
                        bgcolor: "#1f2937",
                        transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                }}
            >
                <span style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}>
                    لوحة التحكم
                </span>
            </Button>
        </Link>
    );
}