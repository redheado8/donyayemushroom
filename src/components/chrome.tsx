import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AtSign,
  Clock,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Send,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { SHOP, buildWhatsAppOrder, faPrice } from "../data/products";
import { useCart } from "../store/cart";

/* ---------------- logo ---------------- */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-olive via-pine to-forest shadow-lg shadow-forest/30 ring-1 ring-gold/40">
        <svg viewBox="0 0 32 32" className="h-6 w-6">
          <path fill="#e9dcc2" d="M16 3C9 3 4.5 8 4.5 13c0 1.5 1 2.5 2.5 2.5h18c1.5 0 2.5-1 2.5-2.5C27.5 8 23 3 16 3z" />
          <path fill="#c8a165" d="M13 16h6l1.5 9.5c.1 1-.6 1.5-1.5 1.5h-6c-.9 0-1.6-.5-1.5-1.5L13 16z" />
        </svg>
        <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-gold shadow" />
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-black tracking-tight ${dark ? "text-forest" : "text-bone"}`}>
          {SHOP.name}
        </span>
        <span className={`block text-[10px] font-medium tracking-[0.2em] ${dark ? "text-olive" : "text-gold-light"}`}>
          MUSHROOM · CHEESE
        </span>
      </span>
    </a>
  );
}

/* ---------------- navbar ---------------- */
const LINKS = [
  { href: "#home", label: "خانه" },
  { href: "#categories", label: "دسته‌بندی" },
  { href: "#products", label: "محصولات" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-forest/85 shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-semibold text-bone/75 transition-colors hover:text-bone"
            >
              {l.label}
              <span className="absolute -bottom-1.5 right-0 h-[2px] w-0 rounded-full bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${SHOP.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-xs font-bold text-gold-light transition-all hover:bg-gold hover:text-forest md:inline-flex"
          >
            <Send className="h-3.5 w-3.5" />
            گفت‌وگو در واتساپ
          </a>
          <button
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold text-forest shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-clay text-[11px] font-black text-white ring-2 ring-forest"
                >
                  {count.toLocaleString("fa-IR")}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setMobile(!mobile)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone lg:hidden"
            aria-label="منو"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-forest/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobile(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-bone/80 transition-colors hover:bg-white/5 hover:text-gold-light"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ---------------- marquee ---------------- */
export function Marquee() {
  const items = ["برداشت روزانه", "قارچ دکمه‌ای", "قارچ صدفی", "شیتاکه", "پورتوبلو", "لیقوان اصیل", "پارمزان کهنه", "موزارلای تازه", "سفارش از طریق واتساپ"];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 overflow-hidden border-y border-gold/25 bg-pine py-4" dir="ltr">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap px-5 text-sm font-bold text-bone/80">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- cart drawer ---------------- */
export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const orderUrl = buildWhatsAppOrder(
    items.map((i) => ({ name: i.product.name, qty: i.qty, price: i.product.price, unit: i.product.unit })),
    form
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-forest/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed bottom-0 left-0 top-0 z-[61] flex w-full max-w-md flex-col bg-bone shadow-2xl"
          >
            <div className="flex items-center justify-between bg-forest px-6 py-5 text-bone">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h3 className="text-base font-extrabold">سبد خرید شما</h3>
                <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold-light">
                  {items.reduce((s, i) => s + i.qty, 0).toLocaleString("fa-IR")} قلم
                </span>
              </div>
              <button onClick={closeCart} className="rounded-full p-2 transition-colors hover:bg-white/10" aria-label="بستن">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
                    <ShoppingBag className="h-8 w-8 text-olive/50" />
                  </span>
                  <p className="font-bold text-forest">سبد خرید خالی است</p>
                  <p className="max-w-[240px] text-sm leading-7 text-forest/55">
                    محصولات تازه ما را ببینید و سفارش‌تان را ثبت کنید.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 rounded-full bg-forest px-7 py-3 text-sm font-bold text-bone transition-colors hover:bg-pine"
                  >
                    مشاهده محصولات
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(({ product: p, qty }) => (
                    <motion.div key={p.id} layout className="flex gap-3 rounded-2xl border border-forest/10 bg-white p-3 shadow-sm">
                      <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-extrabold text-forest">{p.name}</p>
                          <button onClick={() => remove(p.id)} className="text-forest/35 transition-colors hover:text-red-700" aria-label="حذف">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] text-forest/50">{p.unit}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-full bg-cream px-2 py-1">
                            <button onClick={() => setQty(p.id, qty + 1)} className="rounded-full bg-forest p-1 text-bone transition-transform hover:scale-110" aria-label="افزایش">
                              <Plus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-black">{qty.toLocaleString("fa-IR")}</span>
                            <button onClick={() => setQty(p.id, qty - 1)} className="rounded-full bg-forest/15 p-1 text-forest transition-transform hover:scale-110" aria-label="کاهش">
                              <Minus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-black text-olive">{faPrice(p.price * qty)} <span className="text-[11px] font-medium">تومان</span></p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <button onClick={clear} className="mx-auto block text-xs font-semibold text-forest/45 underline-offset-4 hover:text-red-700 hover:underline">
                    پاک کردن سبد
                  </button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-forest/10 bg-white px-5 py-4">
                {!showForm ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-forest/60">مبلغ تقریبی سفارش</span>
                      <span className="text-lg font-black text-forest">{faPrice(total)} <span className="text-xs font-medium">تومان</span></span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-forest/50">
                      <Truck className="h-3.5 w-3.5" /> هزینه ارسال پس از هماهنگی در واتساپ مشخص می‌شود.
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-3 w-full rounded-full bg-forest py-4 text-sm font-extrabold text-bone transition-all hover:bg-pine"
                    >
                      ادامه و ثبت سفارش در واتساپ
                    </button>
                  </>
                ) : (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="نام شما"
                        className="rounded-xl border border-forest/15 bg-bone px-4 py-3 text-sm outline-none transition-all placeholder:text-forest/40 focus:border-olive focus:ring-2 focus:ring-olive/20"
                      />
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="شماره تماس"
                        inputMode="tel"
                        className="rounded-xl border border-forest/15 bg-bone px-4 py-3 text-sm outline-none transition-all placeholder:text-forest/40 focus:border-olive focus:ring-2 focus:ring-olive/20"
                      />
                    </div>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="آدرس تحویل"
                      className="w-full rounded-xl border border-forest/15 bg-bone px-4 py-3 text-sm outline-none transition-all placeholder:text-forest/40 focus:border-olive focus:ring-2 focus:ring-olive/20"
                    />
                    <div className="flex gap-2.5">
                      <button onClick={() => setShowForm(false)} className="rounded-full border border-forest/20 px-5 py-3.5 text-sm font-bold text-forest/70 transition-colors hover:bg-cream">
                        بازگشت
                      </button>
                      <a
                        href={orderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1faa53] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-green-700/25 transition-all hover:-translate-y-0.5 hover:bg-[#178a43]"
                      >
                        <Send className="h-4 w-4" />
                        ارسال سفارش ({faPrice(total)} تومان)
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- toast ---------------- */
export function Toast() {
  const { toast, openCart } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          onClick={openCart}
          className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-bone shadow-2xl ring-1 ring-gold/40 md:bottom-8"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-forest">✓</span>
          {toast}
          <span className="text-gold-light underline underline-offset-4">مشاهده سبد</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- floating whatsapp ---------------- */
export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("سلام دنیای قارچ! یک سؤال درباره محصولات دارم.")}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa53] text-white shadow-[0_16px_40px_-8px_rgba(31,170,83,0.6)] md:bottom-8 md:right-8"
      aria-label="گفت‌وگو در واتساپ"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1faa53] opacity-20" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.9 1-1.1 2.4-.2 3.9a11.6 11.6 0 0 0 4.5 4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2z" />
      </svg>
    </motion.a>
  );
}

/* ---------------- footer ---------------- */
export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest text-bone">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-olive/20 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-8 text-bone/60">
              {SHOP.name}؛ فروشگاه تخصصی قارچ تازه و پنیر اصیل در {SHOP.address}. با مدیریت {SHOP.owner}،
              هر روز تازه‌ترین محصولات را از بهترین تولیدکنندگان برای شما می‌آوریم.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-all hover:border-gold hover:text-gold" aria-label="واتساپ">
                <Send className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-all hover:border-gold hover:text-gold" aria-label="اینستاگرام">
                <AtSign className="h-4 w-4" />
              </a>
              <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-all hover:border-gold hover:text-gold" aria-label="تماس">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-extrabold tracking-wide text-gold-light">دسترسی سریع</h4>
            <ul className="mt-5 space-y-3 text-sm text-bone/65">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold-light">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-extrabold tracking-wide text-gold-light">اطلاعات فروشگاه</h4>
            <ul className="mt-5 space-y-4 text-sm text-bone/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {SHOP.addressFull}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                {SHOP.hours}
              </li>
              <li className="flex items-center gap-2.5" dir="ltr">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span className="tracking-wider">{SHOP.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-bone/45 md:flex-row">
          <p>© {new Date().getFullYear().toLocaleString("fa-IR")} {SHOP.name} — تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-1.5">
            طراحی‌شده با وسواس، به تازگیِ قارچِ صبح
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </p>
        </div>
      </div>
    </footer>
  );
}
