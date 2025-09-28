export interface PeriodData {
  subject: string;
  teachers?: string[]; // Male student branch
  femaleTeachers?: string[]; // Female student branch
  status?: {
    submitted: boolean;
    reviewed: boolean;
    printed: boolean;
    examDone: boolean;
  };
}

export interface DaySchedule {
  hijriDate: string;
  gregorianDate: string;
  day: string;
  periods: (PeriodData | null)[]; // Array of 12 periods
}

export type TeacherMap = {
  [periodIndex: number]: {
    [subject: string]: {
      teachers?: string[];
      femaleTeachers?: string[];
    };
  };
};