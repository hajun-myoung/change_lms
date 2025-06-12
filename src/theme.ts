import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    announcePreviewTitle: React.CSSProperties;
    announcePreviewContent: React.CSSProperties;
    blacksmall: React.CSSProperties;
    ad_title: React.CSSProperties;
    ad_description: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    announcePreviewTitle?: React.CSSProperties;
    announcePreviewContent: React.CSSProperties;
    blacksmall: React.CSSProperties;
    ad_title: React.CSSProperties;
    ad_description: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    announcePreviewTitle: true;
    announcePreviewContent: true;
    blacksmall: true;
    ad_title: true;
    ad_description: true;
  }
}

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "20px",
      fontWeight: 600,
      fontFamily: "Pretendard, sans-serif",
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 700,
      fontFamily: "Pretendard, sans-serif",
    },
    announcePreviewTitle: {
      fontSize: "16px",
      fontWeight: 800,
      fontFamily: "Pretendard, sans-serif",
    },
    announcePreviewContent: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Pretendard, sans-serif",
      color: "gray",
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      lineClamp: 2,
      boxOrient: "vertical",
      display: "-webkit-box",
    },
    blacksmall: {
      fontSize: "14px",
      color: "#000",
      fontFamily: "Pretendard, sans-serif",
      lineHeight: "1.1",
    },
    ad_title: { fontSize: "18px", fontWeight: 900 },
    ad_description: { fontSize: "14px", fontWeight: 600 },
  },
});

export default theme;
