export interface Course {
  code: string;
  title: string;
  credit: number;
  is_essential: boolean;
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
