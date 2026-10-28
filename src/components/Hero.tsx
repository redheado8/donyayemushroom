import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Award, Leaf, MapPin, Sparkles, Star } from "lucide-react";
import { SHOP } from "../data/products";

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

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-28 pt-28 md:grid-cols-2 md:px-10 md:pt-32">
        {/* copy */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10 order-2 w-full text-right md:order-1 md:col-start-1">
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
            اصیل‌ترین پنیرها را با وسواس انتخاب می‌کنیم. سفارش‌تان را آنلاین ثبت کنید و از طریق واتساپ هماهنگ کنید — ساده، سریع و مطمئن.
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

        {/* Lightweight hero artwork: transparent WebP image, no 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 mx-auto flex w-full max-w-xl items-center justify-center md:order-2 md:col-start-2"
          aria-label="قارچ دکمه‌ای با تزئینات طلایی"
        >
          <img
            src="/images/hero-mushroom.webp"
            alt="قارچ دکمه‌ای کرم‌رنگ با تزئینات طلایی"
            width="1536"
            height="1024"
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.24)]"
          />
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
