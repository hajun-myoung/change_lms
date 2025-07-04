import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ClassIcon from "@mui/icons-material/Class";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SchoolIcon from "@mui/icons-material/School";
import ChurchTwoToneIcon from "@mui/icons-material/ChurchTwoTone";
import HeadsetTwoToneIcon from "@mui/icons-material/HeadsetTwoTone";
import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";

import parkingLocationImage from "../assets/parking_map.png";

import type { Announcement, LoadingState } from "../types/MainPage";
import type { Pray, User, Configure } from "../types/Common";

import { TimetableContent } from "../Components/TimetableContent";
import Advertisement from "../Components/Advertisement";

import { useAuth } from "../Contexts/AuthContexts";
import {
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";

export default function MainPage() {
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [prays, setPrays] = useState<Array<Pray>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<LoadingState>({
    announcement: true,
    prayBoard: true,
    users: true,
    courses: false,
    selected_courses: false,
  });
  const [configure, setConfigure] = useState<Configure>();

  // Modal handlers
  const [groupViewOpen, setGroupViewOpen] = useState<boolean>(false);
  const [timetableOpen, setTimetableOpen] = useState<boolean>(false);
  const [parkingOpen, setParkingOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  // User Context
  const { user } = useAuth();
  // console.log(user);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const docRef = doc(db, "configure", "global");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const flags = snapshot.data();
        setConfigure(flags as Configure);
      } else {
        console.warn("기능 설정이 존재하지 않음");
      }

      setIsLoading((prev) => ({ ...prev, announcement: true }));
      const q = query(
        collection(db, "announcements"),
        where("active", "==", true),
        orderBy("created_at", "asc")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Announcement),
          id: doc.id,
        }));
        setAnnouncements(docs);
      } else {
        console.log("[Warning]No accouncements has been queried");
      }
      setIsLoading((prev) => ({ ...prev, announcement: false }));

      setIsLoading((prev) => ({ ...prev, prayBoard: true }));
      const q2 = query(collection(db, "pray_board"), limit(10));
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

  useEffect(() => {
    console.log(prays);
    console.log(prays.length);
  }, [prays]);

  const handleSettingClose = () => {
    setSettingOpen(false);
  };

  const handleToggle = (key: keyof Configure) => {
    setConfigure((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const handleSave = async () => {
    const ref = doc(db, "configure", "global");
    console.log(configure);
    console.log(auth.currentUser?.uid);
    await updateDoc(
      ref,
      configure
        ? { ...configure }
        : {
            enable_course_apply: false,
            enable_group_view: false,
            enable_pray_write: false,
          }
    );
    handleSettingClose();
  };

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
                  sx={{
                    mt: "auto",
                    alignSelf: "flex-start",
                    color: "#00002F",
                    p: 0,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    navigation(`/announcement/${doc.id}`);
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
        <Box
          className="external-linkbox"
          onClick={() => {
            window.open("http://www.jeongeui.com", "_blank");
          }}
        >
          <Box className="external-icon centeralize">
            <ChurchTwoToneIcon sx={{ color: "#FAC656" }} />
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
            <HeadsetTwoToneIcon sx={{ color: "#FAC656" }} />
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
            <AssistantTwoToneIcon sx={{ color: "#FAC656" }} />
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
            <MapTwoToneIcon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">네이버</Typography>
            <Typography variant="blacksmall">지도</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            setParkingOpen(true);
          }}
        >
          <Box className="external-icon centeralize">
            <DirectionsCarFilledTwoToneIcon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">주차</Typography>
            <Typography variant="blacksmall">안내</Typography>
          </Box>
        </Box>
      </Box>
      {/* 중간 네비게이션 2행 */}
      <Box className="fullWidth flex-left horizontal_overflow" sx={{ mt: 1 }}>
        <Box
          className="external-linkbox"
          onClick={() => {
            setGroupViewOpen(true);
          }}
        >
          <Box className="external-icon centeralize">
            <Diversity3Icon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">우리조</Typography>
            <Typography variant="blacksmall">보기</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            navigation("/courses");
          }}
        >
          <Box className="external-icon centeralize">
            <SchoolIcon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            {user?.is_leader ? (
              <>
                <Typography variant="blacksmall">수강</Typography>
                <Typography variant="blacksmall">신청</Typography>
              </>
            ) : (
              <>
                <Typography variant="blacksmall">시간표</Typography>
                <Typography variant="blacksmall">보기</Typography>
              </>
            )}
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            navigation("/syllabus");
          }}
        >
          <Box className="external-icon centeralize">
            <ClassIcon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">실라</Typography>
            <Typography variant="blacksmall">버스</Typography>
          </Box>
        </Box>
        <Box
          className="external-linkbox"
          onClick={() => {
            navigation("/workbook");
          }}
        >
          <Box className="external-icon centeralize">
            <DocumentScannerIcon sx={{ color: "#FAC656" }} />
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
            <ScheduleIcon sx={{ color: "#FAC656" }} />
          </Box>
          <Box className="external_description_box">
            <Typography variant="blacksmall">타임</Typography>
            <Typography variant="blacksmall">테이블</Typography>
          </Box>
        </Box>
      </Box>

      {/* 관리자 메뉴행 */}
      {user.is_admin && (
        <Box>
          <Typography sx={{ mt: 2 }}>관리자 메뉴</Typography>
          <Box
            className="fullWidth flex-left horizontal_overflow admin_menuRow"
            sx={{ mt: 1 }}
          >
            <Box
              className="external-linkbox"
              onClick={() => {
                setSettingOpen(true);
              }}
            >
              <Box className="external-icon centeralize">
                <SettingsIcon sx={{ color: "#000" }} />
              </Box>
              <Box className="external_description_box">
                <Typography variant="blacksmall_admin">환경</Typography>
                <Typography variant="blacksmall_admin">설정</Typography>
              </Box>
            </Box>
            <Box
              className="external-linkbox"
              onClick={() => {
                navigation("/course_status");
              }}
            >
              <Box className="external-icon centeralize">
                <ClassIcon sx={{ color: "#000" }} />
              </Box>
              <Box className="external_description_box">
                <Typography variant="blacksmall_admin">수강</Typography>
                <Typography variant="blacksmall_admin">현황</Typography>
              </Box>
            </Box>
            <Box
              className="external-linkbox"
              onClick={() => {
                navigation("/course_grading");
              }}
            >
              <Box className="external-icon centeralize">
                <DocumentScannerIcon sx={{ color: "#000" }} />
              </Box>
              <Box className="external_description_box">
                <Typography variant="blacksmall_admin">이수</Typography>
                <Typography variant="blacksmall_admin">처리</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AssistantTwoToneIcon sx={{ color: "#FAC656", mr: 0.5 }} />
          <Typography variant="body1">기도제목</Typography>
        </Box>
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
          {prays.length > 0 ? (
            prays.map((pray) => (
              <Box
                key={`pray_${pray.created_at}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ marginRight: 1, maxWidth: "100px" }}>
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
              className="fully_centeralize fullWidth"
              sx={{ height: "120px" }}
            >
              <Typography variant="group_member">
                등록된 기도가 없습니다
              </Typography>
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

      {/* 주차안내 모달창 */}
      <Dialog
        open={parkingOpen}
        onClose={() => setParkingOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          주차안내
          <IconButton
            aria-label="close"
            onClick={() => setParkingOpen(false)}
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
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mr: 1 }} variant="group_member">
              •
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }} variant="group_member">
              오전 8시~밤 11시까지 정의여자고등학교에{"\n"} 주차가 가능합니다.{" "}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mr: 1 }} variant="group_member">
              •
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }} variant="group_member">
              가급적 필로티 건물은 지양해주세요.
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mr: 1 }} variant="group_member">
              •
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }} variant="group_member">
              체인지 액팅 때 차량사용이 필요한 경우{"\n"} 윤기헌 전도사에게
              문의해주세요.
            </Typography>
          </Box>
        </Box>
        <img src={parkingLocationImage} />
      </Dialog>

      {/* 조 안내 모달창 */}
      <Dialog
        open={groupViewOpen}
        onClose={() => setGroupViewOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          filter: configure?.enable_group_view ? "" : "blur(5px)",
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          우리조 보기
          <IconButton
            aria-label="close"
            onClick={() => setGroupViewOpen(false)}
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

        {user.group_id !== -1 ? (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="label" sx={{ mr: 1 }}>
                리더
              </Typography>
              <Typography variant="group_member">
                {
                  users.filter(
                    (target) =>
                      target.group_id == user.group_id && target.is_leader
                  )[0]?.name
                }
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography className="label" variant="label" sx={{ mr: 1 }}>
                멤버
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {users
                  .filter(
                    (target) =>
                      target.group_id == user.group_id && !target.is_leader
                  )
                  .map((user) => (
                    <Typography
                      key={`user_${user.name}`}
                      variant="group_member"
                      sx={{ mr: 0.5 }}
                    >
                      {user.name}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="group_member" sx={{ mr: 0.5 }}>
              배정된 조가 없습니다. 윤기헌 전도사님께 문의해주세요.
            </Typography>
          </Box>
        )}
      </Dialog>

      {/* 관리자 환경설정 모달 */}
      <Dialog open={settingOpen} onClose={handleSettingClose}>
        <DialogTitle>환경 설정</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={configure?.enable_group_view}
                  onChange={() => handleToggle("enable_group_view")}
                />
              }
              label="조 구성 확인 허용"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={configure?.enable_pray_write}
                  onChange={() => handleToggle("enable_pray_write")}
                />
              }
              label="기도제목 글쓰기 허용"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={configure?.enable_course_apply}
                  onChange={() => handleToggle("enable_course_apply")}
                />
              }
              label="수강신청 허용"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingClose}>취소</Button>
          <Button onClick={handleSave} variant="contained">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      {/* Version Indicator */}
      <Box
        className="fullWidth"
        sx={{ mt: 2, mb: 1, borderTop: "0.5px gray solid" }}
      >
        <Box sx={{ height: "2.4vw" }}>
          <Typography variant="footerinfo">
            Ver1.0.0 | Copyright @DENVER | Design assisted by Sandy, Lim.
            Eunseo, Choo.
          </Typography>
        </Box>
        <Box sx={{ height: "2.4vw" }}>
          <Typography variant="footerinfo">
            Published for @높은뜻 정의교회, 2025,.
          </Typography>
        </Box>
        <Box sx={{ height: "2.4vw" }}>
          <Typography variant="footerinfo">
            Contact us | fe.dev.denver@gmail.com or 높은뜻 정의교회 청년부
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
