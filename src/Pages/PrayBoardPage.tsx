import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import type { Pray, User } from "../types/Common";
import Advertisement from "../Components/Advertisement";
import { Skeleton } from "@mui/material";
import FloatingHomeButton from "../Components/FloatingHomeButton";

export default function PrayBoardPage() {
  const [prays, setPrays] = useState<Array<Pray>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrays = async () => {
      setIsLoading(true);
      const prayQuery = query(
        collection(db, "pray_board"),
        orderBy("created_at")
      );
      const querySnapshot = await getDocs(prayQuery);

      if (!querySnapshot.empty) {
        const prays = querySnapshot.docs.map((pray) => pray.data() as Pray);
        setPrays(prays);
      } else {
        console.log("[Warning]No Prays");
      }

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

  return (
    <Box className="wrapper">
      <Header subtitle="기도제목" />
      <Advertisement ad_id="outreach" />
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="fullWidth"
          sx={{ mt: 2, minHeight: "300px", borderRadius: 3 }}
        />
      ) : (
        <Box className="fullWidth" sx={{ mt: 2 }}>
          {prays?.map((pray) => {
            return (
              <Box key={`pray_${pray.created_at}`} className="boardCard">
                <Typography variant="boardTitle">{pray.title}</Typography>
                <Typography variant="boardContent">{pray.content}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="boardMetadata">
                    {getTimeDiff(pray.created_at)} | {pray.author_id}(
                    {
                      users.filter(
                        (user) => user.student_id == pray.author_id
                      )[0]?.name
                    }
                    )
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      {/* Floating Home Button */}
      <FloatingHomeButton />
    </Box>
  );
}
