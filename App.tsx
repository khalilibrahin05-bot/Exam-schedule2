import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { initialScheduleData, allTeachers, SUBJECTS } from './constants';
import { DaySchedule, PeriodData, TeacherMap } from './types';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import AiImportModal from './components/AiImportModal';
import ManualAddModal from './components/ManualAddModal';
import Footer from './components/Footer';

// Helper function to build the teacher map from schedule data
const buildTeacherMap = (scheduleData: DaySchedule[]): TeacherMap => {
  const newMap: TeacherMap = {};
  scheduleData.forEach(day => {
      day.periods.forEach((period, index) => {
          if (period && period.subject) {
              if (!newMap[index]) {
                  newMap[index] = {};
              }
              // Only map if there are teachers to avoid overwriting with empty data
              if (period.teachers || period.femaleTeachers) {
                 newMap[index][period.subject] = {
                      teachers: period.teachers,
                      femaleTeachers: period.femaleTeachers,
                  };
              }
          }
      });
  });
  return newMap;
};


function App() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    try {
      const savedSchedule = localStorage.getItem('scheduleData');
      return savedSchedule ? JSON.parse(savedSchedule) : initialScheduleData;
    } catch (error) {
      console.error("Failed to parse schedule from localStorage", error);
      return initialScheduleData;
    }
  });

  const [scheduleBeforeDelete, setScheduleBeforeDelete] = useState<DaySchedule[] | null>(null);
  const [teacherMap, setTeacherMap] = useState<TeacherMap>(() => buildTeacherMap(schedule));
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isManualAddModalOpen, setIsManualAddModalOpen] = useState(false);
  
  const [sectionsCount, setSectionsCount] = useState<number[]>(() => {
    try {
      const savedCounts = localStorage.getItem('sectionsCount');
      return savedCounts ? JSON.parse(savedCounts) : Array(12).fill(1);
    } catch (error) {
      console.error("Failed to parse sectionsCount from localStorage", error);
      return Array(12).fill(1);
    }
  });

  const [schoolName, setSchoolName] = useState(() => localStorage.getItem('schoolName') || 'اسم المدرسة');
  const [schoolLogo, setSchoolLogo] = useState(() => localStorage.getItem('schoolLogo') || null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Effect to handle the "autosave" or "sync" status indicator and persist data
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      // Persist the main schedule and section counts to localStorage
      try {
        localStorage.setItem('scheduleData', JSON.stringify(schedule));
        localStorage.setItem('sectionsCount', JSON.stringify(sectionsCount));
        setSaveStatus('saved');
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
        setSaveStatus('unsaved'); // Indicate failure
      }
    }, 1000); // Simulate a 1-second save time
    
    return () => clearTimeout(timer);
  }, [schedule, sectionsCount]);


  // Persist school name and logo to localStorage
  useEffect(() => {
    localStorage.setItem('schoolName', schoolName);
  }, [schoolName]);

  useEffect(() => {
    if (schoolLogo) {
      localStorage.setItem('schoolLogo', schoolLogo);
    } else {
      localStorage.removeItem('schoolLogo');
    }
  }, [schoolLogo]);


  const handleAiImport = (newSchedule: DaySchedule[]) => {
    setScheduleBeforeDelete(null);
    setSchedule(newSchedule);
    setTeacherMap(buildTeacherMap(newSchedule)); // Update map on import
    setIsAiModalOpen(false);
  };
  
  const handleManualAddEntry = useCallback((entry: { day: string; periodIndex: number; subject: string; teacher: string; branch: 'male' | 'female' }) => {
    setScheduleBeforeDelete(null);
    setSchedule(prevSchedule => {
        const newSchedule = JSON.parse(JSON.stringify(prevSchedule));
        const dayIndex = newSchedule.findIndex((d: DaySchedule) => d.day === entry.day);

        if (dayIndex === -1) {
            alert("اليوم المحدد غير موجود.");
            return prevSchedule;
        }

        let period: PeriodData | null = newSchedule[dayIndex].periods[entry.periodIndex];
        if (!period) {
            period = { 
              subject: entry.subject,
              status: { submitted: false, reviewed: false, printed: false, examDone: false }
            };
        } else {
            period.subject = entry.subject;
        }

        if (entry.branch === 'male') {
            period.teachers = [entry.teacher];
        } else {
            period.femaleTeachers = [entry.teacher];
        }

        newSchedule[dayIndex].periods[entry.periodIndex] = period;
        return newSchedule;
    });

    // Update teacher map after manual add
    setTeacherMap(prevMap => {
        const newMap = JSON.parse(JSON.stringify(prevMap));
        if (!newMap[entry.periodIndex]) {
            newMap[entry.periodIndex] = {};
        }
        if (!newMap[entry.periodIndex][entry.subject]) {
            newMap[entry.periodIndex][entry.subject] = {};
        }
        const assignment = newMap[entry.periodIndex][entry.subject];

        if (entry.branch === 'male') {
            assignment.teachers = [entry.teacher];
        } else {
            assignment.femaleTeachers = [entry.teacher];
        }
        return newMap;
    });

    setIsManualAddModalOpen(false);
  }, []);

  const handleSectionsCountChange = useCallback((periodIndex: number, count: number) => {
    setSectionsCount(prevCounts => {
      const newCounts = [...prevCounts];
      newCounts[periodIndex] = count;
      return newCounts;
    });
  }, []);

  const handleStatusChange = useCallback((dayIndex: number, periodIndex: number, statusKey: keyof NonNullable<PeriodData['status']>, checked: boolean) => {
    setScheduleBeforeDelete(null);
    setSchedule(prevSchedule => {
        const newSchedule = JSON.parse(JSON.stringify(prevSchedule));
        const periodToUpdate = newSchedule[dayIndex].periods[periodIndex];

        if (!periodToUpdate) return prevSchedule;

        if (!periodToUpdate.status) {
            periodToUpdate.status = { submitted: false, reviewed: false, printed: false, examDone: false };
        }

        periodToUpdate.status[statusKey] = checked;
        
        return newSchedule;
    });
  }, []);

  const handleSubjectChange = useCallback((dayIndex: number, periodIndex: number, newSubject: string) => {
    setScheduleBeforeDelete(null);
    setSchedule(prevSchedule => {
      const newSchedule = JSON.parse(JSON.stringify(prevSchedule));
      const periodToUpdate = newSchedule[dayIndex].periods[periodIndex] as PeriodData | null;
      
      const newPeriodData: PeriodData = periodToUpdate ? { ...periodToUpdate } : { subject: '' };
      newPeriodData.subject = newSubject;
      
      // Look up teachers from the map and auto-populate
      const mappedTeachers = teacherMap[periodIndex]?.[newSubject];
      if (mappedTeachers) {
          newPeriodData.teachers = mappedTeachers.teachers;
          newPeriodData.femaleTeachers = mappedTeachers.femaleTeachers;
      } else {
          // If no mapping found, clear the teachers
          newPeriodData.teachers = undefined;
          newPeriodData.femaleTeachers = undefined;
      }

      newSchedule[dayIndex].periods[periodIndex] = newPeriodData;
      return newSchedule;
    });
  }, [teacherMap]); // Depend on teacherMap to use the latest data
  
  const handleDateChange = useCallback((dayIndex: number, newGregorianDate: string) => {
    // Ensure the new date is valid before proceeding to prevent errors
    if (!newGregorianDate || isNaN(new Date(newGregorianDate).getTime())) {
      return;
    }
    setScheduleBeforeDelete(null);
    setSchedule(prevSchedule => {
      const newSchedule = [...prevSchedule];
      const dayToUpdate = { ...newSchedule[dayIndex] };
      
      const newDate = new Date(newGregorianDate);
      
      // Use UTC representation to prevent timezone-related off-by-one day errors
      const utcDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));

      // 1. Update the Gregorian Date
      dayToUpdate.gregorianDate = newGregorianDate;
      
      // 2. Automatically update the day of the week based on the new date
      dayToUpdate.day = utcDate.toLocaleDateString('ar-SA', { weekday: 'long', timeZone: 'UTC' });
      
      // 3. Automatically calculate and update the corresponding Hijri date
      dayToUpdate.hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'UTC' // Ensure consistency by using UTC for conversion
      }).format(utcDate).replace(/\//g, '-');

      newSchedule[dayIndex] = dayToUpdate;
      return newSchedule;
    });
  }, []);
  
  const handleSchoolLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSchoolLogo(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleDeleteEmptyRows = useCallback(() => {
    setSchedule(prevSchedule => {
      const newSchedule = prevSchedule.filter(day => day.periods.some(period => period !== null));
      if (newSchedule.length < prevSchedule.length) {
        setScheduleBeforeDelete(prevSchedule); // Save state before deletion
      } else {
        setScheduleBeforeDelete(null); // No rows were deleted, clear any previous undo state
      }
      return newSchedule;
    });
  }, []);

  const handleUndoDelete = useCallback(() => {
    if (scheduleBeforeDelete) {
      setSchedule(scheduleBeforeDelete);
      setScheduleBeforeDelete(null); // Clear undo state after restoring
    }
  }, [scheduleBeforeDelete]);

  const handleShare = useCallback(async () => {
    const shareData = {
        title: 'جدول الحصص التفاعلي',
        text: `اطلع على جدول الحصص لمدرسة ${schoolName}`,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error('Share failed:', err);
        }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ رابط التطبيق إلى الحافظة. يمكنك الآن لصقه ومشاركته!');
        } catch (err) {
            console.error('Failed to copy URL:', err);
            alert('فشل نسخ الرابط.');
        }
    }
  }, [schoolName]);

  const handleResetData = useCallback(() => {
    if (window.confirm('هل أنت متأكد أنك تريد إعادة تعيين جميع البيانات إلى الحالة الأولية؟ سيتم فقدان جميع التغييرات المحفوظة.')) {
      // Clear all persisted data
      localStorage.removeItem('scheduleData');
      localStorage.removeItem('sectionsCount');
      localStorage.removeItem('schoolName');
      localStorage.removeItem('schoolLogo');
      // Reload the page to apply the default state
      window.location.reload();
    }
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col" dir="rtl">
      <Header 
        schoolName={schoolName}
        schoolLogo={schoolLogo}
        saveStatus={saveStatus}
        onSchoolNameChange={setSchoolName}
        onSchoolLogoChange={handleSchoolLogoChange}
        onAiImportClick={() => setIsAiModalOpen(true)}
        onManualAddClick={() => setIsManualAddModalOpen(true)}
        onDeleteEmptyRows={handleDeleteEmptyRows}
        onUndoDelete={handleUndoDelete}
        canUndoDelete={scheduleBeforeDelete !== null}
        onShareClick={handleShare}
        onResetData={handleResetData}
      />
      <main className="container mx-auto p-2 sm:p-4 flex-grow">
        <ScheduleView 
          schedule={schedule}
          onSubjectChange={handleSubjectChange}
          sectionsCount={sectionsCount}
          onSectionsCountChange={handleSectionsCountChange}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
        />
      </main>
      <AiImportModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onImport={handleAiImport}
      />
      <ManualAddModal
        isOpen={isManualAddModalOpen}
        onClose={() => setIsManualAddModalOpen(false)}
        onAddEntry={handleManualAddEntry}
        days={schedule.map(d => d.day)}
      />
      <Footer />
    </div>
  );
}

export default App;