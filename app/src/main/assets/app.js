/**
 * =========================================================================
 * مكتبة نهر العلم - إدارة أ/ إيهاب (Nahr Al-Elm Library)
 * المحرك البرمجي المتكامل (الإصدار 2.0.0)
 * -------------------------------------------------------------------------
 * 1. إعدادات فايربيس (Firebase Realtime Database) في أعلى الملف
 * 2. بيانات أولية شاملة (Seed Data) لمنع ظهور المتجر فارغاً أبداً
 * 3. شريط البحث الفوري + الأقسام الستة + الفلاتر المشروطة (الكتب والسبلايز)
 * 4. عرض البطاقات المتجاوبة بالصور وقسم العروض والخصومات (Hot Deals)
 * 5. حاسبة طباعة المذكرات التلقائية باستخدام مكتبة PDF.js
 * 6. سلة الطلبات الذكية مع خيار الاستلام أو التوصيل للمنزل عبر الواتساب
 * 7. بوابة الدخول السرية (ضغط مطول 3 ثوانٍ) وحقن لوحة الإدارة ديناميكياً
 * =========================================================================
 */

// =========================================================================
// 1. إعدادات فايربيس (Firebase Realtime Database Configuration)
// قم بتعبئة بيانات مشروع Firebase الحقيقية هنا لتفعيل المزامنة السحابية الفورية
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

// رقم الواتساب المعتمد للمكتبة ومفاتيح التخزين المحلي ورابط التحميل المباشر للتطبيق
const STORE_WHATSAPP_NUMBER = "201002968331";
const STORE_PUBLIC_URL = "https://masarik-tourism.github.io/Nahr-Al-Elm-Library/";
const CDN_APK_DOWNLOAD_URL =
  "https://masarik-tourism.github.io/Nahr-Al-Elm-Library/Nahr-Al-Elm-Library.apk";
const RELEASE_APK_DOWNLOAD_URL =
  "https://github.com/masarik-tourism/Nahr-Al-Elm-Library/releases/latest/download/Nahr-Al-Elm-Library.apk";
const DIRECT_APK_DOWNLOAD_URL = RELEASE_APK_DOWNLOAD_URL;
let activeApkDownloadUrl = RELEASE_APK_DOWNLOAD_URL;
let activeApkIsSameOriginCdn = false;
const STORAGE_KEYS = {
  BOOKS: "nahralelm_books_v2",
  RATES: "nahralelm_print_rates_v2",
  BANNER: "nahralelm_announcement_v2",
  SETTINGS: "nahralelm_store_settings_v2",
  CART: "nahralelm_cart_v2"
};

// =========================================================================
// 2. البيانات الأولية المدمجة (Seed Data)
// تظهر تلقائياً إذا كانت قاعدة بيانات Firebase فارغة أو غير متصلة
// =========================================================================
const DEFAULT_BOOKS = [
  // ---------------- الكتب الخارجية (books) ----------------
  {
    id: "bk-01",
    title: "كتاب سلاح التلميذ - اللغة العربية",
    category: "books",
    stage: "ابتدائي",
    grade: "الصف الرابع الابتدائي",
    subject: "لغة عربية",
    series: "سلاح التلميذ",
    price: 155,
    originalPrice: 175,
    stock: "متوفر بالمكتبة",
    badge: "الأكثر طلباً",
    imageUrl: "",
    isHotDeal: false,
    clicks: 64
  },
  {
    id: "bk-02",
    title: "كتاب سلاح التلميذ - الرياضيات",
    category: "books",
    stage: "ابتدائي",
    grade: "الصف السادس الابتدائي",
    subject: "رياضيات",
    series: "سلاح التلميذ",
    price: 165,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "الشهادة الابتدائية",
    imageUrl: "",
    isHotDeal: false,
    clicks: 52
  },
  {
    id: "bk-03",
    title: "كتاب الأضواء - اللغة العربية",
    category: "books",
    stage: "ابتدائي",
    grade: "الصف الخامس الابتدائي",
    subject: "لغة عربية",
    series: "الأضواء",
    price: 160,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "معتمد",
    imageUrl: "",
    isHotDeal: false,
    clicks: 41
  },
  {
    id: "bk-04",
    title: "كتاب المعاصر - الرياضيات (Math)",
    category: "books",
    stage: "إعدادي",
    grade: "الصف الثالث الإعدادي",
    subject: "رياضيات",
    series: "المعاصر",
    price: 190,
    originalPrice: 210,
    stock: "متوفر بالمكتبة",
    badge: "جبر وهندسة",
    imageUrl: "",
    isHotDeal: false,
    clicks: 79
  },
  {
    id: "bk-05",
    title: "كتاب الامتحان - اللغة العربية",
    category: "books",
    stage: "إعدادي",
    grade: "الصف الثالث الإعدادي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 185,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "شهادة إعدادية",
    imageUrl: "",
    isHotDeal: false,
    clicks: 85
  },
  {
    id: "bk-06",
    title: "كتاب الامتحان - العلوم المتكاملة",
    category: "books",
    stage: "إعدادي",
    grade: "الصف الأول الإعدادي",
    subject: "علوم",
    series: "الامتحان",
    price: 170,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "منهج مطور",
    imageUrl: "",
    isHotDeal: false,
    clicks: 48
  },
  {
    id: "bk-07",
    title: "كتاب المعاصر - اللغة الإنجليزية (New Hello)",
    category: "books",
    stage: "إعدادي",
    grade: "الصف الثاني الإعدادي",
    subject: "لغة إنجليزية",
    series: "المعاصر",
    price: 175,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "شامل المراجعة",
    imageUrl: "",
    isHotDeal: false,
    clicks: 39
  },
  {
    id: "bk-08",
    title: "كتاب الامتحان - اللغة العربية (الثانوية العامة)",
    category: "books",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "لغة عربية",
    series: "الامتحان",
    price: 240,
    originalPrice: 265,
    stock: "متوفر كميات",
    badge: "ثانوية عامة",
    imageUrl: "",
    isHotDeal: false,
    clicks: 98
  },
  {
    id: "bk-09",
    title: "كتاب نيوتن في الفيزياء (شرح وبنك أسئلة)",
    category: "books",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "فيزياء",
    series: "نيوتن",
    price: 230,
    originalPrice: null,
    stock: "متوفر كميات",
    badge: "الأقوى بالفيزياء",
    imageUrl: "",
    isHotDeal: false,
    clicks: 112
  },
  {
    id: "bk-10",
    title: "كتاب الوافي في الكيمياء",
    category: "books",
    stage: "ثانوي",
    grade: "الصف الثالث الثانوي",
    subject: "كيمياء",
    series: "الوافي",
    price: 220,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "تالتة ثانوي",
    imageUrl: "",
    isHotDeal: false,
    clicks: 73
  },

  // ---------------- باكدجات السبلايز (supplies) - عروض وخصومات ----------------
  {
    id: "sup-01",
    title: "باكدج سبلايز كي جي المتكامل (KG1 & KG2)",
    category: "supplies",
    stage: "كي جي",
    grade: "رياض الأطفال (KG)",
    subject: "تأسيس وأنشطة",
    contents: "8 كراسات مربعات و9 أسطر + أقلام رصاص مثلثية + ألوان شمع 12 لون + صلصال آمن + صمغ ومقلمة قماش",
    series: "عروض نهر العلم",
    price: 295,
    originalPrice: 360,
    stock: "متوفر بالمكتبة",
    badge: "خصم 18%",
    imageUrl: "",
    isHotDeal: true,
    clicks: 91
  },
  {
    id: "sup-02",
    title: "باكدج السبلايز الذهبي للمرحلة الابتدائية",
    category: "supplies",
    stage: "ابتدائي",
    grade: "من الأول إلى السادس الابتدائي",
    subject: "كافة المواد",
    contents: "12 كراسة مسطرة 28 ورقة + 6 أقلام جاف ورصاص + علبة ألوان خشب + طقم هندسة + جلاد شفاف وتيكيت",
    series: "عروض نهر العلم",
    price: 340,
    originalPrice: 420,
    stock: "متوفر بالمكتبة",
    badge: "عرض توفير 19%",
    imageUrl: "",
    isHotDeal: true,
    clicks: 105
  },
  {
    id: "sup-03",
    title: "باكدج سبلايز المرحلة الإعدادية المتكامل",
    category: "supplies",
    stage: "إعدادي",
    grade: "من الأول إلى الثالث الإعدادي",
    subject: "مجموعة متكاملة",
    contents: "6 كشاكيل سلك 100 ورقة + 5 كراسات رسم ومربعات + علبة أقلام جاف + طقم هندسة معدني + هايلايتر",
    series: "عروض نهر العلم",
    price: 385,
    originalPrice: 460,
    stock: "متوفر بالمكتبة",
    badge: "خصم 16%",
    imageUrl: "",
    isHotDeal: true,
    clicks: 76
  },
  {
    id: "sup-04",
    title: "باكدج الثانوية العامة الشامل للتفوق",
    category: "supplies",
    stage: "ثانوي",
    grade: "المرحلة الثانوية",
    subject: "تنظيم ومذاكرة",
    contents: "8 كشاكيل سلك جامعية 140 ورقة + طقم أقلام سريعة الجفاف + 4 أقلام هايلايتر + ستيكي نوتس + فايلات تنظيم",
    series: "عروض نهر العلم",
    price: 425,
    originalPrice: 510,
    stock: "كمية محدودة",
    badge: "الأكثر مبيعاً",
    imageUrl: "",
    isHotDeal: true,
    clicks: 84
  },

  // ---------------- الأدوات المكتبية والكراريس (stationery) ----------------
  {
    id: "st-01",
    title: "دسته كراسات مسطرة 28 ورقة (10 كراسات) ورق فاخر",
    category: "stationery",
    stage: "عام",
    grade: "جميع المراحل",
    subject: "كراريس",
    series: "نهر العلم",
    price: 85,
    originalPrice: 100,
    stock: "متوفر بالمكتبة",
    badge: "عرض الدستة",
    imageUrl: "",
    isHotDeal: true,
    clicks: 59
  },
  {
    id: "st-02",
    title: "كشكول سلك 100 ورقة مسطر غلاف مقوى (مجموعة 5 قطع)",
    category: "stationery",
    stage: "عام",
    grade: "إعدادي وثانوي",
    subject: "كشاكيل",
    series: "برافو",
    price: 120,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "خامة ممتازة",
    imageUrl: "",
    isHotDeal: false,
    clicks: 47
  },
  {
    id: "st-03",
    title: "علبة أقلام جاف أزرق سريعة الجفاف (12 قلم)",
    category: "stationery",
    stage: "عام",
    grade: "جميع المراحل",
    subject: "أقلام",
    series: "روتو / بريما",
    price: 60,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "خط ناعم",
    imageUrl: "",
    isHotDeal: false,
    clicks: 66
  },
  {
    id: "st-04",
    title: "طقم أدوات هندسية معدني كامل مع برجل دقيق",
    category: "stationery",
    stage: "عام",
    grade: "ابتدائي وإعدادي",
    subject: "أدوات هندسية",
    series: "مابل / ديلي",
    price: 75,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "مقاوم للكسر",
    imageUrl: "",
    isHotDeal: false,
    clicks: 43
  },
  {
    id: "st-05",
    title: "علبة ألوان فلوماستر وألوان خشب 24 لون قابلة للغسل",
    category: "stationery",
    stage: "عام",
    grade: "كي جي وابتدائي",
    subject: "رسم وفنون",
    series: "فابر كاستل",
    price: 110,
    originalPrice: 130,
    stock: "متوفر بالمكتبة",
    badge: "آمن للأطفال",
    imageUrl: "",
    isHotDeal: false,
    clicks: 38
  },
  {
    id: "st-06",
    title: "رزمة ورق تصوير A4 أبيض ناصع 80 جرام (500 ورقة)",
    category: "stationery",
    stage: "عام",
    grade: "مكاتب ومنازل",
    subject: "ورق طباعة",
    series: "إكسترا",
    price: 195,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "جودة عالية",
    imageUrl: "",
    isHotDeal: false,
    clicks: 54
  },

  // ---------------- الهدايا والألعاب (gifts) ----------------
  {
    id: "gf-01",
    title: "لعبة مكعبات الذكاء الهندسية لتنمية مهارات الطفل (100 قطعة)",
    category: "gifts",
    stage: "عام",
    grade: "من 3 إلى 10 سنوات",
    subject: "تنمية مهارات",
    series: "ألعاب ذكاء",
    price: 185,
    originalPrice: 220,
    stock: "متوفر بالمكتبة",
    badge: "هدية تعليمية",
    imageUrl: "",
    isHotDeal: true,
    clicks: 62
  },
  {
    id: "gf-02",
    title: "سبورة تعليمية ذكية مزدوجة (مغناطيسية + طباشير) مع الحروف",
    category: "gifts",
    stage: "عام",
    grade: "كي جي وابتدائي",
    subject: "تعليم مرح",
    series: "نهر العلم",
    price: 210,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "شامل الحروف",
    imageUrl: "",
    isHotDeal: false,
    clicks: 49
  },
  {
    id: "gf-03",
    title: "بوكس هدايا التفوق والنجاح (مج مطبوع + نوت بوك + قلم فخم)",
    category: "gifts",
    stage: "عام",
    grade: "للمتفوقين",
    subject: "هدايا مناسبات",
    series: "هدايا نهر العلم",
    price: 190,
    originalPrice: 230,
    stock: "متوفر بالمكتبة",
    badge: "تغليف فاخر",
    imageUrl: "",
    isHotDeal: true,
    clicks: 57
  },
  {
    id: "gf-04",
    title: "بازل خشبي تعليمي للحروف العربية والأرقام والأشكال",
    category: "gifts",
    stage: "عام",
    grade: "مرحلة التأسيس",
    subject: "ألعاب خشبية",
    series: "ألعاب ذكاء",
    price: 95,
    originalPrice: null,
    stock: "متوفر بالمكتبة",
    badge: "خشب آمن",
    imageUrl: "",
    isHotDeal: false,
    clicks: 35
  },

  // ---------------- خدمات الطباعة (printing) ----------------
  {
    id: "pr-01",
    title: "باقة طباعة مذكرة كاملة (حتى 100 صفحة ليزر + تغليف سلك حديد)",
    category: "printing",
    stage: "عام",
    grade: "كافة المراحل",
    subject: "طباعة وتغليف",
    series: "مطبعة نهر العلم",
    price: 90,
    originalPrice: 105,
    stock: "تسليم فوري",
    badge: "عرض المذكرات",
    imageUrl: "",
    isHotDeal: true,
    clicks: 74
  },
  {
    id: "pr-02",
    title: "باقة طباعة أبحاث ولوحات ألوان عالية الجودة (20 صفحة + كعب بلاستيك)",
    category: "printing",
    stage: "عام",
    grade: "طلاب وجامعات",
    subject: "طباعة ألوان",
    series: "مطبعة نهر العلم",
    price: 60,
    originalPrice: null,
    stock: "تسليم فوري",
    badge: "دقة فائقة",
    imageUrl: "",
    isHotDeal: false,
    clicks: 42
  }
];

// تسعيرة الطباعة والتوصيل الافتراضية
const DEFAULT_PRINT_RATES = {
  bwPage: 0.75,
  colorPage: 2.50,
  bindingStaple: 3.00,
  bindingPlastic: 15.00,
  bindingWire: 25.00,
  deliveryFee: 20.00
};

// إعلان الشريط العلوي الافتراضي
const DEFAULT_ANNOUNCEMENT = {
  text: "أهلاً بكم في مكتبة نهر العلم (إدارة أ/ إيهاب) - كافة الكتب الخارجية وباكدجات السبلايز متوفرة الآن بأسعار محدثة وخصومات بداية العام.",
  badge: "عروض العام الجديد",
  bannerImageUrl: "",
  active: true
};

// إعدادات التواصل وعنوان المكتبة وخريطة جوجل الافتراضية
const DEFAULT_STORE_SETTINGS = {
  primaryWhatsapp: "01002968331",
  secondaryWhatsapp: "01157706887",
  address: "شارع المدرسة الرئيسي - بجوار المدارس (استلام وتجهيز مسبق يومياً)",
  mapsUrl: "https://maps.google.com/?q=%D9%85%D9%83%D8%AA%D8%A8%D8%A9+%D9%86%D9%87%D8%B1+%D8%A7%D9%84%D8%B9%D9%84%D9%85"
};

// تسميات الأقسام بالعربية
const CATEGORY_TITLES = {
  all: "جميع منتجات وخدمات مكتبة نهر العلم",
  books: "الكتب الخارجية المعتمدة",
  stationery: "الأدوات المكتبية والكراريس",
  supplies: "باكدجات السبلايز المدرسية",
  gifts: "الهدايا وألعاب تنمية المهارات",
  printing: "خدمات الطباعة والتصوير الفوري"
};

// =========================================================================
// 3. إدارة الحالة الداخلية للتطبيق (Application State)
// =========================================================================
let currentBooks = [];
let currentPrintRates = { ...DEFAULT_PRINT_RATES };
let currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT };
let currentStoreSettings = { ...DEFAULT_STORE_SETTINGS };
let cartItems = [];
let activeCategory = "all";
let searchQuery = "";
let firebaseDb = null;
let deferredInstallPrompt = null;
let failedLoginAttempts = 0;
let isAdminAuthenticated = false;
let activeAdminProfile = "";
let isCloudSyncLoading = false;

function getWhatsAppInternational(rawNumber) {
  const digits = String(rawNumber || "").replace(/\D/g, "");
  if (!digits) return STORE_WHATSAPP_NUMBER;
  if (digits.startsWith("20") && digits.length >= 12) return digits;
  if (digits.startsWith("0")) return `2${digits}`;
  return digits;
}

