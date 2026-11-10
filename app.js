/**
 * =========================================================================
 * مكتبة نهر العلم - إدارة أ/ إيهاب (Nahr Al-Elm Library)
 * المحرك البرمجي المتكامل:
 * 1. قاعدة بيانات الكتب والأسعار والمستلزمات الدراسية
 * 2. المزامنة السحابية اللحظية عبر Firebase Realtime Database
 * 3. نظام الفلترة التعليمية الثلاثي (المرحلة -> الصف -> المادة)
 * 4. سلة الطلبات الذكية وإرسال الطلبات المجمعة عبر الواتساب (01002968331)
 * 5. حاسبة خدمة اطبع مذكرتك الفورية
 * 6. بوابة الدخول السري (ضغط مطول 3 ثوانٍ) ولوحة تحكم المهندس محمد يوسف
 * 7. لوحة الإدارة وتعديل الأسعار وتوليد كشوفات الـ PDF
 * =========================================================================
 */

// =========================================================================
// 1. إعدادات فايربيس (Firebase Realtime Database Configuration)
// ضع مفاتيح وبيانات مشروع فايربيس هنا للمزامنة السحابية الحية
// =========================================================================
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY_HERE",
  authDomain: "nahralelm-app.firebaseapp.com",
  databaseURL: "https://nahralelm-app-default-rtdb.firebaseio.com",
  projectId: "nahralelm-app",
  storageBucket: "nahralelm-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// رقم هاتف الواتساب المعتمد للمكتبة
const STORE_WHATSAPP_NUMBER = "201002968331";

// بصمة التشفير الآمنة لكلمة مرور الإدارة (SHA-256 لـ Hoor#271022)
// لحماية كلمة المرور من الكشف عبر Inspect Element في المتصفح
const ADMIN_PASSWORD_HASH = "0ae35671515b2138c71e24c2726005def772b17f3ab02568b4b586f554babeb4";

// الحسابات والملفات الشخصية المعتمدة للمنظومة
const SYSTEM_PROFILES = [
  "Engineer Mohamed Youssef",
  "Mohamed Youssef",
  "programmer Mohamed Youssef",
  "programmer Mohamed Hassan",
  "Ghala Mohamed Youssef"
];

