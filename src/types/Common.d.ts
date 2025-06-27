export interface Pray {
  author_id: string;
  title: string;
  content: string;
  created_at: Timestamp;
  id: string;
}

export interface User {
  student_id: string;
  name: string;
  group_id: number;
  is_admin: boolean;
  is_leader: boolean;
}
