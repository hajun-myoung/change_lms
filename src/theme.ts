import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    announcePreviewTitle: React.CSSProperties;
    announcePreviewContent: React.CSSProperties;
    blacksmall: React.CSSProperties;
    ad_title: React.CSSProperties;
    ad_description: React.CSSProperties;
    toDetail: React.CSSProperties;
    boardPreview_title: React.CSSProperties;
    boardPreview_detail: React.CSSProperties;
    boardPreview_author: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    announcePreviewTitle?: React.CSSProperties;
    announcePreviewContent: React.CSSProperties;
    blacksmall: React.CSSProperties;
    ad_title: React.CSSProperties;
    ad_description: React.CSSProperties;
    toDetail: React.CSSProperties;
    boardPreview_title: React.CSSProperties;
    boardPreview_detail: React.CSSProperties;
    boardPreview_author: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    announcePreviewTitle: true;
    announcePreviewContent: true;
    blacksmall: true;
    ad_title: true;
    ad_description: true;
    toDetail: true;
    boardPreview_title: true;
    boardPreview_detail: true;
    boardPreview_author: true;
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
    ad_title: { fontSize: "17.5px", fontWeight: 900 },
    ad_description: { fontSize: "11.7px", fontWeight: 600 },
    toDetail: {
      fontSize: "12px",
      color: "grey",
      fontWeight: "bold",
    },
    boardPreview_title: {
      fontSize: "14px",
    },
    boardPreview_detail: {
      fontSize: "12px",
      color: "gray",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      lineClamp: 1,
      boxOrient: "vertical",
      display: "-webkit-box",
    },
    boardPreview_author: {
      fontSize: "12px",
      color: "gray",
      overflow: "hidden",
    },
  },
});

export default theme;
