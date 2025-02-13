import React from "react";
import { Typography } from "@mui/material";

const Logo = () => {
    return (
        <Typography
            variant="h3"
            component="h1"
            sx={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: "bold",
                color: "#fff",
                letterSpacing: "2px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                // Responsive font sizes: xs for mobile, sm for tablets, md for desktop
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.2,
                // Optional: additional styling to center the logo container if needed
                mx: "auto",
            }}
        >
            المملكة
        </Typography>
    );
};

export default Logo;