// =========================================================================
// 2. الكتالوج التعليمي الشامل وقائمة الأسعار الافتراضية
// =========================================================================
const DEFAULT_BOOKS = [
  // --- المرحلة الابتدائية ---
  {
    id: "b-prim-01",
    title: "سلاح التلميذ - لغة عربية",
    stage: "ابتدائي",
    grade: "الصف الأول الابتدائي",
    subject: "لغة عربية",
    series: "سلاح التلميذ",
    price: 135,
    stock: "متوفر بالمكتبة",
    badge: "الأكثر طلباً",
    icon: "fa-book-open",
    clicks: 42
  },
  {
    id: "b-prim-02",
    title: "المعاصر - الرياضيات (Math)",
    stage: "ابتدائي",
    grade: "الصف الأول الابتدائي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 150,
    stock: "متوفر بالمكتبة",
    badge: "لغات وعربي",
    icon: "fa-calculator",
    clicks: 38
  },
  {
    id: "b-prim-03",
    title: "سلاح التلميذ - لغة عربية",
    stage: "ابتدائي",
    grade: "الصف الثاني الابتدائي",
    subject: "لغة عربية",
    series: "سلاح التلميذ",
    price: 140,
    stock: "متوفر بالمكتبة",
    badge: "معتمد",
    icon: "fa-book",
    clicks: 25
  },
  {
    id: "b-prim-04",
    title: "المعاصر - كونكت (Connect)",
    stage: "ابتدائي",
    grade: "الصف الثاني الابتدائي",
    subject: "لغة إنجليزية",
    series: "المعاصر",
    price: 155,
    stock: "متوفر بالمكتبة",
    badge: "إنجليزي",
    icon: "fa-spell-check",
    clicks: 30
  },
  {
    id: "b-prim-05",
    title: "الأضواء - لغة عربية",
    stage: "ابتدائي",
    grade: "الصف الثالث الابتدائي",
    subject: "لغة عربية",
    series: "الأضواء",
    price: 145,
    stock: "متوفر بالمكتبة",
    badge: "متميز",
    icon: "fa-book-open",
    clicks: 22
  },
  {
    id: "b-prim-06",
    title: "سلاح التلميذ - رياضيات",
    stage: "ابتدائي",
    grade: "الصف الثالث الابتدائي",
    subject: "رياضيات",
    series: "سلاح التلميذ",
    price: 145,
    stock: "متوفر بالمكتبة",
    badge: "الأكثر طلباً",
    icon: "fa-shapes",
    clicks: 34
  },
  {
    id: "b-prim-07",
    title: "سلاح التلميذ - دراسات اجتماعية",
    stage: "ابتدائي",
    grade: "الصف الرابع الابتدائي",
    subject: "دراسات اجتماعية",
    series: "سلاح التلميذ",
    price: 155,
    stock: "متوفر بالمكتبة",
    badge: "منهج جديد",
    icon: "fa-earth-africa",
    clicks: 45
  },
  {
    id: "b-prim-08",
    title: "سلاح التلميذ - علوم (Science)",
    stage: "ابتدائي",
    grade: "الصف الرابع الابتدائي",
    subject: "علوم",
    series: "سلاح التلميذ",
    price: 155,
    stock: "متوفر بالمكتبة",
    badge: "شامل الأنشطة",
    icon: "fa-flask",
    clicks: 40
  },
  {
    id: "b-prim-09",
    title: "المعاصر - الرياضيات (Math)",
    stage: "ابتدائي",
    grade: "الصف الخامس الابتدائي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 165,
    stock: "متوفر بالمكتبة",
    badge: "لغات وعربي",
    icon: "fa-calculator",
    clicks: 49
  },
  {
    id: "b-prim-10",
    title: "الأضواء - لغة عربية",
    stage: "ابتدائي",
    grade: "الصف الخامس الابتدائي",
    subject: "لغة عربية",
    series: "الأضواء",
    price: 160,
    stock: "متوفر بالمكتبة",
    badge: "معتمد",
    icon: "fa-book",
    clicks: 28
  },
  {
    id: "b-prim-11",
    title: "سلاح التلميذ - لغة عربية",
    stage: "ابتدائي",
    grade: "الصف السادس الابتدائي",
    subject: "لغة عربية",
    series: "سلاح التلميذ",
    price: 165,
    stock: "متوفر بالمكتبة",
    badge: "الشهادة الابتدائية",
    icon: "fa-graduation-cap",
    clicks: 65
  },
  {
    id: "b-prim-12",
    title: "سلاح التلميذ - دراسات اجتماعية",
    stage: "ابتدائي",
    grade: "الصف السادس الابتدائي",
    subject: "دراسات اجتماعية",
    series: "سلاح التلميذ",
    price: 160,
    stock: "متوفر بالمكتبة",
    badge: "أطلس ملون",
    icon: "fa-map",
    clicks: 39
  },

  // --- المرحلة الإعدادية ---
  {
    id: "b-prep-01",
    title: "الامتحان - لغة عربية (شرح + امتحانات)",
    stage: "إعدادي",
    grade: "الصف الأول الإعدادي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 170,
    stock: "متوفر بالمكتبة",
    badge: "الأكثر طلباً",
    icon: "fa-book-bookmark",
    clicks: 58
  },
  {
    id: "b-prep-02",
    title: "المعاصر - الرياضيات (جبر وهندسة)",
    stage: "إعدادي",
    grade: "الصف الأول الإعدادي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 175,
    stock: "متوفر بالمكتبة",
    badge: "جبر وهندسة",
    icon: "fa-square-root-variable",
    clicks: 52
  },
  {
    id: "b-prep-03",
    title: "الامتحان - علوم",
    stage: "إعدادي",
    grade: "الصف الأول الإعدادي",
    subject: "علوم",
    series: "الامتحان",
    price: 165,
    stock: "متوفر بالمكتبة",
    badge: "معتمد",
    icon: "fa-atom",
    clicks: 36
  },
  {
    id: "b-prep-04",
    title: "الامتحان - دراسات اجتماعية",
    stage: "إعدادي",
    grade: "الصف الثاني الإعدادي",
    subject: "دراسات اجتماعية",
    series: "الامتحان",
    price: 170,
    stock: "متوفر بالمكتبة",
    badge: "تاريخ وجغرافيا",
    icon: "fa-landmark",
    clicks: 44
  },
  {
    id: "b-prep-05",
    title: "المعاصر - لغة إنجليزية (New Hello)",
    stage: "إعدادي",
    grade: "الصف الثاني الإعدادي",
    subject: "لغة إنجليزية",
    series: "المعاصر",
    price: 175,
    stock: "متوفر بالمكتبة",
    badge: "متميز",
    icon: "fa-language",
    clicks: 41
  },
  {
    id: "b-prep-06",
    title: "الامتحان - لغة عربية (الشهادة الإعدادية)",
    stage: "إعدادي",
    grade: "الصف الثالث الإعدادي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 185,
    stock: "متوفر بالمكتبة",
    badge: "شهادة إعدادية",
    icon: "fa-award",
    clicks: 85
  },
  {
    id: "b-prep-07",
    title: "المعاصر - الرياضيات (جبر وإحصاء وحساب مثلثات)",
    stage: "إعدادي",
    grade: "الصف الثالث الإعدادي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 190,
    stock: "متوفر بالمكتبة",
    badge: "شامل الامتحانات",
    icon: "fa-calculator",
    clicks: 79
  },
  {
    id: "b-prep-08",
    title: "الامتحان - علوم متكاملة",
    stage: "إعدادي",
    grade: "الصف الثالث الإعدادي",
    subject: "علوم",
    series: "الامتحان",
    price: 175,
    stock: "متوفر بالمكتبة",
    badge: "بنك الأسئلة",
    icon: "fa-flask-vial",
    clicks: 63
  },

  // --- المرحلة الثانوية ---
  {
    id: "b-sec-01",
    title: "الامتحان - لغة عربية (الصف الأول الثانوي)",
    stage: "ثانوي",
    grade: "الصف الأول الثانوي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 195,
    stock: "متوفر بالمكتبة",
    badge: "أولى ثانوي",
    icon: "fa-book-atlas",
    clicks: 60
  },
  {
    id: "b-sec-02",
    title: "كتاب نيوتن في الفيزياء (شرح وتدريبات)",
    stage: "ثانوي",
    grade: "الصف الأول الثانوي",
    subject: "فيزياء",
    series: "نيوتن",
    price: 185,
    stock: "متوفر بالمكتبة",
    badge: "فيزياء حديثة",
    icon: "fa-bolt",
    clicks: 48
  },
  {
    id: "b-sec-03",
    title: "الامتحان - كيمياء",
    stage: "ثانوي",
    grade: "الصف الأول الثانوي",
    subject: "كيمياء",
    series: "الامتحان",
    price: 180,
    stock: "متوفر بالمكتبة",
    badge: "معتمد",
    icon: "fa-vial",
    clicks: 45
  },
  {
    id: "b-sec-04",
    title: "الامتحان - أحياء",
    stage: "ثانوي",
    grade: "الصف الثاني الثانوي",
    subject: "أحياء",
    series: "الامتحان",
    price: 185,
    stock: "متوفر بالمكتبة",
    badge: "علمي",
    icon: "fa-dna",
    clicks: 53
  },
  {
    id: "b-sec-05",
    title: "الامتحان - تاريخ وجغرافيا",
    stage: "ثانوي",
    grade: "الصف الثاني الثانوي",
    subject: "دراسات اجتماعية",
    series: "الامتحان",
    price: 190,
    stock: "متوفر بالمكتبة",
    badge: "أدبي",
    icon: "fa-monument",
    clicks: 37
  },
  {
    id: "b-sec-06",
    title: "الامتحان - لغة عربية (الثانوية العامة)",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 240,
    stock: "متوفر كميات",
    badge: "ثانوية عامة",
    icon: "fa-award",
    clicks: 98
  },
  {
    id: "b-sec-07",
    title: "كتاب نيوتن في الفيزياء (بنك الأسئلة والبوكليت)",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "فيزياء",
    series: "نيوتن",
    price: 230,
    stock: "متوفر كميات",
    badge: "الأقوى في الفيزياء",
    icon: "fa-bolt",
    clicks: 110
  },
  {
    id: "b-sec-08",
    title: "الوافي في الكيمياء (الثانوية العامة)",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "كيمياء",
    series: "الوافي",
    price: 220,
    stock: "متوفر بالمكتبة",
    badge: "كيمياء 3 ثانوي",
    icon: "fa-flask",
    clicks: 72
  },
  {
    id: "b-sec-09",
    title: "المعاصر في الرياضيات البحتة والتطبيقية",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 250,
    stock: "متوفر بالمكتبة",
    badge: "علمي رياضة",
    icon: "fa-calculator",
    clicks: 88
  },

  // --- خدمات وأدوات أخرى ---
  {
    id: "b-oth-01",
    title: "باكدج كشاكيل سلك 80 ورقة (مجموعة 5 قطع)",
    stage: "أخرى",
    grade: "كافة الصفوف",
    subject: "أدوات مدرسية",
    series: "أدوات نهر العلم",
    price: 95,
    stock: "متوفر بالمكتبة",
    badge: "عرض خاص",
    icon: "fa-pen-ruler",
    clicks: 31
  },
  {
    id: "b-oth-02",
    title: "طقم أدوات هندسية متكامل مع برجل فاخر",
    stage: "أخرى",
    grade: "إعدادي وثانوي",
    subject: "أدوات هندسية",
    series: "أدوات نهر العلم",
    price: 65,
    stock: "متوفر بالمكتبة",
    badge: "دقيق وفاخر",
    icon: "fa-compass-drafting",
    clicks: 29
  },
  {
    id: "b-oth-03",
    title: "باكيت ورق تصوير A4 أبيض فاخر (80 جرام - 500 ورقة)",
    stage: "أخرى",
    grade: "للمكاتب والطلاب",
    subject: "ورق طباعة",
    series: "أدوات نهر العلم",
    price: 185,
    stock: "متوفر بالمكتبة",
    badge: "جودة أصلية",
    icon: "fa-file",
    clicks: 44
  }
];

