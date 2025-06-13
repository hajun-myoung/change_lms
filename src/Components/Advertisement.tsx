import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import worldMap from "../assets/world_map.png";
import leaderVoting from "../assets/vote.png";

export default function Advertisement({ ad_id }: { ad_id: string }) {
  return (
    <>
      {ad_id == "outreach" && (
        <Box className="fullWidth advertise">
          <Box className="advertise_content">
            <Typography variant="ad_title">올해는 나도 선교사!?</Typography>
            <Typography variant="ad_description">
              2025 아웃리치: 유니블캠프 / 샘물 호스피스
            </Typography>
          </Box>
          <Box className="advertise_image-wrapper">
            <img src={worldMap} className="advertise_image" />
          </Box>
        </Box>
      )}
      {ad_id == "leader" && (
        <Box
          className="fullWidth advertise"
          sx={{ marginTop: 1, backgroundColor: "rgb(210, 243, 253)" }}
        >
          <Box className="advertise_content">
            <Typography variant="ad_title">
              쟤가 저기 있사오니 쟤를 시키소서
            </Typography>
            <Typography variant="ad_description">
              2026년도 총무 / 리더 받습니다
            </Typography>
          </Box>
          <Box className="advertise_image-wrapper">
            <img
              src={leaderVoting}
              className="advertise_image"
              style={{ width: "130%" }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
