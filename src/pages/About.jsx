
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Truck,
  Headphones,
  ShoppingBag,
  Target,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We focus on making every step of your shopping experience simple, helpful, and convenient.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Matters",
    description:
      "We aim to offer thoughtfully selected products with clear information and reliable service.",
  },
  {
    icon: Sparkles,
    title: "Simple Shopping",
    description:
      "A clean storefront, easy navigation, and a straightforward shopping experience.",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Convenient Delivery",
    description:
      "A simple checkout experience with delivery information clearly presented.",
  },
  {
    icon: ShieldCheck,
    title: "A Reliable Experience",
    description:
      "Transparent product details and clear information help customers shop confidently.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "We aim to make it easy for customers to find help when they need it.",
  },
];

const commitments = [
  "Easy-to-navigate shopping experience",
  "Clear product information",
  "Responsive design across devices",
  "A focus on customer satisfaction",
];

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gray-950 text-white">
        <div className="absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-16 -z-10 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-white/[0.04]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <Sparkles size={15} />
              Get to know us
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Shopping should feel
              <span className="mt-2 block text-gray-400">
                simple and enjoyable.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
              Welcome to ShopEase, a modern shopping destination designed
              around convenience, thoughtful product discovery, and a
              straightforward customer experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-gray-200"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-gray-400">
              <CheckCircle2 size={18} />
              <span>Designed for a convenient shopping experience</span>
            </div>
          </div>

          {/* Brand visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-white/[0.06] blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-950">
                    <ShoppingBag size={23} />
                  </div>
                  <div>
                    <p className="font-bold">ShopEase</p>
                    <p className="text-xs text-gray-400">
                      Thoughtful shopping
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                  Our approach
                </span>
              </div>

              <div className="py-10 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.07]">
                  <ShoppingBag size={54} strokeWidth={1.2} />
                </div>

                <h2 className="mt-7 text-2xl font-bold sm:text-3xl">
                  Made for everyday shopping
                </h2>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-400">
                  A modern store experience with products and information
                  organized to help you choose with confidence.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Discover", number: "01" },
                  { label: "Choose", number: "02" },
                  { label: "Shop", number: "03" },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center"
                  >
                    <p className="text-xs text-gray-500">{item.number}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-200 sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Who we are
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A better shopping experience starts with the basics.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              ShopEase is designed with one simple idea: online shopping
              should be easy to understand and comfortable to use. From
              browsing products to reviewing your cart, every part of the
              storefront aims to keep things organized and accessible.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We believe useful product information, intuitive navigation,
              and clear checkout steps can make shopping more convenient.
              Our goal is to create a store experience that puts the
              customer at the center.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-gray-900 transition hover:gap-3"
            >
              Browse our collection
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-gray-950 p-7 text-white sm:translate-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Target size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold">Our Mission</h3>

              <p className="mt-3 text-sm leading-7 text-gray-300">
                Make online shopping more intuitive through clear
                information, simple navigation, and a customer-focused
                experience.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-7 sm:translate-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Sparkles size={25} />
              </div>

              <h3 className="mt-6 text-xl font-bold">Our Vision</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Build a welcoming digital storefront where discovering
                products and making shopping decisions feels effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              What matters to us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The values behind our store
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our approach is built around making shopping straightforward,
              useful, and customer-friendly.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 transition group-hover:bg-gray-900 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <p className="mt-7 text-xs font-semibold tracking-[0.15em] text-gray-400">
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer benefits */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                The ShopEase experience
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Thoughtful details make a difference.
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-gray-600 lg:justify-self-end">
              A good online store should help customers find what they
              need, understand their options, and move through checkout
              without unnecessary complications.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-gray-200 p-6 transition hover:border-gray-400"
                >
                  <Icon size={28} strokeWidth={1.7} />

                  <h3 className="mt-5 text-lg font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our commitment
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around the customer.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-600">
              We aim to keep the shopping journey clear and convenient,
              from the first product view to the final checkout step.
            </p>

            <div className="mt-8 space-y-4">
              {commitments.map((commitment) => (
                <div key={commitment} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-gray-900"
                  />
                  <p className="text-sm leading-6 text-gray-700">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gray-950 p-8 text-white sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Users size={29} />
            </div>

            <h3 className="mt-7 text-2xl font-bold sm:text-3xl">
              Your shopping journey matters.
            </h3>

            <p className="mt-4 leading-7 text-gray-300">
              Whether you are exploring new products or returning for a
              familiar favorite, our goal is to make the experience feel
              clear, comfortable, and easy to navigate.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
            <ShoppingBag size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to explore?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
            Discover the collection and find products that fit your needs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-gray-200 px-6 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
