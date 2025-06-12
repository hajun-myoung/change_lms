import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContexts";

import viteLogo from "/vite.svg";

export default function SigninPage() {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSignin = async () => {
    const q = query(
      collection(db, "users"),
      where("student_id", "==", studentId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      console.log(userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // for refresh

      window.location.href = "/";
    } else {
      setError("존재하지 않는 학번입니다.");
    }
  };

  return (
    <Box className="wrapper centeralize" sx={{ height: "100vh" }}>
      <Typography className="subtitle">높은뜻 정의교회</Typography>
      <Typography className="subtitle">2025 청년부 여름수련회</Typography>
      <Typography className="subtitle">"CHANGE"</Typography>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <Box sx={{ paddingLeft: 10, paddingRight: 10, boxSizing: "border-box" }}>
        <TextField
          label="학번"
          fullWidth
          margin="normal"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          variant="standard"
        />
        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: studentId ? "error.main" : "grey.400",
            color: studentId ? "common.white" : "grey.700",
            "&:hover": {
              bgcolor: studentId ? "error.dark" : "grey.500",
            },
          }}
          onClick={handleSignin}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
}
