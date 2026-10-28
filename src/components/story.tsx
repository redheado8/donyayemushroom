import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  HandPlatter,
  Leaf,
  MapPin,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Snowflake,
  Sprout,
  Star,
  Truck,
} from "lucide-react";
import { SHOP } from "../data/products";
import { SectionHead } from "./shop";

/* ---------------- about ---------------- */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bone py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-4 py-1.5 text-xs font-bold text-olive">
            <span className="h-1.5 w-1.5 rotate-45 bg-current" />
            داستان ما
          </span>
          <h2 className="mt-4 text-3xl font-black leading-snug text-forest md:text-4xl md:leading-snug">
            {SHOP.name}؛
            <br />
            جایی که تازگی،
            <span className="text-olive"> قول ماست</span>
          </h2>
          <p className="mt-5 text-sm leading-8 text-forest/65 md:text-base md:leading-9">
            فروشگاه {SHOP.name} با مدیریت {SHOP.owner} در {SHOP.address}، سال‌هاست که مرجع اهالی محله
            برای خرید قارچ تازه و پنیر اصیل است. ما هر صبح مستقیم از سالن‌های کشت معتبر و
            تولیدکنندگان شناخته‌شده خرید می‌کنیم تا محصولی که به دست شما می‌رسد، همان چیزی باشد
            که خودمان برای سفره خانواده‌مان انتخاب می‌کنیم.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            {[
              { icon: Sprout, t: "تأمین مستقیم", d: "بدون واسطه از تولیدکننده" },
              { icon: Snowflake, t: "زنجیره سرد", d: "حفظ تازگی تا لحظه تحویل" },
              { icon: ShieldCheck, t: "تضمین کیفیت", d: "مرجوعی بی‌قیدوشرط" },
              { icon: HandPlatter, t: "مشاوره خرید", d: "راهنمایی برای انتخاب بهتر" },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-gold-light">
                  <f.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-forest">{f.t}</span>
                  <span className="block text-xs text-forest/55">{f.d}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-bl from-gold/30 via-transparent to-olive/25 blur-2xl" />
          <img
            src="/images/shop.jpg"
            alt="فروشگاه دنیای قارچ"
            loading="lazy"
            className="relative h-[420px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[540px]"
          />
          <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between rounded-2xl border border-white/20 bg-forest/80 px-5 py-4 text-bone backdrop-blur-xl">
            <div>
              <p className="text-sm font-extrabold">مدیریت: {SHOP.owner}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-bone/65">
                <MapPin className="h-3.5 w-3.5 text-gold" /> {SHOP.addressFull}
              </p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-black text-forest">
              <BadgeCheck className="h-6 w-6" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- features band ---------------- */
export function Features() {
  const feats = [
    { icon: Leaf, t: "برداشت روزانه", d: "قارچ‌ها هر روز صبح، تازه به فروشگاه می‌رسند." },
    { icon: Truck, t: "تحویل سریع محلی", d: "ارسال سریع در محدوده سرآسیاب و اطراف میدان اطلس." },
    { icon: ShieldCheck, t: "تضمین تازگی", d: "اگر از تازگی محصول راضی نبودید، تعویض می‌کنیم." },
    { icon: Phone, t: "سفارش تلفنی و واتساپی", d: "بدون اپلیکیشن اضافه؛ مستقیم با فروشگاه در ارتباطید." },
  ];
  return (
    <section className="border-y border-forest/10 bg-parchment/50 py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {feats.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold-light shadow-lg">
              <f.icon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-black text-forest">{f.t}</span>
              <span className="mt-1 block text-xs leading-6 text-forest/55">{f.d}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- testimonials ---------------- */
const QUOTES = [
  {
    name: "خانم رضایی",
    area: "ساکن سرآسیاب",
    text: "قارچ‌هاش واقعاً با جاهای دیگه فرق داره؛ سفت، تمیز و خوش‌عطر. هر هفته از همین‌جا خرید می‌کنم.",
  },
  {
    name: "آقای کریمی",
    area: "مشتری ثابت",
    text: "پنیر لیقوانش عالیه. سفارش واتساپی هم خیلی راحت انجام شد و همون روز تحویل گرفتم.",
  },
  {
    name: "خانم احمدی",
    area: "ساکن اطلس",
    text: "برخوردشون محترمانه‌ست و برای انتخاب قارچ مناسب هر غذا راهنمایی می‌کنن. پیشنهاد می‌کنم.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead
          kicker="اعتماد شما"
          title="حرف‌های مشتریان ما"
          desc="رضایت اهالی محله، بزرگ‌ترین افتخار ماست."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative flex flex-col rounded-3xl border border-forest/10 bg-white p-7 shadow-[0_10px_40px_-20px_rgba(28,38,32,0.4)]"
            >
              <Quote className="absolute left-6 top-6 h-8 w-8 text-cream" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-8 text-forest/70">«{q.text}»</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-forest/15 pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-black text-gold-light">
                  {q.name.replace("خانم ", "").replace("آقای ", "").charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-forest">{q.name}</span>
                  <span className="block text-xs text-forest/50">{q.area}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- contact ---------------- */
export function Contact() {
  const [msg, setMsg] = useState("");
  const wa = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg || "سلام دنیای قارچ!")}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-cream/60 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_20%,rgba(200,161,101,0.18),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead
          kicker="در ارتباط باشیم"
          title="تماس با فروشگاه"
          desc="برای سفارش، استعلام موجودی یا هر سؤالی، مستقیم با ما در ارتباط باشید."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="grain relative overflow-hidden rounded-3xl bg-forest p-8 text-bone lg:col-span-3"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-olive/30 blur-[100px]" />
            <h3 className="relative text-xl font-black">اطلاعات ارتباطی</h3>
            <div className="relative mt-6 space-y-5">
              {[
                { icon: MapPin, t: "نشانی فروشگاه", d: SHOP.addressFull },
                { icon: Clock, t: "ساعات کاری", d: SHOP.hours },
                { icon: Phone, t: "تلفن فروشگاه", d: SHOP.phone, ltr: true },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-forest">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-bone/55">{r.t}</span>
                    <span className={`mt-1 block text-sm font-bold ${r.ltr ? "tracking-widest" : ""}`} dir={r.ltr ? "ltr" : "rtl"}>
                      {r.d}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1faa53] px-7 py-3.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#178a43]"
              >
                <Send className="h-4 w-4" /> گفت‌وگو در واتساپ
              </a>
              <a
                href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-7 py-3.5 text-sm font-bold text-bone transition-all hover:border-gold hover:text-gold-light"
              >
                <Phone className="h-4 w-4" /> تماس تلفنی
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-3xl border border-forest/10 bg-white p-8 shadow-xl lg:col-span-2"
          >
            <h3 className="text-xl font-black text-forest">پیام سریع</h3>
            <p className="mt-2 text-xs leading-6 text-forest/55">
              پیام‌تان را بنویسید؛ با یک کلیک در واتساپ برای فروشگاه ارسال می‌شود.
            </p>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={5}
              placeholder="مثلاً: سلام، امروز قارچ صدفی تازه دارید؟"
              className="mt-5 w-full resize-none rounded-2xl border border-forest/15 bg-bone px-4 py-3 text-sm leading-7 outline-none transition-all placeholder:text-forest/35 focus:border-olive focus:ring-2 focus:ring-olive/20"
            />
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest py-4 text-sm font-extrabold text-bone transition-all hover:bg-pine"
            >
              <Send className="h-4 w-4" />
              ارسال پیام در واتساپ
            </a>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-forest/45">
              <BadgeCheck className="h-3.5 w-3.5 text-olive" />
              معمولاً کمتر از ۱۵ دقیقه پاسخ می‌دهیم
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