// تسعيرة خدمات الطباعة والتجليد الافتراضية
const DEFAULT_PRINT_RATES = {
  bwPage: 0.75,         // سعر صفحة أبيض وأسود
  colorPage: 2.50,      // سعر صفحة ألوان
  bindingStaple: 3.00,  // سعر تدبيس
  bindingPlastic: 15.00,// سعر تغليف بلاستيك
  bindingWire: 25.00    // سعر تغليف سلك فاخر
};

// إعلان الشريط العلوي الافتراضي
const DEFAULT_ANNOUNCEMENT = {
  text: "أهلاً بكم في مكتبة نهر العلم - وصول دفعة جديدة من كتب سلاح التلميذ والمعاصر والامتحان لكافة المراحل بأسعار معتمدة ومحدثة.",
  badge: "تنويه عاجل",
  active: true
};

// =========================================================================
// 3. إدارة الحالة المحلية (State Management)
// =========================================================================
let currentBooks = [];
let currentPrintRates = { ...DEFAULT_PRINT_RATES };
let currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT };
let cartItems = [];
let selectedSeriesFilter = "all";
let firebaseDb = null;
let isFirebaseConnected = false;
let failedLoginAttempts = 0;
let isAdminAuthenticated = false;

// =========================================================================
// 4. تهيئة فايربيس وقاعدة البيانات السحابية (Firebase Realtime DB)
// =========================================================================
function initializeFirebase() {
  try {
    if (typeof firebase !== "undefined" && firebaseConfig && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_API_KEY")) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firebaseDb = firebase.database();
      isFirebaseConnected = true;
      updateSyncStatusUI("سحابي متصل", true);
      listenToFirebaseUpdates();
      console.log("Firebase Realtime Database initialized successfully.");
    } else {
      console.info("Firebase running in Local Persistence mode (Mock/Offline Fallback).");
      updateSyncStatusUI("تحديث لحظي", true);
    }
  } catch (err) {
    console.warn("Firebase Init Notice:", err.message);
    updateSyncStatusUI("محلي نشط", false);
  }
}

function updateSyncStatusUI(text, isGood) {
  const syncStatusText = document.getElementById("syncStatusText");
  const statFirebaseStatus = document.getElementById("statFirebaseStatus");
  if (syncStatusText) {
    syncStatusText.textContent = text;
  }
  if (statFirebaseStatus) {
    statFirebaseStatus.textContent = isGood ? "Firebase Live Connected" : "Local Sync Mode";
  }
}

// الاستماع للتحديثات السحابية المباشرة (Over-The-Air Data Sync)
function listenToFirebaseUpdates() {
  if (!firebaseDb) return;

  // مزامنة الكتب والأسعار
  firebaseDb.ref("books").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && Array.isArray(data) && data.length > 0) {
      currentBooks = data;
      localStorage.setItem("nahralelm_books", JSON.stringify(currentBooks));
      populateDropdownFilters();
      renderCatalogGrid();
      renderAdminPricesTable();
      updateAdminStats();
    }
  });

  // مزامنة تسعيرة الطباعة
  firebaseDb.ref("printRates").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      currentPrintRates = { ...currentPrintRates, ...data };
      localStorage.setItem("nahralelm_print_rates", JSON.stringify(currentPrintRates));
      updatePrintCalculator();
      populatePrintingRatesForm();
    }
  });

  // مزامنة شريط الإعلانات
  firebaseDb.ref("announcement").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      currentAnnouncement = { ...currentAnnouncement, ...data };
      localStorage.setItem("nahralelm_announcement", JSON.stringify(currentAnnouncement));
      renderAnnouncementBanner();
    }
  });
}

// حفظ البيانات في فايربيس ومحلياً
function persistBooksData() {
  localStorage.setItem("nahralelm_books", JSON.stringify(currentBooks));
  if (firebaseDb) {
    firebaseDb.ref("books").set(currentBooks).catch(err => console.error("Firebase save books error:", err));
  }
}

function persistPrintRates() {
  localStorage.setItem("nahralelm_print_rates", JSON.stringify(currentPrintRates));
  if (firebaseDb) {
    firebaseDb.ref("printRates").set(currentPrintRates).catch(err => console.error("Firebase save rates error:", err));
  }
}

function persistAnnouncement() {
  localStorage.setItem("nahralelm_announcement", JSON.stringify(currentAnnouncement));
  if (firebaseDb) {
    firebaseDb.ref("announcement").set(currentAnnouncement).catch(err => console.error("Firebase save announcement error:", err));
  }
}

// تحميل البيانات المحفوظة محلياً عند بدء التشغيل
function loadInitialState() {
  const savedBooks = localStorage.getItem("nahralelm_books");
  if (savedBooks) {
    try {
      currentBooks = JSON.parse(savedBooks);
    } catch {
      currentBooks = [...DEFAULT_BOOKS];
    }
  } else {
    currentBooks = [...DEFAULT_BOOKS];
    localStorage.setItem("nahralelm_books", JSON.stringify(currentBooks));
  }

  const savedRates = localStorage.getItem("nahralelm_print_rates");
  if (savedRates) {
    try {
      currentPrintRates = JSON.parse(savedRates);
    } catch {
      currentPrintRates = { ...DEFAULT_PRINT_RATES };
    }
  }

  const savedAnnouncement = localStorage.getItem("nahralelm_announcement");
  if (savedAnnouncement) {
    try {
      currentAnnouncement = JSON.parse(savedAnnouncement);
    } catch {
      currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT };
    }
  }

  const savedCart = localStorage.getItem("nahralelm_cart");
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
    } catch {
      cartItems = [];
    }
  }
}

// =========================================================================
// 5. نظام الفلاتر التعليمية الثلاثي (المرحلة -> الصف -> المادة)
// =========================================================================
function populateDropdownFilters() {
  const stageSelect = document.getElementById("stageSelect");
  const gradeSelect = document.getElementById("gradeSelect");
  const subjectSelect = document.getElementById("subjectSelect");

  if (!stageSelect || !gradeSelect || !subjectSelect) return;

  const currentStage = stageSelect.value;

  // استخراج الصفوف المطابقة للمرحلة المحددة
  let filteredForGrade = currentBooks;
  if (currentStage !== "all") {
    filteredForGrade = currentBooks.filter(b => b.stage === currentStage);
  }

  const grades = Array.from(new Set(filteredForGrade.map(b => b.grade))).filter(Boolean);
  const prevSelectedGrade = gradeSelect.value;
  gradeSelect.innerHTML = `<option value="all">كافة الصفوف الدراسية (${grades.length})</option>`;
  grades.forEach(grade => {
    const opt = document.createElement("option");
    opt.value = grade;
    opt.textContent = grade;
    if (grade === prevSelectedGrade) opt.selected = true;
    gradeSelect.appendChild(opt);
  });

  // استخراج المواد المطابقة للمرحلة والصف المحددين
  const currentGrade = gradeSelect.value;
  let filteredForSubject = filteredForGrade;
  if (currentGrade !== "all") {
    filteredForSubject = filteredForGrade.filter(b => b.grade === currentGrade);
  }

  const subjects = Array.from(new Set(filteredForSubject.map(b => b.subject))).filter(Boolean);
  const prevSelectedSubject = subjectSelect.value;
  subjectSelect.innerHTML = `<option value="all">كافة المواد الدراسية (${subjects.length})</option>`;
  subjects.forEach(subject => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    if (subject === prevSelectedSubject) opt.selected = true;
    subjectSelect.appendChild(opt);
  });
}

