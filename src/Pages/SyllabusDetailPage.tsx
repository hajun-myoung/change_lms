import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

export default function SyllabusDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box className="wrapper">
      <Header subtitle={id} />
    </Box>
  );
}
