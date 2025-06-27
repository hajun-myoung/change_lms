import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import type { Course } from "../types/Course";
import {
  Chip,
  createTheme,
  Stack,
  ThemeProvider,
  useTheme,
} from "@mui/material";

export default function SyllabusPage() {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [focus, setFocus] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>("code");
  const [ascending, setAscending] = useState<boolean>(true);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      const q = query(collection(db, "courses"), orderBy("code", "asc"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map((doc) => doc.data() as Course);
        setCourses(docs);
      } else {
        console.log("[Warning]No Courses has been queried");
      }
      setIsLoading(false);
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  useEffect(() => {
    console.log(focus);
  }, [focus]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const sortedCourses = [...courses].sort((a, b) => {
    let result = 0;
    if (sortKey === "code") result = a.code.localeCompare(b.code);
    else if (sortKey === "required")
      result = a.required === b.required ? 0 : a.required ? -1 : 1;
    else if (sortKey === "credit") result = a.credit - b.credit;
    return ascending ? result : -result;
  });

  const baseTheme = useTheme();
  const localTheme = createTheme({
    ...baseTheme,
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            color: "#fff",
            border: "1px solid #fff",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          },
          filledPrimary: {
            backgroundColor: "#FAC656", // 선택 시 배경
            color: "#1a1c21", // 선택 시 텍스트
            "&:hover": {
              backgroundColor: "#f9b42b",
            },
          },
          outlined: {
            borderColor: "#fff",
          },
          label: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={localTheme}>
      <Box className="wrapper" sx={{ p: 0 }}>
        <Header subtitle="실라버스" />

        {isLoading && (
          <Skeleton
            variant="rectangular"
            className="boardPreview skeleton_style"
            animation="wave"
            sx={{ height: "200px" }}
          />
        )}
        {courses?.length > 0 && (
          <Box className="fullWidth">
            <Stack direction="row" spacing={1} sx={{ px: 2, py: 1 }}>
              <Chip
                label="코드순"
                color={sortKey === "code" ? "primary" : "default"}
                variant={sortKey === "code" ? "filled" : "outlined"}
                onClick={() => handleSort("code")}
              />
              <Chip
                label="전공여부 기준"
                color={sortKey === "required" ? "primary" : "default"}
                variant={sortKey === "required" ? "filled" : "outlined"}
                onClick={() => handleSort("required")}
              />
              <Chip
                label="학점기준"
                color={sortKey === "credit" ? "primary" : "default"}
                variant={sortKey === "credit" ? "filled" : "outlined"}
                onClick={() => handleSort("credit")}
              />
            </Stack>
            {sortedCourses.map((course) => (
              <Box
                key={`course_${course.code}`}
                className={`fullWidth course_preview ${
                  course.code === focus ? "course_focus" : ""
                }`}
                onClick={() => {
                  setFocus((prev) =>
                    prev === null || prev !== course.code ? course.code : null
                  );
                }}
              >
                <Typography variant="course_title">{course.title}</Typography>
                <Typography variant="course_info">
                  지도교수 | {course.professor}
                </Typography>
                <Typography variant="course_info">{course.summary}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="course_info">
                    {course.required ? "전공필수" : "전공선택"}
                  </Typography>
                  <Typography variant="course_info">
                    {course.credit}학점
                  </Typography>
                  <Typography variant="course_info">{course.code}</Typography>
                </Box>
                {course.code === focus && (
                  <Box sx={{ pt: 1 }}>
                    <Box
                      className="course_detail_btn"
                      onClick={() => {
                        navigation(`/syllabus/${course.code}`);
                      }}
                    >
                      <Typography variant="course_detail_btn_text">
                        자세히 보기
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
