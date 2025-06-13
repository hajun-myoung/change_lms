import Box from "@mui/material/Box";
import Header from "../Components/Header";
import { db } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { Pray } from "../types/Common";

export default function PrayBoardPage() {
  const [prays, setPrays] = useState<Array<Pray>>([]);
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
      setIsLoading(false);
    };

    fetchPrays();
  }, []);

  return (
    <Box className="wrapper">
      <Header subtitle="기도제목" />
      {isLoading ? <>Loading...</> : <>Loaded</>}
    </Box>
  );
}
