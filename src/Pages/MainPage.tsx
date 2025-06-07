import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";

export default function MainPage() {
  return (
    <Box className="wrapper">
      <Header />
      <Box className="flex-left gap5" sx={{ padding: "10px", paddingLeft: 0 }}>
        <Typography variant="body1">높은뜻대학교 정의캠퍼스</Typography>
      </Box>
    </Box>
  );
}
