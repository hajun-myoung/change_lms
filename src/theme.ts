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
    boardTitle: React.CSSProperties;
    boardContent: React.CSSProperties;
    boardMetadata: React.CSSProperties;
    subtitle_small: React.CSSProperties;
    subtitle_big: React.CSSProperties;
    subtitle_extrasmall: React.CSSProperties;
    header: React.CSSProperties;
    header_small: React.CSSProperties;
    footerinfo: React.CSSProperties;
    label: React.CSSProperties;
    credit_category: React.CSSProperties;
    credit_body1: React.CSSProperties;
    credit_body2: React.CSSProperties;
    success: React.CSSProperties;
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
    boardTitle: React.CSSProperties;
    boardContent: React.CSSProperties;
    boardMetadata: React.CSSProperties;
    subtitle_small: React.CSSProperties;
    subtitle_big: React.CSSProperties;
    subtitle_extrasmall: React.CSSProperties;
    header: React.CSSProperties;
    header_small: React.CSSProperties;
    footerinfo: React.CSSProperties;
    label: React.CSSProperties;
    credit_category: React.CSSProperties;
    credit_body1: React.CSSProperties;
    credit_body2: React.CSSProperties;
    success: React.CSSProperties;
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
    boardTitle: true;
    boardContent: true;
    boardMetadata: true;
    subtitle_small: true;
    subtitle_big: true;
    subtitle_extrasmall: true;
    header: true;
    header_small: true;
    footerinfo: true;
    label: true;
    credit_category: true;
    credit_body1: true;
    credit_body2: true;
    success: true;
  }
}

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "white",
          "&:before": {
            borderBottom: "1px solid #fff", // default baseline
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #ddd", // hovering baseline
          },
          "&:after": {
            borderBottom: "2px solid #FAC656", // focusing baseline
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff", // color of label
          "&.Mui-focused": {
            color: "#FAC656", // focusing label
          },
        },
      },
    },
  },
  typography: {
    body1: {
      fontSize: "20px",
      fontWeight: 600,
      fontFamily: '"Pretendard", sans-serif',
      color: "#FAC656",
    },
    body2: {
      fontWeight: 600,
      fontFamily: '"Pretendard", sans-serif',
      color: "#FAC656",
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 700,
      fontFamily: '"Pretendard", sans-serif',
    },
    announcePreviewTitle: {
      fontSize: "16px",
      fontWeight: 800,
      fontFamily: '"Pretendard", sans-serif',
      color: "#00002F",
    },
    announcePreviewContent: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: '"Pretendard", sans-serif',
      color: "#00002F",
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
      color: "#F5F5DC",
      fontFamily: '"Pretendard", sans-serif',
      lineHeight: "1.1",
    },
    ad_title: {
      color: "#F5F5DC",
      textShadow: "1px 1px 2px black",
      fontSize: "17.5px",
      fontWeight: 900,
      fontFamily: '"Pretendard", sans-serif',
    },
    ad_description: {
      color: "#F5F5DC",
      textShadow: "1px 1px 2px black",
      fontSize: "11.7px",
      fontWeight: 600,
      fontFamily: '"Pretendard", sans-serif',
    },
    toDetail: {
      fontSize: "12px",
      color: "grey",
      fontWeight: "bold",
      fontFamily: '"Pretendard", sans-serif',
    },
    boardPreview_title: {
      color: "#000",
      fontSize: "14px",
      fontFamily: '"Pretendard", sans-serif',
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
      fontFamily: ' "Pretendard", sans-serif',
    },
    boardPreview_author: {
      fontSize: "12px",
      color: "gray",
      overflow: "hidden",
      fontFamily: '"Pretendard", sans-serif',
    },
    boardTitle: {
      fontSize: "16px",
      fontWeight: 900,
      color: "#FAC656",
      fontFamily: '"Pretendard", sans-serif',
    },
    boardContent: {
      fontSize: "14px",
      whiteSpace: "pre-line",
      textOverflow: "ellipsis",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      lineClamp: 3,
      boxOrient: "vertical",
      display: "-webkit-box",
      overflow: "hidden",
      color: "#FFF",
      fontFamily: '"Pretendard", sans-serif',
    },
    boardMetadata: {
      fontSize: "14px",
      color: "#DADADA",
    },
    subtitle_extrasmall: {
      fontFamily: '"Staatliches", "Pretendard", sans-serif',
      color: "#FAC656",
      fontSize: "14px",
      fontWeight: "bold",
      lineHeight: 1.0,
    },
    subtitle_small: {
      fontFamily: '"Staatliches", "Pretendard", sans-serif',
      color: "#FAC656",
      fontSize: "20px",
      fontWeight: "bold",
      lineHeight: 1.0,
    },
    subtitle_big: {
      fontFamily: '"Staatliches", "Pretendard", sans-serif',
      color: "#FAC656",
      fontSize: "64px",
      fontWeight: "bold",
      lineHeight: 1.0,
    },
    header: {
      color: "#FAC656",
      fontSize: "32px",
      fontWeight: "bold",
      lineHeight: 1.0,
      fontFamily: '"Staatliches", "Pretendard", sans-serif',
    },
    header_small: {
      color: "#FAC656",
      fontSize: "12px",
      fontWeight: "bold",
      lineHeight: 1.0,
      fontStretch: "57%",
      fontFamily: '"Staatliches", "Pretendard", sans-serif',
    },
    footerinfo: {
      color: "#FFF",
      fontSize: "2.2vw",
      fontFamily: '"Pretendard", sans-serif',
    },
    label: {
      fontSize: "16px",
      backgroundColor: "gray",
      paddingLeft: 6,
      paddingRight: 6,
      borderRadius: 12,
      color: "#FFF",
      fontFamily: '"Pretendard", sans-serif',
    },
    credit_category: {
      color: "#FFF",
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 500,
      fontSize: "18px",
    },
    credit_body1: {
      color: "#FAC656",
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 700,
      fontSize: "18px",
    },
    credit_body2: {
      color: "gray",
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 400,
      fontSize: "16px",
    },
    success: {
      fontSize: "14px",
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 400,
      color: "green",
    },
  },
});

export default theme;
