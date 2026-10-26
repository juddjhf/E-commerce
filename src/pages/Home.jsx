
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import ProductGrid from "../components/product/ProductGrid";
import { products } from "../data/products";

const categories = [
  {
    name: "Electronics",
    description: "Everyday technology",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80",
    slug: "Electronics",
  },
  {
    name: "Fashion",
    description: "Style your everyday",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80",
    slug: "Fashion",
  },
  {
    name: "Home & Living",
    description: "Make it feel like home",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
    slug: "Home",
  },
  {
    name: "Accessories",
    description: "Little things, big impact",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    slug: "Accessories",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ₹999",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Your details stay protected",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple return experience",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help",
  },
];

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Show the first few products from the local demo data.
  const featuredProducts = products.slice(0, 8);

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) return;

    // Demo only: no email is sent to a server yet.
    setSubscribed(true);
    setEmail("");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-[#f4f1eb]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:px-10 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              <Sparkles size={15} />
              New season collection
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find your
              <span className="block text-slate-500">
                everyday essentials.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Discover thoughtfully selected products for your
              lifestyle, from modern tech to timeless everyday
              essentials.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Shop Collection
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-white"
              >
                Explore Categories
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span>✓ Curated products</span>
              <span>✓ Convenient shopping</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-amber-200/60 blur-2xl" />

            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
              alt="Modern retail store showcasing a curated collection"
              className="relative h-[350px] w-full rounded-3xl object-cover shadow-xl sm:h-[450px] lg:h-[520px]"
            />

            <div className="absolute bottom-5 left-5 max-w-xs rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                The everyday edit
              </p>
              <p className="mt-1 text-lg font-bold">
                Better finds. Better living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-10">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Explore the store
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>

          <Link
            to="/categories"
            className="hidden items-center gap-2 text-sm font-semibold hover:text-slate-500 sm:flex"
          >
            All categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-100"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="mt-1 text-sm text-white/80">
                  {category.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Handpicked for you
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Featured products
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Discover popular picks selected for your everyday
                needs.
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden items-center gap-2 text-sm font-semibold hover:text-slate-500 sm:flex"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} columns={4} />

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-slate-700/60 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              A little something extra
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Your next favourite find is waiting.
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-slate-300">
              Browse the collection and discover products that fit
              your style, space and everyday routine.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Stay in the loop
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Good finds, delivered.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            Sign up for updates about new arrivals, collections and
            special offers.
          </p>

          {subscribed ? (
            <p
              role="status"
              className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
            >
              Demo subscription successful!
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                autoComplete="email"
                required
                className="min-w-0 flex-1 rounded-full border border-slate-300 px-5 py-3 outline-none transition focus:border-slate-950"
              />

              <button
                type="submit"
                className="rounded-full bg-slate-950 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-3 text-xs text-slate-400">
            Demo form only. Email subscription is not connected to a
            backend yet.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
