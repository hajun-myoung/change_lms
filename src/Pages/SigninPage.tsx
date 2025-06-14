import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContexts";

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
    <Box
      className="wrapper centeralize"
      sx={{
        height: "100dvh",
        mt: "-60px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle_extrasmall">
          THEREFORE, I URGE YOU, BROTHERS, IN VIEW OF GOD'S MERCY, TO OFFER YOUR
          BODIES AS LIVING SACRIFICES, HOLY AND PLEASING TO GOD--THIS IS YOURN
          SPIRITUAL ACT OF WORSHIP.
        </Typography>
      </Box>
      <Typography className="subtitle" variant="subtitle_small">
        2025 SUMMER RETREAT
      </Typography>
      <Typography className="subtitle" variant="subtitle_big">
        CHANGE
      </Typography>
      <Typography className="subtitle" variant="subtitle_small">
        GOD'S WILL JEONGEUI YOUTH
      </Typography>

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
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle_extrasmall">
          DO NOT CONFORM ANY LONGER TO THE PATTERN OF THIS WORLD, BUT BE
          TRANSFORMED BY THE RENEWING OF YOUR MIND, THEN YOU WILL BE ABLE TO
          TEST AND APPROVE WHAT GOD'S WILL IS--HIS GOOD, PLEASING AND PERFECT
          WILL. {"["}ROMANS 12:1-2{"]"}
        </Typography>
      </Box>
    </Box>
  );
}
