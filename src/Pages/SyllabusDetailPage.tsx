import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

import ReactMarkdown from "react-markdown";
import { db } from "../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Course } from "../types/Course";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from "@mui/material";

import img_ghyoon from "../assets/ghyoon.jpg";
import img_japark from "../assets/japark.png";
import img_jhryu from "../assets/jhryu.png";
import img_sdkim from "../assets/sdkim.jpg";

export default function SyllabusDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imageMap = {
    "박정아 목사": img_japark,
    "윤기헌 전도사": img_ghyoon,
    "유제홍 목사": img_jhryu,
    "김선동 목사": img_sdkim,
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      const q = query(collection(db, "courses"), where("code", "==", id));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map((doc) => doc.data() as Course);
        setCourse(docs[0]);
      } else {
        console.log("[Warning]No Courses has been queried");
      }
      setIsLoading(false);
    };

    fetchAssignments();
  }, [id]);

  return (
    <Box className="wrapper">
      <Header subtitle={id} />
      {isLoading && (
        <Skeleton
          variant="rectangular"
          className="boardPreview skeleton_style"
          animation="wave"
          sx={{ height: "200px" }}
        />
      )}
      {course && (
        <Box className="course_detail fullWidth">
          <Typography variant="course_detail_title">
            2025학년도 여름계절학기
          </Typography>
          <Typography variant="course_detail_title">
            [{course.title}] 강의계획안
          </Typography>
          <Alert severity="info" className="fullWidth infobox">
            강의계획안 내용이 없으면, 기헌도사님께 문의하시기 바랍니다.
          </Alert>
          {/* 수업정보 */}
          <Box className="fullWidth section">
            <Typography>수업정보</Typography>
            <TableContainer className="fullWidth">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#FFF" }}>학점</TableCell>
                    <TableCell sx={{ color: "#FFF" }}>학수번호</TableCell>
                    <TableCell sx={{ color: "#FFF" }}>이수구분</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell sx={{ color: "#FFF" }}>
                    {course.credit}학점
                  </TableCell>
                  <TableCell sx={{ color: "#FFF" }}>{course.code}</TableCell>
                  <TableCell sx={{ color: "#FFF" }}>
                    {course.required ? "전공필수" : "전공선택"}
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* 강의담당자 */}
          <Box className="fullWidth section">
            <Typography sx={{ mb: 1, mt: 1 }}>지도교수</Typography>
            <Box className="fullWidth flex-left">
              <Box sx={{ width: "25%" }}>
                <img
                  style={{ width: "100%" }}
                  src={
                    imageMap[
                      course.professor as keyof typeof imageMap
                    ] as string
                  }
                  alt={course.professor}
                />
              </Box>
              <Box
                sx={{ width: "75%", display: "flex", alignItems: "flex-start" }}
              >
                <TableContainer className="fullWidth">
                  <Table>
                    <TableBody>
                      <TableRow sx={{ p: 1 }}>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          성명
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          {course.professor}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          연락처
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          비상연락망 참고
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          소속
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", pt: 0.7, pb: 0.8 }}>
                          높은뜻정의교회 청년부
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>

          {/* 수업방법 */}
          <Box className="fullWidth section">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <Typography variant="syllabus_detail_paragraph">
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography
                    // variant="syllabus_detail_header"
                    fontWeight="bold"
                  >
                    {children}
                  </Typography>
                ),
                li: ({ children }) => (
                  <li style={{ textAlign: "left" }}>
                    <Typography
                      component="span" // 핵심!
                      variant="syllabus_detail_paragraph"
                    >
                      {children}
                    </Typography>
                  </li>
                ),
                ol: ({ children }) => (
                  <Box
                    component="ol"
                    sx={{
                      pl: 2,
                      color: "#FFF",
                      margin: 0,
                    }}
                  >
                    {children}
                  </Box>
                ),
                ul: ({ children }) => (
                  <Box
                    component="ul"
                    sx={{
                      color: "#FFF",
                      margin: 0,
                    }}
                  >
                    {children}
                  </Box>
                ),
              }}
            >
              {course.description}
            </ReactMarkdown>
          </Box>

          {/* 활동 방법 */}
          <Box className="fullWidth section">
            <Typography>활동 방법</Typography>
            {course?.activities?.map((activity, idx) => (
              <Box key={idx} className="fullWidth activitySection">
                <Typography variant="course_detail_title">
                  {activity.section_title}
                </Typography>
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => (
                      <Box
                        component="ul"
                        sx={{
                          color: "#FFF",
                          margin: 0,
                          pl: 2,
                        }}
                      >
                        {children}
                      </Box>
                    ),
                    li: ({ children }) => (
                      <li style={{ textAlign: "left" }}>
                        <Typography
                          component="span" // 핵심!
                          variant="syllabus_detail_paragraph"
                        >
                          {children}
                        </Typography>
                      </li>
                    ),
                  }}
                >
                  {activity.content}
                </ReactMarkdown>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
