/**
 * Nahr Al-Elm Library (مكتبة نهر العلم - إدارة أ/ إيهاب)
 * Core Application Engine: PWA Lifecycle, Dynamic Over-The-Air (OTA) Updates,
 * Conditional Native APK Installer Detection, Store Catalog & Smart WhatsApp Deep Links.
 */

// ==========================================
// 1. Store Catalog Data Architecture
// ==========================================
const STORE_DATA = {
  books: {
    title: "الكتب الخارجية لجميع المراحل الدراسية",
    description: "أحدث سلاسل الكتب المعتمدة رسمياً من وزارة التربية والتعليم والأزهر الشريف",
    subFilters: ["الكل", "ابتدائي", "إعدادي", "ثانوي", "أزهري", "لغات"],
    items: [
      {
        id: "b-01",
        title: "كتاب المعاصر في الرياضيات (Math)",
        category: "كتب خارجية",
        sub: "لغات",
        stage: "ثانوي / إعدادي",
        edition: "نسخة أصلية معتمدة مع بنك الأسئلة",
        priceRange: "حسب الصف الدراسي",
        stock: "متوفر بجميع المراحل",
        badge: "الأكثر طلباً",
        badgeColor: "bg-emerald-500",
        description: "سلسلة المعاصر المعتمدة في الرياضيات واللغات للابتدائي والإعدادي والثانوي مع كراسة التقويم المستمر وبنك الأسئلة.",
        icon: "fa-calculator"
      },
      {
        id: "b-02",
        title: "سلسلة الامتحان في المواد العلمية والأدبية",
        category: "كتب خارجية",
        sub: "ثانوي",
        stage: "المرحلة الثانوية",
        edition: "المنهج المعتمد كامل مع نماذج البوكليت",
        priceRange: "سعر رسمي معتمد",
        stock: "متوفر بالمكتبة",
        badge: "ثانوية عامة",
        badgeColor: "bg-blue-600",
        description: "كتب الامتحان في الفيزياء والكيمياء والأحياء والتاريخ والجغرافيا واللغة العربية مع نماذج امتحانات البوكليت وإجاباتها النموذجية.",
        icon: "fa-atom"
      },
      {
        id: "b-03",
        title: "سلسلة سلاح التلميذ للمرحلة الابتدائية",
        category: "كتب خارجية",
        sub: "ابتدائي",
        stage: "من الأول حتى السادس الابتدائي",
        edition: "إصدار مخصص للمرحلة الابتدائية والأنشطة",
        priceRange: "أفضل سعر للمرحلة",
        stock: "متوفر كامل المواد",
        badge: "ابتدائي متميز",
        badgeColor: "bg-amber-500",
        description: "الشرح الأبسط والمحبب للأطفال في العربي والحساب والدراسات والعلوم، تدريبات مكثفة وتلوين وشيتات مراجعة أسبوعية.",
        icon: "fa-graduation-cap"
      },
      {
        id: "b-04",
        title: "سلسلة الأضواء في كافة المواد التعليمية",
        category: "كتب خارجية",
        sub: "إعدادي",
        stage: "ابتدائي وإعدادي وثانوي",
        edition: "شامل المنهج الوزاري والمهام الأدائية",
        priceRange: "أسعار مناسبة",
        stock: "متوفر بالمكتبة",
        badge: "شامل المنهج",
        badgeColor: "bg-teal-600",
        description: "تغطية كاملة للمنهج الوزاري والمهام الأدائية واختبارات الشهور التراكمية مع إتاحة كود بنك الأسئلة والمنصة الرقمية.",
        icon: "fa-lightbulb"
      },
      {
        id: "b-05",
        title: "كتاب نيوتن في الفيزياء (الصف الثالث الثانوي)",
        category: "كتب خارجية",
        sub: "ثانوي",
        stage: "الصف الثالث الثانوي",
        edition: "بنك الأسئلة الشامل ونماذج الامتحانات",
        priceRange: "سعر خاص للطلاب",
        stock: "متوفر كميات",
        badge: "فيزياء ثانوية",
        badgeColor: "bg-indigo-600",
        description: "أقوى بنك أسئلة وتدريبات وأفكار امتحانات الأعوام السابقة في مادة الفيزياء للثانوية العامة طبقاً لمواصفات المركز القومي للامتحانات.",
        icon: "fa-bolt"
      },
      {
        id: "b-06",
        title: "سلسلة المرشد في العلوم الشرعية والعربية",
        category: "كتب خارجية",
        sub: "أزهري",
        stage: "المرحلة الأزهرية (إعدادي وثانوي)",
        edition: "المنهج الأزهري الشرعي والعربي المعتمد",
        priceRange: "سعر موحد",
        stock: "متوفر لجميع الصفوف",
        badge: "تعليم أزهري",
        badgeColor: "bg-emerald-700",
        description: "شرح وافٍ ومبسط لمناهج الأزهر الشريف: الفقه، التفسير، التوحيد، الحديث، السيرة، النحو والصرف، والبلاغة والأدب.",
        icon: "fa-mosque"
      },
      {
        id: "b-07",
        title: "سلسلة المعاصر و Gem و Bit by Bit في اللغة الإنجليزية",
        category: "كتب خارجية",
        sub: "لغات",
        stage: "جميع المراحل واللغات",
        edition: "سلسلة اللغات Connect & Connect Plus المعتمدة",
        priceRange: "حسب المستوى",
        stock: "متوفر بجميع المراحل",
        badge: "لغة إنجليزية",
        badgeColor: "bg-violet-600",
        description: "أقوى سلاسل الإنجليزي للمدارس الحكومية والتجريبية واللغات مع كتب القصة والتمارين والاستماع وقاموس المفردات المصور.",
        icon: "fa-language"
      },
      {
        id: "b-08",
        title: "سلسلة الوافي في الكيمياء والجيولوجيا واللغة العربية",
        category: "كتب خارجية",
        sub: "ثانوي",
        stage: "المرحلة الثانوية",
        edition: "شرح مركز وتلخيصات ونماذج تدريبية",
        priceRange: "سعر رسمي",
        stock: "متوفر فوري",
        badge: "مراجعة وتدريب",
        badgeColor: "bg-sky-600",
        description: "كتاب الوافي المتميز بأسلوبه المركز والخرائط الذهنية وتلخيصات القوانين ونماذج الامتحانات التدريبية الشاملة.",
        icon: "fa-flask"
      }
    ]
  },

  printing: {
    title: "خدمات المطبوعات والتصوير والليزر المتقدمة",
    description: "أعلى جودة طباعة وتصوير وسكانر مع إمكانية إرسال الملفات أونلاين عبر الواتساب",
    subFilters: ["الكل", "طباعة مذكرات", "تصوير مستندات", "تغليف وسلك", "سكانر وأبحاث"],
    items: [
      {
        id: "p-01",
        title: "طباعة مذكرات المعلمين والمراجعات النهائية",
        category: "مطبوعات وتصوير",
        sub: "طباعة مذكرات",
        stage: "خدمات تعليمية",
        edition: "طباعة ليزر دقيقة عالي الجودة",
        priceRange: "سعر جملة خاص للكميات",
        stock: "تنفيذ فوري وسريع",
        badge: "خدمة معلمين VIP",
        badgeColor: "bg-emerald-600",
        description: "طباعة مذكرات وملازم الدروس للمدرسين والطلاب بجودة ليزر فائقة، خامات ورق 70 و 80 جرام ناصع البياض بدون بهتان.",
        icon: "fa-print"
      },
      {
        id: "p-02",
        title: "تصوير مستندات وأوراق أبيض وأسود وألوان",
        category: "مطبوعات وتصوير",
        sub: "تصوير مستندات",
        stage: "خدمات يومية",
        edition: "ماكينات تصوير رقمية يابانية",
        priceRange: "أفضل سعر للورقة",
        stock: "جاهز طوال اليوم",
        badge: "تصوير فوري",
        badgeColor: "bg-blue-600",
        description: "تصوير مستندات شخصية، شهادات، أوراق رسمية، ملازم، وتكبير وتصغير بأعلى وضوح ونقاء للخطوط والرسوم البيانية.",
        icon: "fa-copy"
      },
      {
        id: "p-03",
        title: "تغليف حلزوني سلك وبلاستيك فاخر",
        category: "مطبوعات وتصوير",
        sub: "تغليف وسلك",
        stage: "حماية وتنسيق",
        edition: "خامات متينة مع كفر شفاف وملون",
        priceRange: "أسعار تنافسية",
        stock: "متوفر جميع المقاسات",
        badge: "تغليف راقٍ",
        badgeColor: "bg-amber-600",
        description: "تجليد وتغليف المذكرات والملازم بالسلك الحلزوني المعدني أو البلاستيك مع غلاف أمامي شفاف متين وظهر كرتوني ملون لحماية الأوراق.",
        icon: "fa-book"
      },
      {
        id: "p-04",
        title: "التغليف الحراري الفوري (Lamination)",
        category: "مطبوعات وتصوير",
        sub: "تغليف وسلك",
        stage: "حماية مستندات",
        edition: "تغليف كريستال ضد الماء والتلف",
        priceRange: "سعر رمزي",
        stock: "فوري بالدقيقة",
        badge: "حماية 100%",
        badgeColor: "bg-teal-600",
        description: "تغليف حراري عالي الجودة للشهادات الدراسية، الكارنيهات، البطاقات، والوثائق الهامة لحمايتها من التمزق أو السوائل مدى الحياة.",
        icon: "fa-shield-halved"
      },
      {
        id: "p-05",
        title: "طباعة الأبحاث المدرسية والجامعية والبوسترات",
        category: "مطبوعات وتصوير",
        sub: "سكانر وأبحاث",
        stage: "أبحاث ومشاريع",
        edition: "ألوان زاهية وورق كوشيه فاخر",
        priceRange: "حسب عدد الصفحات",
        stock: "تنفيذ أونلاين فوري",
        badge: "تسليم أنيق",
        badgeColor: "bg-indigo-600",
        description: "تنسيق وطباعة مشاريع التخرج، الأبحاث المدرسية، واللوحات الإيضاحية والبوسترات الملونة للأنشطة الصفية واللاصفية.",
        icon: "fa-newspaper"
      },
      {
        id: "p-06",
        title: "مسح ضوئي عالي الدقة (سكانر) وتحويل PDF",
        category: "مطبوعات وتصوير",
        sub: "سكانر وأبحاث",
        stage: "خدمات رقمية",
        edition: "سكانر ملون عالي الدقة 600DPI",
        priceRange: "خدمة فورية ميسرة",
        stock: "متاح إرسال واتساب/إيميل",
        badge: "سكانر رقمي",
        badgeColor: "bg-sky-600",
        description: "سحب الصور والمستندات والأوراق بالماسح الضوئي وتحويلها إلى ملفات PDF احترافية مضغوطة وإرسالها مباشرة لهاتفك أو إيميلك.",
        icon: "fa-scanner"
      }
    ]
  },

  stationery: {
    title: "أدوات مكتبية ومدرسية راقية وشاملة",
    description: "كشاكيل وكشاكيل سلك، أقلام ماركات عالمية، أطقم هندسية، وآلات حاسبة ومستلزمات مدرسية",
    subFilters: ["الكل", "كشاكيل وملازم", "أقلام وحبر", "أطقم هندسية وحواسب", "ألوان ورسم"],
    items: [
      {
        id: "s-01",
        title: "كشاكيل وكشاكيل سلك فاخرة بجميع المقاسات",
        category: "أدوات مكتبية ومدرسية",
        sub: "كشاكيل وملازم",
        stage: "جميع المراحل",
        edition: "ورق أبيض فاخر 60 - 80 - 100 ورقة",
        priceRange: "أسعار جملة وقطاعي",
        stock: "تشكيلة واسعة وكبيرة",
        badge: "خامات ممتازة",
        badgeColor: "bg-emerald-600",
        description: "كشاكيل تسطير إنجليزي وعربي ومربعات وكشاكيل سلك ديزاينات كرتونية وجامعية أنيقة بخامات ورق ناعمة ومريحة في الكتابة.",
        icon: "fa-book-open"
      },
      {
        id: "s-02",
        title: "أقلام جاف وسائلة وجل وأقلام تحديد فوسفورية",
        category: "أدوات مكتبية ومدرسية",
        sub: "أقلام وحبر",
        stage: "مستلزمات كتابة",
        edition: "ماركات عالمية أصلية (Schneider, Rorito, Pilot)",
        priceRange: "تناسب الجميع",
        stock: "متوفر بكثرة",
        badge: "خط سلس وأنيق",
        badgeColor: "bg-blue-600",
        description: "تشكيلة متنوعة من أقلام الجاف والجل فائقة النعومة، وأطقم الهايلايتر الفوسفورية الفاقعة والباستيل الهادئة للمذاكرة الذكية.",
        icon: "fa-pen"
      },
      {
        id: "s-03",
        title: "أطقم هندسية متكاملة ومساطر وبري ومحايات",
        category: "أدوات مكتبية ومدرسية",
        sub: "أطقم هندسية وحواسب",
        stage: "رياضيات ورسم هندسي",
        edition: "أطقم حديد وبلاستيك مرن غير قابل للكسر",
        priceRange: "سعر اقتصادي",
        stock: "متوفر",
        badge: "دقة عالية",
        badgeColor: "bg-amber-600",
        description: "أطقم هندسة ماركات شهيرة تحتوي على برجل دقيق ومثلثات ومنقلة ومسطرة مرقمة بدقة وعلبة معدنية أنيقة للحفاظ على الأدوات.",
        icon: "fa-compass-drafting"
      },
      {
        id: "s-04",
        title: "آلات حاسبة علمية أصلية للمرحلة الإعدادية والثانوية",
        category: "أدوات مكتبية ومدرسية",
        sub: "أطقم هندسية وحواسب",
        stage: "إعدادي وثانوي وجامعي",
        edition: "طرازات Casio المعتمدة رسمياً في الامتحانات",
        priceRange: "ضمان وكفاءة",
        stock: "متوفر مع الضمان",
        badge: "معتمدة للامتحان",
        badgeColor: "bg-teal-600",
        description: "آلات حاسبة علمية متطورة (fx-82, fx-991) لحساب المصفوفات والتفاضل والتكامل والإحصاء والمعادلات المعقدة بسرعة ودقة.",
        icon: "fa-calculator"
      },
      {
        id: "s-05",
        title: "ألوان خشب وفلوماستر وشمع وأدوات فنون ورسم",
        category: "أدوات مكتبية ومدرسية",
        sub: "ألوان ورسم",
        stage: "تربية فنية وهوايات",
        edition: "ماركات أصلية آمنة (Faber-Castell, Primo)",
        priceRange: "أطقم متنوعة",
        stock: "متوفر جميع الدرجات",
        badge: "ألوان زاهية",
        badgeColor: "bg-pink-600",
        description: "علب ألوان خشبية ممتازة، كراسات رسم كانسون وأبيض، ألوان مائية، فرش رسم احترافية، ومستلزمات حصص التربية الفنية.",
        icon: "fa-palette"
      },
      {
        id: "s-06",
        title: "مقالم مدرسية وحقائب ولانش بوكس وزمزميات صحية",
        category: "أدوات مكتبية ومدرسية",
        sub: "كشاكيل وملازم",
        stage: "الموسم الدراسي",
        edition: "خامات صحية خالية من BPA وتصميمات عصرية",
        priceRange: "عروض خاصة",
        stock: "موديلات حديثة",
        badge: "صحي وعصري",
        badgeColor: "bg-indigo-600",
        description: "مقالم قماشية وجلدية متينة، زمزميات مياه صحية آمنة لحفظ المشروبات باردة، ولانش بوكس مقسم لتغذية صحية طوال اليوم الدراسي.",
        icon: "fa-bag-shopping"
      }
    ]
  },

  gifts: {
    title: "ألعاب ذكاء وتنمية مهارات وهدايا ولعب أطفال",
    description: "ألعاب تعليمية شيقة ومنتجات منتسوري وبازل ومجسمات وهدايا نجاح وتفوق",
    subFilters: ["الكل", "ألعاب ذكاء", "بازل ومكعبات", "صلصال وفنون", "قصص وهدايا"],
    items: [
      {
        id: "g-01",
        title: "ألعاب ذكاء ومنتجات منتسوري لتنمية المهارات",
        category: "هدايا ولعب أطفال",
        sub: "ألعاب ذكاء",
        stage: "من عمر سنتين حتى 12 سنة",
        edition: "خشب طبيعي آمن وألوان غير سامة",
        priceRange: "أسعار مميزة",
        stock: "متوفر تشكيلات",
        badge: "تنمية الذكاء",
        badgeColor: "bg-emerald-600",
        description: "ألعاب خشبية لترتيب الأشكال والألوان، متاهات مغناطيسية، وساعات تعليم الوقت وألواح الحساب لتقوية التركيز والتفكير المنطقي.",
        icon: "fa-brain"
      },
      {
        id: "g-02",
        title: "بازل ومكعبات تركيب تعليمية وتفاعلية",
        category: "هدايا ولعب أطفال",
        sub: "بازل ومكعبات",
        stage: "جميع الأعمار",
        edition: "مكعبات متينة سهلة الفك والتركيب",
        priceRange: "أحجام متنوعة",
        stock: "متوفر",
        badge: "إبداع وخيال",
        badgeColor: "bg-blue-600",
        description: "مجموعات مكعبات بأحجام مختلفة لبناء البيوت والسيارات والقلاع، وبازل خرائط العالم والحيوانات لزيادة المعرفة العامة والمرح.",
        icon: "fa-puzzle-piece"
      },
      {
        id: "g-03",
        title: "صلصال طبي وعجائن تشكيل آمنة مع قوالب مجسمة",
        category: "هدايا ولعب أطفال",
        sub: "صلصال وفنون",
        stage: "أطفال وحضانات",
        edition: "عجائن ناعمة لا تجف وصحية 100%",
        priceRange: "اقتصادي",
        stock: "ألوان متعددة",
        badge: "آمن للأطفال",
        badgeColor: "bg-amber-600",
        description: "صلصال طبيعي غير لاصق باليد مع قوالب أشكال هندسية وحيوانات وأدوات تقطيع بلاستيكية آمنة لتفريغ طاقة الطفل الإبداعية.",
        icon: "fa-shapes"
      },
      {
        id: "g-04",
        title: "قصص أطفال ملونة ومصورة بالتشكيل الكامل",
        category: "هدايا ولعب أطفال",
        sub: "قصص وهدايا",
        stage: "قصص تربوية ودينية",
        edition: "طباعة فاخرة ورسوم كرتونية جذابة",
        priceRange: "أسعار تشجيعية",
        stock: "سلاسل متنوعة",
        badge: "قيم وأخلاق",
        badgeColor: "bg-teal-600",
        description: "قصص الأنبياء للأطفال، حكايات الأخلاق النبيلة، قصص ما قبل النوم، ومجلات أطفال مشوقة لغرس حب القراءة واللغة العربية في الصغر.",
        icon: "fa-book-bookmark"
      },
      {
        id: "g-05",
        title: "ألعاب سيارات وشخصيات كرتونية وعرائس أطفال",
        category: "هدايا ولعب أطفال",
        sub: "قصص وهدايا",
        stage: "أولاد وبنات",
        edition: "خامات بلاستيك قوي معتمد",
        priceRange: "تناسب الهدايا",
        stock: "متوفر موديلات حديثة",
        badge: "هدايا مفرحة",
        badgeColor: "bg-pink-600",
        description: "تشكيلة رائعة من ألعاب السيارات الحركية واللاسلكية، مجسمات الأبطال المحبوبين، وعرائس وألعاب مطبخ وأطباء لتقمص الأدوار.",
        icon: "fa-car"
      },
      {
        id: "g-06",
        title: "هدايا تخرج وتفوق وشهادات تقدير وميداليات تذكارية",
        category: "هدايا ولعب أطفال",
        sub: "قصص وهدايا",
        stage: "تكريم الطلاب والمتفوقين",
        edition: "تصميمات راقية يمكن طباعة الاسم عليها",
        priceRange: "خصومات للمدارس والحضانات",
        stock: "جاهز للتسليم الفوري",
        badge: "تكريم المتفوقين",
        badgeColor: "bg-purple-600",
        description: "شهادات تقدير كرتونية فاخرة، دروع وميداليات تكريمية، وأكياس وشنط هدايا وتغليف راقٍ لحفلات النجاح ونهاية العام الدراسي.",
        icon: "fa-trophy"
      }
    ]
  }
};