function getStoreWhatsAppNumber() {
  return getWhatsAppInternational(currentStoreSettings.primaryWhatsapp || STORE_WHATSAPP_NUMBER);
}

// =========================================================================
// 4. دوال الأمان والتشفير والتحقق الإداري الخفي
// =========================================================================
const _A_H = "0ae35671515b2138c71e24c2726005def772b17f3ab02568b4b586f554babeb4";
const _P_LIST = [
  "Mohamed Youssef",
  "programmer Mohamed Youssef",
  "programmer Mohamed Hassan",
  "Ghala Mohamed Youssef"
];

// دالة SHA-256 تدعم Web Crypto وتضم بديلاً نقياً لبيئات HTTP المحلية
async function computeSha256(message) {
  if (window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (_) {
      // المتابعة للبديل البرمجي
    }
  }
  return pureJsSha256(message);
}

function pureJsSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = "length";
  let i, j;
  let result = "";
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  let hash = (pureJsSha256.h = pureJsSha256.h || []);
  const k = (pureJsSha256.k = pureJsSha256.k || []);
  let primeCounter = k[lengthProperty];
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += "\x80";
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00";
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return "";
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;
  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
}

// =========================================================================
// 5. توليد صور المنتجات الافتراضية الأنيقة (Fallback Thumbnails)
// =========================================================================
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const fallbackSvgCache = new Map();

function getFallbackThumbnailSvg(item) {
  const paletteMap = {
    books: { bg1: "#0A2540", bg2: "#1E3A8A", accent: "#10B981", label: "كتاب خارجي" },
    stationery: { bg1: "#78350F", bg2: "#D97706", accent: "#FDE68A", label: "أدوات مكتبية" },
    supplies: { bg1: "#881337", bg2: "#E11D48", accent: "#FBBF24", label: "باكدج سبلايز" },
    gifts: { bg1: "#4C1D95", bg2: "#7C3AED", accent: "#F472B6", label: "هدايا وألعاب" },
    printing: { bg1: "#0C4A6E", bg2: "#0284C7", accent: "#38BDF8", label: "خدمة طباعة" }
  };

  const category = item.category || "books";
  const theme = paletteMap[category] || paletteMap.books;
  const tagText = (item.series || theme.label).slice(0, 18);
  const cacheKey = `${category}::${tagText}`;
  if (fallbackSvgCache.has(cacheKey)) {
    return fallbackSvgCache.get(cacheKey);
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.bg1}" />
          <stop offset="100%" stop-color="${theme.bg2}" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#g)" />
      <circle cx="340" cy="45" r="70" fill="${theme.accent}" fill-opacity="0.14" />
      <circle cx="55" cy="235" r="85" fill="#ffffff" fill-opacity="0.08" />
      <rect x="135" y="55" width="130" height="105" rx="18" fill="#ffffff" fill-opacity="0.14" stroke="${theme.accent}" stroke-opacity="0.5" stroke-width="2" />
      <path d="M168 85h64v10h-64zm0 22h64v8h-64zm0 20h42v8h-42z" fill="#ffffff" fill-opacity="0.9" />
      <text x="200" y="202" text-anchor="middle" fill="#ffffff" font-family="Cairo, Arial, sans-serif" font-size="22" font-weight="bold">${tagText}</text>
      <text x="200" y="232" text-anchor="middle" fill="${theme.accent}" font-family="Cairo, Arial, sans-serif" font-size="14" font-weight="bold">مكتبة نهر العلم</text>
    </svg>
  `.trim();

  const encoded = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  fallbackSvgCache.set(cacheKey, encoded);
  return encoded;
}

function resolveProductImage(item) {
  if (item.imageUrl && item.imageUrl.trim() !== "") {
    return item.imageUrl.trim();
  }
  return getFallbackThumbnailSvg(item);
}

// =========================================================================
// 6. تهيئة Firebase Realtime Database والمزامنة اللحظية
// =========================================================================
function initializeFirebase() {
  try {
    const hasValidConfig =
      typeof firebase !== "undefined" &&
      firebaseConfig &&
      firebaseConfig.apiKey &&
      !firebaseConfig.apiKey.includes("YOUR_API_KEY") &&
      firebaseConfig.databaseURL;

    if (hasValidConfig) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firebaseDb = firebase.database();
      isCloudSyncLoading = true;
      updateSyncStatusUI("جاري المزامنة...", true);
      listenToFirebaseUpdates();
      setTimeout(() => {
        if (isCloudSyncLoading) {
          isCloudSyncLoading = false;
          renderCatalogGrid();
        }
      }, 4500);
    } else {
      isCloudSyncLoading = false;
      updateSyncStatusUI("أسعار محدثة", true);
    }
  } catch (err) {
    isCloudSyncLoading = false;
    console.warn("Firebase offline fallback active:", err.message);
    updateSyncStatusUI("وضع محلي نشط", false);
  }
}

function updateSyncStatusUI(label, isConnected) {
  const statusEl = document.getElementById("syncStatusText");
  const adminStatEl = document.getElementById("statFirebaseStatus");
  if (statusEl) statusEl.textContent = label;
  if (adminStatEl) adminStatEl.textContent = isConnected ? "Firebase Live Sync" : "Local Cache Active";
}

function normalizeProductItem(raw, fallbackKey) {
  if (!raw || typeof raw !== "object") return null;
  const title = String(raw.title || "").trim();
  if (!title) return null;

  const validCats = ["books", "stationery", "supplies", "gifts", "printing"];
  const category = validCats.includes(raw.category) ? raw.category : "books";
  const price = Number(raw.price);
  const originalPrice = raw.originalPrice !== null && raw.originalPrice !== undefined && raw.originalPrice !== ""
    ? Number(raw.originalPrice)
    : null;

  return {
    id: String(raw.id || fallbackKey || `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
    title,
    category,
    stage: String(raw.stage || (category === "books" || category === "supplies" ? "ابتدائي" : "عام")).trim(),
    grade: String(raw.grade || (category === "books" || category === "supplies" ? "جميع الصفوف" : "جميع المراحل")).trim(),
    subject: String(raw.subject || (category === "supplies" ? "باكدج متكامل" : "عام")).trim(),
    contents: String(raw.contents || (category === "supplies" ? raw.subject || "" : "")).trim(),
    series: String(raw.series || "مكتبة نهر العلم").trim(),
    price: !isNaN(price) && price >= 0 ? price : 0,
    originalPrice: originalPrice !== null && !isNaN(originalPrice) && originalPrice > price ? originalPrice : null,
    stock: String(raw.stock || "متوفر").trim(),
    badge: String(raw.badge || "").trim(),
    imageUrl: String(raw.imageUrl || "").trim(),
    isHotDeal: Boolean(raw.isHotDeal || (originalPrice && originalPrice > price)),
    clicks: Number(raw.clicks) || 0
  };
}

function normalizeFirebaseBooks(rawData) {
  if (!rawData) return [];
  if (Array.isArray(rawData)) {
    return rawData
      .map((item, idx) => normalizeProductItem(item, `item-${idx}`))
      .filter(Boolean);
  }
  if (typeof rawData === "object") {
    return Object.entries(rawData)
      .map(([key, item]) => normalizeProductItem(item, key))
      .filter(Boolean);
  }
  return [];
}

function listenToFirebaseUpdates() {
  if (!firebaseDb) return;

  firebaseDb.ref("books").on(
    "value",
    (snapshot) => {
      isCloudSyncLoading = false;
      updateSyncStatusUI("متصل سحابياً", true);
      const incoming = normalizeFirebaseBooks(snapshot.val());
      if (incoming.length > 0) {
        currentBooks = incoming;
        localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(currentBooks));
        refreshStorefrontViews();
      } else {
        // في حال كانت قاعدة البيانات فارغة، نحقن البيانات الأولية تلقائياً ونرفعها لـ Firebase
        currentBooks = DEFAULT_BOOKS.map((b) => ({ ...b }));
        localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(currentBooks));
        firebaseDb.ref("books").set(currentBooks).catch(() => {});
        refreshStorefrontViews();
      }
    },
    () => {
      isCloudSyncLoading = false;
      updateSyncStatusUI("وضع محلي نشط", false);
      renderCatalogGrid();
    }
  );

  firebaseDb.ref("printRates").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && typeof data === "object") {
      currentPrintRates = { ...DEFAULT_PRINT_RATES, ...data };
      localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(currentPrintRates));
      updatePrintCalculator();
      renderCartDrawer();
      if (isAdminAuthenticated) populatePrintingRatesForm();
    } else {
      firebaseDb.ref("printRates").set(currentPrintRates).catch(() => {});
    }
  });

  firebaseDb.ref("announcement").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && typeof data === "object") {
      currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT, ...data };
      localStorage.setItem(STORAGE_KEYS.BANNER, JSON.stringify(currentAnnouncement));
      renderAnnouncementBanner();
      if (isAdminAuthenticated) {
        populateAnnouncementForm();
        updateAdminStats();
      }
    } else {
      firebaseDb.ref("announcement").set(currentAnnouncement).catch(() => {});
    }
  });

  firebaseDb.ref("storeSettings").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && typeof data === "object") {
      currentStoreSettings = { ...DEFAULT_STORE_SETTINGS, ...data };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(currentStoreSettings));
      applyStoreSettingsToPublicUI();
      if (isAdminAuthenticated) populateStoreSettingsForm();
    } else {
      firebaseDb.ref("storeSettings").set(currentStoreSettings).catch(() => {});
    }
  });
}

function persistBooksData() {
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(currentBooks));
  if (firebaseDb) {
    firebaseDb.ref("books").set(currentBooks).catch((err) => console.warn("Sync warning:", err));
  }
}

function persistPrintRates() {
  localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(currentPrintRates));
  if (firebaseDb) {
    firebaseDb.ref("printRates").set(currentPrintRates).catch((err) => console.warn("Sync warning:", err));
  }
}

function persistAnnouncement() {
  localStorage.setItem(STORAGE_KEYS.BANNER, JSON.stringify(currentAnnouncement));
  if (firebaseDb) {
    firebaseDb.ref("announcement").set(currentAnnouncement).catch((err) => console.warn("Sync warning:", err));
  }
}

function persistStoreSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(currentStoreSettings));
  if (firebaseDb) {
    firebaseDb.ref("storeSettings").set(currentStoreSettings).catch((err) => console.warn("Sync warning:", err));
  }
}

function applyStoreSettingsToPublicUI() {
  const primaryLocal = String(currentStoreSettings.primaryWhatsapp || DEFAULT_STORE_SETTINGS.primaryWhatsapp).trim();
  const secondaryLocal = String(currentStoreSettings.secondaryWhatsapp || DEFAULT_STORE_SETTINGS.secondaryWhatsapp).trim();
  const address = String(currentStoreSettings.address || DEFAULT_STORE_SETTINGS.address).trim();
  const mapsUrl = String(currentStoreSettings.mapsUrl || DEFAULT_STORE_SETTINGS.mapsUrl).trim();
  const intlWa = getStoreWhatsAppNumber();

  const phone1Link = document.getElementById("footerPhonePrimaryLink");
  const phone1Text = document.getElementById("footerPhonePrimaryText");
  if (phone1Link) phone1Link.setAttribute("href", `tel:${primaryLocal}`);
  if (phone1Text) phone1Text.textContent = primaryLocal;

  const phone2Link = document.getElementById("footerPhoneSecondaryLink");
  const phone2Text = document.getElementById("footerPhoneSecondaryText");
  if (phone2Link) phone2Link.setAttribute("href", `tel:${secondaryLocal}`);
  if (phone2Text) phone2Text.textContent = secondaryLocal;

  const addrEl = document.getElementById("storeAddressDisplay");
  if (addrEl) addrEl.textContent = address;

  const mapsBtn = document.getElementById("storeMapsLinkBtn");
  if (mapsBtn && mapsUrl) {
    mapsBtn.setAttribute("href", mapsUrl);
  }

  const floatingWa = document.getElementById("floatingWhatsAppBtn");
  if (floatingWa) {
    floatingWa.setAttribute(
      "href",
      `https://wa.me/${intlWa}?text=${encodeURIComponent("مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)، لدي استفسار سريع.")}`
    );
  }
}

function loadInitialState() {
  try {
    const savedBooks = localStorage.getItem(STORAGE_KEYS.BOOKS);
    const parsedBooks = savedBooks ? normalizeFirebaseBooks(JSON.parse(savedBooks)) : [];
    if (parsedBooks.length > 0) {
      currentBooks = parsedBooks;
    } else {
      currentBooks = DEFAULT_BOOKS.map((b) => ({ ...b }));
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(currentBooks));
    }
  } catch (_) {
    currentBooks = DEFAULT_BOOKS.map((b) => ({ ...b }));
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(currentBooks));
    } catch (__) {}
  }

  try {
    const savedRates = localStorage.getItem(STORAGE_KEYS.RATES);
    currentPrintRates = savedRates ? { ...DEFAULT_PRINT_RATES, ...JSON.parse(savedRates) } : { ...DEFAULT_PRINT_RATES };
  } catch (_) {
    currentPrintRates = { ...DEFAULT_PRINT_RATES };
  }

  try {
    const savedBanner = localStorage.getItem(STORAGE_KEYS.BANNER);
    currentAnnouncement = savedBanner ? { ...DEFAULT_ANNOUNCEMENT, ...JSON.parse(savedBanner) } : { ...DEFAULT_ANNOUNCEMENT };
  } catch (_) {
    currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT };
  }

  try {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    currentStoreSettings = savedSettings ? { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(savedSettings) } : { ...DEFAULT_STORE_SETTINGS };
  } catch (_) {
    currentStoreSettings = { ...DEFAULT_STORE_SETTINGS };
  }

  try {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    cartItems = Array.isArray(parsedCart) ? parsedCart : [];
  } catch (_) {
    cartItems = [];
  }
}

// =========================================================================
// 7. نظام الأقسام الرئيسية + الفلاتر المشروطة + البحث الفوري
// =========================================================================
function toggleEducationalFiltersVisibility() {
  const filtersPanel = document.getElementById("educationalFiltersPanel");
  const printingBanner = document.getElementById("printingTabBanner");
  const sectionHeading = document.getElementById("activeSectionHeading");

  if (filtersPanel) {
    const shouldShowFilters =
      activeCategory === "all" || activeCategory === "books" || activeCategory === "supplies";
    filtersPanel.classList.toggle("hidden", !shouldShowFilters);
    filtersPanel.style.display = shouldShowFilters ? "block" : "none";
  }

  if (printingBanner) {
    printingBanner.classList.toggle("hidden", activeCategory !== "printing");
  }

  if (sectionHeading) {
    sectionHeading.textContent = CATEGORY_TITLES[activeCategory] || CATEGORY_TITLES.all;
  }
}

function populateDropdownFilters() {
  const stageSelect = document.getElementById("stageSelect");
  const gradeSelect = document.getElementById("gradeSelect");
  const subjectSelect = document.getElementById("subjectSelect");
  const publisherSelect = document.getElementById("publisherSelect");

  if (!stageSelect || !gradeSelect || !subjectSelect || !publisherSelect) return;

  // الاعتماد على الكتب أو باكدجات السبلايز حسب التبويب النشط
  let pool = currentBooks.filter((b) =>
    activeCategory === "books" || activeCategory === "supplies"
      ? b.category === activeCategory
      : b.category === "books" || b.category === "supplies"
  );

  const selectedStage = stageSelect.value;
  if (selectedStage !== "all") {
    pool = pool.filter((b) => b.stage === selectedStage);
  }

  // تعبئة الصفوف الدراسية ديناميكياً حسب المرحلة المختارة
  const grades = Array.from(new Set(pool.map((b) => b.grade))).filter(Boolean);
  const prevGrade = gradeSelect.value;
  const nextGrade = grades.includes(prevGrade) ? prevGrade : "all";
  gradeSelect.innerHTML = `<option value="all">كافة الصفوف (${grades.length})</option>`;
  grades.forEach((grade) => {
    const opt = document.createElement("option");
    opt.value = grade;
    opt.textContent = grade;
    if (grade === nextGrade) opt.selected = true;
    gradeSelect.appendChild(opt);
  });
  gradeSelect.value = nextGrade;

  let subjectPool = pool;
  if (nextGrade !== "all") {
    subjectPool = pool.filter((b) => b.grade === nextGrade);
  }

  // تعبئة المواد ديناميكياً حسب المرحلة والصف المختار
  const subjects = Array.from(new Set(subjectPool.map((b) => b.subject))).filter(Boolean);
  const prevSubject = subjectSelect.value;
  const nextSubject = subjects.includes(prevSubject) ? prevSubject : "all";
  subjectSelect.innerHTML = `<option value="all">كافة المواد (${subjects.length})</option>`;
  subjects.forEach((subject) => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    if (subject === nextSubject) opt.selected = true;
    subjectSelect.appendChild(opt);
  });
  subjectSelect.value = nextSubject;

  // تعبئة دور النشر / السلاسل ديناميكياً
  const publishers = Array.from(new Set(subjectPool.map((b) => b.series))).filter(Boolean);
  const prevPublisher = publisherSelect.value;
  const nextPublisher = publishers.includes(prevPublisher) ? prevPublisher : "all";
  publisherSelect.innerHTML = `<option value="all">كافة دور النشر (${publishers.length})</option>`;
  publishers.forEach((pub) => {
    const opt = document.createElement("option");
    opt.value = pub;
    opt.textContent = pub;
    if (pub === nextPublisher) opt.selected = true;
    publisherSelect.appendChild(opt);
  });
  publisherSelect.value = nextPublisher;
}

