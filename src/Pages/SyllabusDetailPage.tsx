import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

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
} from "@mui/material";

export default function SyllabusDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imageMap = {
    "박정아 목사":
      "http://www.jeongeui.com/user/saveDir/awc/49/P/0/image_124013.png?itemTime=1745303224",
    "윤기헌 전도사":
      "http://www.jeongeui.com/user/saveDir/awc/49/P/0/image_124010.jpg?itemTime=1745303224",
    "유제홍 목사":
      "http://www.jeongeui.com/user/saveDir/awc/49/P/0/image_123997.png?itemTime=1745303224",
    "김선동 목사":
      "http://www.jeongeui.com/user/saveDir/awc/14/P/0/image_122903.jpg?itemTime=1738823671",
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
            <Typography sx={{ mb: 1, mt: 1 }}>강의담당자</Typography>
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
        </Box>
      )}
    </Box>
  );
}
