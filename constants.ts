import { DaySchedule } from './types';

export const SUBJECTS = {
  QURAN: "قرآن كريم",
  ISLAMIC: "إسلامية",
  ARABIC: "لغة عربية",
  MATH: "رياضيات",
  SCIENCE: "علوم",
  ENGLISH: "إنجليزي",
  SOCIAL_STUDIES: "اجتماعيات",
  HISTORY: "تاريخ",
  SOCIETY: "مجتمع",
  GEOGRAPHY: "جغرافيا",
  PHYSICS: "فيزياء",
  CHEMISTRY: "كيمياء",
  BIOLOGY: "أحياء",
  COMPUTER: "حاسوب",
  CULTURE: "ثقافة",
  ART: "فنية",
  LIBRARY: "مكتبة",
  BEHAVIOR: "سلوك",
  NURSE: "مربية", // For 'مربية'
  OTHER: "أخرى",
};

export const PRIMARY_SUBJECTS = [
    SUBJECTS.QURAN,
    SUBJECTS.ISLAMIC,
    SUBJECTS.ENGLISH,
    SUBJECTS.ARABIC,
    SUBJECTS.MATH,
    SUBJECTS.COMPUTER,
    SUBJECTS.OTHER,
];


const rawTeachers = [
  "اریج مالك ناجي الحدي", "اسامة عبد الدائم هزاع عقلان", "اسماء جمال محمد ردمان", "اماني حسين محمد العزب", "اميمة امين حسن قطيش", "اية إبراهيم علي احمد فاتق", "ایمان امین حسن قطيش", "ایمان حسين قائد النصيف", "بسام نعمان مجاهد الشرجبي", "بكيل ناجي احمد الدقري", "جمال محمود صالح الرديني", "ذكريات أمين علي البتول", "ریدان فارع احمد الاسدي", "ريم محمد عبده الشيباني", "سحر يحيى شجاع الدين", "سلطان محمد ناصر العماد", "سندس محمد سعد مثنى", "شروق يحيى سعد جار الله", "شهد يوسف عبدالرحمن الصلوي", "طائفة نعمان حسن هادي", "عاصم يحيى عبدالله المنعي", "عائشة ناجي علي سعد الله", "عبد الباري علي علي الحيمي", "عبد الخالق سليمان احمد الجيلاني", "عبد الرزاق عبدالله عبدالله صبيح", "عبد الرؤوف حاتم صالح الوصابي", "عبد السلام يحيى صالح المعدني", "عبدالكريم عبده محمد الحوصلي", "عبدالله عبده حسن النجدي", "علي عبدالله محمد عيسى", "علي محمد عامر الروني", "غفران محمد محمد الظرافي", "فتحية عبدالله عبد الرحمن الفقيه", "فهمي عبد العزيز محمد الجرافي", "محمد ابوالقاسم عبد الرحمن المشرع", "محمد احمد محمد الجباري", "محمد عبد الكريم هادي الدريهم", "منير عبد الحميد مصلح الجمري", "منيرة حمود علي الحداء", "همدان احمد محمد الدبيس", "هنادي عبدالنور نورالدين الأبيض", "هندية محمد علي العولقي", "وجدان احسن محمد عزي", "وفاء محمد عبده قائد الصلوي", "منال علي احمد راجح", "نادية محمد حسن الحمزي", "بثينة أحمد محمد راجح", "اية صادق محمد قعطاب",
  "فاطمة محمد علي حيدر", "ابتسام مسعود احمد مسعود", "تهاني احمد عبدالله الرداعي", "نبيلة عبدالله محمد الزرافة", "صفاء يحيى الشعبيبي", "شيماء عبده احمد الباشا", "لمياء علوي علي الزبيري", "شيماء حسين محمد الجرف", "أسماء ناجي علي سعد الله", "نهى حسين علي الحوري", "إلهام طه أحمد الهتاري", "سمر عمر سالم شیخ با وزیر", "إيمان محمد ناشر العبسي", "رانيا احسن محمد عبدالله العزي", "هدى عبدة ناجي الصغير", "أشواق عثمان قائد المخلافي", "عائشة عبد العزيز فضل العريقي", "الطاف أحمد على جار الله", "هناء نبيل احمد الحيجنة", "ضحى عبد الباسط محمد القباطي", "رحاب عبداللطيف قائد العيفري", "خلود محمد قايد صلاح", "هند حسين يحيى حاتم الحبابي", "نادية صالح علي الورد", "ياسمين ردمان عبدالله الفقيه", "ابتسام يحيى صالح المجري", "افراح يوسف عبد السلام الصلوي", "بسمة سيف الكوري", "غادة علوي علي الزبيري", "اثیر ثائر لطف الرزامي", "نورية نعمان حسن هادي", "مشيرة أحمد حاتم العتيل", "نبيلة حمود يحيى السروري", "نوال نجيب عبد الله الذبحاني", "احلام محمد يحيى الغيثي", "ملاك عبد الجبار محمد السريحي", "حسناء يوسف قائد أحمد", "فاتن نبيل صالح القادمي", "تغريد محمد قاسم الاكحلي", "احمد عبده سعيد محمد", "احمد ناصر محمد الضبيبي"
];