// Target WhatsApp phone number and direct hotlines
const WHATSAPP_PHONE = "201002968331";
const DISPLAY_PHONE_1 = "01002968331";
const DISPLAY_PHONE_2 = "01157706887";

// State
let currentCategory = "books";
let currentSubFilter = "الكل";
let searchQuery = "";
let deferredPrompt = null;

// ==========================================
// 2. DOM Elements
// ==========================================
const itemsGrid = document.getElementById("itemsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const subFilterContainer = document.getElementById("subFilterContainer");
const currentCategoryTitle = document.getElementById("currentCategoryTitle");
const currentCategoryDesc = document.getElementById("currentCategoryDesc");
const categoryTabs = document.querySelectorAll(".category-tab");
const installBtnContainer = document.getElementById("installBtnContainer");
const installAppBtn = document.getElementById("installAppBtn");
const otaBanner = document.getElementById("otaBanner");
const otaReloadBtn = document.getElementById("otaReloadBtn");
const navHomeBtn = document.getElementById("navHomeBtn");
const navRefreshBtn = document.getElementById("navRefreshBtn");
const refreshIcon = document.getElementById("refreshIcon");
const navShareBtn = document.getElementById("navShareBtn");
const connectionBadge = document.getElementById("connectionBadge");
const sendPdfHeroBtn = document.getElementById("sendPdfHeroBtn");
const emptyStateWhatsappBtn = document.getElementById("emptyStateWhatsappBtn");

// ==========================================
// 3. Conditional Install Button Logic (CRITICAL)
// ==========================================
/**
 * Strictly detect if the application is running inside:
 * 1) A compiled native Android APK WebView wrapper (window.AndroidApp or isNativeApp or userAgent)
 * 2) An installed PWA standalone mode (display-mode: standalone or navigator.standalone)
 * 
 * If TRUE: The install button must be completely and strictly hidden from the interface.
 * If FALSE: Shows up when beforeinstallprompt fires on standard mobile web browsers.
 */
function isRunningAsNativeOrInstalledPWA() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true ||
                       document.referrer.includes('android-app://');

  const isNativeApkShell = Boolean(
    window.isNativeApp ||
    window.AndroidApp ||
    window.AndroidBridge ||
    navigator.userAgent.includes('NahrAlElmApp') ||
    navigator.userAgent.includes('NahrAlElmNativeApp') ||
    navigator.userAgent.includes('wv') // WebView indicator
  );

  return isStandalone || isNativeApkShell;
}