function getFilteredProducts() {
  if (!Array.isArray(currentBooks) || (currentBooks.length === 0 && !isCloudSyncLoading)) {
    currentBooks = DEFAULT_BOOKS.map((b) => ({ ...b }));
  }

  const stage = document.getElementById("stageSelect")?.value || "all";
  const grade = document.getElementById("gradeSelect")?.value || "all";
  const subject = document.getElementById("subjectSelect")?.value || "all";
  const publisher = document.getElementById("publisherSelect")?.value || "all";
  const query = searchQuery.toLowerCase().trim();

  const useEduFilters =
    activeCategory === "all" || activeCategory === "books" || activeCategory === "supplies";

  return currentBooks.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    if (!matchCategory) return false;

    if (useEduFilters) {
      if (stage !== "all" && item.stage !== stage) return false;
      if (grade !== "all" && item.grade !== grade) return false;
      if (subject !== "all" && item.subject !== subject) return false;
      if (publisher !== "all" && item.series !== publisher) return false;
    }

    if (query) {
      const searchable = `${item.title} ${item.contents || ""} ${item.grade} ${item.subject} ${item.series} ${item.stage} ${item.badge || ""}`.toLowerCase();
      if (!searchable.includes(query)) return false;
    }

    return true;
  });
}

// =========================================================================
// 8. عرض قسم العروض والخصومات (Hot Deals) وشبكة البطاقات (Grid Cards)
// =========================================================================
function renderHotDeals() {
  const section = document.getElementById("hotDealsSection");
  const carousel = document.getElementById("hotDealsCarousel");
  if (!section || !carousel) return;

  const deals = currentBooks.filter((item) => item.isHotDeal || (item.originalPrice && item.originalPrice > item.price));

  if (deals.length === 0) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");
  carousel.innerHTML = deals
    .map((item) => {
      const hasDiscount = item.originalPrice && item.originalPrice > item.price;
      const discountPct = hasDiscount
        ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        : 0;
      const thumbUrl = resolveProductImage(item);
      const fallbackUrl = getFallbackThumbnailSvg(item);

      return `
        <div class="w-56 sm:w-64 shrink-0 bg-white rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
          <div class="relative aspect-[16/10] bg-slate-100 overflow-hidden">
            <img
              src="${escapeHtml(thumbUrl)}"
              alt="${escapeHtml(item.title)}"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null; this.src='${fallbackUrl}';"
              class="w-full h-full object-cover"
            />
            <span class="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
              ${discountPct > 0 ? `خصم ${discountPct}%` : escapeHtml(item.badge || "عرض خاص")}
            </span>
          </div>
          <div class="p-3 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <h4 class="text-xs font-black text-slate-900 line-clamp-2 leading-snug">${escapeHtml(item.title)}</h4>
              <p class="text-[10px] text-slate-500 font-semibold mt-0.5">${escapeHtml(item.grade)}</p>
            </div>
            <div>
              <div class="flex items-baseline gap-2 mb-2">
                <span class="text-sm font-black text-emerald-700">${item.price} ج.م</span>
                ${hasDiscount ? `<span class="text-[11px] text-slate-400 line-through">${item.originalPrice} ج.م</span>` : ""}
              </div>
              <button
                onclick="handleAddToCart('${escapeHtml(item.id)}')"
                class="app-tap-effect w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-[11px] py-1.5 px-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <i class="fa-solid fa-cart-plus"></i>
                <span>أضف للسلة</span>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderCatalogGrid() {
  const catalogGrid = document.getElementById("catalogGrid");
  const noResultsNotice = document.getElementById("noResultsNotice");
  const missingBookCtaBox = document.getElementById("missingBookCtaBox");
  const filteredItemsCount = document.getElementById("filteredItemsCount");
  const filteredItemsLoadingLabel = document.getElementById("filteredItemsLoadingLabel");
  const filteredItemsReadyLabel = document.getElementById("filteredItemsReadyLabel");
  if (!catalogGrid) return;

  const items = getFilteredProducts();
  const setNoResultsVisible = (visible) => {
    if (!noResultsNotice) return;
    noResultsNotice.classList.toggle("hidden", !visible);
    noResultsNotice.style.display = visible ? "block" : "none";
  };

  const setLoadingLabels = (loading) => {
    if (filteredItemsLoadingLabel) {
      filteredItemsLoadingLabel.classList.toggle("hidden", !loading);
      filteredItemsLoadingLabel.style.display = loading ? "inline" : "none";
    }
    if (filteredItemsReadyLabel) {
      filteredItemsReadyLabel.classList.toggle("hidden", loading);
      filteredItemsReadyLabel.style.display = loading ? "none" : "inline";
    }
  };

  if (isCloudSyncLoading && items.length === 0) {
    setLoadingLabels(true);
    setNoResultsVisible(false);
    if (missingBookCtaBox) missingBookCtaBox.classList.add("hidden");
    catalogGrid.innerHTML = `<div class="col-span-full bg-white rounded-2xl p-6 text-center border border-slate-200 text-xs font-bold text-slate-500"><i class="fa-solid fa-spinner fa-spin text-emerald-600 ml-1"></i> جاري تحميل منتجات المكتبة...</div>`;
    return;
  }

  setLoadingLabels(false);
  if (filteredItemsCount) filteredItemsCount.textContent = items.length;

  const hasUserFilter =
    Boolean(searchQuery.trim()) ||
    activeCategory !== "all" ||
    (document.getElementById("stageSelect")?.value || "all") !== "all" ||
    (document.getElementById("gradeSelect")?.value || "all") !== "all" ||
    (document.getElementById("subjectSelect")?.value || "all") !== "all" ||
    (document.getElementById("publisherSelect")?.value || "all") !== "all";

  if (items.length === 0) {
    catalogGrid.innerHTML = "";
    if (!isCloudSyncLoading && hasUserFilter) {
      setNoResultsVisible(true);
      if (missingBookCtaBox) missingBookCtaBox.classList.add("hidden");
    } else {
      setNoResultsVisible(false);
      if (missingBookCtaBox) missingBookCtaBox.classList.remove("hidden");
      catalogGrid.innerHTML = `<div class="col-span-full bg-white rounded-2xl p-6 text-center border border-slate-200 text-xs font-bold text-slate-500"><i class="fa-solid fa-spinner fa-spin text-emerald-600 ml-1"></i> جاري تحميل منتجات المكتبة...</div>`;
    }
    return;
  }

  setNoResultsVisible(false);
  if (missingBookCtaBox) missingBookCtaBox.classList.remove("hidden");

  catalogGrid.innerHTML = items
    .map((item) => {
      const inCartItem = cartItems.find((c) => c.id === item.id);
      const inCartQty = inCartItem ? inCartItem.quantity : 0;
      const thumbUrl = resolveProductImage(item);
      const fallbackUrl = getFallbackThumbnailSvg(item);
      const hasDiscount = item.originalPrice && item.originalPrice > item.price;
      const savingsAmount = hasDiscount ? Math.round(item.originalPrice - item.price) : 0;
      const stockText = item.stock || "متوفر";
      const isOutOfStock = stockText.includes("نفذت");
      const isLimited = stockText.includes("محدودة") || stockText.includes("تجهيز");
      const isSuppliesBundle = item.category === "supplies";
      const stockClass = isOutOfStock
        ? "bg-rose-50 text-rose-700 border-rose-200"
        : isLimited
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";

      if (isSuppliesBundle) {
        const bundleContents = (item.contents || item.subject || "محتويات مدرسية متكاملة").trim();
        return `
          <article class="bg-gradient-to-b from-amber-50/70 via-white to-rose-50/40 rounded-2xl border-2 border-amber-200/90 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group ${isOutOfStock ? "opacity-85" : ""}">
            <div>
              <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src="${escapeHtml(thumbUrl)}"
                  alt="${escapeHtml(item.title)}"
                  loading="lazy"
                  decoding="async"
                  onerror="this.onerror=null; this.src='${fallbackUrl}';"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span class="absolute top-2 right-2 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  <i class="fa-solid fa-box-open ml-1"></i>${escapeHtml(item.badge || "باكدج سبلايز")}
                </span>
                ${hasDiscount ? `
                  <span class="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                    وفر ${savingsAmount} ج.م
                  </span>
                ` : ""}
              </div>

              <div class="p-2.5 sm:p-3.5 space-y-2">
                <div class="flex items-center justify-between gap-1">
                  <span class="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border ${stockClass} truncate">
                    ${escapeHtml(stockText)}
                  </span>
                  <span class="text-[9px] sm:text-[10px] font-black text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded truncate">
                    ${escapeHtml(item.stage || "سبلايز")}
                  </span>
                </div>

                <h4 class="font-black text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 min-h-[2.2rem]">
                  ${escapeHtml(item.title)}
                </h4>

                <p class="text-[10px] sm:text-[11px] text-slate-600 font-bold truncate">
                  <i class="fa-solid fa-graduation-cap text-amber-600 ml-1"></i>${escapeHtml(item.grade || "")}
                </p>

                <div class="bg-white/95 border border-amber-200/80 rounded-xl p-2 text-[10px] text-slate-700 leading-relaxed">
                  <div class="font-black text-amber-800 mb-0.5 flex items-center gap-1">
                    <i class="fa-solid fa-list-check text-emerald-600"></i>
                    <span>محتويات الباكدج:</span>
                  </div>
                  <p class="line-clamp-2 font-semibold text-slate-600">${escapeHtml(bundleContents)}</p>
                </div>
              </div>
            </div>

            <div class="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5 pt-2 border-t border-amber-200/70 space-y-2 bg-white/70">
              <div class="flex items-center justify-between gap-1">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-rose-700 font-black text-sm sm:text-base">
                    ${item.price} <span class="text-[11px] font-bold">ج.م</span>
                  </span>
                  ${hasDiscount ? `<span class="text-[10px] sm:text-xs text-slate-400 line-through font-bold">${item.originalPrice} ج.م</span>` : ""}
                </div>
                <button
                  type="button"
                  onclick="shareProductWhatsApp('${escapeHtml(item.id)}')"
                  title="مشاركة الباكدج مع أصدقائك عبر الواتساب"
                  class="app-tap-effect w-7 h-7 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-500 hover:text-sky-600 flex items-center justify-center transition-all border border-slate-200/80"
                >
                  <i class="fa-solid fa-share-nodes text-[11px]"></i>
                </button>
              </div>

              <div class="flex items-center gap-1.5">
                <button
                  onclick="handleAddToCart('${escapeHtml(item.id)}')"
                  ${isOutOfStock ? "disabled" : ""}
                  class="app-tap-effect flex-1 flex items-center justify-center gap-1 ${
                    isOutOfStock
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : inCartQty > 0
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      : "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white"
                  } font-black text-[11px] sm:text-xs py-2 px-2 rounded-xl transition-all shadow-sm"
                >
                  <i class="fa-solid ${isOutOfStock ? "fa-ban" : inCartQty > 0 ? "fa-check" : "fa-cart-plus"} text-[11px]"></i>
                  <span>${isOutOfStock ? "نفذت الكمية" : inCartQty > 0 ? `بالسلة (${inCartQty})` : "أضف الباكدج للسلة"}</span>
                </button>

                <a
                  href="${generateItemWhatsAppUrl(item)}"
                  target="_blank"
                  rel="noopener"
                  onclick="recordItemClick('${escapeHtml(item.id)}')"
                  title="طلب سريع واتساب"
                  class="app-tap-effect w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm"
                >
                  <i class="fa-brands fa-whatsapp text-sm sm:text-base"></i>
                </a>
              </div>
            </div>
          </article>
        `;
      }

      return `
        <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group ${isOutOfStock ? "opacity-85" : ""}">
          <div>
            <!-- صورة المنتج مع Fallback أنيق وزر مشاركة -->
            <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src="${escapeHtml(thumbUrl)}"
                alt="${escapeHtml(item.title)}"
                loading="lazy"
                decoding="async"
                onerror="this.onerror=null; this.src='${fallbackUrl}';"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              ${item.badge ? `
                <span class="absolute top-2 right-2 bg-brand-navy/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  ${escapeHtml(item.badge)}
                </span>
              ` : ""}
              ${hasDiscount ? `
                <span class="absolute top-2 left-2 bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  عرض
                </span>
              ` : ""}
            </div>

            <!-- تفاصيل المنتج -->
            <div class="p-2.5 sm:p-3.5 space-y-1.5">
              <div class="flex items-center justify-between gap-1">
                <span class="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border ${stockClass} truncate">
                  ${escapeHtml(stockText)}
                </span>
                <span class="text-[9px] sm:text-[10px] font-bold text-slate-400 truncate">
                  ${escapeHtml(item.series || "")}
                </span>
              </div>

              <h4 class="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 min-h-[2.2rem]">
                ${escapeHtml(item.title)}
              </h4>

              <p class="text-[10px] sm:text-[11px] text-slate-500 font-semibold truncate">
                ${escapeHtml(item.grade || "")}${item.subject ? ` • ${escapeHtml(item.subject)}` : ""}
              </p>
            </div>
          </div>

          <!-- السعر وأزرار الطلب والمشاركة -->
          <div class="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5 pt-2 border-t border-slate-100 space-y-2">
            <div class="flex items-center justify-between gap-1">
              <div class="flex items-baseline gap-1.5">
                <span class="text-emerald-700 font-black text-sm sm:text-base">
                  ${item.price} <span class="text-[11px] font-bold">ج.م</span>
                </span>
                ${hasDiscount ? `<span class="text-[10px] sm:text-xs text-slate-400 line-through">${item.originalPrice}</span>` : ""}
              </div>
              <button
                type="button"
                onclick="shareProductWhatsApp('${escapeHtml(item.id)}')"
                title="مشاركة المنتج مع أصدقائك عبر الواتساب"
                class="app-tap-effect w-7 h-7 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-500 hover:text-sky-600 flex items-center justify-center transition-all border border-slate-200/80"
              >
                <i class="fa-solid fa-share-nodes text-[11px]"></i>
              </button>
            </div>

            <div class="flex items-center gap-1.5">
              <button
                onclick="handleAddToCart('${escapeHtml(item.id)}')"
                ${isOutOfStock ? "disabled" : ""}
                class="app-tap-effect flex-1 flex items-center justify-center gap-1 ${
                  isOutOfStock
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : inCartQty > 0
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                    : "bg-brand-navy hover:bg-slate-800 text-white"
                } font-bold text-[11px] sm:text-xs py-2 px-2 rounded-xl transition-all shadow-sm"
              >
                <i class="fa-solid ${isOutOfStock ? "fa-ban" : inCartQty > 0 ? "fa-check" : "fa-cart-plus"} text-[11px]"></i>
                <span>${isOutOfStock ? "نفذت الكمية" : inCartQty > 0 ? `بالسلة (${inCartQty})` : "أضف للسلة"}</span>
              </button>

              <a
                href="${generateItemWhatsAppUrl(item)}"
                target="_blank"
                rel="noopener"
                onclick="recordItemClick('${escapeHtml(item.id)}')"
                title="طلب سريع واتساب"
                class="app-tap-effect w-9 h-8 sm:h-9 shrink-0 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm"
              >
                <i class="fa-brands fa-whatsapp text-sm sm:text-base"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function refreshStorefrontViews() {
  populateDropdownFilters();
  renderHotDeals();
  renderCatalogGrid();
  renderCartDrawer();
  if (isAdminAuthenticated) {
    renderAdminPricesTable();
    renderAdminSuppliesDealsList();
    renderBackupCategoryBreakdown();
    updateAdminStats();
  }
}

function generateItemWhatsAppUrl(item) {
  const intlWa = getStoreWhatsAppNumber();
  const msg =
    `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n` +
    `أود الاستفسار وطلب المنتج التالي:\n\n` +
    `📦 المنتج: ${item.title}\n` +
    `🎓 المرحلة: ${item.stage || "عام"}\n` +
    `🏫 الصف الدراسي: ${item.grade || "جميع الصفوف"}\n` +
    `📚 المادة/الفئة: ${item.subject || "عام"}\n` +
    `💰 السعر: ${item.price} ج.م\n\n` +
    `أرجو تأكيد التوفر وتجهيز الطلب، شكراً لكم!`;
  return `https://wa.me/${intlWa}?text=${encodeURIComponent(msg)}`;
}

function shareProductWhatsApp(itemId) {
  const item = currentBooks.find((b) => b.id === itemId);
  if (!item) return;
  const shareUrl =
    window.location.protocol === "file:" ? STORE_PUBLIC_URL : window.location.href;
  const msg =
    `شاهد هذا المنتج في *مكتبة نهر العلم - إدارة أ/ إيهاب* 📚\n\n` +
    `📦 *${item.title}*\n` +
    `🏫 ${item.grade || ""}${item.subject ? ` • ${item.subject}` : ""}\n` +
    `💰 السعر: *${item.price} ج.م*\n\n` +
    `🔗 تصفح واطلب الآن عبر رابط المكتبة:\n${shareUrl}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

function openRequestMissingItemWhatsApp() {
  const intlWa = getStoreWhatsAppNumber();
  const typed = (searchQuery || document.getElementById("liveSearchInput")?.value || "").trim();
  const msg = typed
    ? `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\nأبحث عن: "${typed}" ولم أجده في القائمة.\nأرجو إفادتي بالتوفر والسعر، واسم الطلب/الكتاب المطلوب بالتفصيل هو:\n`
    : `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\nأود طلب كتاب أو أداة مدرسية غير ظاهرة في البحث، وتفاصيل طلبي هي:\n• اسم الكتاب / الأداة: \n• المرحلة والصف الدراسي: \n`;
  window.open(`https://wa.me/${intlWa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

function recordItemClick(itemId) {
  const item = currentBooks.find((b) => b.id === itemId);
  if (item) {
    item.clicks = (item.clicks || 0) + 1;
    persistBooksData();
    if (isAdminAuthenticated) updateAdminStats();
  }
}

// =========================================================================
// 9. سلة الطلبات الذكية (تحديد الاستلام من المكتبة أو التوصيل للمنزل)
// =========================================================================
function handleAddToCart(bookId) {
  const book = currentBooks.find((b) => b.id === bookId);
  if (!book) return;
  if (book.stock && book.stock.includes("نفذت")) {
    showToastNotification("عذراً، هذا المنتج غير متوفر حالياً (نفذت الكمية).");
    return;
  }

  const existing = cartItems.find((c) => c.id === bookId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      id: book.id,
      title: book.title,
      price: book.price,
      grade: book.grade,
      stage: book.stage,
      subject: book.subject,
      quantity: 1
    });
  }

  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
  recordItemClick(bookId);
  showToastNotification(`تمت إضافة "${book.title}" إلى السلة!`);
}

