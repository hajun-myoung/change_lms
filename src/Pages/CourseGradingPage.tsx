import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

interface GroupApplication {
  group_id: number;
  selected_courses?: string[];
  acquired_courses?: { course_id: string; grade: number }[];
  id: string;
}

export default function CourseGradingPage() {
  const [applications, setApplications] = useState<GroupApplication[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const snap = await getDocs(collection(db, "course_application"));
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as GroupApplication),
        id: doc.id,
      }));
      setApplications(data.sort((a, b) => a.group_id - b.group_id));
    };
    fetchApplications();
  }, []);

  const handleGrantCourse = async (
    group: GroupApplication,
    courseId: string
  ) => {
    const ref = doc(db, "course_application", group.id);
    const existing = group.acquired_courses ?? [];
    const alreadyGraded = existing.find((c) => c.course_id === courseId);
    if (alreadyGraded) {
      alert(`${courseId}는 이미 이수 처리되었습니다.`);
      return;
    }
    const updated = [...existing, { course_id: courseId, grade: 4.5 }];
    await updateDoc(ref, {
      acquired_courses: updated,
    });
    alert(`${group.group_id}조 - ${courseId} 이수 처리 완료!`);
    window.location.reload();
  };

  const baseTheme = useTheme();
  const localTheme = createTheme({
    ...baseTheme,
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#fff",
            // whiteSpace: "pre-line",
          },
          secondary: {
            fontSize: "0.875rem",
            color: "#666",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={localTheme}>
      <Box className="wrapper">
        <Typography variant="h4" sx={{ mb: 2 }}>
          수업 이수 처리
        </Typography>
        <Box sx={{ display: "grid", gap: 2 }}>
          {applications.map((group) => (
            <Card
              key={group.id}
              sx={{ backgroundColor: "#333", color: "white" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🧑‍🤝‍🧑 {group.group_id}조
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  신청 과목 수: {group.selected_courses?.length ?? 0}
                </Typography>
                {group.selected_courses?.length ? (
                  <List dense disablePadding>
                    {group.selected_courses.map((code) => {
                      const isCompleted = group.acquired_courses?.some(
                        (c) => c.course_id === code
                      );
                      return (
                        <ListItem
                          key={code}
                          disablePadding
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={`📘 ${code}`}
                            primaryTypographyProps={{
                              sx: { fontSize: 14, color: "#ddd" },
                            }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            color={isCompleted ? "success" : "primary"}
                            disabled={isCompleted}
                            onClick={() => handleGrantCourse(group, code)}
                            sx={{ ml: 2 }}
                          >
                            {isCompleted ? "이수 완료" : "이수 처리"}
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <Typography color="gray">신청된 과목 없음</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