function handleInstallButtonVisibility() {
  if (isRunningAsNativeOrInstalledPWA()) {
    console.log('[Install Logic] App is running inside Native APK Shell or Installed PWA. Hiding install button.');
    if (installBtnContainer) {
      installBtnContainer.classList.add('hidden');
      installBtnContainer.style.display = 'none';
    }
  } else if (deferredPrompt) {
    console.log('[Install Logic] Mobile browser detected with beforeinstallprompt ready. Showing install button.');
    if (installBtnContainer) {
      installBtnContainer.classList.remove('hidden');
      installBtnContainer.style.display = 'block';
    }
  }
}

// Listen to beforeinstallprompt on supported browsers
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] beforeinstallprompt event captured');
  e.preventDefault();
  deferredPrompt = e;
  handleInstallButtonVisibility();
});

// Hide button if already installed
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App successfully installed on device');
  deferredPrompt = null;
  if (installBtnContainer) {
    installBtnContainer.classList.add('hidden');
    installBtnContainer.style.display = 'none';
  }
});

// Install Button click action
if (installAppBtn) {
  installAppBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    installAppBtn.disabled = true;
    installAppBtn.classList.add('opacity-75');

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[PWA] User response to install prompt:', outcome);

    deferredPrompt = null;
    if (installBtnContainer) {
      installBtnContainer.classList.add('hidden');
    }
    installAppBtn.disabled = false;
    installAppBtn.classList.remove('opacity-75');
  });
}

