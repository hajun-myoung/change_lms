interface CourseActivityContent {
  section_title: string;
  content: string;
}

export interface Course {
  code: string;
  title: string;
  credit: number;
  required: boolean;
  description: string;
  activities: Array<CourseActivityContent>;
  professor: string;
  summary: string;
}

interface AcquiredCourse {
  code: string;
  grade: number;
}

export interface CourseApplication {
  group_id: number;
  selected_courses: Array<string>;
  acquired_courses: Array<AcquiredCourse>;
}