const processedTeachers = rawTeachers
    .flatMap(t => t.split(/\s*\+\s*|\s*,\s*|\s*و\s*/))
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a.localeCompare(b, 'ar'));

export const allTeachers = processedTeachers;


// This data is meticulously updated based on the provided images.
export const initialScheduleData: DaySchedule[] = [
  {
    hijriDate: "1447-04-01", gregorianDate: "2025/09/28", day: "الأحد",
    periods: [
      { subject: SUBJECTS.QURAN, femaleTeachers: ["إيمان محمد ناشر العبسي"] }, // Period 1
      { subject: SUBJECTS.QURAN, teachers: ["وجدان احسن محمد عزي"], femaleTeachers: ["رانيا احسن محمد عبدالله العزي"] }, // Period 2
      { subject: SUBJECTS.QURAN, teachers: ["وجدان احسن محمد عزي"], femaleTeachers: ["رانيا احسن محمد عبدالله العزي"] }, // Period 3
      { subject: SUBJECTS.QURAN, teachers: ["محمد عبد الكريم هادي الدريهم"], femaleTeachers: ["هدى عبدة ناجي الصغير"] }, // Period 4
      { subject: SUBJECTS.QURAN, teachers: ["محمد عبد الكريم هادي الدريهم"], femaleTeachers: ["هدى عبدة ناجي الصغير"] }, // Period 5
      { subject: SUBJECTS.QURAN, teachers: ["عبد الرؤوف حاتم صالح الوصابي"], femaleTeachers: ["أشواق عثمان قائد المخلافي"] }, // Period 6
      { subject: SUBJECTS.QURAN, teachers: ["عبد الرؤوف حاتم صالح الوصابي", "فهمي عبد العزيز محمد الجرافي"], femaleTeachers: ["أشواق عثمان قائد المخلافي"] }, // Period 7
      { subject: SUBJECTS.QURAN, teachers: ["فهمي عبد العزيز محمد الجرافي"], femaleTeachers: ["أشواق عثمان قائد المخلافي"] }, // Period 8
      { subject: SUBJECTS.QURAN, teachers: ["فهمي عبد العزيز محمد الجرافي"], femaleTeachers: ["عائشة عبد العزيز فضل العريقي"] }, // Period 9
      { subject: SUBJECTS.QURAN, teachers: ["منير عبد الحميد مصلح الجمري"], femaleTeachers: ["عائشة عبد العزيز فضل العريقي"] }, // Period 10
      { subject: SUBJECTS.QURAN, teachers: ["منير عبد الحميد مصلح الجمري"], femaleTeachers: ["عائشة عبد العزيز فضل العريقي"] }, // Period 11
      { subject: SUBJECTS.QURAN, teachers: ["منير عبد الحميد مصلح الجمري"], femaleTeachers: ["عائشة عبد العزيز فضل العريقي"] }, // Period 12
    ]
  },
  {
    hijriDate: "1447-04-02", gregorianDate: "2025/10/08", day: "الإثنين", // Islamic Day
    periods: [
      null, null, null,
      { subject: SUBJECTS.ISLAMIC, teachers: ["اية إبراهيم علي احمد فاتق"] }, // P 4
      { subject: SUBJECTS.ISLAMIC, teachers: ["اية إبراهيم علي احمد فاتق"], femaleTeachers: ["الطاف أحمد على جار الله"] }, // P 5
      { subject: SUBJECTS.ISLAMIC, teachers: ["عاصم يحيى عبدالله المنعي"], femaleTeachers: ["الطاف أحمد على جار الله"] }, // P 6
      { subject: SUBJECTS.ISLAMIC, teachers: ["عاصم يحيى عبدالله المنعي"], femaleTeachers: ["الطاف أحمد على جار الله"] }, // P 7
      { subject: SUBJECTS.ISLAMIC, teachers: ["عبد الرزاق عبدالله عبدالله صبيح"], femaleTeachers: ["الطاف أحمد على جار الله"] }, // P 8
      { subject: SUBJECTS.ISLAMIC, teachers: ["عبد الرزاق عبدالله عبدالله صبيح"], femaleTeachers: ["هناء نبيل احمد الحيجنة"] }, // P 9
      { subject: SUBJECTS.ISLAMIC, teachers: ["جمال محمود صالح الرديني"], femaleTeachers: ["هناء نبيل احمد الحيجنة"] }, // P 10
      { subject: SUBJECTS.ISLAMIC, teachers: ["جمال محمود صالح الرديني"], femaleTeachers: ["هناء نبيل احمد الحيجنة"] }, // P 11
      { subject: SUBJECTS.ISLAMIC, teachers: ["جمال محمود صالح الرديني"], femaleTeachers: ["هناء نبيل احمد الحيجنة"] }, // P 12
    ]
  },
  {
    hijriDate: "1447-04-11", gregorianDate: "2025/10/08", day: "الإثنين", // Arabic Day
    periods: [
      null, null, null,
      { subject: SUBJECTS.ARABIC, teachers: ["ایمان امین حسن قطيش"], femaleTeachers: ["رحاب عبداللطيف قائد العيفري"] }, // P 4
      { subject: SUBJECTS.ARABIC, teachers: ["وفاء محمد عبده قائد الصلوي"], femaleTeachers: ["ضحى عبد الباسط محمد القباطي", "رحاب عبداللطيف قائد العيفري"] }, // P 5
      { subject: SUBJECTS.ARABIC, teachers: ["ایمان حسين قائد النصيف"], femaleTeachers: ["ضحى عبد الباسط محمد القباطي"] }, // P 6
      { subject: SUBJECTS.ARABIC, teachers: ["عبد الرؤوف حاتم صالح الوصابي"], femaleTeachers: ["خلود محمد قايد صلاح"] }, // P 7
      { subject: SUBJECTS.ARABIC, teachers: ["عبد السلام يحيى صالح المعدني"], femaleTeachers: ["خلود محمد قايد صلاح"] }, // P 8
      { subject: SUBJECTS.ARABIC, teachers: ["عبد السلام يحيى صالح المعدني"], femaleTeachers: ["هند حسين يحيى حاتم الحبابي"] }, // P 9
      { subject: SUBJECTS.ARABIC, teachers: ["علي محمد عامر الروني"], femaleTeachers: ["هند حسين يحيى حاتم الحبابي"] }, // P 10
      { subject: SUBJECTS.ARABIC, teachers: ["علي محمد عامر الروني"], femaleTeachers: ["نادية صالح علي الورد"] }, // P 11
      { subject: SUBJECTS.ARABIC, teachers: ["محمد ابوالقاسم عبد الرحمن المشرع"], femaleTeachers: ["نادية صالح علي الورد"] }, // P 12
    ]
  },
  {
    hijriDate: "1447-04-30", gregorianDate: "2025/11/05", day: "الإثنين", // Math/English day
    periods: [
      null, null, null,
      { subject: SUBJECTS.ENGLISH, teachers: ["هنادي عبدالنور نورالدين الأبيض"], femaleTeachers: ["نوال نجيب عبد الله الذبحاني"] }, // P 4
      { subject: SUBJECTS.ENGLISH, teachers: ["هنادي عبدالنور نورالدين الأبيض", "هندية محمد علي العولقي"], femaleTeachers: ["نوال نجيب عبد الله الذبحاني"] }, // P 5
      { subject: SUBJECTS.ENGLISH, teachers: ["هندية محمد علي العولقي"], femaleTeachers: ["نوال نجيب عبد الله الذبحاني"] }, // P 6
      { subject: SUBJECTS.ENGLISH, teachers: ["علي عبدالله محمد عيسى", "هندية محمد علي العولقي"], femaleTeachers: ["احلام محمد يحيى الغيثي"] }, // P 7
      { subject: SUBJECTS.ENGLISH, teachers: ["علي عبدالله محمد عيسى"], femaleTeachers: ["احلام محمد يحيى الغيثي"] }, // P 8
      { subject: SUBJECTS.ENGLISH, teachers: ["ریدان فارع احمد الاسدي"], femaleTeachers: ["ملاك عبد الجبار محمد السريحي"] }, // P 9
      { subject: SUBJECTS.ENGLISH, teachers: ["ریدان فارع احمد الاسدي"], femaleTeachers: ["ملاك عبد الجبار محمد السريحي"] }, // P 10
      { subject: SUBJECTS.ENGLISH, teachers: ["محمد احمد محمد الجباري"], femaleTeachers: ["ملاك عبد الجبار محمد السريحي", "حسناء يوسف قائد أحمد"] }, // P 11
      { subject: SUBJECTS.ENGLISH, teachers: ["محمد احمد محمد الجباري"], femaleTeachers: ["حسناء يوسف قائد أحمد"] }, // P 12
    ]
  },
  {
    hijriDate: "1447-04-21", gregorianDate: "2025/10/18", day: "الثلاثاء", // Science/Math Day
    periods: [
      null, null, null,
      { subject: SUBJECTS.MATH, teachers: ["ريم محمد عبده الشيباني"], femaleTeachers: ["ياسمين ردمان عبدالله الفقيه"] }, // P 4
      { subject: SUBJECTS.MATH, teachers: ["ريم محمد عبده الشيباني", "اسامة عبد الدائم هزاع عقلان"], femaleTeachers: ["ياسمين ردمان عبدالله الفقيه"] }, // P 5
      { subject: SUBJECTS.MATH, teachers: ["اسامة عبد الدائم هزاع عقلان"], femaleTeachers: ["بسمة سيف الكوري"] }, // P 6
      { subject: SUBJECTS.MATH, teachers: ["طائفة نعمان حسن هادي"], femaleTeachers: ["بسمة سيف الكوري"] }, // P 7
      { subject: SUBJECTS.MATH, teachers: ["اماني حسين محمد العزب"], femaleTeachers: ["ابتسام يحيى صالح المجري"] }, // P 8
      { subject: SUBJECTS.MATH, teachers: ["سلطان محمد ناصر العماد"], femaleTeachers: ["ابتسام يحيى صالح المجري"] }, // P 9
      { subject: SUBJECTS.MATH, teachers: ["سلطان محمد ناصر العماد", "عبد الباري علي علي الحيمي"], femaleTeachers: ["افراح يوسف عبد السلام الصلوي"] }, // P 10
      { subject: SUBJECTS.MATH, teachers: ["عبد الباري علي علي الحيمي"], femaleTeachers: ["افراح يوسف عبد السلام الصلوي"] }, // P 11
      { subject: SUBJECTS.MATH, teachers: ["عبد الخالق سليمان احمد الجيلاني"] }, // P 12
    ]
  },
  {
    hijriDate: "1447-05-28", gregorianDate: "2025/12/03", day: "الثلاثاء", // Science, Physics
    periods: [
      null, null, null,
      { subject: SUBJECTS.SCIENCE, teachers: ["اميمة امين حسن قطيش"], femaleTeachers: ["غادة علوي علي الزبيري"] }, // P 4
      { subject: SUBJECTS.SCIENCE, teachers: ["اميمة امين حسن قطيش"], femaleTeachers: ["غادة علوي علي الزبيري"] }, // P 5
      { subject: SUBJECTS.SCIENCE, teachers: ["سندس محمد سعد مثنى"], femaleTeachers: ["غادة علوي علي الزبيري"] }, // P 6
      { subject: SUBJECTS.SCIENCE, teachers: ["سندس محمد سعد مثنى"], femaleTeachers: ["اثیر ثائر لطف الرزامي"] }, // P 7
      { subject: SUBJECTS.SCIENCE, teachers: ["غفران محمد محمد الظرافي"], femaleTeachers: ["اثیر ثائر لطف الرزامي"] }, // P 8
      { subject: SUBJECTS.SCIENCE, teachers: ["غفران محمد محمد الظرافي"], femaleTeachers: ["اثیر ثائر لطف الرزامي"] }, // P 9
      { subject: SUBJECTS.PHYSICS, teachers: ["بكيل ناجي احمد الدقري"], femaleTeachers: ["نورية نعمان حسن هادي"] }, // P 10
      { subject: SUBJECTS.PHYSICS, teachers: ["بكيل ناجي احمد الدقري"], femaleTeachers: ["نورية نعمان حسن هادي"] }, // P 11
      { subject: SUBJECTS.PHYSICS, teachers: ["بكيل ناجي احمد الدقري"], femaleTeachers: ["نورية نعمان حسن هادي"] }, // P 12
    ]
  },
  {
    hijriDate: "1447-05-01", gregorianDate: "2025/10/28", day: "الأربعاء", // Social Studies, History, Chemistry
    periods: [
      null, null, null, null,
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["فتحية عبدالله عبد الرحمن الفقيه"], femaleTeachers: ["تغريد محمد قاسم الاكحلي"] }, // P5
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["فتحية عبدالله عبد الرحمن الفقيه"], femaleTeachers: ["تغريد محمد قاسم الاكحلي"] }, // P6
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["اریج مالك ناجي الحدي"], femaleTeachers: ["تغريد محمد قاسم الاكحلي"] }, // P7
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["اریج مالك ناجي الحدي"], femaleTeachers: ["فاتن نبيل صالح القادمي"] }, // P8
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["بسام نعمان مجاهد الشرجبي"], femaleTeachers: ["فاتن نبيل صالح القادمي"] }, // P9
      { subject: SUBJECTS.SOCIAL_STUDIES, teachers: ["بسام نعمان مجاهد الشرجبي"], femaleTeachers: ["فاتن نبيل صالح القادمي"] }, // P10
      { subject: SUBJECTS.CHEMISTRY, teachers: ["عبدالله عبده حسن النجدي"] , femaleTeachers: ["نبيلة حمود يحيى السروري"]}, // P11
      { subject: SUBJECTS.CHEMISTRY, teachers: ["عبدالله عبده حسن النجدي"] , femaleTeachers: ["نبيلة حمود يحيى السروري"]}, // P12
    ]
  },
  {
    hijriDate: "1447-05-07", gregorianDate: "2025/12/31", day: "الأربعاء", // Biology, Computer
    periods: [
      null,
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P2
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P3
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P4
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P5
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P6
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P7
      { subject: SUBJECTS.COMPUTER, teachers: ["عبدالكريم عبده محمد الحوصلي"], femaleTeachers: ["نادية محمد حسن الحمزي"] }, // P8
      null,
      { subject: SUBJECTS.BIOLOGY, femaleTeachers: ["احمد عبده سعيد محمد", "مشيرة أحمد حاتم العتيل"] }, // P10
      { subject: SUBJECTS.BIOLOGY, femaleTeachers: ["احمد عبده سعيد محمد", "مشيرة أحمد حاتم العتيل"] }, // P11
      { subject: SUBJECTS.BIOLOGY, femaleTeachers: ["احمد عبده سعيد محمد", "مشيرة أحمد حاتم العتيل"] }, // P12
    ]
  },
  {
    hijriDate: "1447-05-11", gregorianDate: "2025/11/07", day: "الخميس", // Culture, etc.
    periods: [
        null, null, null,
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P4
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P5
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P6
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P7
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P8
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P9
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P10
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P11
        { subject: SUBJECTS.CULTURE, teachers: ["همدان احمد محمد الدبيس"] }, // P12
    ]
  },
  {
    hijriDate: "1447-07-25", gregorianDate: "2026/01/28", day: "الخميس",
    periods: [
      null, null, null, null, null, null, null, null, null, null, null, null
    ]
  },
  {
    hijriDate: "1447-05-21", gregorianDate: "2025/11/17", day: "الجمعة",
    periods: [
       null, null, null, null, null, null, null, null, null, null, null, null
    ]
  },
  {
    hijriDate: "1447-08-23", gregorianDate: "2026/02/15", day: "الجمعة",
    periods: [
        null, null, null, null, null, null, null, null, null, null, null, null
    ]
  },
];