// Initial check on DOM load
handleInstallButtonVisibility();

// ==========================================
// 4. Over-The-Air (OTA) Service Worker Engine
// ==========================================
function initServiceWorkerAndOTA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then((registration) => {
        console.log('[OTA Engine] Service Worker registered with scope:', registration.scope);

        // Ping live server in background for instant OTA update detection
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update is ready to take over
                  console.log('[OTA Engine] New OTA update available! Showing update alert banner.');
                  showOTABanner();
                } else {
                  console.log('[OTA Engine] Content is cached for offline use.');
                }
              }
            });
          }
        });

        // Trigger manual check on each app launch and resume
        registration.update().catch((err) => {
          console.warn('[OTA Engine] Background SW update check failed (offline or network fluctuation):', err);
        });
      })
      .catch((err) => {
        console.warn('[OTA Engine] Service Worker registration failed:', err);
      });

    // Listen to messages broadcast from Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'OTA_UPDATE_ACTIVATED') {
        console.log('[OTA Engine] OTA update activated by worker:', event.data.version);
        showOTABanner(`تم تطبيق أحدث تحديث لمكتبة نهر العلم بنجاح (${event.data.version})!`);
      }
    });
  }
}

function showOTABanner(customMessage) {
  if (!otaBanner) return;
  if (customMessage) {
    const bannerText = document.getElementById('otaBannerText');
    if (bannerText) bannerText.textContent = customMessage;
  }
  otaBanner.classList.remove('hidden');
}

