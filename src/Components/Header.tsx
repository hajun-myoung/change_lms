import { Box } from "@mui/material";
import viteLogo from "/vite.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  return (
    <Box className="fullWidth header">
      {/* Logo Wrapper */}
      <Box className="fullHeight">
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
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
