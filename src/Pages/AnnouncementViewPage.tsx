import Box from "@mui/material/Box";
import Header from "../Components/Header";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Announcement } from "../types/MainPage";

import CampaignIcon from "@mui/icons-material/Campaign";
import type { Pray, User } from "../types/Common";

export default function AnnouncementViewPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [announcement, setAnnouncements] = useState<Announcement>();
  const [users, setUsers] = useState<Array<User>>([]);

  const getTimeDiff = (targetTimeStamp: Timestamp) => {
    const currentTimestamp = Timestamp.now();
    const diff = currentTimestamp.seconds - targetTimeStamp.seconds;

    if (diff < 60) {
      return `${Math.floor(diff)}초 전`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}분 전`;
    } else {
      return `${Math.floor(diff / 86400)}일 전`;
    }
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      if (!id) {
        console.error("No id provided in route params");
        setIsLoading(false);
        return;
      }
      const announceRef = doc(db, "announcements", id);
      const announceSnap = await getDoc(announceRef);
      console.log(announceSnap);

      if (announceSnap.exists()) {
        setAnnouncements({
          ...(announceSnap.data() as Announcement),
          id: announceSnap.id,
          // ...(announceSnap.data() as Announcement),
        });
      } else {
        console.warn("문서가 존재하지 않습니다.");
      }
      setIsLoading(false);
    };

    fetchAssignments();
  }, [id]);

  // useEffect(() => {
  //   console.log(announcement);
  // }, [announcement]);

  useEffect(() => {
    const fetchPrays = async () => {
      setIsLoading(true);
      const userQuery = query(collection(db, "users"));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const docs = userSnapshot.docs.map((user) => user.data() as User);
        setUsers(docs);
      }
      setIsLoading(false);
    };

    fetchPrays();
  }, []);

  return (
    <Box className="wrapper">
      <Header subtitle={"공지사항"} />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              border: "1px white solid",
              width: "35px",
              aspectRatio: 1,
              borderRadius: "10px",
              mr: 1,
            }}
            className="fully_centeralize"
          >
            <CampaignIcon fontSize="large" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="course_title">
              {announcement?.title}
            </Typography>
            <Typography variant="course_info">
              {announcement?.created_at
                ? getTimeDiff(announcement.created_at)
                : ""}{" "}
              |{" "}
              {
                users.filter(
                  (user) => user.student_id == announcement?.author
                )[0]?.name
              }
              ({announcement?.author})
            </Typography>
          </Box>
        </Box>
        <Box
          className="fullWidth"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 2,
            pb: 4,
            borderBottom: "0.5px grey solid",
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <Typography variant="syllabus_detail_paragraph">
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="syllabus_detail_header"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {children}
                </Typography>
              ),
              li: ({ children }) => (
                <li style={{ textAlign: "left" }}>
                  <Typography
                    component="span"
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
            {announcement?.content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}
