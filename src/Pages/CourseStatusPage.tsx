import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../Contexts/AuthContexts";
import type { Course } from "../types/Course";
import Header from "../Components/Header";
import type { User } from "../types/Common";

interface GroupApplication {
  group_id: number;
  selected_courses?: string[];
  id: string;
}

export default function CourseStatusPage() {
  const [applications, setApplications] = useState<Array<GroupApplication>>([]);
  const [courseMap, setCourseMap] = useState<Record<string, string>>({});
  const [leaders, setLeaders] = useState<Record<number, string>>({});

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // 과목 매핑
      const courseSnap = await getDocs(collection(db, "courses"));
      const map: Record<string, string> = {};
      courseSnap.forEach((doc) => {
        map[doc.data().code] = doc.data().title;
      });
      setCourseMap(map);

      // 2. 조장 이름 매핑
      const userSnap = await getDocs(collection(db, "users"));
      const leaderMap: Record<number, string> = {};
      userSnap.docs.forEach((doc) => {
        const user = doc.data() as User;
        if (user.is_leader) {
          leaderMap[user.group_id] = user.name;
        }
      });
      setLeaders(leaderMap);

      // 2. 조별 수강 신청 현황
      const groupSnap = await getDocs(collection(db, "course_application"));
      const groupList: GroupApplication[] = groupSnap.docs.map((doc) => ({
        ...(doc.data() as GroupApplication),
        id: doc.id,
      }));
      setApplications(groupList.sort((a, b) => a.group_id - b.group_id));
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(courseMap);
  }, [courseMap]);

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

  if (!user?.is_admin) {
    return (
      <Box className="wrapper">
        <Typography variant="h6">권한이 없습니다</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={localTheme}>
      <Box className="wrapper">
        <Header subtitle="수강신청 현황" />

        <Box sx={{ display: "grid", gap: 2 }}>
          {applications.map((group) => (
            <Card
              key={group.id}
              sx={{ backgroundColor: "#333", color: "white" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🧑‍🤝‍🧑 {group.group_id}조 (조장{" "}
                  {leaders[group.group_id] && `${leaders[group.group_id]}`})
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  선택 과목 수:{" "}
                  <strong>{group.selected_courses?.length ?? 0}</strong>
                </Typography>
                <Divider sx={{ borderColor: "#555", mb: 1 }} />
                {group.selected_courses?.length ? (
                  <List dense disablePadding>
                    {group.selected_courses.map((code) => (
                      <ListItem key={code} disablePadding>
                        <ListItemText
                          primary={`📘 ${code} - ${
                            courseMap[code] ?? "이름 없음"
                          }`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="gray">
                    선택한 과목이 없습니다.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
