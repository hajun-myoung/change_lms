import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "20px",
      fontWeight: 600,
      fontFamily: "Pretendard, sans-serif",
    },
    // 필요하면 다른 variant도 설정 가능
    subtitle1: {
      fontSize: "18px",
      fontWeight: 700,
      fontFamily: "Pretendard, sans-serif",
    },
  },
});

export default theme;
