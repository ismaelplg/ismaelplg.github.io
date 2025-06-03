export interface Certification {
  company: string;
  teacher: string;
  course: string;
  status: 'completed' | 'in-progress' | 'reviewing';
  techIcon?: string[];
  year: number;
}
