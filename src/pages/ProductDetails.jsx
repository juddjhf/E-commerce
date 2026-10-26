
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import ProductGallery from "../components/product/ProductGallery";
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

function getImages(product) {
  const source = product.images ?? product.image ?? product.thumbnail;
  const imageList = Array.isArray(source) ? source : [source];

  return imageList
    .map((image) =>
      typeof image === "string" ? image : image?.url
    )
    .filter((image) => typeof image === "string" && image.trim());
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const product = useMemo(
    () => products.find((item) => getId(item) === String(id)),
    [id]
  );

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  useEffect(() => {
    if (!product) return;

    try {
      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      setWishlisted(
        Array.isArray(wishlist) &&
          wishlist.some((item) =>
            typeof item === "string"
              ? item === getId(product)
              : String(item._id ?? item.id) === getId(product)
          )
      );
    } catch {
      setWishlisted(false);
    }
  }, [product]);

  function addToCart() {
    if (!product) return;

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const cart = Array.isArray(savedCart) ? savedCart : [];
      const productId = getId(product);

      const existingItem = cart.find(
        (item) => String(item._id ?? item.id) === productId
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map((item) =>
          String(item._id ?? item.id) === productId
            ? { ...item, quantity: Number(item.quantity || 0) + quantity }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            ...product,
            quantity,
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setAdded(true);
    } catch {
      window.alert("Unable to update the cart. Please try again.");
    }
  }

  function toggleWishlist() {
    if (!product) return;

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const wishlist = Array.isArray(savedWishlist)
        ? savedWishlist
        : [];

      const productId = getId(product);

      const exists = wishlist.some(
        (item) =>
          String(
            typeof item === "string" ? item : item._id ?? item.id
          ) === productId
      );

      const updatedWishlist = exists
        ? wishlist.filter(
            (item) =>
              String(
                typeof item === "string" ? item : item._id ?? item.id
              ) !== productId
          )
        : [...wishlist, productId];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      setWishlisted(!exists);
    } catch {
      window.alert("Unable to update your wishlist. Please try again.");
    }
  }

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
        <ShoppingBag size={44} className="text-slate-300" />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Product not found
        </h1>

        <p className="mt-2 max-w-md text-sm text-slate-500">
          This product may have been removed or the link may be incorrect.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-700"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>
      </main>
    );
  }

  const name = product.name ?? product.title ?? "Product";
  const price = getPrice(product);
  const originalPrice = getOriginalPrice(product);
  const images = getImages(product);
  const rating = Number(
    product.rating ?? product.ratings?.average ?? 0
  );
  const reviewCount = Number(
    product.numReviews ?? product.reviewCount ?? product.ratings?.count ?? 0
  );

  const discount =
    originalPrice > price && originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const description =
    product.description ||
    "Discover the details of this product. More product information will be available soon.";

  const stock = Number(product.stock ?? product.countInStock ?? 10);
  const inStock = product.inStock !== false && stock > 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-950">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-slate-950">
              Shop
            </Link>
            <span>/</span>
            <span className="max-w-[200px] truncate font-medium text-slate-900">
              {name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product information */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery
            images={images}
            productName={name}
          />

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {discount > 0 && (
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  SAVE {discount}%
                </span>
              )}

              {product.category && (
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {typeof product.category === "string"
                    ? product.category
                    : product.category.name ?? product.category.title}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              {name}
            </h1>

            {product.brand && (
              <p className="mt-2 text-sm text-slate-500">
                Brand: {product.brand}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Rating
                value={rating}
                count={reviewCount}
                size="md"
              />

              {reviewCount === 0 && (
                <span className="text-sm text-slate-500">
                  No reviews yet
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-950">
                ₹{price.toLocaleString("en-IN")}
              </span>

              {originalPrice > price && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm font-semibold text-emerald-700">
                    You save ₹
                    {(originalPrice - price).toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>

            {/* Stock status */}
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  inStock ? "bg-emerald-500" : "bg-red-500"
                }`}
              />

              <span
                className={`text-sm font-medium ${
                  inStock ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {inStock ? "In stock" : "Currently unavailable"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-slate-900">
                Quantity
              </p>

              <div className="inline-flex items-center rounded-xl border border-slate-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="p-3 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span
                  className="min-w-12 text-center text-sm font-semibold"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={!inStock || quantity >= stock}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(stock, current + 1)
                    )
                  }
                  className="p-3 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>

              {inStock && (
                <p className="mt-2 text-xs text-slate-500">
                  {stock} available
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                disabled={!inStock}
                onClick={addToCart}
                className="flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {added ? <Check size={19} /> : <ShoppingBag size={19} />}
                {added ? "Added to Cart" : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={toggleWishlist}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-semibold transition ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-300 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Heart
                  size={19}
                  className={wishlisted ? "fill-red-500" : ""}
                />
                <span className="sm:hidden">
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </span>
              </button>
            </div>

            {added && (
              <div
                role="status"
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                <span>Product added to your demo cart.</span>

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="inline-flex items-center gap-1 font-bold underline underline-offset-2"
                >
                  View Cart <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* Shopping benefits */}
            <div className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4">
              <div className="flex items-center gap-4 py-4">
                <Truck size={21} className="shrink-0 text-slate-600" />
                <div>
                  <p className="text-sm font-semibold">Shipping information</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Delivery options are shown at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4">
                <RotateCcw size={21} className="shrink-0 text-slate-600" />
                <div>
                  <p className="text-sm font-semibold">Returns & exchanges</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Check the store's return policy before ordering.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4">
                <ShieldCheck size={21} className="shrink-0 text-slate-600" />
                <div>
                  <p className="text-sm font-semibold">Secure shopping</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Demo checkout; no payment is processed here.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              <ArrowLeft size={17} />
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
