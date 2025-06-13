import { Box, Typography } from "@mui/material";
import appLogo from "../assets/change_lms-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header({ subtitle }: { subtitle?: string }) {
  return (
    <Box className="fullWidth header">
      {/* Logo Wrapper */}
      <Box className="fullHeight">
        <img
          src={appLogo}
          className="logo"
          alt="App Logo: Change LMS"
          style={{
            height: "100%",
            padding: "10px 0px",
            boxSizing: "border-box",
          }}
        />
      </Box>
      {subtitle && <Typography>{subtitle}</Typography>}
      <AccountCircleIcon fontSize="large" />
    </Box>
  );
}