function getFilteredBooks() {
  const stage = document.getElementById("stageSelect")?.value || "all";
  const grade = document.getElementById("gradeSelect")?.value || "all";
  const subject = document.getElementById("subjectSelect")?.value || "all";

  return currentBooks.filter(book => {
    const matchStage = (stage === "all" || book.stage === stage);
    const matchGrade = (grade === "all" || book.grade === grade);
    const matchSubject = (subject === "all" || book.subject === subject);
    const matchSeries = (selectedSeriesFilter === "all" || book.series.includes(selectedSeriesFilter));

    return matchStage && matchGrade && matchSubject && matchSeries;
  });
}

// =========================================================================
// 6. عرض كتالوج الكتب والمنتجات وتحديث واجهة المستخدم
// =========================================================================
function renderCatalogGrid() {
  const catalogGrid = document.getElementById("catalogGrid");
  const noResultsNotice = document.getElementById("noResultsNotice");
  const filteredItemsCount = document.getElementById("filteredItemsCount");

  if (!catalogGrid) return;

  const items = getFilteredBooks();

  if (filteredItemsCount) {
    filteredItemsCount.textContent = items.length;
  }

  if (items.length === 0) {
    catalogGrid.innerHTML = "";
    if (noResultsNotice) noResultsNotice.classList.remove("hidden");
    return;
  }

  if (noResultsNotice) noResultsNotice.classList.add("hidden");

  catalogGrid.innerHTML = items.map(item => {
    const inCartItem = cartItems.find(c => c.id === item.id);
    const inCartQty = inCartItem ? inCartItem.quantity : 0;

    return `
      <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <!-- Header Tag & Series -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${item.badge || item.stage}
            </span>
            <span class="text-[11px] font-bold text-slate-400">
              ${item.series}
            </span>
          </div>

          <!-- Title & Grade -->
          <div class="flex items-start gap-2.5 mb-2">
            <div class="w-9 h-9 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200 text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <i class="fa-solid ${item.icon || 'fa-book'}"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                ${item.title}
              </h4>
              <p class="text-[11px] text-slate-500 font-medium">
                ${item.grade} • ${item.subject}
              </p>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 mt-2">
          <!-- Live Price Display -->
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="text-[10px] text-slate-400 block font-semibold">السعر الرسمي:</span>
              <span class="text-emerald-700 font-black text-base sm:text-lg">
                ${item.price} <span class="text-xs font-bold">ج.م</span>
              </span>
            </div>
            <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <i class="fa-solid fa-circle-check text-[9px] mr-1"></i> ${item.stock || 'متوفر بالمكتبة'}
            </span>
          </div>

          <!-- Action Buttons: Add to Cart & Direct WhatsApp -->
          <div class="grid grid-cols-2 gap-2">
            
            <!-- Quick Add to Cart Button -->
            <button 
              onclick="handleAddToCart('${item.id}')"
              class="app-tap-effect flex items-center justify-center gap-1.5 ${inCartQty > 0 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-900 hover:bg-slate-800'} text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-all shadow-sm">
              <i class="fa-solid ${inCartQty > 0 ? 'fa-check' : 'fa-cart-plus'} text-xs"></i>
              <span>${inCartQty > 0 ? `في السلة (${inCartQty})` : 'إضافة للطلب'}</span>
            </button>

            <!-- Instant WhatsApp Order Button -->
            <a 
              href="${generateItemWhatsAppUrl(item)}"
              target="_blank"
              rel="noopener"
              onclick="recordItemClick('${item.id}')"
              class="app-tap-effect flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-all shadow-sm">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span>اطلب فوراً</span>
            </a>

          </div>
        </div>
      </div>
    `;
  }).join("");
}

function generateItemWhatsAppUrl(item) {
  const msg = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\nأود الاستفسار وتأكيد توفر الكتاب التالي للطلب:\n- الكتاب: ${item.title}\n- المرحلة: ${item.stage} (${item.grade})\n- المادة: ${item.subject}\n- السلسلة: ${item.series}\n- السعر المعتمد: ${item.price} ج.م\n\nأرجو إفادتي بإمكانية الاستلام أو التوصيل، شكراً لكم!`;
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function recordItemClick(itemId) {
  const item = currentBooks.find(b => b.id === itemId);
  if (item) {
    item.clicks = (item.clicks || 0) + 1;
    persistBooksData();
    updateAdminStats();
  }
}

// =========================================================================
// 7. سلة الطلبات الذكية (Quick Cart Feature)
// =========================================================================
function handleAddToCart(bookId) {
  const book = currentBooks.find(b => b.id === bookId);
  if (!book) return;

  const existing = cartItems.find(c => c.id === bookId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      id: book.id,
      title: book.title,
      price: book.price,
      grade: book.grade,
      stage: book.stage,
      quantity: 1
    });
  }

  localStorage.setItem("nahralelm_cart", JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
  recordItemClick(bookId);

  // إشعار بصري للمستخدم
  showToastNotification(`تمت إضافة "${book.title}" إلى سلة الطلبات!`);
}

function updateCartBadges() {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartCountBadge = document.getElementById("cartCountBadge");
  const bottomNavCartCount = document.getElementById("bottomNavCartCount");
  const cartDrawerCountPill = document.getElementById("cartDrawerCountPill");

  if (cartCountBadge) cartCountBadge.textContent = totalCount;
  
  if (bottomNavCartCount) {
    bottomNavCartCount.textContent = totalCount;
    if (totalCount > 0) {
      bottomNavCartCount.classList.remove("hidden");
    } else {
      bottomNavCartCount.classList.add("hidden");
    }
  }

  if (cartDrawerCountPill) {
    cartDrawerCountPill.textContent = `${totalCount} عناصر`;
  }
}

function renderCartDrawer() {
  const cartItemsList = document.getElementById("cartItemsList");
  const cartEmptyNotice = document.getElementById("cartEmptyNotice");
  const cartFooterSection = document.getElementById("cartFooterSection");
  const cartDrawerTotalPrice = document.getElementById("cartDrawerTotalPrice");

  if (!cartItemsList) return;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "";
    if (cartEmptyNotice) cartEmptyNotice.classList.remove("hidden");
    if (cartFooterSection) cartFooterSection.classList.add("hidden");
    return;
  }

  if (cartEmptyNotice) cartEmptyNotice.classList.add("hidden");
  if (cartFooterSection) cartFooterSection.classList.remove("hidden");

  let totalCost = 0;

  cartItemsList.innerHTML = cartItems.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    totalCost += itemTotal;

    return `
      <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3">
        <div class="space-y-0.5 flex-1 min-w-0">
          <h5 class="text-xs font-bold text-slate-900 truncate">${item.title}</h5>
          <p class="text-[10px] text-slate-500">${item.grade}</p>
          <div class="text-xs font-black text-emerald-700">
            ${item.price} ج.م × ${item.quantity} = ${itemTotal} ج.م
          </div>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick="changeCartItemQty('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="w-6 text-center text-xs font-bold text-slate-900">${item.quantity}</span>
          <button onclick="changeCartItemQty('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button onclick="removeCartItem('${item.id}')" title="حذف" class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs hover:bg-rose-100 mr-1">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (cartDrawerTotalPrice) {
    cartDrawerTotalPrice.textContent = `${totalCost} ج.م`;
  }
}

