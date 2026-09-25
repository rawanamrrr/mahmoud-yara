import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

// Add new keys here and use them with t("key") in any component.
const translations = {
  en: {
    "hero.weAreGettingMarried": "We are getting married",
    "hero.rsvp": "Confirm your attendance",
    "overlay.tapToOpen": "Tap to open",
    "lang.switchTo": "Switch language",
    "count.days": "Days",
    "count.hours": "Hours",
    "count.minutes": "Minutes",
    "count.seconds": "Seconds",
    "count.title": "Countdown",
    "count.subtitle": "To the most special day of our lives",
    "day.title": "Day details",
    "day.subtitle": "Everything you need to know",
    "loc.title": "Location",
    "loc.maps": "Open in Maps",
    "loc.calendar": "Add to calendar",
    "sch.title": "Schedule of the day",
    "sch.subtitle": "What we have planned for you",
    "dress.title": "Dress Code",
    "dress.desc": "Your best outfit, your best moves, your best excuse to celebrate.",
    "acc.title": "Accommodation",
    "acc.subtitle": "Where to stay",
    "acc.optA": "Option A",
    "acc.optB": "Option B",
    "acc.locA": " Port Andratx · coast, seaside atmosphere",
    "acc.locB": " Inland Mallorca · 10 min from the wedding",
    "acc.aPre": "Type: ",
    "acc.aBold": "Aparthotel",
    "acc.aSuf": " (usually cheaper). There are apartments for 2 and for 4 people.",
    "acc.bPre": "Prettier and ",
    "acc.bBold": "with a pool",
    "tr.title": "Transport",
    "tr.subtitle": "How to get there",
    "tr.before": "We will provide a",
    "tr.bus": "round-trip bus",
    "tr.after": "so you don't have to worry about transportation.",
    "gift.title": "Gifts",
    "gift.subtitle": "A gift with love",
    "gift.desc": "Your presence is our greatest gift. For those who wish to give us a gift, you can do so in the following ways:",
    "gift.envelope": "Envelope",
    "gift.preferred": "preferred",
    "gift.bank": "Bank transfer",
    "credit.madeBy": "Made with love by",
    "rsvp.subtitle": "We hope to have you with us",
    "rsvp.attend": "Will you attend? *",
    "rsvp.yes": "Yes, I will attend",
    "rsvp.no": "No, I can't attend",
    "rsvp.name": "Full name *",
    "names.and": "&",
    "rsvp.namePh": "Your name",
    "rsvp.guests": "Number of guests (including you)",
    "rsvp.message": "Message for the couple (optional)",
    "rsvp.messagePh": "Write a few words...",
    "rsvp.send": "Send confirmation",
    "rsvp.thanks": "Thank you! We have received your confirmation.",
    "rsvp.sending": "Sending...",
    "rsvp.error": "Something went wrong. Please try again.",
    "rsvp.written": "Written message",
    "rsvp.drawn": "Handwritten message",
    "rsvp.undo": "Undo",
    "rsvp.clear": "Clear",
    "rsvp.penColor": "Pen color",
    "names.first": "Mahmoud",
    "names.second": "Yara",
    "hero.date": "Saturday, October 31, 2026",
    "loc.hours": "Saturday, 6:00 PM - 11:30 PM",
    "venue.name": "The Grove Venue",
    "venue.address": "El Shorouk, Cairo",
    "sch.katb": "Katb Ktab",
    "sch.katbDesc": "The signing of the marriage contract",
    "sch.katbTime": "6:00 PM - 7:00 PM",
    "sch.party1": "Party",
    "sch.party1Desc": "Music, dancing and celebration",
    "sch.party1Time": "7:00 PM - 9:00 PM",
    "sch.buffet": "Buffet",
    "sch.buffetDesc": "Dinner is served",
    "sch.buffetTime": "9:00 PM - 10:00 PM",
    "sch.party2": "The Grand Finale",
    "sch.party2Desc": "Let's dance until the end of the night",
    "sch.party2Time": "10:00 PM - 11:30 PM",
  },
  ar: {
    "hero.weAreGettingMarried": "نتشرف بدعوتكم لزفافنا",
    "hero.rsvp": "أكد حضورك",
    "overlay.tapToOpen": "اضغط للفتح",
    "lang.switchTo": "تغيير اللغة",
    "count.days": "أيام",
    "count.hours": "ساعات",
    "count.minutes": "دقائق",
    "count.seconds": "ثوانٍ",
    "count.title": "العد التنازلي",
    "count.subtitle": "إلى أجمل يوم في حياتنا",
    "day.title": "تفاصيل اليوم",
    "day.subtitle": "كل ما تحتاج إلى معرفته",
    "loc.title": "الموقع",
    "loc.maps": "افتح في الخرائط",
    "loc.calendar": "أضف إلى التقويم",
    "sch.title": "برنامج اليوم",
    "sch.subtitle": "ما أعددناه لكم",
    "dress.title": "قواعد اللباس",
    "dress.desc": "أفضل إطلالة لك، وأجمل حركاتك، وأفضل عذر للاحتفال.",
    "acc.title": "الإقامة",
    "acc.subtitle": "أين تقيمون",
    "acc.optA": "الخيار أ",
    "acc.optB": "الخيار ب",
    "acc.locA": " بورت أندراتش · ساحلية بأجواء بحرية",
    "acc.locB": " داخل مايوركا · على بعد 10 دقائق من الحفل",
    "acc.aPre": "النوع: ",
    "acc.aBold": "شقق فندقية",
    "acc.aSuf": " (عادةً أوفر). تتوفر شقق لشخصين وأربعة أشخاص.",
    "acc.bPre": "أجمل و",
    "acc.bBold": "مع مسبح",
    "tr.title": "المواصلات",
    "tr.subtitle": "كيف تصلون",
    "tr.before": "سنوفر",
    "tr.bus": "حافلة ذهاب وإياب",
    "tr.after": "حتى لا تقلقوا بشأن المواصلات.",
    "gift.title": "الهدايا",
    "gift.subtitle": "هدية بكل محبة",
    "gift.desc": "حضوركم هو أعظم هدية لنا. ولمن يرغب في تقديم هدية، يمكنه ذلك بالطرق التالية:",
    "gift.envelope": "ظرف",
    "gift.preferred": "مفضّل",
    "gift.bank": "تحويل بنكي",
    "credit.madeBy": "صُنع بحب بواسطة",
    "rsvp.subtitle": "نأمل أن تكونوا معنا",
    "rsvp.attend": "هل ستحضر؟ *",
    "rsvp.yes": "نعم، سأحضر",
    "rsvp.no": "لا، لن أستطيع الحضور",
    "rsvp.name": "الاسم الكامل *",
    "names.and": "و",
    "rsvp.namePh": "اسمك",
    "rsvp.guests": "عدد الضيوف (بمن فيهم أنت)",
    "rsvp.message": "رسالة للعروسين (اختياري)",
    "rsvp.messagePh": "اكتب بضع كلمات...",
    "rsvp.send": "إرسال التأكيد",
    "rsvp.thanks": "شكرًا لكم! لقد استلمنا تأكيدكم.",
    "rsvp.sending": "جارٍ الإرسال...",
    "rsvp.error": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    "rsvp.written": "رسالة مكتوبة",
    "rsvp.drawn": "رسالة بخط اليد",
    "rsvp.undo": "تراجع",
    "rsvp.clear": "مسح",
    "rsvp.penColor": "لون القلم",
    "names.first": "محمود",
    "names.second": "يارا",
    "hero.date": "السبت، ٣١ أكتوبر ٢٠٢٦",
    "loc.hours": "السبت، ٦:٠٠ م - ١١:٣٠ م",
    "venue.name": "ذا جروف فينيو",
    "venue.address": "الشروق، القاهرة",
    "sch.katb": "كتب الكتاب",
    "sch.katbDesc": "عقد القران",
    "sch.katbTime": "٦:٠٠ م - ٧:٠٠ م",
    "sch.party1": "الحفلة",
    "sch.party1Desc": "موسيقى ورقص واحتفال",
    "sch.party1Time": "٧:٠٠ م - ٩:٠٠ م",
    "sch.buffet": "البوفيه",
    "sch.buffetDesc": "العشاء جاهز",
    "sch.buffetTime": "٩:٠٠ م - ١٠:٠٠ م",
    "sch.party2": "الختام الكبير",
    "sch.party2Desc": "لنرقص حتى نهاية الليلة",
    "sch.party2Time": "١٠:٠٠ م - ١١:٣٠ م",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readStoredLang = (): Lang => {
  try {
    return localStorage.getItem("lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      // ignore storage errors
    }
  };

  const t = (key: TranslationKey) => translations[lang][key];

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
