import { Timestamp } from "firebase/firestore";

export interface Announcement {
  title: string;
  content: string;
  active: boolean;
  created_at: Timestamp;
  is_updated: boolean;
}

export interface Pray {
  author_id: string;
  title: string;
  content: string;
  created_at: Timestamp;
}

export interface User {
  student_id: string;
  name: string;
  group_id: number;
  is_admin: boolean;
  is_leader: boolean;
}

export interface LoadingState {
  announcement: boolean;
  prayBoard: boolean;
  users: boolean;
}
