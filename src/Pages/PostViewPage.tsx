import { Box } from "@mui/material";
import Header from "../Components/Header";

export default function PostViewPage({
  boardType = "자세히 보기",
}: {
  boardType: string;
}) {
  return (
    <Box className="wrapper">
      <Header subtitle={boardType} />
    </Box>
  );
}
