import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Award, Leaf, MapPin, Sparkles, Star } from "lucide-react";
import { SHOP } from "../data/products";

const heroMushroomImage = "data:image/webp;base64,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";


const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ onShop, onOrder }: { onShop: () => void; onOrder: () => void }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 700], [0, 120]);
  const yText = useTransform(scrollY, [0, 700], [0, 60]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <header id="home" className="grain relative min-h-[100svh] overflow-hidden bg-forest text-bone">
      {/* ambient background */}
      <motion.div style={{ y: yBg }} className="hero-vignette pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/4 h-[480px] w-[480px] rounded-full bg-olive/25 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[380px] w-[380px] rounded-full bg-clay/20 blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </motion.div>

      {/* giant watermark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 select-none text-center">
        <span className="text-stroke-gold text-[19vw] font-black leading-none opacity-20 md:text-[13vw]">
          دنیای قارچ
        </span>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 pb-28 pt-28 md:grid-cols-2 md:items-center md:px-10 md:pt-32 lg:min-h-[100svh]">
        {/* copy */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10 order-2 md:order-1">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-light backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              فروشگاه تخصصی قارچ و پنیر — {SHOP.address}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="mt-6 text-5xl font-black leading-[1.15] md:text-7xl md:leading-[1.1]"
          >
            تازه از دلِ
            <br />
            <span className="bg-gradient-to-l from-gold-light via-gold to-clay bg-clip-text text-transparent">
              طبیعت،
            </span>{" "}
            هر روز
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.28}
            className="mt-6 max-w-xl text-base leading-8 text-bone/70 md:text-lg md:leading-9"
          >
            در <span className="font-bold text-bone">«{SHOP.name}»</span> بهترین قارچ‌های برداشتِ روز و
            اصیل‌ترین پنیرها را با وسواس انتخاب می‌کنیم. سفارش‌تان را آنلاین ثبت کنید و از طریق
            واتساپ تحویل بگیرید — ساده، سریع و مطمئن.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onShop}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-bold text-forest shadow-[0_18px_50px_-12px_rgba(200,161,101,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_24px_60px_-12px_rgba(200,161,101,0.75)]"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={onOrder}
              className="inline-flex items-center gap-2 rounded-full border border-bone/25 bg-white/5 px-8 py-4 text-sm font-bold text-bone backdrop-blur transition-all duration-300 hover:border-gold/60 hover:bg-white/10"
            >
              سفارش در واتساپ
            </button>
          </motion.div>

          {/* stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.55}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            {[
              { icon: Leaf, top: "۱۰۰٪ تازه", sub: "برداشت روزانه" },
              { icon: Award, top: "+۸ سال", sub: "اعتماد محله" },
              { icon: Star, top: "۴.۹ از ۵", sub: "رضایت مشتریان" },
            ].map(({ icon: Icon, top, sub }) => (
              <div key={sub} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </span>
                <span>
                  <span className="block text-base font-extrabold text-bone">{top}</span>
                  <span className="block text-xs text-bone/55">{sub}</span>
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="mt-8 inline-flex items-center gap-2 text-xs text-bone/50"
          >
            <MapPin className="h-4 w-4 text-gold" />
            {SHOP.addressFull} — مدیریت: {SHOP.owner}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="relative order-1 mx-auto flex h-[34svh] w-full max-w-xl items-center justify-center overflow-hidden rounded-[2rem] md:order-2 md:h-[58vh] md:rounded-[2.5rem]" aria-label="تصویر قارچ دکمه‌ای دنیای قارچ">
          <img src={heroMushroomImage} alt="قارچ دکمه‌ای کرم‌رنگ روی زمینهٔ سبز جنگلی" className="h-full w-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone/50 transition-colors hover:text-gold md:flex"
      >
        <span className="text-[11px] tracking-widest">اسکرول</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-bone/25 pt-2">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </span>
      </motion.a>
    </header>
  );
}
