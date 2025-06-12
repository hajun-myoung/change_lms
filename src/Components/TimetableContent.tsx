import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function TimetableContent() {
  const schedule = [
    { time: "8:30 - 9:00", content: "등록 및 환영" },
    { time: "9:00 - 9:30", content: "여는 예배" },
    {
      time: "09:30 - 11:00",
      content: "아이스 브레이킹 & 조별 모임(체인지 액팅)",
    },
    { time: "11:00 - 17:00", content: "점심 식사, 체인지 액팅" },
    { time: "17:00 - 18:00", content: "체인지 액팅 나눔" },
    { time: "18:00 - 20:00", content: "저녁 식사 및 교제" },
    { time: "20:00 - 21:30", content: "저녁 집회" },
    { time: "21:30 - 22:00", content: "마무리 및 정리" },
  ];
  return (
    <Box>
      {schedule.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            padding: "12px",
            borderBottom: "1px solid #ccc",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ width: "100px", fontWeight: "bold", flexShrink: 0 }}
            variant="body2"
          >
            {item.time}
          </Typography>
          <Typography variant="body2">{item.content}</Typography>
        </Box>
      ))}
    </Box>
  );
}
