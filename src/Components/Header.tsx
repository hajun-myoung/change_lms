import { Box } from "@mui/material";
import appLogo from "../assets/change_lms-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
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
            padding: 10,
            boxSizing: "border-box",
            paddingLeft: 0,
          }}
        />
      </Box>
      <AccountCircleIcon fontSize="large" />
    </Box>
  );
}
