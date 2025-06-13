import { Timestamp } from "firebase/firestore";

export interface Announcement {
  title: string;
  content: string;
  active: boolean;
  created_at: Timestamp;
  is_updated: boolean;
}

export interface LoadingState {
  announcement: boolean;
  prayBoard: boolean;
  users: boolean;
}
