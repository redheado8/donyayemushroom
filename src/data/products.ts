export const SHOP = {
  name: "دنیای قارچ",
  owner: "خانواده محمدی",
  tagline: "تازه از دل طبیعت، هر روز",
  address: "سرآسیاب، نزدیک میدان اطلس",
  addressFull: "سرآسیاب، نزدیک میدان اطلس، فروشگاه دنیای قارچ",
  phone: "0912 000 0000",
  /** شماره واتساپ فروشگاه با فرمت بین‌المللی بدون + — پس از دریافت شماره واقعی جایگزین شود */
  whatsapp: "989120000000",
  hours: " همه‌روزه ۸ صبح تا ۱۰ شب",
  instagram: "@donyaye.gharch",
} as const;

export type Category = "mushroom" | "cheese";

export interface Product {
  id: string;
  name: string;
  latin: string;
  category: Category;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  rating: number;
  meta: string[];
  fresh?: boolean;
}

export const CATEGORIES: { id: Category | "all"; title: string; latin: string; desc: string }[] = [
  { id: "all", title: "همه محصولات", latin: "All", desc: "منتخب قارچ و پنیر تازه" },
  { id: "mushroom", title: "قارچ تازه", latin: "Mushrooms", desc: "برداشت روز، مستقیم از سالن کشت" },
  { id: "cheese", title: "پنیر اصیل", latin: "Cheese", desc: "سنتی و فراوری‌شده با کیفیت ممتاز" },
];

/**
 * توجه: قیمت‌ها صرفاً نمونه و جهت نمایش قابلیت فروشگاه درج شده‌اند
 * و پس از دریافت لیست واقعی فروشگاه به‌روزرسانی می‌شوند.
 */
export const SAMPLE_PRICE_NOTE =
  "قیمت‌های نمایش‌داده‌شده نمونه هستند و پس از دریافت لیست واقعی فروشگاه به‌روزرسانی می‌شوند.";

export const PRODUCTS: Product[] = [
  {
    id: "btn-mushroom",
    name: "قارچ دکمه‌ای ممتاز",
    latin: "Button Mushroom",
    category: "mushroom",
    description:
      "قارچ دکمه‌ای یکدست و سفت با رنگ روشن؛ برداشت همان روز، مناسب خورشت، پیتزا و سالاد.",
    price: 85000,
    unit: "بسته ۵۰۰ گرمی",
    image: "/images/mushroom-button.jpg",
    badge: "پرفروش",
    rating: 4.9,
    fresh: true,
    meta: ["برداشت روز", "سورت یکدست", "بسته‌بندی بهداشتی"],
  },
  {
    id: "oyster-mushroom",
    name: "قارچ صدفی تازه",
    latin: "Oyster Mushroom",
    category: "mushroom",
    description:
      "قارچ صدفی لطیف با عطر ملایم و بافت گوشتی؛ انتخاب حرفه‌ای‌ها برای گریل و غذاهای آسیایی.",
    price: 95000,
    unit: "بسته ۴۰۰ گرمی",
    image: "/images/mushroom-oyster.jpg",
    rating: 4.8,
    fresh: true,
    meta: ["ارگانیک", "بافت گوشتی", "مناسب گریل"],
  },
  {
    id: "shiitake",
    name: "قارچ شیتاکه",
    latin: "Shiitake",
    category: "mushroom",
    description:
      "شیتاکه اصیل با کلاهک ضخیم و طعم عمیق اومامی؛ سرشار از خاصیت، محبوب آشپزهای حرفه‌ای.",
    price: 145000,
    unit: "بسته ۲۵۰ گرمی",
    image: "/images/mushroom-shiitake.jpg",
    badge: "ویژه",
    rating: 4.9,
    meta: ["طعم اومامی", "خواص بالا", "کشت کنترل‌شده"],
  },
  {
    id: "portobello",
    name: "قارچ پورتوبلو",
    latin: "Portobello",
    category: "mushroom",
    description:
      "کلاهک‌های درشت و آبدار پورتوبلو؛ جایگزین لذیذ گوشت در برگر و غذاهای گیاهی.",
    price: 120000,
    unit: "بسته ۴۰۰ گرمی",
    image: "/images/mushroom-portobello.jpg",
    rating: 4.7,
    meta: ["سایز درشت", "مناسب برگر", "آبدار"],
  },
  {
    id: "lighvan",
    name: "پنیر لیقوان اصیل",
    latin: "Lighvan Cheese",
    category: "cheese",
    description:
      "لیقوان سنتی با بافت نیمه‌سخت و طعم نمکی متعادل؛ رسیده در شرایط استاندارد.",
    price: 320000,
    unit: "بسته نیم‌کیلویی",
    image: "/images/cheese-lighvan.jpg",
    badge: "اصیل",
    rating: 5.0,
    meta: ["شیر تازه", "رسیده", "سنتی"],
  },
  {
    id: "parmesan",
    name: "پنیر پارمزان کهنه",
    latin: "Aged Parmesan",
    category: "cheese",
    description:
      "پارمزان با بافت کریستالی و طعم عمیق آجیلی؛ رسیدن طولانی برای عطر و کیفیت ممتاز.",
    price: 480000,
    unit: "بسته ۳۰۰ گرمی",
    image: "/images/cheese-parmesan.jpg",
    rating: 4.9,
    meta: ["رسیدن طولانی", "بافت کریستالی", "وارداتی"],
  },
  {
    id: "mozzarella",
    name: "موزارلا تازه",
    latin: "Fresh Mozzarella",
    category: "cheese",
    description:
      "موزارلای تازه و کشسان با طعم شیری لطیف؛ همراه همیشگی پیتزا، سالاد کاپرزه و پاستا.",
    price: 165000,
    unit: "بسته ۴۰۰ گرمی",
    image: "/images/cheese-mozzarella.jpg",
    fresh: true,
    rating: 4.8,
    meta: ["تولید روزانه", "بافت کشسان", "شیر کامل"],
  },
  {
    id: "gouda",
    name: "پنیر گودای رسیده",
    latin: "Aged Gouda",
    category: "cheese",
    description:
      "گودای طلایی با طعم کاراملی ملایم و بافت خامه‌ای؛ عالی برای صبحانه و پذیرایی.",
    price: 290000,
    unit: "بسته ۵۰۰ گرمی",
    image: "/images/cheese-aged.jpg",
    rating: 4.8,
    meta: ["طعم کاراملی", "بافت خامه‌ای", "رسیده"],
  },
];

export const faPrice = (n: number) => n.toLocaleString("fa-IR");

export const buildWhatsAppOrder = (
  items: { name: string; qty: number; price: number; unit: string }[],
  customer: { name: string; phone: string; address: string; note: string }
) => {
  const lines = items.map(
    (it, i) =>
      `${(i + 1).toLocaleString("fa-IR")}. ${it.name} — ${it.qty.toLocaleString("fa-IR")} × ${it.unit} = ${(it.qty * it.price).toLocaleString("fa-IR")} تومان`
  );
  const total = items.reduce((s, it) => s + it.qty * it.price, 0);
  const msg = [
    `سلام ${SHOP.name}! مایل به ثبت سفارش هستم:`,
    "",
    ...lines,
    "",
    `مبلغ تقریبی سفارش: ${total.toLocaleString("fa-IR")} تومان`,
    "",
    `نام: ${customer.name || "—"}`,
    `شماره تماس: ${customer.phone || "—"}`,
    `آدرس: ${customer.address || "—"}`,
    customer.note ? `توضیحات: ${customer.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
};
