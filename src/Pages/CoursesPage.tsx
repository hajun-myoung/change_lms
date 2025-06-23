import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import Header from "../Components/Header";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Course, CourseApplication } from "../types/Course";
import { useAuth } from "../Contexts/AuthContexts";
import type { LoadingState } from "../types/MainPage";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    announcement: false,
    prayBoard: false,
    users: false,
    courses: true,
    selected_courses: true,
  });
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [selectedCourses, setSelectedCourses] = useState<Array<string>>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading((prev) => ({ ...prev, courses: true }));
      const courseQuery = query(collection(db, "courses"));
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
          setSelectedCourses(
            (doc.data() as CourseApplication).selected_courses
          );
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

  useEffect(() => {
    console.log(selectedCourses);
  }, [selectedCourses]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        {selectedCourses.length > 0 ? (
          <Box>
            {selectedCourses.map((selectedCourse) => {
              const course = courses.filter(
                (target) => target.code == selectedCourse
              )[0];
              return (
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      {course?.code}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {course?.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {course?.is_essential ? "전공필수" : "전공선택"} |{" "}
                      {course?.credit}학점
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Box>
            <Typography>선택된 강의 없음</Typography>
          </Box>
        )}
        <Box className="fullWidth fully_centeralize" sx={{ mt: 2 }}>
          <AddCircleIcon sx={{ mr: 1 }} />
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
              <Typography variant="credit_body1">4.31</Typography>
              <Typography variant="credit_body2"> / 4.5</Typography>
            </Box>
          </Box>
          <Box className="flex-left">
            <Typography variant="credit_category" sx={{ mr: 2 }}>
              취득학점
            </Typography>
            <Box>
              <Typography variant="credit_body1">23</Typography>
              <Typography variant="credit_body2"> / 25</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
