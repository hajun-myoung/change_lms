import Box from "@mui/material/Box";
import Header from "../Components/Header";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../Contexts/AuthContexts";

export default function PrayCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async () => {
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

  return (
    <Box className="wrapper">
      <Header subtitle="기도제목 작성" />
      <Box
        className="fullWidth"
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="제목"
          placeholder="여기에 제목을 입력해주세요"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="기도제목을 자유롭게 공유해주세요"
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
    </Box>
  );
}