function updateCartBadges() {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountBadge = document.getElementById("cartCountBadge");
  const bottomNavCartCount = document.getElementById("bottomNavCartCount");
  const cartDrawerCountPill = document.getElementById("cartDrawerCountPill");

  if (cartCountBadge) cartCountBadge.textContent = totalCount;
  if (bottomNavCartCount) {
    bottomNavCartCount.textContent = totalCount;
    bottomNavCartCount.classList.toggle("hidden", totalCount <= 0);
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
  const cartDeliveryFeeValue = document.getElementById("cartDeliveryFeeValue");

  if (!cartItemsList) return;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "";
    if (cartEmptyNotice) {
      cartEmptyNotice.classList.remove("hidden");
      cartEmptyNotice.style.display = "flex";
    }
    if (cartFooterSection) {
      cartFooterSection.classList.add("hidden");
      cartFooterSection.style.display = "none";
    }
    return;
  }

  if (cartEmptyNotice) {
    cartEmptyNotice.classList.add("hidden");
    cartEmptyNotice.style.display = "none";
  }
  if (cartFooterSection) {
    cartFooterSection.classList.remove("hidden");
    cartFooterSection.style.display = "block";
  }

  let productsSubtotal = 0;

  cartItemsList.innerHTML = cartItems
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      productsSubtotal += itemTotal;
      return `
        <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3">
          <div class="space-y-0.5 flex-1 min-w-0">
            <h5 class="text-xs font-bold text-slate-900 truncate">${escapeHtml(item.title)}</h5>
            <p class="text-[10px] text-slate-500">${escapeHtml(item.grade || "")}</p>
            <div class="text-xs font-black text-emerald-700">
              ${item.price} ج.م × ${item.quantity} = ${itemTotal} ج.م
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button onclick="changeCartItemQty('${escapeHtml(item.id)}', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold hover:bg-slate-100">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="w-6 text-center text-xs font-bold text-slate-900">${item.quantity}</span>
            <button onclick="changeCartItemQty('${escapeHtml(item.id)}', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold hover:bg-slate-100">
              <i class="fa-solid fa-plus"></i>
            </button>
            <button onclick="removeCartItem('${escapeHtml(item.id)}')" title="حذف" class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs hover:bg-rose-100 mr-1">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  const selectedDelivery = document.querySelector('input[name="deliveryMethod"]:checked')?.value || "pickup";
  const deliveryFee = Math.max(0, Number(currentPrintRates.deliveryFee ?? 20));
  const appliedDelivery = selectedDelivery === "delivery" ? deliveryFee : 0;

  if (cartDeliveryFeeValue) {
    cartDeliveryFeeValue.textContent = deliveryFee > 0 ? `${deliveryFee} ج.م` : "مجاناً";
  }
  if (cartDrawerTotalPrice) {
    cartDrawerTotalPrice.textContent = `${productsSubtotal + appliedDelivery} ج.م`;
  }
}

function changeCartItemQty(itemId, delta) {
  const item = cartItems.find((c) => c.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter((c) => c.id !== itemId);
  }

  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function removeCartItem(itemId) {
  cartItems = cartItems.filter((c) => c.id !== itemId);
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function clearCart() {
  cartItems = [];
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  updateCartBadges();
  renderCatalogGrid();
  renderCartDrawer();
}

function sendCartOrderWhatsApp() {
  if (cartItems.length === 0) return;

  const selectedDeliveryInput = document.querySelector('input[name="deliveryMethod"]:checked');
  const deliveryMethod = selectedDeliveryInput ? selectedDeliveryInput.value : "pickup";
  const deliveryAddress = document.getElementById("cartDeliveryAddress")?.value.trim() || "";
  const customerName = document.getElementById("cartCustomerName")?.value.trim() || "غير محدد";

  if (deliveryMethod === "delivery" && !deliveryAddress) {
    showToastNotification("يرجى كتابة عنوان التوصيل بالتفصيل أولاً!");
    document.getElementById("cartDeliveryAddress")?.focus();
    return;
  }

  let productsSubtotal = 0;
  let message = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n`;
  message += `أود تأكيد طلب المنتجات التالية:\n\n`;

  cartItems.forEach((item, idx) => {
    const sub = item.price * item.quantity;
    productsSubtotal += sub;
    const catalogMatch = currentBooks.find((b) => b.id === item.id);
    const stageText = item.stage || catalogMatch?.stage || "عام";
    const gradeText = item.grade || catalogMatch?.grade || "جميع الصفوف";
    const subjectText = item.subject || catalogMatch?.subject || "عام";
    message += `${idx + 1}. *${item.title}*\n`;
    message += `   • المرحلة: ${stageText} | الصف: ${gradeText} | المادة: ${subjectText}\n`;
    message += `   • الكمية: ${item.quantity} × ${item.price} ج.م = *${sub} ج.م*\n\n`;
  });

  const deliveryFee = Math.max(0, Number(currentPrintRates.deliveryFee ?? 20));
  const appliedDelivery = deliveryMethod === "delivery" ? deliveryFee : 0;
  const grandTotal = productsSubtotal + appliedDelivery;

  message += `─────────────────────\n`;
  message += `🧾 إجمالي المنتجات: ${productsSubtotal} ج.م\n`;
  message += `🚚 طريقة الاستلام: ${deliveryMethod === "delivery" ? "توصيل للمنزل" : "استلام وتجهيز مسبق من المكتبة"}\n`;
  if (deliveryMethod === "delivery") {
    message += `🛵 رسوم التوصيل: ${deliveryFee > 0 ? `${deliveryFee} ج.م` : "مجاناً"}\n`;
    message += `📍 عنوان التوصيل: ${deliveryAddress}\n`;
  }
  message += `💰 الإجمالي النهائي: ${grandTotal} ج.م\n`;
  message += `👤 اسم العميل: ${customerName}\n`;
  message += `\nشكراً لتعاونكم!`;

  const url = `https://wa.me/${getStoreWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 10. حاسبة الطباعة الذكية وعدّ صفحات PDF تلقائياً بـ PDF.js
// =========================================================================
let pdfJsLoadPromise = null;

function configurePdfJsWorker() {
  if (typeof window.pdfjsLib !== "undefined") {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
}

function ensurePdfJsLoaded() {
  if (typeof window.pdfjsLib !== "undefined") {
    configurePdfJsWorker();
    return Promise.resolve(window.pdfjsLib);
  }
  if (pdfJsLoadPromise) return pdfJsLoadPromise;

  pdfJsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      configurePdfJsWorker();
      resolve(window.pdfjsLib);
    };
    script.onerror = (err) => {
      pdfJsLoadPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return pdfJsLoadPromise;
}

async function handlePrintFileSelection(file) {
  const display = document.getElementById("selectedFileNameDisplay");
  const statusPill = document.getElementById("pdfAutoCountStatus");
  const pagesInput = document.getElementById("calcPagesCount");

  if (!file) return;

  if (display) {
    display.textContent = `الملف المختار: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp)$/i.test(file.name);

  if (isPdf) {
    if (statusPill) {
      statusPill.classList.remove("hidden", "bg-amber-100", "text-amber-800");
      statusPill.classList.add("bg-sky-100", "text-sky-800");
      statusPill.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> جاري فحص وحساب صفحات ملف PDF تلقائياً...`;
    }

    try {
      await ensurePdfJsLoaded();
      if (typeof window.pdfjsLib === "undefined") {
        throw new Error("PDF.js unavailable");
      }
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: window.location.protocol === "file:"
      });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages || 1;

      if (pagesInput) pagesInput.value = numPages;
      updatePrintCalculator();

      if (statusPill) {
        statusPill.classList.remove("bg-sky-100", "text-sky-800");
        statusPill.classList.add("bg-emerald-100", "text-emerald-800");
        statusPill.innerHTML = `<i class="fa-solid fa-circle-check"></i> تم احتساب عدد الصفحات تلقائياً: ${numPages} صفحة`;
      }
      showToastNotification(`تم اكتشاف ${numPages} صفحة في ملف الـ PDF وحساب التكلفة تلقائياً!`);
    } catch (err) {
      console.warn("PDF.js parse notice:", err);
      if (statusPill) {
        statusPill.classList.remove("bg-sky-100", "text-sky-800");
        statusPill.classList.add("bg-amber-100", "text-amber-800");
        statusPill.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> يرجى التأكد من عدد الصفحات وإدخالها يدوياً`;
      }
    }
  } else if (isImage) {
    if (pagesInput) pagesInput.value = 1;
    updatePrintCalculator();
    if (statusPill) {
      statusPill.classList.remove("hidden", "bg-amber-100", "text-amber-800");
      statusPill.classList.add("bg-emerald-100", "text-emerald-800");
      statusPill.innerHTML = `<i class="fa-solid fa-image"></i> تم تعيين عدد الصفحات: 1 صفحة (صورة)`;
    }
  } else if (statusPill) {
    statusPill.classList.remove("hidden", "bg-emerald-100", "text-emerald-800");
    statusPill.classList.add("bg-amber-100", "text-amber-800");
    statusPill.innerHTML = `<i class="fa-solid fa-file-word"></i> يرجى إدخال عدد صفحات المستند يدوياً`;
  }
}

function updatePrintCalculator() {
  const pages = Math.max(1, parseInt(document.getElementById("calcPagesCount")?.value, 10) || 1);
  const copies = Math.max(1, parseInt(document.getElementById("calcCopiesCount")?.value, 10) || 1);
  const colorSelect = document.getElementById("calcColorType");
  const bindingSelect = document.getElementById("calcBindingType");
  const colorType = colorSelect?.value || "bw";
  const bindingType = bindingSelect?.value || "wire";

  const bwRate = Number(currentPrintRates.bwPage ?? 0.75);
  const colorRate = Number(currentPrintRates.colorPage ?? 2.50);
  const wireRate = Number(currentPrintRates.bindingWire ?? 25.00);
  const plasticRate = Number(currentPrintRates.bindingPlastic ?? 15.00);
  const stapleRate = Number(currentPrintRates.bindingStaple ?? 3.00);

  if (colorSelect) {
    const bwOpt = colorSelect.querySelector('option[value="bw"]');
    const colOpt = colorSelect.querySelector('option[value="color"]');
    if (bwOpt) bwOpt.textContent = `أبيض وأسود ليزر (${bwRate.toFixed(2)} ج.م / ورقة)`;
    if (colOpt) colOpt.textContent = `ألوان عالية الدقة (${colorRate.toFixed(2)} ج.م / ورقة)`;
  }

  if (bindingSelect) {
    const wireOpt = bindingSelect.querySelector('option[value="wire"]');
    const plasticOpt = bindingSelect.querySelector('option[value="plastic"]');
    const stapleOpt = bindingSelect.querySelector('option[value="staple"]');
    const noneOpt = bindingSelect.querySelector('option[value="none"]');
    if (wireOpt) wireOpt.textContent = `تغليف سلك حديد (+${wireRate.toFixed(2)} ج.م)`;
    if (plasticOpt) plasticOpt.textContent = `تغليف بلاستيك (+${plasticRate.toFixed(2)} ج.م)`;
    if (stapleOpt) stapleOpt.textContent = `تدبيس (+${stapleRate.toFixed(2)} ج.م)`;
    if (noneOpt) noneOpt.textContent = `بدون تغليف (مجاناً)`;
  }

  const pageRate = colorType === "color" ? colorRate : bwRate;
  let bindingRate = 0;
  let bindingLabel = "بدون تغليف";
  if (bindingType === "wire") {
    bindingRate = wireRate;
    bindingLabel = `تغليف سلك حديد ${wireRate.toFixed(2)} ج.م للنسخة`;
  } else if (bindingType === "plastic") {
    bindingRate = plasticRate;
    bindingLabel = `تغليف بلاستيك ${plasticRate.toFixed(2)} ج.م للنسخة`;
  } else if (bindingType === "staple") {
    bindingRate = stapleRate;
    bindingLabel = `تدبيس ${stapleRate.toFixed(2)} ج.م للنسخة`;
  } else {
    bindingLabel = "بدون تغليف (0.00 ج.م)";
  }

  const colorHint = document.getElementById("calcColorRateHint");
  const bindingHint = document.getElementById("calcBindingRateHint");
  if (colorHint) {
    colorHint.textContent = `سعر الورقة: أبيض وأسود ${bwRate.toFixed(2)} ج.م • ألوان ${colorRate.toFixed(2)} ج.م`;
  }
  if (bindingHint) {
    bindingHint.textContent = `تكلفة التغليف المختار: ${bindingLabel}`;
  }

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
  const fileName = docFile ? docFile.name : "مذكرة دراسية (سيتم إرفاقها يدوياً بالمحادثة)";
  const pages = Math.max(1, parseInt(document.getElementById("calcPagesCount")?.value, 10) || 1);
  const copies = Math.max(1, parseInt(document.getElementById("calcCopiesCount")?.value, 10) || 1);
  const colorType = document.getElementById("calcColorType")?.value === "color" ? "ألوان عالية الدقة" : "أبيض وأسود ليزر";

  let bindingText = "بدون تغليف";
  const bindingType = document.getElementById("calcBindingType")?.value;
  if (bindingType === "wire") bindingText = "تغليف سلك حديد";
  else if (bindingType === "plastic") bindingText = "تغليف بلاستيك";
  else if (bindingType === "staple") bindingText = "تدبيس";

  const totalEstimate = document.getElementById("costTotalEstimate")?.textContent || "";

  let msg = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n`;
  msg += `طلب خدمة طباعة وتصوير مذكرة:\n\n`;
  msg += `📄 اسم الملف: ${fileName}\n`;
  msg += `📑 عدد الصفحات: ${pages} صفحة\n`;
  msg += `🔢 عدد النسخ: ${copies} نسخة\n`;
  msg += `🎨 نوع الطباعة: ${colorType}\n`;
  msg += `📎 نوع التغليف: ${bindingText}\n`;
  msg += `💵 التكلفة الإجمالية المقدرة: ${totalEstimate}\n\n`;
  msg += `سأقوم بإرفاق ملف المذكرة الآن هنا داخل المحادثة، أرجو تأكيد التجهيز!`;

  const url = `https://wa.me/${getStoreWhatsAppNumber()}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 11. مشاركة رابط المكتبة والتثبيت المشروط (Web Share & PWA Lifecycle)
// =========================================================================
async function shareLibraryLink() {
  const shareUrl =
    window.location.protocol === "file:" ? STORE_PUBLIC_URL : window.location.href;
  const shareTitle = "مكتبة نهر العلم - إدارة أ/ إيهاب";
  const shareText = "تصفح أسعار الكتب الخارجية، الأدوات المكتبية، باكدجات السبلايز، واطبع مذكرتك فوراً من تطبيق مكتبة نهر العلم:";

  if (window.AndroidApp && typeof window.AndroidApp.shareLibraryLink === "function") {
    window.AndroidApp.shareLibraryLink(shareTitle, shareText, shareUrl);
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      });
      return;
    } catch (_) {
      // المتابعة للنسخ الاحتياطي
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    showToastNotification("تم نسخ رابط المكتبة! يمكنك مشاركته الآن في جروبات أولياء الأمور.");
  } catch (_) {
    showToastNotification(`رابط المكتبة: ${shareUrl}`);
  }
}

function applyApkAnchorState(anchorEl) {
  if (!anchorEl) return;
  anchorEl.setAttribute("href", activeApkDownloadUrl);
  if (activeApkIsSameOriginCdn) {
    anchorEl.setAttribute("download", "Nahr-Al-Elm-Library.apk");
  } else {
    anchorEl.removeAttribute("download");
  }
}

