import React, { useState } from 'react';

interface HeaderProps {
  schoolName: string;
  schoolLogo: string | null;
  saveStatus: 'saved' | 'saving' | 'unsaved';
  onSchoolNameChange: (name: string) => void;
  onSchoolLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAiImportClick: () => void;
  onManualAddClick: () => void;
  onDeleteEmptyRows: () => void;
  onUndoDelete: () => void;
  canUndoDelete: boolean;
  onShareClick: () => void;
  onResetData: () => void;
}

const SaveStatusIndicator: React.FC<{ status: HeaderProps['saveStatus'] }> = ({ status }) => {
    if (status === 'saving') {
        return (
            <div className="flex items-center gap-1 text-xs text-yellow-600">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>جاري الحفظ...</span>
            </div>
        );
    }
    if (status === 'saved') {
        return (
            <div className="flex items-center gap-1 text-xs text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>تم الحفظ</span>
            </div>
        );
    }
    return null;
};


const Header: React.FC<HeaderProps> = ({ 
    schoolName, schoolLogo, saveStatus,
    onSchoolNameChange, onSchoolLogoChange, 
    onAiImportClick, onManualAddClick,
    onDeleteEmptyRows, onUndoDelete, canUndoDelete,
    onShareClick, onResetData
}) => {
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditingName(false);
    onSchoolNameChange(e.target.value);
  };

  return (
    <header className="bg-white shadow-md no-print">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        
        {/* School Info Section */}
        <div className="flex items-center gap-4">
          <label htmlFor="logo-upload" className="cursor-pointer">
            {schoolLogo ? (
              <img src={schoolLogo} alt="School Logo" className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              </div>
            )}
          </label>
          <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={onSchoolLogoChange} />
          {isEditingName ? (
             <input 
                type="text" 
                defaultValue={schoolName}
                onBlur={handleNameBlur}
                onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                className="text-2xl font-bold text-gray-800 bg-gray-100 border-b-2 border-blue-500 outline-none"
                autoFocus
             />
          ) : (
            <h1 onClick={() => setIsEditingName(true)} className="text-2xl font-bold text-gray-800 cursor-pointer" title="انقر للتعديل">
              {schoolName}
            </h1>
          )}
        </div>

        {/* Title and Controls Section */}
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-gray-700">جدول الحصص</h2>
            <SaveStatusIndicator status={saveStatus} />
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
           <button
            onClick={() => window.print()}
            className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
            title="طباعة الجدول"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            <span>طباعة</span>
          </button>
          <button
            onClick={onShareClick}
            className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition flex items-center gap-2"
            title="مشاركة رابط التطبيق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span>مشاركة</span>
          </button>
          <button
            onClick={onManualAddClick}
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition"
            title="إضافة حصة بشكل يدوي"
          >
            إضافة يدوية
          </button>
          <button
            onClick={onAiImportClick}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            title="استيراد بيانات من نص أو ملف (Excel, PDF) بذكاء"
          >
            استيراد بالذكاء الاصطناعي
          </button>
          <button
            onClick={onDeleteEmptyRows}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            title="حذف الصفوف الفارغة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
            <span>حذف الفارغ</span>
          </button>
          {canUndoDelete && (
            <button
              onClick={onUndoDelete}
              className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
              title="تراجع عن الحذف"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>تراجع عن الحذف</span>
            </button>
          )}
          <button
            onClick={onResetData}
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
            title="إعادة تعيين جميع البيانات إلى الإعدادات الأولية"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm12 8a1 1 0 011 1v3.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1z" clipRule="evenodd" />
            </svg>
            <span>إعادة تعيين</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;