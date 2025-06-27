import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import Header from "../Components/Header";

import { db } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import type { Course, CourseApplication } from "../types/Course";
import { useAuth } from "../Contexts/AuthContexts";
import type { LoadingState } from "../types/MainPage";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SearchCourseModal = ({
  groupDocId,
  onClose,
  selectedCourses,
}: {
  groupDocId: string | null;
  onClose: () => void;
  selectedCourses: Array<string>;
}) => {
  const [courses, setCourses] = useState<Array<Course>>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const data = snapshot.docs.map((doc) => doc.data() as Course);
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const applyCourse = async (courseId: string) => {
    if (!groupDocId) {
      alert("그룹 문서 ID가 없습니다.");
      return;
    }
    const groupRef = doc(db, "course_application", groupDocId);
    await updateDoc(groupRef, {
      selected_courses: arrayUnion(courseId),
    });
    alert("신청 완료!");
    window.location.reload();
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle sx={{ pl: 2, pr: 2, pb: 0, whiteSpace: "pre-line" }}>
        수강 신청
      </DialogTitle>
      <List>
        {courses.map((course) => (
          <ListItem
            key={course.code}
            className="course_modal_list_wrapper"
            sx={{ p: 0, pl: 2, pr: 2, width: "100%" }}
          >
            <Box
              className="fullWidth"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={course.title}
                secondary={`${course.professor} | ${course.credit}학점`}
              />
            </Box>
            <Button
              sx={{ width: "auto", minWidth: "85px" }}
              onClick={() => applyCourse(course.code)}
              disabled={selectedCourses.includes(course.code)}
            >
              {selectedCourses.includes(course.code)
                ? "이미 신청됨"
                : "신청하기"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    announcement: false,
    prayBoard: false,
    users: false,
    courses: true,
    selected_courses: true,
  });
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [courseApplication, setCourseApplication] =
    useState<CourseApplication>();
  const [gpa, setGpa] = useState<number>(0);
  const [applicationCredit, setApplicationCredit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [groupDocId, setGroupDocId] = useState<string | null>(null);

  const { user } = useAuth();

  const getGroupDocIdByGroupId = async (groupId: number) => {
    const q = query(
      collection(db, "course_application"),
      where("group_id", "==", groupId)
    );
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : snapshot.docs[0].id;
  };

  useEffect(() => {
    const fetchGroupDocId = async () => {
      if (user?.group_id) {
        const id = await getGroupDocIdByGroupId(user.group_id);
        setGroupDocId(id);
      }
    };
    fetchGroupDocId();
  }, [user]);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading((prev) => ({ ...prev, courses: true }));
      const courseQuery = query(
        collection(db, "courses"),
        orderBy("code", "asc")
      );
      const courseSnapshot = await getDocs(courseQuery);

      if (!courseSnapshot.empty) {
        const docs = courseSnapshot.docs.map((doc) => doc.data() as Course);
        setCourses(docs);
      } else {
        console.log("[Warning]No accouncements has been queried");
      }
      setIsLoading((prev) => ({ ...prev, courses: false }));

      setIsLoading((prev) => ({ ...prev, selected_courses: true }));
      const selectedCourseQuery = query(
        collection(db, "course_application"),
        where("group_id", "==", user.group_id)
      );
      const selectedCourseSnapshot = await getDocs(selectedCourseQuery);

      if (!selectedCourseSnapshot.empty) {
        selectedCourseSnapshot.docs.map((doc) => {
          setCourseApplication(doc.data() as CourseApplication);
        });
      } else {
        console.log("[Warning]No accouncements has been queried");
      }
      setIsLoading((prev) => ({ ...prev, selected_courses: false }));
    };

    fetchAssignments();
  }, [user]);

  //   useEffect(() => {
  //     console.log(courses);
  //   }, [courses]);

  // useEffect(() => {
  //   console.log(courseApplication);
  // }, [courseApplication]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    const selectedCredits = courseApplication?.acquired_courses.map(
      (selectedCourse) => {
        try {
          return courses.filter(
            (target) => target.code == selectedCourse.code
          )[0].credit;
        } catch {
          console.log(
            courses.filter((target) => target.code == selectedCourse.code)[0]
          );
          return 0;
        }
      }
    );
    setTotalCredit(
      selectedCredits?.reduce((prev, curr) => prev + curr, 0) ?? 0
    );
  }, [courseApplication, courses]);

  useEffect(() => {
    const sum_of_acquired = courseApplication?.acquired_courses.reduce(
      (prev, curr) => {
        const newValue =
          prev +
          curr.grade *
            courses.filter((course) => course.code == curr.code)[0].credit;
        return isNaN(newValue) ? prev : newValue;
      },
      0
    );

    const sum_of_application = courseApplication?.selected_courses.reduce(
      (prev, curr) => {
        try {
          return (
            prev + courses.filter((target) => target.code == curr)[0].credit
          );
        } catch {
          console.log(courses.filter((target) => target.code == curr)[0]);
          return prev;
        }
      },
      0
    );

    setApplicationCredit(sum_of_application ?? 0);

    if (courseApplication?.acquired_courses) {
      setGpa((sum_of_acquired ?? 0) / totalCredit);
    }
  }, [courseApplication, courses, totalCredit]);

  const handleCancelCourse = async (courseId: string) => {
    if (!groupDocId) {
      alert("그룹 문서 ID가 없습니다.");
      return;
    }
    const groupRef = doc(db, "course_application", groupDocId);
    await updateDoc(groupRef, {
      selected_courses: arrayRemove(courseId),
    });
    alert("삭제 완료!");
    window.location.reload();
  };

  // useEffect(() => {
  //   console.log(gpa);
  // }, [gpa]);

  return (
    <Box className="wrapper">
      <Header subtitle="시간표 보기" />
      <Box
        className="fullWidth timetable"
        sx={{ p: 2, boxSizing: "border-box" }}
      >
        {(isLoading.selected_courses || isLoading.courses) && (
          <Skeleton
            variant="rectangular"
            className="boardPreview"
            animation="wave"
          />
        )}
        {(courseApplication?.selected_courses?.length ?? 0) > 0 ? (
          <Box>
            <Alert severity="error">강의를 클릭하시면 취소가 가능합니다</Alert>
            {courseApplication?.selected_courses.map((selectedCourse) => {
              const course = courses.filter(
                (target) => target.code == selectedCourse
              )[0];

              const isAcquired =
                courseApplication?.acquired_courses.filter(
                  (acquired_course) => acquired_course.code == selectedCourse
                ).length > 0;

              return (
                <Card
                  key={`course_${selectedCourse}`}
                  sx={{ minWidth: 275, mt: 2, position: "relative" }}
                >
                  {isAcquired && (
                    <Box className="courseMark">
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: "rgb(78, 137, 82)" }}
                      />
                      <Typography variant="success">수료함</Typography>
                    </Box>
                  )}
                  <ButtonBase
                    onClick={() => {
                      handleCancelCourse(course.code);
                    }}
                  >
                    <CardContent className="courseCard">
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 12 }}
                      >
                        {course?.code}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {course?.title}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        {course?.required ? "전공필수" : "전공선택"} |{" "}
                        {course?.credit}학점
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Box>
            <Typography>선택된 강의 없음</Typography>
          </Box>
        )}
        <Box
          className="fullWidth fully_centeralize"
          sx={{ mt: 2 }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <AddCircleIcon sx={{ mr: 1, color: "#FFF" }} />
          <Typography variant="body2">수강 신청하기</Typography>
        </Box>
      </Box>

      {/* 학점계산기 */}
      <Box
        className="fullWidth timetable"
        sx={{
          p: 2,
          boxSizing: "border-box",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography sx={{ mb: 1 }}>학점계산기</Typography>
        <Box className="flex-left fullWidth">
          <Box className="flex-left" sx={{ mr: 4 }}>
            <Typography variant="credit_category" sx={{ mr: 2 }}>
              GPA
            </Typography>
            <Box>
              <Typography variant="credit_body1">
                {isNaN(gpa) ? 0 : gpa}
              </Typography>
              <Typography variant="credit_body2"> / 4.5</Typography>
            </Box>
          </Box>
          <Box className="flex-left">
            <Typography variant="credit_category" sx={{ mr: 2 }}>
              취득학점
            </Typography>
            <Box>
              <Typography variant="credit_body1">{totalCredit}</Typography>
              <Typography variant="credit_body2">
                {" "}
                / {applicationCredit}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* 
      <Alert sx={{ mt: 2 }} severity="error">
        필수 학점이 충분하지 않습니다
      </Alert>
      <Alert sx={{ mt: 2 }} severity="success">
        졸업 조건이 만족되었습니다
      </Alert>
      */}

      {/* 수강신청 모달창 */}
      {modalOpen && (
        <SearchCourseModal
          groupDocId={groupDocId}
          onClose={() => setModalOpen(false)}
          selectedCourses={courseApplication?.selected_courses ?? []}
        />
      )}
    </Box>
  );
}