async function resolveBestApkDownloadUrl() {
  if (!window.location.protocol.startsWith("http") || window.location.hostname === "localhost") {
    return;
  }
  const installAppBtn = document.getElementById("installAppBtn");
  const footerApkBtn = document.getElementById("footerApkDownloadBtn");

  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 2500) : null;
    const res = await fetch(`./Nahr-Al-Elm-Library.apk?probe=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
      signal: controller ? controller.signal : undefined
    });
    if (timer) clearTimeout(timer);

    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const contentLength = Number(res.headers.get("content-length") || 0);
    if (res.ok && !contentType.includes("text/html") && contentLength > 1000000) {
      activeApkDownloadUrl = CDN_APK_DOWNLOAD_URL;
      activeApkIsSameOriginCdn = true;
    } else {
      activeApkDownloadUrl = RELEASE_APK_DOWNLOAD_URL;
      activeApkIsSameOriginCdn = false;
    }
  } catch (_) {
    activeApkDownloadUrl = RELEASE_APK_DOWNLOAD_URL;
    activeApkIsSameOriginCdn = false;
  }

  applyApkAnchorState(installAppBtn);
  applyApkAnchorState(footerApkBtn);
}

function handleInstallButtonVisibility() {
  const container = document.getElementById("installBtnContainer");
  const footerApkBtn = document.getElementById("footerApkDownloadBtn");

  const isRunningNative =
    window.isNativeApp === true ||
    typeof window.AndroidApp !== "undefined" ||
    navigator.userAgent.includes("NahrAlElmNativeApp") ||
    window.location.protocol === "file:";

  if (container) {
    if (isRunningNative) {
      container.classList.add("hidden");
    } else {
      container.classList.remove("hidden");
    }
  }

  if (footerApkBtn) {
    if (isRunningNative) {
      footerApkBtn.classList.add("hidden");
    } else {
      footerApkBtn.classList.remove("hidden");
    }
  }
}

function registerServiceWorkerSafely() {
  if ("serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
    const hadController = Boolean(navigator.serviceWorker.controller);
    let refreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController || refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "OTA_UPDATE_ACTIVATED") {
        showToastNotification("تم تحديث التطبيق تلقائياً بأحدث المزايا والأسعار!");
      }
    });

    navigator.serviceWorker
      .register("./sw.js", { updateViaCache: "none" })
      .then((reg) => {
        // فحص التحديثات فور الفتح وعند عودة التطبيق للواجهة
        reg.update().catch(() => {});
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            reg.update().catch(() => {});
          }
        });
      })
      .catch((err) => {
        console.warn("SW registration notice:", err.message);
      });
  }
}

// =========================================================================
// 12. الإعلانات والتنويهات (العادية والمصورة)
// =========================================================================
function renderAnnouncementBanner() {
  const banner = document.getElementById("liveAnnouncementBanner");
  const text = document.getElementById("announcementText");
  const badge = document.getElementById("announcementBadge");
  const promoSection = document.getElementById("promoImageBannerSection");
  const promoImg = document.getElementById("promoBannerImg");
  const promoCaption = document.getElementById("promoBannerCaption");

  if (banner) {
    if (!currentAnnouncement.active || !currentAnnouncement.text?.trim()) {
      banner.classList.add("hidden");
    } else {
      banner.classList.remove("hidden");
      if (text) text.textContent = currentAnnouncement.text;
      if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-bullhorn text-[9px] ml-1"></i> ${escapeHtml(currentAnnouncement.badge || "تنويه")}`;
      }
    }
  }

  if (promoSection && promoImg && promoCaption) {
    const imgUrl = (currentAnnouncement.bannerImageUrl || "").trim();
    if (currentAnnouncement.active && imgUrl !== "") {
      promoImg.src = imgUrl;
      promoImg.onerror = () => promoSection.classList.add("hidden");
      promoCaption.textContent = currentAnnouncement.text || "";
      promoSection.classList.remove("hidden");
    } else {
      promoSection.classList.add("hidden");
    }
  }
}

// =========================================================================
// 13. البوابة السرية ولوحة الإدارة المحقونة ديناميكياً فقط بعد التحقق
// لا توجد أي نصوص إدارية أو عناصر تحكم في كود الصفحة الظاهر للزوار
// =========================================================================
function setupHiddenAdminTrigger() {
  const trigger = document.getElementById("adminTriggerFooter");
  const indicator = document.getElementById("longPressIndicator");
  const bar = document.getElementById("longPressBar");

  if (!trigger) return;

  let pressTimer = null;
  let progressInterval = null;
  const REQUIRED_HOLD_MS = 3000;

  function startHold() {
    if (indicator) indicator.classList.remove("hidden");
    if (bar) bar.style.width = "0%";
    const startTime = Date.now();
    progressInterval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startTime) / REQUIRED_HOLD_MS) * 100);
      if (bar) bar.style.width = `${pct}%`;
    }, 50);

    pressTimer = setTimeout(() => {
      endHold();
      mountAdminAccessModal();
    }, REQUIRED_HOLD_MS);
  }

  function endHold() {
    clearTimeout(pressTimer);
    clearInterval(progressInterval);
    if (indicator) indicator.classList.add("hidden");
    if (bar) bar.style.width = "0%";
  }

  trigger.addEventListener("mousedown", startHold);
  trigger.addEventListener("mouseup", endHold);
  trigger.addEventListener("mouseleave", endHold);
  trigger.addEventListener("touchstart", startHold, { passive: true });
  trigger.addEventListener("touchend", endHold);
  trigger.addEventListener("touchcancel", endHold);
}

