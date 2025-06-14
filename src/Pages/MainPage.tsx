import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";

import churchLogo from "../assets/church-logo.png";
import youtubeLogo from "../assets/youtube.png";
import mapIcon from "../assets/naver_map.png";
import ClassIcon from "@mui/icons-material/Class";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SchoolIcon from "@mui/icons-material/School";
import ChurchTwoToneIcon from "@mui/icons-material/ChurchTwoTone";
import HeadsetTwoToneIcon from "@mui/icons-material/HeadsetTwoTone";
import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import CardGiftcardTwoToneIcon from "@mui/icons-material/CardGiftcardTwoTone";

import type { Announcement, LoadingState } from "../types/MainPage";
import type { Pray, User } from "../types/Common";

import { TimetableContent } from "../Components/TimetableContent";
import Advertisement from "../Components/Advertisement";

export default function MainPage() {
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [prays, setPrays] = useState<Array<Pray>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<LoadingState>({
    announcement: true,
    prayBoard: true,
    users: true,
  });
  const [timetableOpen, setTimetableOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const navigation = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading((prev) => ({ ...prev, announcement: true }));
      const q = query(
        collection(db, "announcements"),
        where("active", "==", true),
        orderBy("created_at", "asc")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map(
          (doc) => doc.data() as Announcement
        );
        setAnnouncements(docs);
      } else {
        console.log("[Warning]No accouncements has been queried");
      }
      setIsLoading((prev) => ({ ...prev, announcement: false }));

      setIsLoading((prev) => ({ ...prev, prayBoard: true }));
      const q2 = query(collection(db, "pray_board"));
      const querySnapshot2 = await getDocs(q2);

      if (!querySnapshot2.empty) {
        const prays = querySnapshot2.docs.map((pray) => pray.data() as Pray);
        setPrays(prays);
      } else {
        console.log("[Warning]No Prays");
      }
      setIsLoading((prev) => ({ ...prev, prayBoard: false }));

      setIsLoading((prev) => ({ ...prev, users: true }));
      setIsLoading((prev) => ({ ...prev, users: true }));
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);
      if (!usersSnapshot.empty) {
        const users = usersSnapshot.docs.map((user) => user.data() as User);
        setUsers(users);
      }
      setIsLoading((prev) => ({ ...prev, users: false }));
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <Box className="wrapper">
      <Header />
      <Box className="flex-left gap5" sx={{ padding: "10px", paddingLeft: 0 }}>
        <Typography variant="body1">높은뜻대학교 정의캠퍼스</Typography>
      </Box>
      {/* 공지사항 영역 */}
      <Box className="fullWidth announcementArea flex-left">
        {isLoading.announcement && (
          <Skeleton
            variant="rectangular"
            className="announcementDocument"
            animation="wave"
          />
        )}
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
      {/* 임시코드: 아이콘 선택기 */}
      <Switch checked={checked} onChange={handleChange} />
      <Typography>
        임시 아이콘 선택기-현재스타일: {checked ? "신버젼" : "구버젼"}
      </Typography>
      <Box className="fullWidth flex-left horizontal_overflow" sx={{ mt: 3 }}>
        <Box
          className="external-linkbox"
          onClick={() => {
            window.open("http://www.jeongeui.com", "_blank");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <ChurchTwoToneIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <img
                className="external-icon-image"
                src={churchLogo}
                alt="church logo"
              />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">교회</Typography>
            <Typography variant="blacksmall">홈</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            window.open(
              "https://youtube.com/playlist?list=PLCOgZLj-whreTVYXkuQRv_Mx0O2j5A9vW&feature=shared",
              "_blank"
            );
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <HeadsetTwoToneIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <img
                className="external-icon-image"
                src={youtubeLogo}
                alt="youtube logo"
              />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">찬양</Typography>
            <Typography variant="blacksmall">콘티</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            navigation("/pray");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <AssistantTwoToneIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <Box className="emoji-box">🙏</Box>
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">기도</Typography>
            <Typography variant="blacksmall">제목</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            window.open("https://map.naver.com", "_blank");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <MapTwoToneIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <img
                className="external-icon-image"
                src={mapIcon}
                alt="youtube logo"
              />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">네이버</Typography>
            <Typography variant="blacksmall">지도</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            alert("아직 준비되지 않은 기능입니다");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <CardGiftcardTwoToneIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <Box className="emoji-box">🎁</Box>
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">랜덤</Typography>
            <Typography variant="blacksmall">선물</Typography>
          </Box>
        </Box>
      </Box>
      {/* 중간 네비게이션 2행 */}
      <Box className="fullWidth flex-left horizontal_overflow" sx={{ mt: 1 }}>
        <Box
          className="external-linkbox"
          onClick={() => {
            alert("아직 준비되지 않은 기능입니다");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <Diversity3Icon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <Diversity3Icon />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">우리조</Typography>
            <Typography variant="blacksmall">보기</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            alert("아직 준비되지 않은 기능입니다");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <SchoolIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <SchoolIcon />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">수강</Typography>
            <Typography variant="blacksmall">신청</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            alert("아직 준비되지 않은 기능입니다");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <ClassIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <ClassIcon />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">실라</Typography>
            <Typography variant="blacksmall">버스</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            alert("아직 준비되지 않은 기능입니다");
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <DocumentScannerIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <DocumentScannerIcon />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">수련회</Typography>
            <Typography variant="blacksmall">워크북</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            setTimetableOpen(true);
          }}
        >
          <Box className="external-icon centeralize">
            {checked ? (
              <ScheduleIcon sx={{ color: "rgb(255, 146, 139)" }} />
            ) : (
              <ScheduleIcon />
            )}
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">타임</Typography>
            <Typography variant="blacksmall">테이블</Typography>
          </Box>
        </Box>
      </Box>
      {/* 광고 영역 */}
      <Box sx={{ marginTop: "5vh" }}>
        <Advertisement ad_id="outreach" />
        <Advertisement ad_id="leader" />
      </Box>
      {/* 게시판 영역: 기도제목 */}

      <Box
        className="flex-left gap5"
        sx={{
          padding: "10px",
          paddingLeft: 0,
          marginTop: 3,
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="body1">🙏 기도제목</Typography>
        <Typography
          variant="toDetail"
          onClick={() => {
            navigation("/pray");
          }}
        >
          more {">"}
        </Typography>
      </Box>
      {isLoading.prayBoard ? (
        <Skeleton
          variant="rectangular"
          className="boardPreview"
          animation="wave"
        />
      ) : (
        <Box className="boardPreview">
          {prays ? (
            prays.map((pray) => (
              <Box
                key={`pray_${pray.created_at}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ marginRight: 1 }}>
                    <Typography variant="boardPreview_title">
                      {pray.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "50%",
                    }}
                  >
                    <Typography variant="boardPreview_detail">
                      {pray.content}
                    </Typography>
                  </Box>
                </Box>
                {users && (
                  <Box sx={{ minWidth: "32px" }}>
                    <Typography variant="boardPreview_author">
                      {
                        users.filter(
                          (user) => user.student_id == pray.author_id
                        )[0]?.name
                      }
                    </Typography>
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Box
              className="fully_centeralize fullSize"
              sx={{ height: "120px" }}
            >
              <Typography>No Prays</Typography>
            </Box>
          )}
        </Box>
      )}

      {/* 타임테이블 모달창 */}
      <Dialog
        open={timetableOpen}
        onClose={() => setTimetableOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          수련회 타임테이블
          <IconButton
            aria-label="close"
            onClick={() => setTimetableOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ p: 2 }}>
          <TimetableContent />
        </Box>
      </Dialog>
    </Box>
  );
}
