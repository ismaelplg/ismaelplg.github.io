export interface Work {
  company: string;
  position?: string;
  startDate: Time;
  endDate?: Time;
  description: string;
}

interface Time {
  month: string;
  year: string;
}