function mountAdminAccessModal() {
  const mount = document.getElementById("adminMountContainer");
  if (!mount) return;

  mount.style.display = "block";
  mount.innerHTML = `
    <div id="adminAccessModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 select-none">
      <div class="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-700/80 space-y-4">
        <div class="text-center space-y-1">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 mx-auto flex items-center justify-center text-slate-950 text-xl font-black shadow-lg mb-2">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h3 class="text-base sm:text-lg font-black text-white tracking-wide font-sans">
            Welcome Engineer Mohamed Youssef
          </h3>
          <p class="text-[11px] text-emerald-400 font-bold">
            لوحة التحكم السحابية وإدارة الأسعار
          </p>
        </div>

        <form id="adminLoginForm" class="space-y-3 pt-2">
          <div class="relative">
            <input
              type="password"
              id="adminPasswordInput"
              placeholder="أدخل كلمة المرور..."
              class="w-full text-center text-xs sm:text-sm bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              autocomplete="current-password"
              required
            />
            <button type="button" id="togglePasswordVisibilityBtn" class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-white">
              <i class="fa-regular fa-eye text-xs"></i>
            </button>
          </div>
          <div id="loginFeedback" class="hidden text-center text-xs font-bold text-rose-400"></div>
          <button type="submit" class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all">
            دخول لوحة التحكم
          </button>
          <button type="button" id="closeAdminModalBtn" class="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1">
            إغلاق
          </button>
        </form>

        <div class="text-center text-[10px] text-slate-500 pt-1 border-t border-slate-800">
          المحاولات المتبقية: <span id="loginAttemptsLeft" class="text-amber-400 font-bold">${Math.max(0, 3 - failedLoginAttempts)}</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById("adminPasswordInput")?.focus();
  document.getElementById("adminLoginForm")?.addEventListener("submit", handleAdminLogin);
  document.getElementById("closeAdminModalBtn")?.addEventListener("click", unmountAdminContainer);
  document.getElementById("togglePasswordVisibilityBtn")?.addEventListener("click", () => {
    const inp = document.getElementById("adminPasswordInput");
    if (inp) inp.type = inp.type === "password" ? "text" : "password";
  });
}

function unmountAdminContainer() {
  const mount = document.getElementById("adminMountContainer");
  if (mount) {
    mount.innerHTML = "";
    mount.style.display = "none";
  }
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const input = document.getElementById("adminPasswordInput");
  const feedback = document.getElementById("loginFeedback");
  const attemptsBadge = document.getElementById("loginAttemptsLeft");
  if (!input) return;

  const hashed = await computeSha256(input.value);
  if (hashed === _A_H) {
    isAdminAuthenticated = true;
    failedLoginAttempts = 0;
    activeAdminProfile = _P_LIST[0];
    mountFullAdminPanel();
    showToastNotification("تم التحقق بنجاح! أهلاً بك في لوحة الإدارة السحابية.");
  } else {
    failedLoginAttempts += 1;
    const remaining = Math.max(0, 3 - failedLoginAttempts);
    if (attemptsBadge) attemptsBadge.textContent = String(remaining);
    if (feedback) {
      feedback.textContent = `كلمة المرور غير صحيحة! متبقي ${remaining} محاولات.`;
      feedback.classList.remove("hidden");
    }
    if (failedLoginAttempts >= 3) {
      setTimeout(() => {
        failedLoginAttempts = 0;
        unmountAdminContainer();
        showToastNotification("تم إغلاق النافذة لتجاوز الحد المسموح من المحاولات.");
      }, 900);
    }
  }
}

let editingProductId = null;

function mountFullAdminPanel() {
  const publicScreen = document.getElementById("publicStorefront");
  const mount = document.getElementById("adminMountContainer");
  if (!mount) return;

  if (publicScreen) publicScreen.classList.add("hidden");
  mount.style.display = "block";

  mount.innerHTML = `
    <section id="adminPanelScreen" class="min-h-screen bg-slate-900 text-slate-100 p-3 sm:p-6 pb-24">
      <div class="max-w-7xl mx-auto space-y-5">

        <!-- ترويسة لوحة الإدارة -->
        <div class="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <i class="fa-solid fa-shield-halved ml-1"></i> لوحة الإدارة السحابية الشاملة
              </span>
              <span class="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                ${escapeHtml(activeAdminProfile)}
              </span>
            </div>
            <h2 class="text-lg sm:text-2xl font-black text-white font-tajawal">
              إدارة مكتبة نهر العلم - أ/ إيهاب
            </h2>
            <p class="text-xs text-slate-400">
              تحكم كامل في المنتجات والكتب، باكدجات السبلايز والعروض، تسعيرة الطباعة والتوصيل، والنسخ الاحتياطي السحابي.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button id="adminGeneratePdfBtn" class="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-md transition-all">
              <i class="fa-solid fa-file-invoice"></i>
              <span>بيان فوري بالأسعار</span>
            </button>
            <button id="adminLogoutBtn" class="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-md transition-all">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        <!-- إحصائيات المتجر -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div class="flex items-center justify-between text-slate-400 mb-1 text-xs font-bold">
              <span>إجمالي المنتجات والكتب</span>
              <i class="fa-solid fa-book text-emerald-400"></i>
            </div>
            <div class="text-2xl font-black text-white" id="statTotalBooks">0</div>
          </div>
          <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div class="flex items-center justify-between text-slate-400 mb-1 text-xs font-bold">
              <span>باكدجات السبلايز والعروض</span>
              <i class="fa-solid fa-box-open text-rose-400"></i>
            </div>
            <div class="text-2xl font-black text-white" id="statSuppliesDeals">0</div>
          </div>
          <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div class="flex items-center justify-between text-slate-400 mb-1 text-xs font-bold">
              <span>شريط التنويه العلوي</span>
              <i class="fa-solid fa-bullhorn text-amber-400"></i>
            </div>
            <div class="text-sm font-black text-white" id="statActiveBanners">نشط</div>
          </div>
          <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div class="flex items-center justify-between text-slate-400 mb-1 text-xs font-bold">
              <span>المزامنة السحابية</span>
              <i class="fa-solid fa-cloud text-sky-400"></i>
            </div>
            <div class="text-sm font-black text-white truncate" id="statFirebaseStatus">Firebase Live Sync</div>
          </div>
        </div>

        <!-- تبويبات لوحة التحكم الأربعة -->
        <div class="flex items-center gap-2 border-b border-slate-700 pb-3 overflow-x-auto custom-scroll">
          <button data-admin-tab="products" class="admin-tab-btn active bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all">
            <i class="fa-solid fa-boxes-stacked"></i><span>إدارة المنتجات والكتب</span>
          </button>
          <button data-admin-tab="suppliesDeals" class="admin-tab-btn bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all">
            <i class="fa-solid fa-fire"></i><span>إدارة باكدجات السبلايز والعروض</span>
          </button>
          <button data-admin-tab="ratesDelivery" class="admin-tab-btn bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all">
            <i class="fa-solid fa-print"></i><span>أسعار الطباعة والتغليف والتوصيل</span>
          </button>
          <button data-admin-tab="backupSettings" class="admin-tab-btn bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all">
            <i class="fa-solid fa-database"></i><span>إعدادات المتجر والنسخ الاحتياطي</span>
          </button>
        </div>

        <!-- ================================================= -->
        <!-- تبويب 1: إدارة المنتجات والكتب (إضافة/تعديل/حذف)  -->
        <!-- ================================================= -->
        <div id="adminTabProducts" class="space-y-4">
          <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div class="flex flex-col sm:flex-row flex-1 gap-2">
              <input type="text" id="adminTableSearch" placeholder="ابحث باسم المنتج أو الكتاب أو الصف أو المادة..." class="flex-1 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
              <select id="adminCategoryFilter" class="text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-bold">
                <option value="all">جميع الأقسام</option>
                <option value="books">كتب خارجية</option>
                <option value="stationery">أدوات مكتبية وكراريس</option>
                <option value="supplies">باكدجات سبلايز</option>
                <option value="gifts">هدايا وألعاب</option>
                <option value="printing">خدمات الطباعة</option>
              </select>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button id="adminAddNewBookBtn" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow">
                <i class="fa-solid fa-plus"></i><span>إضافة منتج جديد</span>
              </button>
              <button id="adminSaveAllPricesBtn" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow">
                <i class="fa-solid fa-cloud-arrow-up"></i><span>حفظ ومزامنة الكل</span>
              </button>
            </div>
          </div>

          <div class="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
            <div class="overflow-x-auto custom-scroll">
              <table class="w-full text-right text-xs">
                <thead class="bg-slate-900 text-slate-400 font-bold border-b border-slate-700">
                  <tr>
                    <th class="p-3">المنتج / الكتاب</th>
                    <th class="p-3">القسم والتصنيف</th>
                    <th class="p-3">رابط الصورة (Image URL)</th>
                    <th class="p-3">السعر (ج.م)</th>
                    <th class="p-3">حالة التوفر</th>
                    <th class="p-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody id="adminPricesTableBody" class="divide-y divide-slate-700/60"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================================================= -->
        <!-- تبويب 2: إدارة باكدجات السبلايز والعروض والتنويه    -->
        <!-- ================================================= -->
        <div id="adminTabSuppliesDeals" class="hidden space-y-5">

          <!-- التحكم المباشر في شريط التنويه والإعلانات العلوي -->
          <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
              <div>
                <h3 class="text-base font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-bullhorn text-amber-400"></i>
                  <span>التحكم في شريط التنويه والإعلانات العلوي</span>
                </h3>
                <p class="text-xs text-slate-400">تحكم فوري في نص الشريط العلوي وإظهاره أو إخفائه للزوار بضغطة زر.</p>
              </div>
              <button type="button" id="quickToggleBannerBtn" class="font-black text-xs py-2 px-4 rounded-xl shadow flex items-center gap-2 transition-all">
                <!-- يتم تعبئته ديناميكياً -->
              </button>
            </div>

            <form id="announcementForm" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">نص التنويه / العرض العلوي:</label>
                <textarea id="adminAnnouncementInput" rows="2" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-amber-500"></textarea>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">نص الشارة (مثال: عرض خاص):</label>
                  <input type="text" id="adminBadgeInput" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold text-slate-300 mb-1">رابط صورة البانر الإعلاني (اختياري):</label>
                  <input type="url" id="adminBannerImageInput" placeholder="https://example.com/offer-banner.jpg" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" dir="ltr" />
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label class="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                  <input type="checkbox" id="adminBannerActiveCheckbox" class="w-4 h-4 rounded accent-emerald-500" />
                  <span>تفعيل الشريط والإعلان للزوار</span>
                </label>
                <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-5 rounded-xl shadow">
                  <i class="fa-solid fa-paper-plane ml-1"></i> حفظ ونشر التنويه فوراً
                </button>
              </div>
            </form>
          </div>

          <!-- إنشاء وتعديل باكدجات السبلايز الجاهزة -->
          <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
              <div>
                <h3 class="text-base font-black text-white flex items-center gap-2">
                  <i class="fa-solid fa-box-open text-rose-400"></i>
                  <span>إنشاء وتعديل باكدجات السبلايز الجاهزة والعروض</span>
                </h3>
                <p class="text-xs text-slate-400">أضف باكدج سبلايز متكامل لكل صف دراسي بسعر مجمّع مخفض ليظهر في قسم العروض والسبلايز.</p>
              </div>
            </div>

            <form id="quickSuppliesForm" class="bg-slate-900/70 rounded-2xl p-4 border border-slate-700/80 space-y-3">
              <h4 class="text-xs font-black text-emerald-400">إنشاء باكدج سبلايز سريع لصف دراسي:</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                <input type="text" id="supQuickTitle" placeholder="اسم الباكدج (مثال: باكدج سبلايز 4 ابتدائي) *" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" required />
                <select id="supQuickStage" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option value="كي جي">كي جي (KG)</option>
                  <option value="ابتدائي" selected>المرحلة الابتدائية</option>
                  <option value="إعدادي">المرحلة الإعدادية</option>
                  <option value="ثانوي">المرحلة الثانوية</option>
                </select>
                <input type="text" id="supQuickGrade" placeholder="الصف الدراسي (مثال: الصف الرابع الابتدائي) *" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" required />
                <input type="text" id="supQuickContents" placeholder="محتويات الباكدج (مثال: 10 كراسات + أقلام + ألوان) *" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white sm:col-span-2 lg:col-span-1" required />
                <input type="number" min="0" step="1" id="supQuickBundlePrice" placeholder="السعر المجمّع (ج.م) *" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" required />
                <input type="number" min="0" step="1" id="supQuickOriginalPrice" placeholder="السعر قبل الخصم (اختياري)" class="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
                <input type="url" id="supQuickImageUrl" placeholder="رابط صورة الباكدج (اختياري) https://..." class="sm:col-span-2 text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" dir="ltr" />
                <button type="submit" class="bg-rose-600 hover:bg-rose-500 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5">
                  <i class="fa-solid fa-plus-circle"></i><span>إضافة باكدج السبلايز</span>
                </button>
              </div>
            </form>

            <div id="adminSuppliesDealsList" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
          </div>

        </div>

        <!-- ================================================= -->
        <!-- تبويب 3: أسعار الطباعة والتغليف والتوصيل           -->
        <!-- ================================================= -->
        <div id="adminTabRatesDelivery" class="hidden bg-slate-800 rounded-2xl p-5 border border-slate-700 max-w-3xl space-y-4">
          <div class="pb-3 border-b border-slate-700">
            <h3 class="text-base font-black text-white flex items-center gap-2">
              <i class="fa-solid fa-calculator text-sky-400"></i>
              <span>أسعار الطباعة والتغليف وخدمة التوصيل للمنزل</span>
            </h3>
            <p class="text-xs text-slate-400">تنعكس أي تعديلات هنا فوراً في حاسبة طباعة PDF وسلة الطلبات الذكية عبر السحابة.</p>
          </div>

          <form id="printingRatesForm" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">طباعة الورقة أبيض وأسود (ج.م):</label>
                <input type="number" step="0.05" min="0" id="rateBwPage" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">طباعة الورقة ألوان (ج.م):</label>
                <input type="number" step="0.10" min="0" id="rateColorPage" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">تغليف سلك حديد (ج.م):</label>
                <input type="number" step="0.50" min="0" id="rateBindingWire" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">تغليف بلاستيك (ج.م):</label>
                <input type="number" step="0.50" min="0" id="rateBindingPlastic" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">التدبيس (ج.م):</label>
                <input type="number" step="0.50" min="0" id="rateBindingStaple" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold" />
              </div>
              <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5">
                <label class="block text-xs font-black text-amber-300 mb-1">
                  <i class="fa-solid fa-motorcycle ml-1"></i> سعر التوصيل للمنزل (ج.م):
                </label>
                <input type="number" step="1" min="0" id="rateDeliveryFee" class="w-full text-xs bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-2 text-white font-black" />
                <p class="text-[10px] text-amber-200/80 mt-1">اجعله 0 إذا كان التوصيل مجانياً.</p>
              </div>
            </div>
            <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow flex items-center gap-2">
              <i class="fa-solid fa-floppy-disk"></i><span>حفظ تسعيرة الطباعة والتوصيل ونشرها فوراً</span>
            </button>
          </form>
        </div>

        <!-- ================================================= -->
        <!-- تبويب 4: إعدادات المتجر والنسخ الاحتياطي          -->
        <!-- ================================================= -->
        <div id="adminTabBackupSettings" class="hidden space-y-5">

          <!-- إعدادات التواصل والواتساب وعنوان المكتبة وخريطة جوجل -->
          <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-4">
            <div class="pb-3 border-b border-slate-700">
              <h3 class="text-base font-black text-white flex items-center gap-2">
                <i class="fa-solid fa-sliders text-emerald-400"></i>
                <span>إعدادات المتجر (أرقام الواتساب، العنوان، وخريطة جوجل)</span>
              </h3>
              <p class="text-xs text-slate-400">يتم تحديث أرقام التواصل وعنوان الفرع وزر Google Maps لجميع العملاء فوراً عبر السحابة.</p>
            </div>

            <form id="storeSettingsForm" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">رقم الواتساب الأساسي لاستقبال الطلبات:</label>
                  <input type="text" id="settingPrimaryWhatsapp" placeholder="01002968331" dir="ltr" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono" required />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف / الواتساب الثانوي:</label>
                  <input type="text" id="settingSecondaryWhatsapp" placeholder="01157706887" dir="ltr" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">نص عنوان المكتبة التفصيلي (يظهر في الفوتر):</label>
                <input type="text" id="settingStoreAddress" placeholder="اكتب عنوان فرع المكتبة بالتفصيل..." class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">رابط موقع المكتبة على خرائط جوجل (Google Maps URL):</label>
                <input type="url" id="settingStoreMapsUrl" placeholder="https://maps.google.com/?q=..." dir="ltr" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono" required />
              </div>
              <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow flex items-center gap-2">
                <i class="fa-solid fa-floppy-disk"></i><span>حفظ إعدادات المتجر ونشرها سحابياً</span>
              </button>
            </form>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-3">
              <div class="space-y-1.5">
                <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-download"></i>
                </div>
                <h4 class="text-sm font-black text-white">تصدير نسخة احتياطية JSON</h4>
                <p class="text-xs text-slate-400 leading-relaxed">
                  حمّل ملفاً يحتوي على كافة الكتب والمنتجات والأسعار وإعدادات الطباعة والتوصيل والبانر للاحتفاظ بنسخة آمنة.
                </p>
              </div>
              <button type="button" id="exportBackupJsonBtn" class="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2">
                <i class="fa-solid fa-file-export"></i><span>تصدير نسخة احتياطية JSON</span>
              </button>
            </div>

            <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-3">
              <div class="space-y-1.5">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-upload"></i>
                </div>
                <h4 class="text-sm font-black text-white">استيراد بيانات JSON</h4>
                <p class="text-xs text-slate-400 leading-relaxed">
                  ارفع ملف JSON محفوظ مسبقاً لاسترجاع أو تحديث كافة المنتجات والأسعار دفعة واحدة ومزامنتها سحابياً.
                </p>
              </div>
              <div>
                <input type="file" id="importBackupJsonInput" accept=".json,application/json" class="hidden" />
                <button type="button" id="importBackupJsonBtn" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2">
                  <i class="fa-solid fa-file-import"></i><span>استيراد بيانات JSON</span>
                </button>
              </div>
            </div>

            <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-3">
              <div class="space-y-1.5">
                <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h4 class="text-sm font-black text-white">تحميل المنتجات الافتراضية تلقائياً</h4>
                <p class="text-xs text-slate-400 leading-relaxed">
                  إعادة تحميل وحقن قائمة الكتب والأدوات وباكدجات السبلايز والهدايا الافتراضية وحفظها في Firebase فوراً.
                </p>
              </div>
              <button type="button" id="restoreDefaultsBtn" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2">
                <i class="fa-solid fa-rotate"></i><span>تحميل المنتجات الافتراضية تلقائياً</span>
              </button>
            </div>

          </div>

          <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-black text-white">توزيع المنتجات حسب الأقسام</h4>
              <button type="button" id="backupPrintReportBtn" class="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1">
                <i class="fa-solid fa-print"></i><span>طباعة بيان الأسعار الرسمي</span>
              </button>
            </div>
            <div id="backupCategoryBreakdown" class="grid grid-cols-2 sm:grid-cols-5 gap-2.5"></div>
          </div>
        </div>

      </div>
    </section>

    <!-- نافذة إضافة / تعديل المنتج الموحدة (ديناميكية) -->
    <div id="productEditorModal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3">
      <div class="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-slate-700 space-y-3 max-h-[92vh] overflow-y-auto custom-scroll">
        <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <h3 id="productModalTitle" class="text-sm sm:text-base font-black text-white">إضافة منتج جديد</h3>
          <button type="button" id="closeProductModalBtn" class="text-slate-400 hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form id="productEditorForm" class="space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-slate-300 mb-1">اسم المنتج أو الكتاب: *</label>
            <input type="text" id="prodTitle" placeholder="مثال: كتاب سلاح التلميذ رياضيات / كشكول سلك 100 ورقة" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" required />
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="block text-[11px] font-bold text-slate-300 mb-1">القسم الرئيسي: *</label>
              <select id="prodCategory" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold">
                <option value="books">كتب خارجية</option>
                <option value="stationery">أدوات مكتبية وكراريس</option>
                <option value="supplies">باكدجات سبلايز</option>
                <option value="gifts">هدايا وألعاب</option>
                <option value="printing">خدمات الطباعة</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-300 mb-1">حالة التوفر:</label>
              <select id="prodStock" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold">
                <option value="متوفر">متوفر</option>
                <option value="كمية محدودة">كمية محدودة</option>
                <option value="نفذت الكمية">نفذت الكمية</option>
              </select>
            </div>
          </div>

          <!-- حقول تعليمية تظهر فقط عند اختيار كتب خارجية أو باكدجات سبلايز -->
          <div id="prodEducationalFields" class="bg-slate-800/70 rounded-2xl p-3 border border-slate-700 space-y-2.5">
            <p class="text-[11px] font-black text-emerald-400">بيانات المرحلة الدراسية (للكتب والسبلايز):</p>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-bold text-slate-400 mb-1">المرحلة التعليمية:</label>
                <select id="prodStage" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white">
                  <option value="كي جي">كي جي (KG)</option>
                  <option value="ابتدائي">ابتدائي</option>
                  <option value="إعدادي">إعدادي</option>
                  <option value="ثانوي">ثانوي</option>
                  <option value="عام">عام</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 mb-1">الصف الدراسي:</label>
                <input type="text" id="prodGrade" placeholder="مثال: الصف الرابع الابتدائي" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 mb-1">المادة / محتوى الباكدج:</label>
                <input type="text" id="prodSubject" placeholder="مثال: رياضيات / لغة عربية" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-400 mb-1">دار النشر / السلسلة:</label>
                <input type="text" id="prodSeries" placeholder="مثال: المعاصر / سلاح التلميذ" class="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="block text-[11px] font-bold text-slate-300 mb-1">السعر الحالي (ج.م): *</label>
              <input type="number" min="0" step="0.5" id="prodPrice" placeholder="مثال: 150" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-black" required />
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-300 mb-1">السعر قبل الخصم (اختياري):</label>
              <input type="number" min="0" step="0.5" id="prodOriginalPrice" placeholder="مثال: 180" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2.5 items-center">
            <div>
              <label class="block text-[11px] font-bold text-slate-300 mb-1">شارة مميزة (اختياري):</label>
              <input type="text" id="prodBadge" placeholder="مثال: الأكثر طلباً / خصم 15%" class="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white" />
            </div>
            <label class="flex items-center gap-2 pt-4 text-xs font-bold text-amber-300 cursor-pointer">
              <input type="checkbox" id="prodIsHotDeal" class="w-4 h-4 rounded accent-rose-500" />
              <span>إضافة لشريط العروض والخصومات</span>
            </label>
          </div>

          <div>
            <label class="block text-[11px] font-bold text-slate-300 mb-1">رابط صورة المنتج (Image URL - اختياري):</label>
            <div class="flex items-center gap-2">
              <input type="url" id="prodImageUrl" placeholder="https://example.com/image.jpg" class="flex-1 text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" dir="ltr" />
              <img id="prodImagePreview" src="" alt="معاينة" class="hidden w-10 h-10 rounded-lg object-cover border border-slate-600 shrink-0" />
            </div>
          </div>

          <button type="submit" id="saveProductModalBtn" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl shadow-lg">
            حفظ المنتج ونشره في المتجر
          </button>
        </form>
      </div>
    </div>
  `;

  // ربط أحداث لوحة الإدارة الديناميكية
  document.getElementById("adminLogoutBtn")?.addEventListener("click", handleAdminLogout);
  document.getElementById("adminGeneratePdfBtn")?.addEventListener("click", generatePrintablePriceReport);
  document.getElementById("backupPrintReportBtn")?.addEventListener("click", generatePrintablePriceReport);
  document.getElementById("adminSaveAllPricesBtn")?.addEventListener("click", saveAllPricesFromTable);
  document.getElementById("adminTableSearch")?.addEventListener("input", renderAdminPricesTable);
  document.getElementById("adminCategoryFilter")?.addEventListener("change", renderAdminPricesTable);

  document.getElementById("adminAddNewBookBtn")?.addEventListener("click", () => openProductEditorModal(null));
  document.getElementById("closeProductModalBtn")?.addEventListener("click", closeProductEditorModal);
  document.getElementById("productEditorModal")?.addEventListener("click", (e) => {
    if (e.target.id === "productEditorModal") closeProductEditorModal();
  });
  document.getElementById("prodCategory")?.addEventListener("change", toggleProductModalEducationalFields);
  document.getElementById("prodImageUrl")?.addEventListener("input", updateProductModalImagePreview);
  document.getElementById("productEditorForm")?.addEventListener("submit", handleSaveProductModal);

  document.getElementById("printingRatesForm")?.addEventListener("submit", handleSavePrintingRates);
  document.getElementById("announcementForm")?.addEventListener("submit", handleSaveAnnouncement);
  document.getElementById("storeSettingsForm")?.addEventListener("submit", handleSaveStoreSettings);
  document.getElementById("quickToggleBannerBtn")?.addEventListener("click", handleQuickToggleAnnouncement);
  document.getElementById("quickSuppliesForm")?.addEventListener("submit", handleQuickAddSuppliesPackage);

  document.getElementById("exportBackupJsonBtn")?.addEventListener("click", exportStoreBackupJson);
  document.getElementById("importBackupJsonBtn")?.addEventListener("click", () => {
    document.getElementById("importBackupJsonInput")?.click();
  });
  document.getElementById("importBackupJsonInput")?.addEventListener("change", handleImportStoreBackupJson);
  document.getElementById("restoreDefaultsBtn")?.addEventListener("click", handleRestoreDefaultCatalog);

  document.querySelectorAll(".admin-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab-btn").forEach((b) => {
        b.classList.remove("active", "bg-emerald-600", "text-white");
        b.classList.add("bg-slate-800", "text-slate-300");
      });
      btn.classList.add("active", "bg-emerald-600", "text-white");
      btn.classList.remove("bg-slate-800", "text-slate-300");

      const tab = btn.dataset.adminTab;
      document.getElementById("adminTabProducts")?.classList.toggle("hidden", tab !== "products");
      document.getElementById("adminTabSuppliesDeals")?.classList.toggle("hidden", tab !== "suppliesDeals");
      document.getElementById("adminTabRatesDelivery")?.classList.toggle("hidden", tab !== "ratesDelivery");
      document.getElementById("adminTabBackupSettings")?.classList.toggle("hidden", tab !== "backupSettings");
    });
  });

  renderAdminPricesTable();
  renderAdminSuppliesDealsList();
  renderBackupCategoryBreakdown();
  populatePrintingRatesForm();
  populateAnnouncementForm();
  populateStoreSettingsForm();
  updateAdminStats();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleAdminLogout() {
  isAdminAuthenticated = false;
  activeAdminProfile = "";
  unmountAdminContainer();
  const publicScreen = document.getElementById("publicStorefront");
  if (publicScreen) publicScreen.classList.remove("hidden");
  refreshStorefrontViews();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToastNotification("تم تسجيل الخروج وتأمين لوحة الإدارة بنجاح.");
}

function renderAdminPricesTable() {
  const tbody = document.getElementById("adminPricesTableBody");
  const search = document.getElementById("adminTableSearch")?.value.toLowerCase().trim() || "";
  const catFilter = document.getElementById("adminCategoryFilter")?.value || "all";
  if (!tbody) return;

  const catLabels = {
    books: "كتب خارجية",
    stationery: "أدوات مكتبية",
    supplies: "سبلايز",
    gifts: "هدايا وألعاب",
    printing: "طباعة"
  };

  const filtered = currentBooks.filter((b) => {
    if (catFilter !== "all" && b.category !== catFilter) return false;
    const line = `${b.title} ${b.grade} ${b.subject} ${b.stage} ${b.series} ${b.category}`.toLowerCase();
    return line.includes(search);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="p-6 text-center text-slate-400 font-bold">
          لا توجد منتجات مطابقة في هذا القسم أو البحث. يمكنك إضافة منتج جديد أو تحميل البيانات الافتراضية.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered
    .map((b) => {
      const normalizedStock = b.stock === "متوفر بالمكتبة" ? "متوفر" : b.stock;
      const thumbUrl = resolveProductImage(b);
      const fallbackUrl = getFallbackThumbnailSvg(b);
      return `
      <tr class="hover:bg-slate-700/40 transition-colors">
        <td class="p-3 min-w-[200px]">
          <div class="flex items-center gap-2.5">
            <img src="${escapeHtml(thumbUrl)}" alt="" onerror="this.onerror=null; this.src='${fallbackUrl}';" class="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-700 shrink-0" />
            <div class="min-w-0">
              <div class="font-bold text-white truncate max-w-[210px]">${escapeHtml(b.title)}</div>
              <div class="text-[10px] text-slate-400 truncate">${escapeHtml(b.series || "")}</div>
            </div>
          </div>
        </td>
        <td class="p-3 text-slate-300 whitespace-nowrap">
          <span class="inline-block px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-bold text-emerald-300 mb-0.5">
            ${escapeHtml(catLabels[b.category] || b.category)}
          </span>
          <div class="text-[10px] text-slate-400">${escapeHtml(b.stage)} • ${escapeHtml(b.grade)}</div>
        </td>
        <td class="p-3 min-w-[165px]">
          <input
            type="url"
            id="adminImgInput_${escapeHtml(b.id)}"
            value="${escapeHtml(b.imageUrl || "")}"
            placeholder="رابط صورة المنتج..."
            dir="ltr"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-[11px] font-mono"
          />
        </td>
        <td class="p-3 whitespace-nowrap">
          <input
            type="number"
            step="0.5"
            min="0"
            id="adminPriceInput_${escapeHtml(b.id)}"
            value="${b.price}"
            class="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs"
          />
        </td>
        <td class="p-3">
          <select id="adminStockSelect_${escapeHtml(b.id)}" class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200">
            <option value="متوفر" ${normalizedStock === "متوفر" || normalizedStock === "تسليم فوري" ? "selected" : ""}>متوفر</option>
            <option value="كمية محدودة" ${normalizedStock === "كمية محدودة" || normalizedStock === "قيد التجهيز" ? "selected" : ""}>كمية محدودة</option>
            <option value="نفذت الكمية" ${normalizedStock === "نفذت الكمية" ? "selected" : ""}>نفذت الكمية</option>
          </select>
        </td>
        <td class="p-3 text-center whitespace-nowrap space-x-1 space-x-reverse">
          <button onclick="saveSingleBookRow('${escapeHtml(b.id)}')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1 px-2.5 rounded-lg">
            حفظ
          </button>
          <button onclick="openProductEditorModal('${escapeHtml(b.id)}')" title="تعديل كامل" class="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-1 px-2.5 rounded-lg">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button onclick="deleteBookRow('${escapeHtml(b.id)}')" title="حذف" class="bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs py-1 px-2 rounded-lg">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}

