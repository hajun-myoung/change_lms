import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import churchLogo from "../assets/church-logo.png";
import youtubeLogo from "../assets/youtube.png";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function MainPage() {
  const [announcements, setAnnouncements] = useState<Array<any>>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      const q = query(
        collection(db, "announcements"),
        where("active", "==", true),
        orderBy("created_at", "asc")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        setAnnouncements(docs);
      } else {
        console.log("[Warning]No accouncements has been queried");
      }
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    console.log(announcements);
  }, [announcements]);

  return (
    <Box className="wrapper">
      <Header />
      <Box className="flex-left gap5" sx={{ padding: "10px", paddingLeft: 0 }}>
        <Typography variant="body1">높은뜻대학교 정의캠퍼스</Typography>
      </Box>
      {/* 공지사항 영역 */}
      <Box className="fullWidth announcementArea flex-left">
        {announcements ? (
          announcements.map((doc) => {
            return (
              <Box
                key={`announcement-${doc.title}`}
                className="announcementDocument"
              >
                <Typography variant="announcePreviewTitle">
                  {doc.title}
                </Typography>
                <Typography variant="announcePreviewContent">
                  {doc.content}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ mt: "auto", alignSelf: "flex-start" }}
                  onClick={() => {
                    alert("아직 준비되지 않은 기능입니다");
                  }} // 클릭 핸들러
                >
                  자세히 {">"}
                </Button>
              </Box>
            );
          })
        ) : (
          <Box>
            <Typography>No Announcement</Typography>
          </Box>
        )}
      </Box>
      {/* 외부링크 연결 */}
      <Box className="fullWidth flex-left horizontal_overflow" sx={{ mt: 3 }}>
        <Box className="external-linkbox">
          <Box className="external-icon centeralize">
            <img
              className="external-icon-image"
              src={churchLogo}
              alt="church logo"
            />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">교회</Typography>
            <Typography variant="blacksmall">홈</Typography>
          </Box>
        </Box>
        <Box className="external-linkbox">
          <Box className="external-icon centeralize">
            <img
              className="external-icon-image"
              src={youtubeLogo}
              alt="youtube logo"
            />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">찬양</Typography>
            <Typography variant="blacksmall">콘티</Typography>
          </Box>
        </Box>
        <Box className="external-linkbox">
          <Box className="external-icon centeralize">
            <DocumentScannerIcon sx={{ width: "100%", height: "100%" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">수련회</Typography>
            <Typography variant="blacksmall">안내문</Typography>
          </Box>
        </Box>
        <Box className="external-linkbox">
          <Box className="external-icon centeralize">
            <Box className="emoji-box">🙏</Box>
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">기도</Typography>
            <Typography variant="blacksmall">제목</Typography>
          </Box>
        </Box>
        <Box className="external-linkbox">
          <Box className="external-icon centeralize">
            <ScheduleIcon sx={{ width: "100%", height: "100%" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">타임</Typography>
            <Typography variant="blacksmall">테이블</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