if (otaReloadBtn) {
  otaReloadBtn.addEventListener('click', () => {
    // Notify Service Worker to skip waiting
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  });
}

// Check OTA update on app resume/visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.update().catch(() => {});
    });
  }
});

// ==========================================
// 5. WhatsApp Deep Link Message Generator
// ==========================================
/**
 * Automatically opens WhatsApp directed to 01002968331,
 * auto-filling a polite, contextualized Arabic message tailored to the chosen item.
 */
function createWhatsAppUrl(itemTitle, categoryName) {
  const politeMessage = 
    `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)،\n` +
    `أود الاستفسار والطلب بخصوص:\n` +
    `*${itemTitle}*\n` +
    `من قسم: [${categoryName}].\n` +
    `هل المنتج متوفر حالياً وبكم السعر والتفاصيل؟ شكراً جزيلاً لك.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(politeMessage)}`;
}

// ==========================================
// 6. Catalog Render & Interactive Filtering
// ==========================================
function updateCategoryCounts() {
  categoryTabs.forEach((tab) => {
    const catKey = tab.dataset.category;
    const countBadge = tab.querySelector('.category-count');
    if (countBadge && STORE_DATA[catKey]) {
      countBadge.textContent = STORE_DATA[catKey].items.length;
    }
  });
}

