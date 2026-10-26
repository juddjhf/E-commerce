
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Search,
  ShoppingBag,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-white px-4 py-16 text-gray-900 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Error illustration */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="absolute inset-0 rounded-full border border-gray-200" />
          <div className="absolute inset-4 rounded-full border border-dashed border-gray-300" />

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-950 text-white shadow-xl sm:h-28 sm:w-28">
            <ShoppingBag size={48} strokeWidth={1.4} />
          </div>

          <span className="absolute right-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold shadow-sm">
            ?
          </span>

          <span className="absolute bottom-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
            !
          </span>
        </div>

        {/* Error text */}
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Page not found<span className="text-gray-400">.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
          Sorry, we couldn't find the page you're looking for. It may have
          been moved, deleted, or the link might be incorrect.
        </p>

        {/* Action buttons */}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Search suggestion */}
        <div className="mx-auto mt-12 max-w-md border-t border-gray-200 pt-7">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Search size={17} />
            <span>Looking for something specific?</span>
          </div>

          <Link
            to="/shop"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
          >
            Browse all products
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Back link */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={15} />
          Go to previous page
        </button>
      </div>
    </main>
  );
}
