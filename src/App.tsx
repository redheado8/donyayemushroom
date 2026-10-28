import { useState } from "react";
import { CartProvider, useCart } from "./store/cart";
import type { Category } from "./data/products";
import Hero from "./components/Hero";
import { CartDrawer, FloatingWhatsApp, Footer, Marquee, Navbar, Toast } from "./components/chrome";
import { Categories, OrderSteps, Products } from "./components/shop";
import { About, Contact, Features, Testimonials } from "./components/story";

function Page() {
  const [category, setCategory] = useState<Category | "all">("all");
  const { openCart, count } = useCart();

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrder = () => {
    if (count > 0) openCart();
    else scrollToProducts();
  };

  return (
    <div className="min-h-screen bg-bone font-sans text-forest">
      <Navbar />
      <main>
        <Hero onShop={scrollToProducts} onOrder={handleOrder} />
        <Marquee />
        <Categories active={category} onChange={setCategory} />
        <Products active={category} onChange={setCategory} />
        <About />
        <Features />
        <OrderSteps onOrder={handleOrder} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
}