function renderSubFilters() {
  const catData = STORE_DATA[currentCategory];
  if (!subFilterContainer || !catData) return;

  subFilterContainer.innerHTML = '';
  
  catData.subFilters.forEach((subName) => {
    const chip = document.createElement('button');
    const isActive = (subName === currentSubFilter);
    chip.className = `px-3 py-1 rounded-full font-bold transition-all text-xs ${
      isActive 
        ? 'bg-emerald-600 text-white shadow-sm' 
        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
    }`;
    chip.textContent = subName;
    chip.addEventListener('click', () => {
      currentSubFilter = subName;
      renderSubFilters();
      renderCatalog();
    });
    subFilterContainer.appendChild(chip);
  });
}

function renderCatalog() {
  const catData = STORE_DATA[currentCategory];
  if (!catData || !itemsGrid) return;

  // Update Header text
  if (currentCategoryTitle) currentCategoryTitle.textContent = catData.title;
  if (currentCategoryDesc) currentCategoryDesc.textContent = catData.description;

  // Filter items
  let filteredItems = catData.items.filter((item) => {
    // Sub-filter
    const matchesSub = (currentSubFilter === "الكل") || (item.sub === currentSubFilter);
    
    // Search query
    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      matchesSearch = (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.stage.toLowerCase().includes(q) ||
        item.edition.toLowerCase().includes(q)
      );
    }
    return matchesSub && matchesSearch;
  });

  // Empty state handling
  if (filteredItems.length === 0) {
    itemsGrid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  // Generate cards
  itemsGrid.innerHTML = filteredItems.map((item) => {
    const waUrl = createWhatsAppUrl(item.title, item.category);
    
    return `
      <article class="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
        
        <!-- Top Accent Strip -->
        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-navy via-brand-deepBlue to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div>
          <!-- Item Header & Badges -->
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white ${item.badgeColor || 'bg-brand-navy'} shadow-sm">
              <i class="fa-solid fa-tag text-[9px]"></i>
              <span>${item.badge}</span>
            </span>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
              ${item.stage}
            </span>
          </div>

          <!-- Icon & Title -->
          <div class="flex items-start gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                ${item.title}
              </h3>
              <p class="text-[11px] font-semibold text-emerald-600 mt-0.5">
                <i class="fa-solid fa-certificate text-[9px] ml-1"></i>
                ${item.edition}
              </p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
            ${item.description}
          </p>
        </div>

        <!-- Card Footer & WhatsApp Hub Order Action -->
        <div class="pt-3 border-t border-slate-100 space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-medium">حالة التوفر:</span>
            <span class="font-bold text-emerald-700 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              ${item.stock}
            </span>
          </div>

          <!-- Prominent Green WhatsApp Order Button -->
          <a 
            href="${waUrl}" 
            target="_blank" 
            rel="noopener"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition-all border border-emerald-400/30">
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span>اطلب الآن عبر الواتساب</span>
          </a>
        </div>

      </article>
    `;
  }).join('');
}

