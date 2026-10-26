
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import Rating from "../components/product/Rating";
import { products } from "../data/products";

function getId(product) {
  return String(product._id ?? product.id ?? product.slug ?? "");
}

function getPrice(product) {
  return Number(
    product.price ?? product.sellingPrice ?? product.salePrice ?? 0
  );
}

function getOriginalPrice(product) {
  return Number(
    product.originalPrice ?? product.compareAtPrice ?? getPrice(product)
  );
}

function getImage(product) {
  const source = product.image ?? product.thumbnail ?? product.images;
  const firstImage = Array.isArray(source) ? source[0] : source;

  return typeof firstImage === "string"
    ? firstImage
    : firstImage?.url ?? "";
}

function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [message, setMessage] = useState("");

  function loadWishlist() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const ids = Array.isArray(saved)
        ? saved.map((item) =>
            typeof item === "string"
              ? item
              : String(item._id ?? item.id ?? "")
          )
        : [];

      setWishlistIds(ids.filter(Boolean));
    } catch {
      setWishlistIds([]);
    }
  }

  useEffect(() => {
    loadWishlist();

    function handleWishlistUpdate() {
      loadWishlist();
    }

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdate
      );
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(getId(product))
  );

  function removeFromWishlist(productId) {
    const updatedIds = wishlistIds.filter((id) => id !== productId);

    localStorage.setItem("wishlist", JSON.stringify(updatedIds));
    setWishlistIds(updatedIds);
    window.dispatchEvent(new Event("wishlistUpdated"));
    setMessage("Product removed from wishlist.");
  }

  function addToCart(product) {
    try {
      const saved = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const cart = Array.isArray(saved) ? saved : [];
      const productId = getId(product);

      const existing = cart.find(
        (item) => String(item._id ?? item.id) === productId
      );

      const updatedCart = existing
        ? cart.map((item) =>
            String(item._id ?? item.id) === productId
              ? {
                  ...item,
                  quantity: Number(item.quantity || 0) + 1,
                }
              : item
          )
        : [...cart, { ...product, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setMessage(`${product.name ?? product.title} added to cart.`);
    } catch {
      setMessage("Unable to update your cart. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <nav className="mb-5 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-950">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">Wishlist</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Heart size={27} className="text-slate-900" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Saved for later
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                My Wishlist
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Keep the products you love in one place.
          </p>
        </div>
      </section>

      {/* Wishlist products */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        {message && (
          <div
            role="status"
            className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700"
          >
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
              className="font-semibold hover:text-black"
            >
              ×
            </button>
          </div>
        )}

        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-950">
            Saved Products
          </h2>

          <span className="text-sm text-slate-500">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 px-5 py-16 text-center sm:py-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Heart size={34} className="text-slate-400" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-950">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Browse the collection and save products you would like
              to revisit later.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <ShoppingBag size={18} />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => {
              const productId = getId(product);
              const name = product.name ?? product.title ?? "Product";
              const price = getPrice(product);
              const originalPrice = getOriginalPrice(product);
              const image = getImage(product);

              return (
                <article
                  key={productId}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden bg-slate-100">
                    <Link to={`/products/${productId}`}>
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          loading="lazy"
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-64 items-center justify-center text-sm text-slate-400">
                          No image available
                        </div>
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(productId)}
                      aria-label={`Remove ${name} from wishlist`}
                      title="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-4">
                    <Link
                      to={`/products/${productId}`}
                      className="line-clamp-2 font-semibold text-slate-900 hover:text-slate-600"
                    >
                      {name}
                    </Link>

                    <div className="mt-3">
                      <Rating
                        value={Number(
                          product.rating ??
                            product.ratings?.average ??
                            0
                        )}
                        size="sm"
                        showValue
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-950">
                        ₹{price.toLocaleString("en-IN")}
                      </span>

                      {originalPrice > price && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
