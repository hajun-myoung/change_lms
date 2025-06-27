import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../Contexts/AuthContexts";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import type { Configure } from "../types/Common";

export default function PrayCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [configure, setConfigure] = useState<Configure>();

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
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async () => {
    if (!configure?.enable_pray_write) {
      alert("등록 가능 상태가 아닙니다(관리자 권한)");
      return;
    }
    if (!title || !content || !user) return;
    setIsSubmitting(true);
    await addDoc(collection(db, "pray_board"), {
      title,
      content,
      created_at: serverTimestamp(),
      author_id: user.student_id,
    });
    navigate("/pray");
  };

  const baseTheme = useTheme();
  const localTheme = createTheme({
    ...baseTheme,
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "#fff",
            fontFamily: '"Pretendard", sans-serif',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#aaa",
            fontFamily: '"Pretendard", sans-serif',
            "&.Mui-focused": {
              color: "#aaa",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#999",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
          },
          input: {
            color: "#fff",
            fontFamily: '"Pretendard", sans-serif',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#999",
            fontFamily: '"Pretendard", sans-serif',
            backgroundColor: "#222",
            "&.Mui-disabled": {
              color: "#666", //
              backgroundColor: "#444",
              opacity: 0.6,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={localTheme}>
      <Box className="wrapper">
        <Header subtitle="기도제목 작성" />
        <Box
          className="fullWidth"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="기도제목"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="기도내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !content}
            sx={{
              bgcolor: title && content ? "error.main" : "grey.400",
              color: title && content ? "common.white" : "grey.700",
            }}
          >
            작성하기
          </Button>
        </Box>
        <Box
          className="fullWidth"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 2,
          }}
        >
          <Typography variant="pray_notice">
            이 앱은 수련회를 위해 만들어졌으며,
          </Typography>
          <Typography variant="pray_notice">
            올려주신 기도제목은 모두와 함께 공유하기 위한 것입니다
          </Typography>
          <Typography variant="pray_notice">
            따라서 작성해주신 기도제목은 정의교회 청년부 수련회에 참여하는
          </Typography>
          <Typography variant="pray_notice">
            모든 성도들이 확인 가능하며,
          </Typography>
          <Typography variant="pray_notice">
            이에 따라 타인이 보기에 부적절하다고 판단될 경우,
          </Typography>
          <Typography variant="pray_notice">
            예고 없이 삭제될 수 있습니다.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
