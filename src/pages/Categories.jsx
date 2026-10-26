
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Shirt,
  House,
  Watch,
  ShoppingBag,
  Headphones,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "Electronics",
    description: "Discover technology for everyday life.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85",
    icon: Smartphone,
    number: "01",
  },
  {
    name: "Fashion",
    slug: "Fashion",
    description: "Explore modern styles and everyday essentials.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85",
    icon: Shirt,
    number: "02",
  },
  {
    name: "Home",
    slug: "Home",
    description: "Bring comfort and character to your space.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    icon: House,
    number: "03",
  },
  {
    name: "Accessories",
    slug: "Accessories",
    description: "Complete your look with the little details.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    icon: Watch,
    number: "04",
  },
  {
    name: "Footwear",
    slug: "Footwear",
    description: "Find comfortable shoes for every occasion.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    icon: ShoppingBag,
    number: "05",
  },
  {
    name: "Audio",
    slug: "Audio",
    description: "Discover headphones and audio essentials.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    icon: Headphones,
    number: "06",
  },
];

function Categories() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#f4f1eb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav className="mb-6 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-950">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">
              Categories
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
              <Sparkles size={15} />
              Explore our collection
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find your kind
              <span className="block text-slate-500">
                of something special.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Browse our curated categories and discover products
              selected for your style, home and everyday lifestyle.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Shop All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category listing */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Made for your lifestyle
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Browse categories
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500">
            From everyday essentials to standout finds, start
            exploring what you love.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                to={`/shop?category=${encodeURIComponent(category.slug)}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800">
                    CATEGORY {category.number}
                  </span>

                  <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950 shadow-md transition group-hover:bg-slate-950 group-hover:text-white">
                    <Icon size={21} />
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-950">
                      {category.name}
                    </h3>

                    <ArrowRight
                      size={20}
                      className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950"
                    />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-block text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 group-hover:decoration-slate-900">
                    Explore collection
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom banner */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-slate-950 p-7 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Keep exploring
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Your next favourite product awaits.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Browse the complete collection and find something
              that suits you.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Categories;
