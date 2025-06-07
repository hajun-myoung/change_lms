import { useAuth } from "../Contexts/AuthContexts";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function MainPage() {
  const { user, setUser } = useAuth();

  const handleSignout = async () => {
    setUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        메인 페이지
      </Typography>
      {user ? (
        <>
          <Typography>학번: {user.student_id}</Typography>
          <Typography>이름: {user.name}</Typography>
          <Typography>조 번호: {user.group_id}</Typography>
          <Typography>관리자 여부: {user.is_admin ? "Yes" : "No"}</Typography>
          <Typography>조장 여부: {user.is_leader ? "Yes" : "No"}</Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignout}
          >
            로그아웃하기
          </Button>
        </>
      ) : (
        <Typography color="error">No user (로그인 필요)</Typography>
      )}
    </Box>
  );
}
