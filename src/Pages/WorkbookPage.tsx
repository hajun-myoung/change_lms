import { Box, Typography } from "@mui/material";
import Header from "../Components/Header";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import DownloadIcon from "@mui/icons-material/Download";
import IosShareIcon from "@mui/icons-material/IosShare";

import workbookPdf from "../assets/workbook.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default function WorkbookPage() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigation = useNavigate();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const baseWidth = 612; // PDF의 원래 너비 (A4 기준, px 단위)
        const availableWidth = containerRef.current.offsetWidth;
        const newScale = availableWidth / baseWidth;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Box className="wrapper">
      <Header subtitle="수련회 워크북" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0,
        }}
      >
        <Box className="fullWidth fully_centeralize">
          <a
            href={workbookPdf} // PDF URL
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box className="homebutton fully_centeralize">
              <DownloadIcon fontSize="large" sx={{ color: "#1a1c21" }} />
            </Box>
          </a>
          <Box
            className="homebutton fully_centeralize"
            onClick={() => {
              navigation("/");
            }}
          >
            <HomeFilledIcon fontSize="large" sx={{ color: "#1a1c21" }} />
          </Box>
          <Box
            className="homebutton fully_centeralize"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "수련회 워크북",
                  text: "2025 Summer Retreat - CHANGE 워크북",
                  url: workbookPdf,
                });
              } else {
                alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
              }
            }}
          >
            <IosShareIcon fontSize="large" sx={{ color: "#1a1c21" }} />
          </Box>
        </Box>
        <Box
          ref={containerRef}
          className="centeralize"
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            maxHeight: "calc(100vh-100px)",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Document file={workbookPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {/* height, width는 number 타입으로 vh, %는 먹지 않습니다. */}
            <Page
              scale={scale}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </Box>
        <Box
          className="fully_centeralize fullWidth"
          sx={{
            display: "flex",
            p: 1,
            boxSizing: "border-box",
            height: "60px",
          }}
        >
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev + -1)}
          >
            이전페이지
          </button>
          <Typography sx={{ ml: 2, mr: 2 }}>
            {pageNumber} / {numPages}
          </Typography>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((prev) => prev + +1)}
          >
            다음페이지
          </button>
        </Box>
      </Box>
    </Box>
  );
}
