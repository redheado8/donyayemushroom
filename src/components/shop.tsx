import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Info, Leaf, Minus, Plus, Send, ShoppingBag, Star } from "lucide-react";
import { CATEGORIES, PRODUCTS, SAMPLE_PRICE_NOTE, SHOP, faPrice, type Category, type Product } from "../data/products";
import { useCart } from "../store/cart";

export function SectionHead({ kicker, title, desc, light = false }: { kicker: string; title: string; desc?: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold ${light ? "border-gold/40 bg-white/5 text-gold-light" : "border-olive/30 bg-olive/10 text-olive"}`}>
        <span className="h-1.5 w-1.5 rotate-45 bg-current" />
        {kicker}
      </span>
      <h2 className={`gold-underline mt-4 inline-block text-3xl font-black md:text-4xl ${light ? "text-bone" : "text-forest"}`}>{title}</h2>
      {desc && <p className={`mt-5 text-sm leading-8 md:text-base ${light ? "text-bone/60" : "text-forest/60"}`}>{desc}</p>}
    </motion.div>
  );
}

/* ---------------- categories ---------------- */
export function Categories({ active, onChange }: { active: Category | "all"; onChange: (c: Category | "all") => void }) {
  return (
    <section id="categories" className="relative bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead
          kicker="دسته‌بندی محصولات"
          title="دو دنیای تازه، یک فروشگاه"
          desc="از سالن کشت تا سفره شما؛ قارچ‌های برداشتِ روز و پنیرهای اصیل را در دو دسته تخصصی انتخاب کنید."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { id: "mushroom" as const, img: "/images/mushroom-button.jpg", t: "قارچ تازه", s: "۴ محصول · برداشت روزانه" },
            { id: "cheese" as const, img: "/images/cheese-aged.jpg", t: "پنیر اصیل", s: "۴ محصول · سنتی و فراوری‌شده" },
            { id: "all" as const, img: "/images/shop.jpg", t: "همه محصولات", s: "منتخب کامل فروشگاه" },
          ].map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              onClick={() => {
                onChange(c.id);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`card-shine group relative h-64 overflow-hidden rounded-3xl text-right shadow-xl transition-all duration-500 hover:-translate-y-1.5 md:h-80 ${
                active === c.id ? "ring-[3px] ring-gold ring-offset-4 ring-offset-bone" : ""
              }`}
            >
              <img src={c.img} alt={c.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-bold tracking-[0.25em] text-gold-light">
                  {CATEGORIES.find((x) => x.id === c.id)?.latin.toUpperCase()}
                </p>
                <h3 className="mt-1 text-2xl font-black text-white">{c.t}</h3>
                <p className="mt-1 text-xs text-white/65">{c.s}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur transition-all group-hover:bg-gold group-hover:text-forest">
                  {active === c.id ? "انتخاب شده" : "مشاهده"} ←
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- product card ---------------- */
function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add, items, setQty } = useCart();
  const inCart = items.find((i) => i.product.id === p.id)?.qty ?? 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="card-shine group flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-[0_10px_40px_-18px_rgba(28,38,32,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(28,38,32,0.45)]"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent opacity-70" />
        <div className="absolute right-3 top-3 flex gap-2">
          {p.badge && (
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-black text-forest shadow">{p.badge}</span>
          )}
          {p.fresh && (
            <span className="flex items-center gap-1 rounded-full bg-forest/80 px-3 py-1 text-[11px] font-bold text-bone backdrop-blur">
              <Leaf className="h-3 w-3 text-moss" /> تازه امروز
            </span>
          )}
        </div>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Star className="h-3 w-3 fill-gold text-gold" />
          {p.rating.toLocaleString("fa-IR")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold tracking-[0.2em] text-olive/70">{p.latin.toUpperCase()}</p>
        <h3 className="mt-1 text-lg font-black text-forest">{p.name}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-7 text-forest/60">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.meta.map((m) => (
            <span key={m} className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-forest/65">
              {m}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-dashed border-forest/15 pt-4">
          <div>
            <p className="text-[11px] text-forest/50">{p.unit}</p>
            <p className="mt-0.5 text-xl font-black text-forest">
              {faPrice(p.price)} <span className="text-xs font-semibold text-forest/50">تومان</span>
            </p>
          </div>
          {inCart === 0 ? (
            <button
              onClick={() => add(p)}
              className="flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-xs font-extrabold text-bone transition-all duration-300 hover:bg-olive hover:shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              افزودن
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-forest px-2 py-1.5">
              <button onClick={() => add(p)} className="rounded-full bg-gold p-1.5 text-forest transition-transform hover:scale-110" aria-label="افزایش">
                <Plus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-5 text-center text-sm font-black text-bone">{inCart.toLocaleString("fa-IR")}</span>
              <button onClick={() => setQty(p.id, inCart - 1)} className="rounded-full bg-white/20 p-1.5 text-bone transition-transform hover:scale-110" aria-label="کاهش">
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- products grid ---------------- */
export function Products({ active, onChange }: { active: Category | "all"; onChange: (c: Category | "all") => void }) {
  const list = useMemo(() => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)), [active]);
  return (
    <section id="products" className="relative bg-cream/60 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(90,107,72,0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead
          kicker="ویترین فروشگاه"
          title="محصولات تازه امروز"
          desc="هر محصول را با تعداد دلخواه به سبد اضافه کنید؛ سفارش نهایی از طریق واتساپ هماهنگ می‌شود."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                active === c.id
                  ? "bg-forest text-bone shadow-lg"
                  : "border border-forest/15 bg-white text-forest/65 hover:border-olive/50 hover:text-forest"
              }`}
            >
              {c.title}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 flex max-w-2xl items-start gap-2 rounded-2xl border border-clay/25 bg-clay/10 px-5 py-4 text-xs leading-7 text-bark"
        >
          <Info className="mt-1 h-4 w-4 shrink-0" />
          {SAMPLE_PRICE_NOTE}
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------- order steps ---------------- */
export function OrderSteps({ onOrder }: { onOrder: () => void }) {
  const steps = [
    { n: "۱", t: "انتخاب محصولات", d: "قارچ و پنیر دلخواه‌تان را با تعداد موردنظر به سبد اضافه کنید." },
    { n: "۲", t: "ثبت در واتساپ", d: "جزئیات سفارش به‌صورت خودکار آماده و در واتساپ برای ما ارسال می‌شود." },
    { n: "۳", t: "هماهنگی و تحویل", d: "زمان تحویل و نحوه پرداخت را مستقیم با فروشگاه هماهنگ می‌کنید." },
  ];
  return (
    <section className="grain relative overflow-hidden bg-forest py-20 text-bone md:py-28">
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-olive/25 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead light kicker="سفارش آسان" title="در سه قدم سفارش دهید" desc="بدون نیاز به ثبت‌نام یا پرداخت آنلاین؛ همه‌چیز از طریق گفت‌وگو با فروشگاه انجام می‌شود." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-500 hover:border-gold/40 hover:bg-white/8"
            >
              <span className="text-stroke-gold absolute -left-2 -top-6 text-[120px] font-black opacity-30 transition-opacity group-hover:opacity-60">
                {s.n}
              </span>
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-xl font-black text-forest shadow-lg shadow-gold/30">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-black">{s.t}</h3>
                <p className="mt-2 text-sm leading-8 text-bone/60">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <button
            onClick={onOrder}
            className="inline-flex items-center gap-2 rounded-full bg-[#1faa53] px-10 py-4 text-sm font-extrabold text-white shadow-[0_18px_50px_-12px_rgba(31,170,83,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#178a43]"
          >
            <Send className="h-4 w-4" />
            شروع سفارش در واتساپ
          </button>
          <p className="flex items-center gap-1.5 text-xs text-bone/50">
            <BadgeCheck className="h-4 w-4 text-gold" />
            پاسخگویی سریع در ساعات کاری — {SHOP.hours}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
