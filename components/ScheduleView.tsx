import React, { useMemo } from 'react';
import { DaySchedule, PeriodData } from '../types';
import { SUBJECTS, PRIMARY_SUBJECTS } from '../constants';

const allSubjects = Object.values(SUBJECTS);

const ScheduleCell: React.FC<{
  period: PeriodData | null;
  dayIndex: number;
  periodIndex: number;
  onSubjectChange: (dayIndex: number, periodIndex: number, newSubject: string) => void;
  onStatusChange: (dayIndex: number, periodIndex: number, statusKey: keyof NonNullable<PeriodData['status']>, checked: boolean) => void;
}> = ({ period, dayIndex, periodIndex, onSubjectChange, onStatusChange }) => {
  if (!period) {
    return <td className="border p-1 h-48 bg-gray-50"></td>;
  }

  const status = period.status || { submitted: false, reviewed: false, printed: false, examDone: false };

  const availableSubjects = useMemo(() => {
    if (periodIndex >= 0 && periodIndex <= 2) { // Grades 1-3
        return PRIMARY_SUBJECTS;
    }
    const scienceSubjects = [SUBJECTS.CHEMISTRY, SUBJECTS.PHYSICS, SUBJECTS.BIOLOGY];
    const socialSubjects = [SUBJECTS.HISTORY, SUBJECTS.SOCIETY, SUBJECTS.GEOGRAPHY];

    let filtered = allSubjects;
    if (periodIndex >= 3 && periodIndex <= 8) { // Grades 4-9
        filtered = filtered.filter(s => !scienceSubjects.includes(s) && !socialSubjects.includes(s));
    }
     if (periodIndex >= 10 && periodIndex <= 11) { // Grades 11-12
        filtered = filtered.filter(s => !socialSubjects.includes(s));
    }
    return filtered;
  }, [periodIndex]);

  return (
    <td className={`border p-1 h-48 text-center align-top relative`}>
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        {/* Status Checkboxes - Now in a 2x2 Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-gray-600 mb-1 no-print">
            <label className="flex items-center gap-1 cursor-pointer justify-end">
                <span>سلم</span>
                <input type="checkbox" className="h-3 w-3 accent-green-500" checked={status.submitted} onChange={e => onStatusChange(dayIndex, periodIndex, 'submitted', e.target.checked)} />
            </label>
            <label className="flex items-center gap-1 cursor-pointer justify-end">
                <span>روجع</span>
                <input type="checkbox" className="h-3 w-3 accent-blue-500" checked={status.reviewed} onChange={e => onStatusChange(dayIndex, periodIndex, 'reviewed', e.target.checked)} />
            </label>
            <label className="flex items-center gap-1 cursor-pointer justify-end">
                <span>طبع</span>
                <input type="checkbox" className="h-3 w-3 accent-yellow-500" checked={status.printed} onChange={e => onStatusChange(dayIndex, periodIndex, 'printed', e.target.checked)} />
            </label>
            <label className="flex items-center gap-1 cursor-pointer justify-end">
                <span>تم الاختبار</span>
                <input type="checkbox" className="h-3 w-3 accent-red-500" checked={status.examDone} onChange={e => onStatusChange(dayIndex, periodIndex, 'examDone', e.target.checked)} />
            </label>
        </div>

        {/* Subject Dropdown */}
        <select
          value={period.subject}
          onChange={(e) => onSubjectChange(dayIndex, periodIndex, e.target.value)}
          className="w-full p-1 text-sm border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-blue-400 no-print"
        >
          {availableSubjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        <div className="print-only text-sm font-semibold">{period.subject}</div>

        {/* Teacher Info Frame */}
        {(period.teachers || period.femaleTeachers) && (
          <div className="mt-1 bg-white/70 backdrop-blur-sm rounded-md border border-gray-200/50 shadow-inner overflow-hidden text-xs flex-grow flex flex-col">
            {period.teachers && period.teachers.length > 0 && (
              <div className="px-2 py-0.5">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="font-semibold">طلاب</span>
                </div>
                <div className="text-right text-blue-800 break-words font-medium">
                  {period.teachers.join('، ')}
                </div>
              </div>
            )}
            {period.teachers && period.teachers.length > 0 && period.femaleTeachers && period.femaleTeachers.length > 0 && (
              <hr className="border-gray-200/75" />
            )}
            {period.femaleTeachers && period.femaleTeachers.length > 0 && (
              <div className="px-2 py-0.5">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="font-semibold">طالبات</span>
                </div>
                <div className="text-right text-pink-800 break-words font-medium">
                  {period.femaleTeachers.join('، ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </td>
  );
};


const ScheduleView: React.FC<{ 
  schedule: DaySchedule[];
  onSubjectChange: (dayIndex: number, periodIndex: number, newSubject: string) => void;
  sectionsCount: number[];
  onSectionsCountChange: (periodIndex: number, count: number) => void;
  onDateChange: (dayIndex: number, newDate: string) => void;
  onStatusChange: (dayIndex: number, periodIndex: number, statusKey: keyof NonNullable<PeriodData['status']>, checked: boolean) => void;
}> = ({ schedule, onSubjectChange, sectionsCount, onSectionsCountChange, onDateChange, onStatusChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-2 text-center">البيانات</th>
            {Array.from({ length: 12 }).map((_, i) => (
              <th key={i} className="py-3 px-2 text-center">
                  <div>الصف {i + 1}</div>
                  <div className="font-normal text-xs no-print">
                      <span>عدد الشعب: </span>
                      <input 
                        type="number" 
                        min="1" 
                        value={sectionsCount[i]}
                        onChange={(e) => onSectionsCountChange(i, parseInt(e.target.value, 10) || 1)}
                        className="w-12 text-center bg-gray-100 rounded"
                      />
                  </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {schedule.map((daySchedule, dayIndex) => (
            <tr key={daySchedule.gregorianDate + dayIndex} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-2 text-center border">
                <div className="font-semibold">{daySchedule.day}</div>
                 <div className="print-only text-xs">
                    <div>{daySchedule.gregorianDate}</div>
                    <div>{daySchedule.hijriDate}</div>
                </div>
                <input 
                    type="date"
                    value={daySchedule.gregorianDate}
                    onChange={(e) => onDateChange(dayIndex, e.target.value)}
                    className="text-xs text-gray-500 mt-1 w-32 text-center border rounded no-print"
                />
                <div className="text-xs text-gray-500 mt-1 no-print">{daySchedule.hijriDate}</div>
              </td>
              {daySchedule.periods.map((period, periodIndex) => (
                <ScheduleCell
                  key={periodIndex}
                  period={period}
                  dayIndex={dayIndex}
                  periodIndex={periodIndex}
                  onSubjectChange={onSubjectChange}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleView;