import { Timestamp } from "firebase/firestore";

export interface Announcement {
  title: string;
  content: string;
  active: boolean;
  created_at: Timestamp;
  is_updated: boolean;
  id: string;
  author: string;
}

export interface LoadingState {
  announcement: boolean;
  prayBoard: boolean;
  users: boolean;
  courses: boolean;
  selected_courses: boolean;
}