// ==========================================
// 7. Tab Switching & Bottom Nav Synchronization
// ==========================================
const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
const storyChips = document.querySelectorAll(".story-chip");
const quickSendPdfBtn = document.getElementById("quickSendPdfBtn");

function setActiveCategory(catKey) {
  if (!STORE_DATA[catKey]) return;
  currentCategory = catKey;
  currentSubFilter = "الكل";

  // Sync Top Category Tabs
  categoryTabs.forEach((tab) => {
    if (tab.dataset.category === catKey) {
      tab.classList.add('active', 'bg-brand-navy', 'text-white', 'shadow-sm');
      tab.classList.remove('bg-slate-100', 'text-slate-700');
    } else {
      tab.classList.remove('active', 'bg-brand-navy', 'text-white', 'shadow-sm');
      tab.classList.add('bg-slate-100', 'text-slate-700');
    }
  });

  // Sync Bottom Navigation Bar Items
  bottomNavItems.forEach((btn) => {
    const isTarget = (btn.dataset.targetCategory === catKey);
    const iconBox = btn.querySelector('.nav-icon-box');
    if (isTarget) {
      btn.classList.add('active', 'text-emerald-600', 'font-bold');
      btn.classList.remove('text-slate-500');
      if (iconBox) {
        iconBox.classList.add('bg-emerald-50', 'text-emerald-600');
        iconBox.classList.remove('text-slate-500');
      }
    } else {
      btn.classList.remove('active', 'text-emerald-600', 'font-bold');
      btn.classList.add('text-slate-500');
      if (iconBox) {
        iconBox.classList.remove('bg-emerald-50', 'text-emerald-600');
        iconBox.classList.add('text-slate-500');
      }
    }
  });

  renderSubFilters();
  renderCatalog();
}

categoryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setActiveCategory(tab.dataset.category);
  });
});

bottomNavItems.forEach((btn) => {
  btn.addEventListener('click', () => {
    setActiveCategory(btn.dataset.targetCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

storyChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const cat = chip.dataset.cat;
    if (cat) {
      setActiveCategory(cat);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  });
});

if (quickSendPdfBtn) {
  quickSendPdfBtn.addEventListener('click', () => {
    const msg = `مرحباً مكتبة نهر العلم (إدارة أ/ إيهاب)، أود إرسال مذكرة / ملف PDF لطباعتها وتغليفها، برجاء إفادتي بالأسعار وموعد الاستلام. شكراً لك.`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (clearSearchBtn) {
      if (searchQuery.trim().length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }
    renderCatalog();
  });
}

if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    renderCatalog();
  });
}

// ==========================================
// 8. Native App Header Actions
// ==========================================
// Fast Refresh Button: Animates spin and checks live OTA updates
if (navRefreshBtn) {
  navRefreshBtn.addEventListener('click', () => {
    if (refreshIcon) {
      refreshIcon.classList.add('animate-spin-once');
      setTimeout(() => refreshIcon.classList.remove('animate-spin-once'), 700);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.update().catch(() => {});
      });
    }

    renderCatalog();
  });
}

// Share Button
if (navShareBtn) {
  navShareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'مكتبة نهر العلم - إدارة أ/ إيهاب',
      text: 'تطبيق مكتبة نهر العلم للكتب الخارجية، المطبوعات والتصوير، والأدوات المدرسية والهدايا.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('تم نسخ رابط تطبيق مكتبة نهر العلم إلى الحافظة بنجاح!');
      }).catch(() => {});
    }
  });
}

// Online/Offline Network Indicators
function updateOnlineStatus() {
  if (!connectionBadge) return;
  if (navigator.onLine) {
    connectionBadge.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>خدمة فورية</span>
    `;
    connectionBadge.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-emerald-300 border border-white/10';
  } else {
    connectionBadge.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
      <span>وضع عدم الاتصال</span>
    `;
    connectionBadge.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30';
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

if (emptyStateWhatsappBtn) {
  emptyStateWhatsappBtn.addEventListener('click', () => {
    const query = searchQuery ? ` بخصوص: ${searchQuery}` : '';
    const message = `مرحباً مكتبة نهر العلم، أود الاستفسار عن توفر منتج${query}. هل متوفر بالمكتبة حالياً؟`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  });
}

// ==========================================
// 9. Bootstrap Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryCounts();
  renderSubFilters();
  renderCatalog();
  initServiceWorkerAndOTA();
  handleInstallButtonVisibility();
});