function saveSingleBookRow(bookId) {
  const item = currentBooks.find((b) => b.id === bookId);
  const priceInput = document.getElementById(`adminPriceInput_${bookId}`);
  const imgInput = document.getElementById(`adminImgInput_${bookId}`);
  const stockSelect = document.getElementById(`adminStockSelect_${bookId}`);
  if (!item || !priceInput) return;

  const newPrice = parseFloat(priceInput.value);
  if (isNaN(newPrice) || newPrice < 0) {
    showToastNotification("يرجى إدخال سعر صحيح!");
    return;
  }

  item.price = newPrice;
  if (imgInput) item.imageUrl = imgInput.value.trim();
  if (stockSelect) item.stock = stockSelect.value;

  persistBooksData();
  refreshStorefrontViews();
  showToastNotification(`تم حفظ وتحديث "${item.title}" لحظياً!`);
}

function deleteBookRow(bookId) {
  if (!confirm("هل تريد حذف هذا المنتج من المتجر؟")) return;
  currentBooks = currentBooks.filter((b) => b.id !== bookId);
  persistBooksData();
  refreshStorefrontViews();
  showToastNotification("تم حذف المنتج بنجاح.");
}

function saveAllPricesFromTable() {
  currentBooks.forEach((b) => {
    const pInput = document.getElementById(`adminPriceInput_${b.id}`);
    const iInput = document.getElementById(`adminImgInput_${b.id}`);
    const sSelect = document.getElementById(`adminStockSelect_${b.id}`);
    if (pInput) {
      const p = parseFloat(pInput.value);
      if (!isNaN(p) && p >= 0) b.price = p;
    }
    if (iInput) b.imageUrl = iInput.value.trim();
    if (sSelect) b.stock = sSelect.value;
  });

  persistBooksData();
  refreshStorefrontViews();
  showToastNotification("تمت مزامنة كافة التعديلات والأسعار والصور سحابياً!");
}

function toggleProductModalEducationalFields() {
  const category = document.getElementById("prodCategory")?.value || "books";
  const eduBox = document.getElementById("prodEducationalFields");
  if (!eduBox) return;
  const shouldShow = category === "books" || category === "supplies";
  eduBox.classList.toggle("hidden", !shouldShow);
}

function updateProductModalImagePreview() {
  const url = document.getElementById("prodImageUrl")?.value.trim() || "";
  const preview = document.getElementById("prodImagePreview");
  if (!preview) return;
  if (url) {
    preview.src = url;
    preview.classList.remove("hidden");
    preview.onerror = () => preview.classList.add("hidden");
  } else {
    preview.classList.add("hidden");
  }
}

function openProductEditorModal(bookId) {
  const modal = document.getElementById("productEditorModal");
  const titleHeading = document.getElementById("productModalTitle");
  const saveBtn = document.getElementById("saveProductModalBtn");
  if (!modal) return;

  editingProductId = bookId || null;
  const existing = bookId ? currentBooks.find((b) => b.id === bookId) : null;

  if (existing) {
    if (titleHeading) titleHeading.textContent = "تعديل بيانات المنتج";
    if (saveBtn) saveBtn.textContent = "حفظ التعديلات ومزامنتها فوراً";
    document.getElementById("prodTitle").value = existing.title || "";
    document.getElementById("prodCategory").value = existing.category || "books";
    document.getElementById("prodStock").value =
      existing.stock === "متوفر بالمكتبة" || existing.stock === "تسليم فوري"
        ? "متوفر"
        : existing.stock === "قيد التجهيز"
        ? "كمية محدودة"
        : existing.stock || "متوفر";
    document.getElementById("prodStage").value = existing.stage || "ابتدائي";
    document.getElementById("prodGrade").value = existing.grade || "";
    document.getElementById("prodSubject").value = existing.subject || "";
    document.getElementById("prodSeries").value = existing.series || "";
    document.getElementById("prodPrice").value = existing.price ?? 0;
    document.getElementById("prodOriginalPrice").value = existing.originalPrice || "";
    document.getElementById("prodBadge").value = existing.badge || "";
    document.getElementById("prodIsHotDeal").checked = Boolean(existing.isHotDeal);
    document.getElementById("prodImageUrl").value = existing.imageUrl || "";
  } else {
    if (titleHeading) titleHeading.textContent = "إضافة منتج أو كتاب جديد";
    if (saveBtn) saveBtn.textContent = "إضافة المنتج ونشره في المتجر";
    document.getElementById("productEditorForm")?.reset();
    document.getElementById("prodCategory").value = "books";
    document.getElementById("prodStock").value = "متوفر";
    document.getElementById("prodStage").value = "ابتدائي";
  }

  toggleProductModalEducationalFields();
  updateProductModalImagePreview();
  modal.classList.remove("hidden");
}

function closeProductEditorModal() {
  editingProductId = null;
  document.getElementById("productEditorModal")?.classList.add("hidden");
}

function handleSaveProductModal(e) {
  e.preventDefault();
  const title = document.getElementById("prodTitle")?.value.trim();
  const category = document.getElementById("prodCategory")?.value || "books";
  const stock = document.getElementById("prodStock")?.value || "متوفر";
  const isEdu = category === "books" || category === "supplies";

  const stage = isEdu ? (document.getElementById("prodStage")?.value || "ابتدائي") : "عام";
  const grade = isEdu
    ? (document.getElementById("prodGrade")?.value.trim() || "جميع الصفوف")
    : "جميع المراحل";
  const subject = isEdu
    ? (document.getElementById("prodSubject")?.value.trim() || (category === "supplies" ? "باكدج متكامل" : "عام"))
    : (category === "stationery" ? "أدوات مكتبية" : category === "gifts" ? "هدايا" : "طباعة");
  const series = document.getElementById("prodSeries")?.value.trim() || "مكتبة نهر العلم";

  const price = parseFloat(document.getElementById("prodPrice")?.value);
  const origRaw = parseFloat(document.getElementById("prodOriginalPrice")?.value);
  const originalPrice = !isNaN(origRaw) && origRaw > price ? origRaw : null;
  const badge = document.getElementById("prodBadge")?.value.trim() || (originalPrice ? "عرض خاص" : "");
  const isHotDeal = Boolean(document.getElementById("prodIsHotDeal")?.checked) || Boolean(originalPrice);
  const imageUrl = document.getElementById("prodImageUrl")?.value.trim() || "";

  if (!title || isNaN(price) || price < 0) {
    showToastNotification("يرجى إدخال اسم المنتج والسعر بشكل صحيح!");
    return;
  }

  if (editingProductId) {
    const target = currentBooks.find((b) => b.id === editingProductId);
    if (target) {
      Object.assign(target, {
        title,
        category,
        stock,
        stage,
        grade,
        subject,
        series,
        price,
        originalPrice,
        badge,
        isHotDeal,
        imageUrl
      });
      showToastNotification(`تم تعديل "${title}" ومزامنته لحظياً!`);
    }
  } else {
    const newItem = {
      id: `item-${Date.now()}`,
      title,
      category,
      stock,
      stage,
      grade,
      subject,
      series,
      price,
      originalPrice,
      badge: badge || "مضاف حديثاً",
      isHotDeal,
      imageUrl,
      clicks: 1
    };
    currentBooks.unshift(newItem);
    showToastNotification(`تمت إضافة "${title}" إلى المتجر بنجاح!`);
  }

  persistBooksData();
  refreshStorefrontViews();
  closeProductEditorModal();
}

function renderAdminSuppliesDealsList() {
  const container = document.getElementById("adminSuppliesDealsList");
  if (!container) return;

  const dealsAndSupplies = currentBooks.filter((b) => b.category === "supplies" || b.isHotDeal);
  if (dealsAndSupplies.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 col-span-2 text-center py-4">لا توجد باكدجات سبلايز أو عروض حالياً.</p>`;
    return;
  }

  container.innerHTML = dealsAndSupplies
    .map((item) => `
      <div class="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-700 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${escapeHtml(resolveProductImage(item))}" alt="" onerror="this.onerror=null; this.src='${getFallbackThumbnailSvg(item)}';" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700" />
          <div class="min-w-0 space-y-0.5">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ${item.category === "supplies" ? "باكدج سبلايز" : "عرض خاص"}
              </span>
              <span class="text-[10px] text-slate-400 truncate">${escapeHtml(item.grade)}</span>
            </div>
            <h5 class="text-xs font-black text-white truncate">${escapeHtml(item.title)}</h5>
            <div class="text-xs font-black text-emerald-400">
              ${item.price} ج.م
              ${item.originalPrice ? `<span class="text-[10px] text-slate-500 line-through mr-1">${item.originalPrice} ج.م</span>` : ""}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick="openProductEditorModal('${escapeHtml(item.id)}')" title="تعديل الباكدج" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg">
            تعديل
          </button>
          <button onclick="toggleHotDealFlag('${escapeHtml(item.id)}')" title="تبديل العرض" class="${item.isHotDeal ? "bg-amber-500 text-slate-950" : "bg-slate-700 text-slate-300"} text-xs font-bold px-2 py-1.5 rounded-lg">
            <i class="fa-solid fa-fire"></i>
          </button>
          <button onclick="deleteBookRow('${escapeHtml(item.id)}')" title="حذف" class="bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold px-2 py-1.5 rounded-lg">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `)
    .join("");
}

function toggleHotDealFlag(bookId) {
  const item = currentBooks.find((b) => b.id === bookId);
  if (!item) return;
  item.isHotDeal = !item.isHotDeal;
  persistBooksData();
  refreshStorefrontViews();
  showToastNotification(item.isHotDeal ? `تم إبراز "${item.title}" في شريط العروض.` : `تمت إزالة "${item.title}" من شريط العروض.`);
}

function handleQuickAddSuppliesPackage(e) {
  e.preventDefault();
  const title = document.getElementById("supQuickTitle")?.value.trim();
  const stage = document.getElementById("supQuickStage")?.value || "ابتدائي";
  const grade = document.getElementById("supQuickGrade")?.value.trim();
  const contentsText = document.getElementById("supQuickContents")?.value.trim() || "باكدج متكامل";
  const price = parseFloat(document.getElementById("supQuickBundlePrice")?.value);
  const origRaw = parseFloat(document.getElementById("supQuickOriginalPrice")?.value);
  const imageUrl = document.getElementById("supQuickImageUrl")?.value.trim() || "";

  if (!title || !grade || isNaN(price) || price < 0) {
    showToastNotification("يرجى إدخال اسم الباكدج والصف والسعر المجمّع!");
    return;
  }

  const originalPrice = !isNaN(origRaw) && origRaw > price ? origRaw : null;
  const discountPct = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  currentBooks.unshift({
    id: `sup-${Date.now()}`,
    title,
    category: "supplies",
    stage,
    grade,
    subject: contentsText,
    contents: contentsText,
    series: "عروض نهر العلم",
    price,
    originalPrice,
    stock: "متوفر",
    badge: discountPct > 0 ? `خصم ${discountPct}%` : "باكدج جاهز",
    imageUrl,
    isHotDeal: true,
    clicks: 1
  });

  persistBooksData();
  refreshStorefrontViews();
  document.getElementById("quickSuppliesForm")?.reset();
  showToastNotification(`تم نشر باكدج السبلايز "${title}" بسعر ${price} ج.م!`);
}

function populatePrintingRatesForm() {
  const rateBw = document.getElementById("rateBwPage");
  const rateColor = document.getElementById("rateColorPage");
  const rateStaple = document.getElementById("rateBindingStaple");
  const ratePlastic = document.getElementById("rateBindingPlastic");
  const rateWire = document.getElementById("rateBindingWire");
  const rateDelivery = document.getElementById("rateDeliveryFee");

  if (rateBw) rateBw.value = currentPrintRates.bwPage;
  if (rateColor) rateColor.value = currentPrintRates.colorPage;
  if (rateStaple) rateStaple.value = currentPrintRates.bindingStaple;
  if (ratePlastic) ratePlastic.value = currentPrintRates.bindingPlastic;
  if (rateWire) rateWire.value = currentPrintRates.bindingWire;
  if (rateDelivery) rateDelivery.value = currentPrintRates.deliveryFee ?? 20;
}

function handleSavePrintingRates(e) {
  e.preventDefault();
  const parseNonNeg = (id, fallback) => {
    const v = parseFloat(document.getElementById(id)?.value);
    return !isNaN(v) && v >= 0 ? v : fallback;
  };

  currentPrintRates.bwPage = parseNonNeg("rateBwPage", 0.75);
  currentPrintRates.colorPage = parseNonNeg("rateColorPage", 2.50);
  currentPrintRates.bindingStaple = parseNonNeg("rateBindingStaple", 3.00);
  currentPrintRates.bindingPlastic = parseNonNeg("rateBindingPlastic", 15.00);
  currentPrintRates.bindingWire = parseNonNeg("rateBindingWire", 25.00);
  currentPrintRates.deliveryFee = parseNonNeg("rateDeliveryFee", 20.00);

  persistPrintRates();
  updatePrintCalculator();
  renderCartDrawer();
  showToastNotification("تم حفظ أسعار الطباعة والتغليف والتوصيل وتحديث المتجر فوراً!");
}

function updateBannerToggleUi() {
  const toggleBtn = document.getElementById("quickToggleBannerBtn");
  const checkbox = document.getElementById("adminBannerActiveCheckbox");
  const isActive = Boolean(currentAnnouncement.active);

  if (checkbox) checkbox.checked = isActive;
  if (toggleBtn) {
    if (isActive) {
      toggleBtn.className = "bg-rose-600 hover:bg-rose-500 text-white font-black text-xs py-2 px-4 rounded-xl shadow flex items-center gap-2 transition-all";
      toggleBtn.innerHTML = `<i class="fa-solid fa-eye-slash"></i><span>إيقاف الشريط الآن (نشط حالياً)</span>`;
    } else {
      toggleBtn.className = "bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2 px-4 rounded-xl shadow flex items-center gap-2 transition-all";
      toggleBtn.innerHTML = `<i class="fa-solid fa-eye"></i><span>تفعيل الشريط الآن (متوقف حالياً)</span>`;
    }
  }
}

function handleQuickToggleAnnouncement() {
  currentAnnouncement.active = !currentAnnouncement.active;
  persistAnnouncement();
  renderAnnouncementBanner();
  updateBannerToggleUi();
  updateAdminStats();
  showToastNotification(currentAnnouncement.active ? "تم تفعيل شريط التنويه العلوي للزوار!" : "تم إيقاف إظهار شريط التنويه العلوي.");
}

function populateAnnouncementForm() {
  const input = document.getElementById("adminAnnouncementInput");
  const bannerImg = document.getElementById("adminBannerImageInput");
  const badge = document.getElementById("adminBadgeInput");

  if (input) input.value = currentAnnouncement.text || "";
  if (bannerImg) bannerImg.value = currentAnnouncement.bannerImageUrl || "";
  if (badge) badge.value = currentAnnouncement.badge || "";
  updateBannerToggleUi();
}

function handleSaveAnnouncement(e) {
  e.preventDefault();
  currentAnnouncement.text = document.getElementById("adminAnnouncementInput")?.value.trim() || "";
  currentAnnouncement.bannerImageUrl = document.getElementById("adminBannerImageInput")?.value.trim() || "";
  currentAnnouncement.badge = document.getElementById("adminBadgeInput")?.value.trim() || "تنويه";
  currentAnnouncement.active = document.getElementById("adminBannerActiveCheckbox")?.checked ?? true;

  persistAnnouncement();
  renderAnnouncementBanner();
  updateBannerToggleUi();
  updateAdminStats();
  showToastNotification("تم نشر شريط التنويه والإعلان وتحديثه للزوار!");
}

function renderBackupCategoryBreakdown() {
  const box = document.getElementById("backupCategoryBreakdown");
  if (!box) return;
  const counts = {
    books: { label: "الكتب الخارجية", count: 0 },
    stationery: { label: "الأدوات والكراريس", count: 0 },
    supplies: { label: "باكدجات السبلايز", count: 0 },
    gifts: { label: "الهدايا والألعاب", count: 0 },
    printing: { label: "خدمات الطباعة", count: 0 }
  };
  currentBooks.forEach((b) => {
    if (counts[b.category]) counts[b.category].count += 1;
  });
  box.innerHTML = Object.values(counts)
    .map((c) => `
      <div class="bg-slate-900 rounded-xl p-3 border border-slate-700 text-center">
        <div class="text-lg font-black text-emerald-400">${c.count}</div>
        <div class="text-[11px] font-bold text-slate-300 mt-0.5">${c.label}</div>
      </div>
    `)
    .join("");
}

function populateStoreSettingsForm() {
  const pWa = document.getElementById("settingPrimaryWhatsapp");
  const sWa = document.getElementById("settingSecondaryWhatsapp");
  const addr = document.getElementById("settingStoreAddress");
  const maps = document.getElementById("settingStoreMapsUrl");

  if (pWa) pWa.value = currentStoreSettings.primaryWhatsapp || DEFAULT_STORE_SETTINGS.primaryWhatsapp;
  if (sWa) sWa.value = currentStoreSettings.secondaryWhatsapp || DEFAULT_STORE_SETTINGS.secondaryWhatsapp;
  if (addr) addr.value = currentStoreSettings.address || DEFAULT_STORE_SETTINGS.address;
  if (maps) maps.value = currentStoreSettings.mapsUrl || DEFAULT_STORE_SETTINGS.mapsUrl;
}

