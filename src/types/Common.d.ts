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

export interface Configure {
  enable_group_view: boolean;
  enable_pray_write: boolean;
  enable_course_apply: boolean;
}