function changeCartItemQty(itemId, delta) {
  const item = cartItems.find(c => c.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter(c => c.id !== itemId);
  }

  localStorage.setItem("nahralelm_cart", JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function removeCartItem(itemId) {
  cartItems = cartItems.filter(c => c.id !== itemId);
  localStorage.setItem("nahralelm_cart", JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function clearCart() {
  cartItems = [];
  localStorage.setItem("nahralelm_cart", JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function sendCartOrderWhatsApp() {
  if (cartItems.length === 0) return;

  const customerName = document.getElementById("cartCustomerName")?.value.trim() || "غير محدد";
  let totalCost = 0;

  let message = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n`;
  message += `أود تأكيد طلب الكتب والمستلزمات الدراسية التالية:\n\n`;

  cartItems.forEach((item, index) => {
    const sub = item.price * item.quantity;
    totalCost += sub;
    message += `${index + 1}. ${item.title} (${item.grade}) × ${item.quantity} = ${sub} ج.م\n`;
  });

  message += `\n─────────────────────\n`;
  message += `💰 إجمالي تكلفة الطلب: ${totalCost} ج.م\n`;
  message += `👤 اسم العميل / العنوان: ${customerName}\n`;
  message += `\nأرجو تجهيز الطلب وإفادتي بموعد الاستلام. شكراً لكم!`;

  const url = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 8. حاسبة خدمة اطبع مذكرتك (Interactive Printing Service)
// =========================================================================
function updatePrintCalculator() {
  const pages = parseInt(document.getElementById("calcPagesCount")?.value, 10) || 1;
  const copies = parseInt(document.getElementById("calcCopiesCount")?.value, 10) || 1;
  const colorType = document.getElementById("calcColorType")?.value || "bw";
  const bindingType = document.getElementById("calcBindingType")?.value || "wire";

  const pageRate = colorType === "color" ? currentPrintRates.colorPage : currentPrintRates.bwPage;
  
  let bindingRate = 0;
  if (bindingType === "wire") bindingRate = currentPrintRates.bindingWire;
  else if (bindingType === "plastic") bindingRate = currentPrintRates.bindingPlastic;
  else if (bindingType === "staple") bindingRate = currentPrintRates.bindingStaple;

  const pagesTotal = pages * pageRate * copies;
  const bindingTotal = bindingRate * copies;
  const grandTotal = pagesTotal + bindingTotal;

  const costPagesBreakdown = document.getElementById("costPagesBreakdown");
  const costBindingBreakdown = document.getElementById("costBindingBreakdown");
  const costTotalEstimate = document.getElementById("costTotalEstimate");

  if (costPagesBreakdown) costPagesBreakdown.textContent = `${pagesTotal.toFixed(2)} ج.م`;
  if (costBindingBreakdown) costBindingBreakdown.textContent = `${bindingTotal.toFixed(2)} ج.م`;
  if (costTotalEstimate) costTotalEstimate.textContent = `${grandTotal.toFixed(2)} ج.م`;
}

function sendPrintOrderWhatsApp() {
  const docFile = document.getElementById("printDocInput")?.files[0];
  const fileName = docFile ? docFile.name : "مذكرة دراسية (سيتم إرفاقها بالمحادثة)";
  const pages = parseInt(document.getElementById("calcPagesCount")?.value, 10) || 1;
  const copies = parseInt(document.getElementById("calcCopiesCount")?.value, 10) || 1;
  const colorType = document.getElementById("calcColorType")?.value === "color" ? "ألوان بجودة عالية" : "أبيض وأسود ليزر";
  
  let bindingText = "بدون تغليف";
  const bindingType = document.getElementById("calcBindingType")?.value;
  if (bindingType === "wire") bindingText = "تغليف سلك حديد فاخر";
  else if (bindingType === "plastic") bindingText = "تغليف بلاستيك حلزوني";
  else if (bindingType === "staple") bindingText = "تدبيس حراري";

  const totalEstimate = document.getElementById("costTotalEstimate")?.textContent || "";

  let msg = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n`;
  msg += `طلب خدمة طباعة وتصوير وتغليف مذكرة:\n\n`;
  msg += `📄 اسم الملف: ${fileName}\n`;
  msg += `📑 عدد الصفحات: ${pages} صفحة\n`;
  msg += `🔢 عدد النسخ: ${copies} نسخة\n`;
  msg += `🎨 نوع الطباعة: ${colorType}\n`;
  msg += `📎 نوع التغليف: ${bindingText}\n`;
  msg += `💵 التكلفة المقدرة: ${totalEstimate}\n\n`;
  msg += `سأقوم بإرسال الملف هنا مباشرة للطباعة. أرجو تأكيد الاستلام والتجهيز!`;

  const url = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 9. البوابة المخفية للدخول الإداري (3-Second Long Press on Footer)
// =========================================================================
function setupHiddenAdminTrigger() {
  const trigger = document.getElementById("adminTriggerFooter");
  const indicator = document.getElementById("longPressIndicator");
  const bar = document.getElementById("longPressBar");
  const modal = document.getElementById("adminAccessModal");

  if (!trigger || !modal) return;

  let pressTimer = null;
  let progressInterval = null;
  const REQUIRED_HOLD_MS = 3000;
  let holdProgress = 0;

  function startHold(e) {
    // منع السحب غير المقصود
    holdProgress = 0;
    if (indicator) indicator.classList.remove("hidden");
    if (bar) bar.style.width = "0%";
    trigger.classList.add("long-press-active");

    const startTime = Date.now();
    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / REQUIRED_HOLD_MS) * 100);
      if (bar) bar.style.width = `${pct}%`;
    }, 50);

    pressTimer = setTimeout(() => {
      endHold();
      openAdminModal();
    }, REQUIRED_HOLD_MS);
  }

  function endHold() {
    clearTimeout(pressTimer);
    clearInterval(progressInterval);
    if (indicator) indicator.classList.add("hidden");
    if (bar) bar.style.width = "0%";
    trigger.classList.remove("long-press-active");
  }

  // دعم أحداث اللمس والماوس
  trigger.addEventListener("mousedown", startHold);
  trigger.addEventListener("mouseup", endHold);
  trigger.addEventListener("mouseleave", endHold);

  trigger.addEventListener("touchstart", (e) => {
    startHold(e);
  }, { passive: true });
  trigger.addEventListener("touchend", endHold);
  trigger.addEventListener("touchcancel", endHold);
}

function openAdminModal() {
  const modal = document.getElementById("adminAccessModal");
  const input = document.getElementById("adminPasswordInput");
  const feedback = document.getElementById("loginFeedback");

  if (modal) modal.classList.remove("hidden");
  if (feedback) feedback.classList.add("hidden");
  if (input) {
    input.value = "";
    input.focus();
  }
}

function closeAdminModal() {
  const modal = document.getElementById("adminAccessModal");
  if (modal) modal.classList.add("hidden");
}

// دالة تشفير SHA-256 للمقارنة الآمنة في الواجهة
async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const passwordInput = document.getElementById("adminPasswordInput");
  const feedback = document.getElementById("loginFeedback");
  const attemptsBadge = document.getElementById("loginAttemptsLeft");

  if (!passwordInput) return;
  const enteredPass = passwordInput.value;

  const enteredHash = await sha256(enteredPass);

  if (enteredHash === ADMIN_PASSWORD_HASH) {
    // نجاح تسجيل الدخول
    isAdminAuthenticated = true;
    failedLoginAttempts = 0;
    closeAdminModal();
    revealAdminPanel();
    showToastNotification("مرحباً بك يا باشمهندس محمد يوسف، تم تفعيل لوحة الإدارة السحابية.");
  } else {
    // فشل التحقق
    failedLoginAttempts += 1;
    const remaining = Math.max(0, 3 - failedLoginAttempts);

    if (attemptsBadge) attemptsBadge.textContent = remaining;

    if (feedback) {
      feedback.textContent = `كلمة المرور غير صحيحة! متبقي ${remaining} محاولات.`;
      feedback.classList.remove("hidden");
    }

    if (failedLoginAttempts >= 3) {
      setTimeout(() => {
        closeAdminModal();
        failedLoginAttempts = 0;
        if (attemptsBadge) attemptsBadge.textContent = "3";
        showToastNotification("تم إغلاق البوابة الإدارية لتجاوز الحد المسموح من المحاولات.");
      }, 1000);
    }
  }
}

// =========================================================================
// 10. شاشات لوحة الإدارة المتكاملة (Admin Panel View)
// =========================================================================
function revealAdminPanel() {
  const publicScreen = document.getElementById("publicStorefront");
  const adminScreen = document.getElementById("adminPanelScreen");

  if (publicScreen) publicScreen.classList.add("hidden");
  if (adminScreen) adminScreen.classList.remove("hidden");

  renderAdminPricesTable();
  populatePrintingRatesForm();
  populateAnnouncementForm();
  updateAdminStats();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideAdminPanel() {
  const publicScreen = document.getElementById("publicStorefront");
  const adminScreen = document.getElementById("adminPanelScreen");

  if (publicScreen) publicScreen.classList.remove("hidden");
  if (adminScreen) adminScreen.classList.add("hidden");

  renderCatalogGrid();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleAdminLogout() {
  isAdminAuthenticated = false;
  hideAdminPanel();
  showToastNotification("تم تسجيل الخروج وقفل لوحة الإدارة بنجاح.");
}

function renderAdminPricesTable() {
  const tbody = document.getElementById("adminPricesTableBody");
  const search = document.getElementById("adminTableSearch")?.value.toLowerCase().trim() || "";
  if (!tbody) return;

  const filtered = currentBooks.filter(b => {
    return b.title.toLowerCase().includes(search) ||
           b.grade.toLowerCase().includes(search) ||
           b.subject.toLowerCase().includes(search) ||
           b.stage.toLowerCase().includes(search);
  });

  tbody.innerHTML = filtered.map(b => {
    return `
      <tr class="hover:bg-slate-700/50 transition-colors">
        <td class="p-3 font-bold text-white">${b.title}</td>
        <td class="p-3 text-slate-300">${b.stage}</td>
        <td class="p-3 text-slate-300">${b.grade}</td>
        <td class="p-3 text-slate-300">${b.subject} (${b.series})</td>
        <td class="p-3">
          <div class="flex items-center gap-1.5">
            <input 
              type="number" 
              id="adminPriceInput_${b.id}" 
              value="${b.price}" 
              class="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs focus:ring-1 focus:ring-emerald-500" 
            />
            <span class="text-slate-400 text-xs">ج.م</span>
          </div>
        </td>
        <td class="p-3">
          <select id="adminStockSelect_${b.id}" class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200">
            <option value="متوفر بالمكتبة" ${b.stock === 'متوفر بالمكتبة' ? 'selected' : ''}>متوفر بالمكتبة</option>
            <option value="كمية محدودة" ${b.stock === 'كمية محدودة' ? 'selected' : ''}>كمية محدودة</option>
            <option value="قيد التجهيز" ${b.stock === 'قيد التجهيز' ? 'selected' : ''}>قيد التجهيز</option>
          </select>
        </td>
        <td class="p-3 text-center">
          <button 
            onclick="saveSingleBookPrice('${b.id}')"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1 px-3 rounded-lg transition-all">
            حفظ
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function saveSingleBookPrice(bookId) {
  const priceInput = document.getElementById(`adminPriceInput_${bookId}`);
  const stockSelect = document.getElementById(`adminStockSelect_${bookId}`);

  const item = currentBooks.find(b => b.id === bookId);
  if (!item || !priceInput) return;

  const newPrice = parseFloat(priceInput.value);
  if (isNaN(newPrice) || newPrice < 0) {
    alert("يرجى إدخال سعر صحيح!");
    return;
  }

  item.price = newPrice;
  if (stockSelect) item.stock = stockSelect.value;

  persistBooksData();
  renderCatalogGrid();
  renderAdminPricesTable();
  updateAdminStats();
  showToastNotification(`تم تحديث سعر "${item.title}" إلى ${newPrice} ج.م ومزامنته سحابياً!`);
}

function saveAllPricesFromTable() {
  currentBooks.forEach(b => {
    const pInput = document.getElementById(`adminPriceInput_${b.id}`);
    const sSelect = document.getElementById(`adminStockSelect_${b.id}`);
    if (pInput) {
      const p = parseFloat(pInput.value);
      if (!isNaN(p) && p >= 0) b.price = p;
    }
    if (sSelect) b.stock = sSelect.value;
  });

  persistBooksData();
  renderCatalogGrid();
  renderAdminPricesTable();
  updateAdminStats();
  showToastNotification("تمت مزامنة كافة تعديلات الأسعار بنجاح!");
}

function populatePrintingRatesForm() {
  const rateBw = document.getElementById("rateBwPage");
  const rateColor = document.getElementById("rateColorPage");
  const rateStaple = document.getElementById("rateBindingStaple");
  const ratePlastic = document.getElementById("rateBindingPlastic");
  const rateWire = document.getElementById("rateBindingWire");

  if (rateBw) rateBw.value = currentPrintRates.bwPage;
  if (rateColor) rateColor.value = currentPrintRates.colorPage;
  if (rateStaple) rateStaple.value = currentPrintRates.bindingStaple;
  if (ratePlastic) ratePlastic.value = currentPrintRates.bindingPlastic;
  if (rateWire) rateWire.value = currentPrintRates.bindingWire;
}

function handleSavePrintingRates(e) {
  e.preventDefault();
  currentPrintRates.bwPage = parseFloat(document.getElementById("rateBwPage")?.value) || 0.75;
  currentPrintRates.colorPage = parseFloat(document.getElementById("rateColorPage")?.value) || 2.50;
  currentPrintRates.bindingStaple = parseFloat(document.getElementById("rateBindingStaple")?.value) || 3.00;
  currentPrintRates.bindingPlastic = parseFloat(document.getElementById("rateBindingPlastic")?.value) || 15.00;
  currentPrintRates.bindingWire = parseFloat(document.getElementById("rateBindingWire")?.value) || 25.00;

  persistPrintRates();
  updatePrintCalculator();
  showToastNotification("تم حفظ تسعيرة الطباعة ونشرها سحابياً!");
}

function populateAnnouncementForm() {
  const input = document.getElementById("adminAnnouncementInput");
  const badge = document.getElementById("adminBadgeInput");
  const checkbox = document.getElementById("adminBannerActiveCheckbox");

  if (input) input.value = currentAnnouncement.text;
  if (badge) badge.value = currentAnnouncement.badge;
  if (checkbox) checkbox.checked = currentAnnouncement.active;
}

function handleSaveAnnouncement(e) {
  e.preventDefault();
  const input = document.getElementById("adminAnnouncementInput");
  const badge = document.getElementById("adminBadgeInput");
  const checkbox = document.getElementById("adminBannerActiveCheckbox");

  currentAnnouncement.text = input?.value || "";
  currentAnnouncement.badge = badge?.value || "تنويه";
  currentAnnouncement.active = checkbox ? checkbox.checked : true;

  persistAnnouncement();
  renderAnnouncementBanner();
  showToastNotification("تم تحديث ونشر شريط الإعلانات للزوار!");
}

function renderAnnouncementBanner() {
  const banner = document.getElementById("liveAnnouncementBanner");
  const text = document.getElementById("announcementText");
  const badge = document.getElementById("announcementBadge");

  if (!banner) return;

  if (!currentAnnouncement.active || !currentAnnouncement.text.trim()) {
    banner.classList.add("hidden");
  } else {
    banner.classList.remove("hidden");
    if (text) text.textContent = currentAnnouncement.text;
    if (badge) badge.innerHTML = `<i class="fa-solid fa-bullhorn text-[9px] mr-1"></i> ${currentAnnouncement.badge}`;
  }
}

function updateAdminStats() {
  const statTotal = document.getElementById("statTotalBooks");
  const statActiveBanners = document.getElementById("statActiveBanners");
  const statTopBook = document.getElementById("statTopBook");

  if (statTotal) statTotal.textContent = currentBooks.length;
  if (statActiveBanners) statActiveBanners.textContent = currentAnnouncement.active ? "1" : "0";

  if (statTopBook && currentBooks.length > 0) {
    const sorted = [...currentBooks].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    statTopBook.textContent = sorted[0].title.split("-")[0].trim();
  }
}

// إضافة كتاب جديد من لوحة الإدارة
function handleAddNewBook(e) {
  e.preventDefault();
  const title = document.getElementById("newBookTitle")?.value.trim();
  const stage = document.getElementById("newBookStage")?.value;
  const grade = document.getElementById("newBookGrade")?.value.trim();
  const subject = document.getElementById("newBookSubject")?.value.trim();
  const series = document.getElementById("newBookSeries")?.value.trim();
  const price = parseFloat(document.getElementById("newBookPrice")?.value) || 0;
  const stock = document.getElementById("newBookStock")?.value;

  if (!title || !grade || !subject) {
    alert("يرجى ملء كافة الحقول الأساسية!");
    return;
  }

  const newBook = {
    id: `b-custom-${Date.now()}`,
    title,
    stage,
    grade,
    subject,
    series: series || "أخرى",
    price,
    stock,
    badge: "جديد بالمكتبة",
    icon: "fa-book",
    clicks: 1
  };

  currentBooks.unshift(newBook);
  persistBooksData();
  populateDropdownFilters();
  renderCatalogGrid();
  renderAdminPricesTable();
  updateAdminStats();

  document.getElementById("addNewBookModal")?.classList.add("hidden");
  document.getElementById("addNewBookForm")?.reset();
  showToastNotification(`تمت إضافة كتاب "${title}" إلى المتجر بنجاح!`);
}

// توليد تقرير الأسعار الرسمي (PDF / Printable Report Generator)
function generatePrintablePriceReport() {
  const reportDate = document.getElementById("reportPrintDate");
  const tbody = document.getElementById("printableReportTableBody");
  const reportArea = document.getElementById("printableReportArea");

  if (!tbody || !reportArea) return;

  const now = new Date();
  if (reportDate) {
    reportDate.textContent = `تاريخ الإصدار: ${now.toLocaleDateString("ar-EG")}`;
  }

  tbody.innerHTML = currentBooks.map((b, i) => `
    <tr class="border-b border-slate-200">
      <td class="p-2 border border-slate-300 font-bold">${i + 1}</td>
      <td class="p-2 border border-slate-300 font-bold">${b.title}</td>
      <td class="p-2 border border-slate-300">${b.stage}</td>
      <td class="p-2 border border-slate-300">${b.grade}</td>
      <td class="p-2 border border-slate-300">${b.subject} (${b.series})</td>
      <td class="p-2 border border-slate-300 font-black text-emerald-800">${b.price} ج.م</td>
    </tr>
  `).join("");

  reportArea.classList.remove("hidden");
  window.print();
  setTimeout(() => {
    reportArea.classList.add("hidden");
  }, 1000);
}

// =========================================================================
// 11. نافذة الإشعار السريع (Toast Notification Utility)
// =========================================================================
function showToastNotification(msg) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "fixed top-14 inset-x-4 max-w-sm mx-auto z-50 bg-slate-900/95 text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 transform transition-all duration-300 -translate-y-10 opacity-0 pointer-events-none";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i><span>${msg}</span>`;
  toast.classList.remove("-translate-y-10", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-10", "opacity-0");
  }, 3000);
}

// =========================================================================
// 12. ربط الأحداث وتشغيل التطبيق (DOM Content Loaded)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. تحميل الحالة والبيانات
  loadInitialState();
  initializeFirebase();
  renderAnnouncementBanner();
  populateDropdownFilters();
  renderCatalogGrid();
  updateCartBadges();
  updatePrintCalculator();

  // 2. إعداد مشغل الدخول الإداري الخفي
  setupHiddenAdminTrigger();

  // 3. ربط أحداث الفلاتر الثلاثية
  document.getElementById("stageSelect")?.addEventListener("change", () => {
    populateDropdownFilters();
    renderCatalogGrid();
  });

  document.getElementById("gradeSelect")?.addEventListener("change", () => {
    populateDropdownFilters();
    renderCatalogGrid();
  });

  document.getElementById("subjectSelect")?.addEventListener("change", () => {
    renderCatalogGrid();
  });

  document.getElementById("resetFiltersBtn")?.addEventListener("click", () => {
    document.getElementById("stageSelect").value = "all";
    selectedSeriesFilter = "all";
    document.querySelectorAll(".series-tag").forEach(b => {
      b.classList.remove("active", "bg-brand-navy", "text-white");
      b.classList.add("bg-slate-100", "text-slate-700");
    });
    const firstSeries = document.querySelector(".series-tag[data-series='all']");
    if (firstSeries) {
      firstSeries.classList.add("active", "bg-brand-navy", "text-white");
    }
    populateDropdownFilters();
    renderCatalogGrid();
  });

  document.getElementById("resetFromNoticeBtn")?.addEventListener("click", () => {
    document.getElementById("resetFiltersBtn")?.click();
  });

  // فلاتر السلاسل السريعة
  document.querySelectorAll(".series-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".series-tag").forEach(b => {
        b.classList.remove("active", "bg-brand-navy", "text-white");
        b.classList.add("bg-slate-100", "text-slate-700");
      });
      btn.classList.add("active", "bg-brand-navy", "text-white");
      btn.classList.remove("bg-slate-100", "text-slate-700");

      selectedSeriesFilter = btn.dataset.series || "all";
      renderCatalogGrid();
    });
  });

  // 4. أزرار السلة (Smart Cart Modal)
  document.getElementById("openCartBtn")?.addEventListener("click", () => {
    document.getElementById("cartDrawer")?.classList.remove("hidden");
    renderCartDrawer();
  });

  document.getElementById("closeCartBtn")?.addEventListener("click", () => {
    document.getElementById("cartDrawer")?.classList.add("hidden");
  });

  document.getElementById("browseBooksFromCartBtn")?.addEventListener("click", () => {
    document.getElementById("cartDrawer")?.classList.add("hidden");
  });

  document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    if (confirm("هل ترغب حقاً في إفراغ سلة الطلبات؟")) {
      clearCart();
    }
  });

  document.getElementById("checkoutWhatsAppBtn")?.addEventListener("click", sendCartOrderWhatsApp);

  // 5. نافذة خدمة اطبع مذكرتك (Print Modal)
  const openPrint = () => {
    document.getElementById("printModal")?.classList.remove("hidden");
    updatePrintCalculator();
  };

  document.getElementById("openPrintModalBtn")?.addEventListener("click", openPrint);
  document.getElementById("heroPrintBtn")?.addEventListener("click", openPrint);
  document.getElementById("navBottomPrint")?.addEventListener("click", openPrint);

  document.getElementById("closePrintModalBtn")?.addEventListener("click", () => {
    document.getElementById("printModal")?.classList.add("hidden");
  });

  // تغيير قيم حاسبة الطباعة
  ["calcPagesCount", "calcCopiesCount", "calcColorType", "calcBindingType"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", updatePrintCalculator);
    document.getElementById(id)?.addEventListener("change", updatePrintCalculator);
  });

  // اختيار الملف
  document.getElementById("printDocInput")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const display = document.getElementById("selectedFileNameDisplay");
    if (file && display) {
      display.textContent = `تم اختيار: ${file.name} (${(file.size / 1024).toFixed(1)} كيلوبايت)`;
    }
  });

  document.getElementById("sendPrintOrderWhatsAppBtn")?.addEventListener("click", sendPrintOrderWhatsApp);

  // 6. أحداث نافذة تسجيل الدخول الإداري
  document.getElementById("adminLoginForm")?.addEventListener("submit", handleAdminLogin);
  document.getElementById("closeAdminModalBtn")?.addEventListener("click", closeAdminModal);

  document.getElementById("togglePasswordVisibilityBtn")?.addEventListener("click", () => {
    const input = document.getElementById("adminPasswordInput");
    if (!input) return;
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  });

  // 7. أحداث شاشة لوحة الإدارة
  document.getElementById("adminLogoutBtn")?.addEventListener("click", handleAdminLogout);
  document.getElementById("adminBackToStoreBtn")?.addEventListener("click", hideAdminPanel);
  document.getElementById("adminGeneratePdfBtn")?.addEventListener("click", generatePrintablePriceReport);
  document.getElementById("adminSaveAllPricesBtn")?.addEventListener("click", saveAllPricesFromTable);
  document.getElementById("adminTableSearch")?.addEventListener("input", renderAdminPricesTable);

  document.getElementById("adminAddNewBookBtn")?.addEventListener("click", () => {
    document.getElementById("addNewBookModal")?.classList.remove("hidden");
  });

  document.getElementById("closeNewBookModalBtn")?.addEventListener("click", () => {
    document.getElementById("addNewBookModal")?.classList.add("hidden");
  });

  document.getElementById("addNewBookForm")?.addEventListener("submit", handleAddNewBook);
  document.getElementById("printingRatesForm")?.addEventListener("submit", handleSavePrintingRates);
  document.getElementById("announcementForm")?.addEventListener("submit", handleSaveAnnouncement);

  // تبديل تبويبات لوحة الإدارة
  document.querySelectorAll(".admin-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab-btn").forEach(b => {
        b.classList.remove("active", "bg-emerald-600", "text-white");
        b.classList.add("bg-slate-800", "text-slate-300");
      });
      btn.classList.add("active", "bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-800", "text-slate-300");

      const tab = btn.dataset.adminTab;
      document.getElementById("adminTabPrices")?.classList.toggle("hidden", tab !== "prices");
      document.getElementById("adminTabPrintingRates")?.classList.toggle("hidden", tab !== "printingRates");
      document.getElementById("adminTabAnnouncement")?.classList.toggle("hidden", tab !== "announcement");
    });
  });

  // 8. الشريط السفلي والشريط العلوي
  document.getElementById("navBottomBooks")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("navBottomCart")?.addEventListener("click", () => {
    document.getElementById("cartDrawer")?.classList.remove("hidden");
    renderCartDrawer();
  });

  document.getElementById("navRefreshBtn")?.addEventListener("click", () => {
    const icon = document.getElementById("refreshIcon");
    if (icon) icon.classList.add("fa-spin");
    setTimeout(() => {
      if (icon) icon.classList.remove("fa-spin");
      loadInitialState();
      renderCatalogGrid();
      showToastNotification("تم تحديث أسعار الكتب والمحتوى بنجاح!");
    }, 600);
  });

  document.getElementById("dismissBannerBtn")?.addEventListener("click", () => {
    document.getElementById("liveAnnouncementBanner")?.classList.add("hidden");
  });
});