function handleSaveStoreSettings(e) {
  e.preventDefault();
  const primary = document.getElementById("settingPrimaryWhatsapp")?.value.trim() || DEFAULT_STORE_SETTINGS.primaryWhatsapp;
  const secondary = document.getElementById("settingSecondaryWhatsapp")?.value.trim() || DEFAULT_STORE_SETTINGS.secondaryWhatsapp;
  const address = document.getElementById("settingStoreAddress")?.value.trim() || DEFAULT_STORE_SETTINGS.address;
  const mapsUrl = document.getElementById("settingStoreMapsUrl")?.value.trim() || DEFAULT_STORE_SETTINGS.mapsUrl;

  currentStoreSettings = {
    primaryWhatsapp: primary,
    secondaryWhatsapp: secondary,
    address,
    mapsUrl
  };

  persistStoreSettings();
  applyStoreSettingsToPublicUI();
  renderCatalogGrid();
  showToastNotification("تم حفظ إعدادات المتجر والواتساب والعنوان ونشرها سحابياً!");
}

function exportStoreBackupJson() {
  const payload = {
    app: "مكتبة نهر العلم - إدارة أ/ إيهاب",
    version: "2.2.0",
    exportedAt: new Date().toISOString(),
    books: currentBooks,
    printRates: currentPrintRates,
    announcement: currentAnnouncement,
    storeSettings: currentStoreSettings
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateTag = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `nahr-alelm-backup-${dateTag}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToastNotification("تم تصدير النسخة الاحتياطية JSON بنجاح!");
}

function handleImportStoreBackupJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const rawBooks = Array.isArray(parsed) ? parsed : parsed.books;
      const normalized = normalizeFirebaseBooks(rawBooks);

      if (normalized.length === 0) {
        showToastNotification("الملف لا يحتوي على قائمة منتجات صالحة!");
        return;
      }

      currentBooks = normalized;
      if (parsed.printRates && typeof parsed.printRates === "object") {
        currentPrintRates = { ...DEFAULT_PRINT_RATES, ...parsed.printRates };
        persistPrintRates();
        populatePrintingRatesForm();
        updatePrintCalculator();
      }
      if (parsed.announcement && typeof parsed.announcement === "object") {
        currentAnnouncement = { ...DEFAULT_ANNOUNCEMENT, ...parsed.announcement };
        persistAnnouncement();
        populateAnnouncementForm();
        renderAnnouncementBanner();
      }
      if (parsed.storeSettings && typeof parsed.storeSettings === "object") {
        currentStoreSettings = { ...DEFAULT_STORE_SETTINGS, ...parsed.storeSettings };
        persistStoreSettings();
        populateStoreSettingsForm();
        applyStoreSettingsToPublicUI();
      }

      persistBooksData();
      refreshStorefrontViews();
      showToastNotification(`تم استيراد ${currentBooks.length} منتج ومزامنتها مع Firebase بنجاح!`);
    } catch (_) {
      showToastNotification("تعذر قراءة ملف JSON، تأكد من صلاحية الملف.");
    } finally {
      e.target.value = "";
    }
  };
  reader.readAsText(file);
}

function handleRestoreDefaultCatalog() {
  if (!confirm("هل تريد تحميل القائمة الافتراضية الكاملة للمنتجات ومزامنتها مع قاعدة البيانات؟")) return;
  currentBooks = DEFAULT_BOOKS.map((b) => ({ ...b }));
  persistBooksData();
  refreshStorefrontViews();
  showToastNotification(`تم تحميل ${currentBooks.length} منتج افتراضي وحفظها في Firebase!`);
}

function updateAdminStats() {
  const statTotal = document.getElementById("statTotalBooks");
  const statSupplies = document.getElementById("statSuppliesDeals");
  const statActiveBanners = document.getElementById("statActiveBanners");

  if (statTotal) statTotal.textContent = String(currentBooks.length);
  if (statSupplies) {
    const count = currentBooks.filter((b) => b.category === "supplies" || b.isHotDeal).length;
    statSupplies.textContent = String(count);
  }
  if (statActiveBanners) {
    statActiveBanners.textContent = currentAnnouncement.active ? "نشط للزوار" : "متوقف";
  }
}

function generatePrintablePriceReport() {
  const reportArea = document.getElementById("printableReportArea");
  if (!reportArea) return;

  const today = new Date().toLocaleDateString("ar-EG");
  const rowsHtml = currentBooks
    .map((b, i) => `
      <tr class="border-b border-slate-200">
        <td class="p-2 border border-slate-300 font-bold">${i + 1}</td>
        <td class="p-2 border border-slate-300 font-bold">${escapeHtml(b.title)}</td>
        <td class="p-2 border border-slate-300">${escapeHtml(b.stage)} - ${escapeHtml(b.grade)}</td>
        <td class="p-2 border border-slate-300">${escapeHtml(b.series)}</td>
        <td class="p-2 border border-slate-300 font-black text-emerald-800">${b.price} ج.م</td>
      </tr>
    `)
    .join("");

  reportArea.innerHTML = `
    <div class="p-6 max-w-4xl mx-auto space-y-4">
      <div class="flex items-center justify-between border-b-2 border-slate-800 pb-3">
        <div>
          <h1 class="text-xl font-black">مكتبة نهر العلم - إدارة أ/ إيهاب</h1>
          <p class="text-xs">بيان أسعار الكتب الخارجية والأدوات وباكدجات السبلايز</p>
        </div>
        <div class="text-left text-xs font-bold">
          <p>هاتف وواتساب: 01002968331 - 01157706887</p>
          <p>تاريخ الإصدار: ${today}</p>
        </div>
      </div>
      <table class="w-full text-right text-xs border-collapse border border-slate-300">
        <thead>
          <tr class="bg-slate-100 border-b border-slate-300">
            <th class="p-2 border border-slate-300">#</th>
            <th class="p-2 border border-slate-300">المنتج / الكتاب</th>
            <th class="p-2 border border-slate-300">المرحلة والصف</th>
            <th class="p-2 border border-slate-300">دار النشر / السلسلة</th>
            <th class="p-2 border border-slate-300">السعر الرسمي</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;

  reportArea.classList.remove("hidden");
  reportArea.style.display = "block";
  window.print();
  setTimeout(() => {
    reportArea.classList.add("hidden");
    reportArea.style.display = "none";
    reportArea.innerHTML = "";
  }, 800);
}

// =========================================================================
// 14. إشعارات التطبيق العائمة (Toast Notifications)
// =========================================================================
function showToastNotification(msg) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "fixed top-16 inset-x-4 max-w-sm mx-auto z-50 bg-slate-900/95 text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 transform transition-all duration-300 -translate-y-10 opacity-0 pointer-events-none";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i><span>${escapeHtml(msg)}</span>`;
  toast.classList.remove("-translate-y-10", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-10", "opacity-0");
  }, 3000);
}

// =========================================================================
// 15. نقطة تشغيل التطبيق وربط كافة الأحداث (Bootstrap)
// =========================================================================
function selectMainCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll(".main-cat-tab").forEach((btn) => {
    const isActive = btn.dataset.category === cat;
    btn.classList.toggle("active", isActive);
    btn.classList.toggle("bg-brand-navy", isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("shadow-md", isActive);
    btn.classList.toggle("bg-white", !isActive);
    btn.classList.toggle("text-slate-700", !isActive);
    btn.classList.toggle("border", !isActive);
    btn.classList.toggle("border-slate-200", !isActive);
  });

  toggleEducationalFiltersVisibility();
  populateDropdownFilters();
  renderCatalogGrid();
}

function bootStorefront() {
  // تهيئة البيانات والملحقات فوراً مع عزل الأخطاء لضمان ظهور المنتجات
  loadInitialState();
  try {
    initializeFirebase();
  } catch (err) {
    isCloudSyncLoading = false;
    console.warn("Firebase init notice:", err);
  }
  try {
    registerServiceWorkerSafely();
  } catch (_) {}
  renderAnnouncementBanner();
  applyStoreSettingsToPublicUI();
  toggleEducationalFiltersVisibility();
  populateDropdownFilters();
  renderHotDeals();
  renderCatalogGrid();
  updateCartBadges();
  updatePrintCalculator();
  setupHiddenAdminTrigger();
  handleInstallButtonVisibility();
  resolveBestApkDownloadUrl().catch(() => {});

  document.getElementById("noResultsRequestWhatsAppBtn")?.addEventListener("click", openRequestMissingItemWhatsApp);
  document.getElementById("bottomRequestWhatsAppBtn")?.addEventListener("click", openRequestMissingItemWhatsApp);

  // الاحتفاظ بحدث PWA اختيارياً مع إبقاء زر التثبيت مخصصاً للتحميل المباشر لملف APK
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    handleInstallButtonVisibility();
  });

  const handleDirectApkDownloadFeedback = (anchorEl) => {
    applyApkAnchorState(anchorEl);
    showToastNotification("بدأ التحميل المباشر للتطبيق (APK)... افتحه للتثبيت (ولو وجدت نسخة قديمة جداً احذفها أولاً).");
  };

  const installAppBtn = document.getElementById("installAppBtn");
  installAppBtn?.addEventListener("click", () => {
    handleDirectApkDownloadFeedback(installAppBtn);
  });

  const footerApkBtn = document.getElementById("footerApkDownloadBtn");
  footerApkBtn?.addEventListener("click", () => {
    handleDirectApkDownloadFeedback(footerApkBtn);
  });

  // أحداث التبويب الرئيسي
  document.querySelectorAll(".main-cat-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectMainCategory(btn.dataset.category || "all");
    });
  });

  // زر عرض باكدجات السبلايز من قسم العروض
  document.getElementById("viewAllSuppliesDealsBtn")?.addEventListener("click", () => {
    selectMainCategory("supplies");
    document.getElementById("mainCategoryTabs")?.scrollIntoView({ behavior: "smooth" });
  });

  // أحداث شريط البحث الفوري + أزرار البحث السريع
  const searchInput = document.getElementById("liveSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value || "";
    if (clearSearchBtn) clearSearchBtn.classList.toggle("hidden", !searchQuery);
    renderCatalogGrid();
  });

  document.querySelectorAll(".quick-search-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const term = chip.dataset.searchChip || "";
      searchQuery = term;
      if (searchInput) searchInput.value = term;
      if (clearSearchBtn) clearSearchBtn.classList.toggle("hidden", !term);
      selectMainCategory("all");
      document.getElementById("catalogGrid")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  clearSearchBtn?.addEventListener("click", () => {
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    renderCatalogGrid();
  });

  // أحداث الفلاتر الأربعة المترابطة ديناميكياً
  document.getElementById("stageSelect")?.addEventListener("change", () => {
    populateDropdownFilters();
    renderCatalogGrid();
  });
  document.getElementById("gradeSelect")?.addEventListener("change", () => {
    populateDropdownFilters();
    renderCatalogGrid();
  });
  document.getElementById("subjectSelect")?.addEventListener("change", renderCatalogGrid);
  document.getElementById("publisherSelect")?.addEventListener("change", renderCatalogGrid);

  const resetAllFilters = () => {
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
    const stageEl = document.getElementById("stageSelect");
    const gradeEl = document.getElementById("gradeSelect");
    const subjEl = document.getElementById("subjectSelect");
    const pubEl = document.getElementById("publisherSelect");
    if (stageEl) stageEl.value = "all";
    if (gradeEl) gradeEl.value = "all";
    if (subjEl) subjEl.value = "all";
    if (pubEl) pubEl.value = "all";
    selectMainCategory("all");
  };

  document.getElementById("resetFiltersBtn")?.addEventListener("click", () => {
    document.getElementById("stageSelect").value = "all";
    document.getElementById("gradeSelect").value = "all";
    document.getElementById("subjectSelect").value = "all";
    document.getElementById("publisherSelect").value = "all";
    populateDropdownFilters();
    renderCatalogGrid();
  });
  document.getElementById("resetFromNoticeBtn")?.addEventListener("click", resetAllFilters);

  // أحداث سلة الطلبات والتوصيل (Slide-over Drawer) + نافذة الطباعة (Modal)
  const syncBodyModalLock = () => {
    const cartEl = document.getElementById("cartDrawer");
    const printEl = document.getElementById("printModal");
    const anyOpen =
      (cartEl && cartEl.style.display === "flex") ||
      (printEl && printEl.style.display === "flex");
    document.body.classList.toggle("overflow-hidden", Boolean(anyOpen));
  };

  let cartCloseTimer = null;
  const openCart = () => {
    if (cartCloseTimer) {
      clearTimeout(cartCloseTimer);
      cartCloseTimer = null;
    }
    const cartEl = document.getElementById("cartDrawer");
    const cartCard = document.getElementById("cartModalCard");
    if (cartEl) {
      cartEl.classList.remove("hidden");
      cartEl.style.display = "flex";
    }
    if (cartCard) {
      cartCard.classList.add("-translate-x-full");
      const slideIn = () => cartCard.classList.remove("-translate-x-full");
      if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => window.requestAnimationFrame(slideIn));
      } else {
        setTimeout(slideIn, 16);
      }
    }
    syncBodyModalLock();
    renderCartDrawer();
  };
  const closeCart = (immediate = false) => {
    const cartEl = document.getElementById("cartDrawer");
    const cartCard = document.getElementById("cartModalCard");
    if (cartCard) {
      cartCard.classList.add("-translate-x-full");
    }
    const finishHide = () => {
      if (cartEl) {
        cartEl.classList.add("hidden");
        cartEl.style.display = "none";
      }
      syncBodyModalLock();
    };
    if (immediate || !cartEl || cartEl.style.display !== "flex") {
      finishHide();
    } else {
      cartCloseTimer = setTimeout(finishHide, 260);
    }
  };

  const openPrint = () => {
    const printEl = document.getElementById("printModal");
    if (printEl) {
      printEl.classList.remove("hidden");
      printEl.style.display = "flex";
    }
    syncBodyModalLock();
    updatePrintCalculator();
    ensurePdfJsLoaded().catch(() => {});
  };
  const closePrint = () => {
    const printEl = document.getElementById("printModal");
    if (printEl) {
      printEl.classList.add("hidden");
      printEl.style.display = "none";
    }
    syncBodyModalLock();
  };

  // تأكيد إخفاء النوافذ المنبثقة عند التهيئة
  closeCart(true);
  closePrint();

  document.getElementById("openCartBtn")?.addEventListener("click", openCart);
  document.getElementById("navBottomCart")?.addEventListener("click", openCart);
  document.getElementById("closeCartBtn")?.addEventListener("click", () => closeCart(false));
  document.getElementById("browseBooksFromCartBtn")?.addEventListener("click", () => closeCart(false));
  document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    if (confirm("هل ترغب في إفراغ السلة بالكامل؟")) clearCart();
  });
  document.getElementById("checkoutWhatsAppBtn")?.addEventListener("click", sendCartOrderWhatsApp);

  document.querySelectorAll('input[name="deliveryMethod"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const addressWrapper = document.getElementById("cartDeliveryAddressWrapper");
      if (addressWrapper) {
        addressWrapper.classList.toggle("hidden", e.target.value !== "delivery");
      }
      renderCartDrawer();
    });
  });

  // إغلاق النوافذ المنبثقة عند الضغط على الخلفية أو زر Escape
  document.getElementById("cartDrawer")?.addEventListener("click", (e) => {
    if (e.target.id === "cartDrawer") closeCart(false);
  });
  document.getElementById("printModal")?.addEventListener("click", (e) => {
    if (e.target.id === "printModal") closePrint();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart(false);
      closePrint();
    }
  });

  // أحداث الطباعة الذكية (PDF.js يُحمّل تلقائياً عند فتح النافذة)
  document.getElementById("openPrintModalBtn")?.addEventListener("click", openPrint);
  document.getElementById("heroPrintBtn")?.addEventListener("click", openPrint);
  document.getElementById("navBottomPrint")?.addEventListener("click", openPrint);
  document.getElementById("printingTabOpenCalcBtn")?.addEventListener("click", openPrint);
  document.getElementById("closePrintModalBtn")?.addEventListener("click", closePrint);

  ["calcPagesCount", "calcCopiesCount", "calcColorType", "calcBindingType"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", updatePrintCalculator);
    document.getElementById(id)?.addEventListener("change", updatePrintCalculator);
  });

  document.getElementById("printDocInput")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) handlePrintFileSelection(file);
  });
  document.getElementById("sendPrintOrderWhatsAppBtn")?.addEventListener("click", sendPrintOrderWhatsApp);

  // أزرار المشاركة السريعة
  document.getElementById("headerShareBtn")?.addEventListener("click", shareLibraryLink);
  document.getElementById("heroShareBtn")?.addEventListener("click", shareLibraryLink);
  document.getElementById("footerShareBtn")?.addEventListener("click", shareLibraryLink);

  // أزرار الشريط السفلي والتحديث
  document.getElementById("navBottomBooks")?.addEventListener("click", () => {
    selectMainCategory("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("navBottomSupplies")?.addEventListener("click", () => {
    selectMainCategory("supplies");
    document.getElementById("mainCategoryTabs")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("navRefreshBtn")?.addEventListener("click", async () => {
    const icon = document.getElementById("refreshIcon");
    if (icon) icon.classList.add("fa-spin");

    if (navigator.onLine) {
      if ("serviceWorker" in navigator) {
        try {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) await reg.update();
        } catch (_) {}
      }
      if (window.AndroidApp && typeof window.AndroidApp.reloadLatestOta === "function") {
        window.AndroidApp.reloadLatestOta();
        return;
      }
      if (window.location.protocol.startsWith("http")) {
        window.location.reload();
        return;
      }
    }

    setTimeout(() => {
      if (icon) icon.classList.remove("fa-spin");
      loadInitialState();
      refreshStorefrontViews();
      showToastNotification("تم تحديث قائمة الأسعار والمنتجات بنجاح!");
    }, 550);
  });

  document.getElementById("dismissBannerBtn")?.addEventListener("click", () => {
    document.getElementById("liveAnnouncementBanner")?.classList.add("hidden");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootStorefront);
} else {
  bootStorefront();
}
