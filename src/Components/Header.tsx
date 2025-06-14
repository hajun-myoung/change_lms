import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header({ subtitle }: { subtitle?: string }) {
  return (
    <Box className="fullWidth header">
      {/* Logo Wrapper */}
      <Box
        className="fullHeight"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography variant="header_small" sx={{ ml: "1px" }}>
          2025 SUMMER RETREAT
        </Typography>
        <Typography variant="header">CHANGE</Typography>
      </Box>
      {subtitle && <Typography>{subtitle}</Typography>}
      <AccountCircleIcon fontSize="large" sx={{ color: "#FAC656" }} />
    </Box>
  );
}
