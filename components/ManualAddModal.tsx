import React, { useState } from 'react';
import { SUBJECTS } from '../constants';

interface ManualAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: { day: string; periodIndex: number; subject: string; teacher: string; branch: 'male' | 'female' }) => void;
  days: string[];
}

const allSubjects = Object.values(SUBJECTS);
const periods = Array.from({ length: 12 }, (_, i) => i); // 0-11

const ManualAddModal: React.FC<ManualAddModalProps> = ({ isOpen, onClose, onAddEntry, days }) => {
  const [day, setDay] = useState(days[0] || '');
  const [periodIndex, setPeriodIndex] = useState(0);
  const [subject, setSubject] = useState(allSubjects[0]);
  const [teacher, setTeacher] = useState('');
  const [branch, setBranch] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher.trim()) {
        alert('يرجى إدخال اسم المعلم.');
        return;
    }
    onAddEntry({ day, periodIndex, subject, teacher, branch });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" dir="rtl" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">إضافة / تعديل يدوي</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اليوم</label>
            <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الصف</label>
            <select value={periodIndex} onChange={(e) => setPeriodIndex(parseInt(e.target.value, 10))} className="w-full p-2 border border-gray-300 rounded-md">
              {periods.map(p => <option key={p} value={p}>الصف {p + 1}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المادة</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
              {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المعلم</label>
            <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الفرع</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value as 'male' | 'female')} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="male">طلاب</option>
              <option value="female">طالبات</option>
            </select>
          </div>
          <div className="flex justify-end items-center gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              إلغاء
            </button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualAddModal;