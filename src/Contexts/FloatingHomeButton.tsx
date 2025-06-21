import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";

export default function FloatingHomeButton() {
  const navigation = useNavigate();
  return (
    <Box
      className="leftBottom_floating fully_centeralize"
      onClick={() => {
        navigation("/");
      }}
    >
      <HomeFilledIcon fontSize="large" sx={{ color: "#1a1c21" }} />
    </Box>
  );
}
