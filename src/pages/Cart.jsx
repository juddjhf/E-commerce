
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";
import Rating from "../components/product/Rating";

const CART_KEY = "cart";

const getProductId = (product) =>
  String(product?._id ?? product?.id ?? "");

const getProductName = (product) =>
  product?.name ?? product?.title ?? "Unnamed Product";

const getProductPrice = (product) =>
  Number(
    product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      0
  );

const getProductImage = (product) => {
  if (typeof product?.image === "string") return product.image;
  if (typeof product?.thumbnail === "string") return product.thumbnail;
  if (Array.isArray(product?.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    return typeof firstImage === "string"
      ? firstImage
      : firstImage?.url ?? "";
  }
  return "";
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);

const readCart = () => {
  try {
    const storedCart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(storedCart)
      ? storedCart.filter(Boolean).map((item) => ({
          ...item,
          quantity: Math.max(
            1,
            Math.floor(Number(item.quantity) || 1)
          ),
        }))
      : [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(readCart);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const syncCart = () => setCart(readCart());

    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const updateCart = (nextCart) => {
    setCart(nextCart);
    saveCart(nextCart);
    setCouponMessage("");
    setDiscount(0);
  };

  const updateQuantity = (id, change) => {
    const nextCart = cart.map((item) => {
      if (getProductId(item) !== id) return item;

      return {
        ...item,
        quantity: Math.max(
          1,
          Math.min(99, item.quantity + change)
        ),
      };
    });

    updateCart(nextCart);
  };

  const removeItem = (id) => {
    updateCart(
      cart.filter((item) => getProductId(item) !== id)
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + getProductPrice(item) * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyCoupon = (event) => {
    event.preventDefault();

    if (coupon.trim().toUpperCase() === "WELCOME10") {
      if (subtotal <= 0) {
        setCouponMessage("Add a product before applying a coupon.");
        setDiscount(0);
        return;
      }

      const amount = Math.min(subtotal * 0.1, 500);
      setDiscount(amount);
      setCouponMessage(
        `Coupon applied! You saved ${formatPrice(amount)}.`
      );
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon. Try WELCOME10.");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
            <ShoppingBag size={42} className="text-gray-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-gray-500">
            Looks like you haven't added anything to your cart yet.
            Explore our collection and find something you love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Shopping Cart</span>
        </div>

        {/* Page heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Your selection
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              item(s) in your cart
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <section className="space-y-4 lg:col-span-2">
            {cart.map((item, index) => {
              const id = getProductId(item) || `item-${index}`;
              const name = getProductName(item);
              const price = getProductPrice(item);
              const image = getProductImage(item);

              return (
                <article
                  key={id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Product image */}
                    <Link
                      to={`/products/${getProductId(item)}`}
                      className="flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-36 sm:w-36"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-contain p-3"
                        />
                      ) : (
                        <ShoppingBag
                          size={42}
                          className="text-gray-300"
                        />
                      )}
                    </Link>

                    {/* Product information */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/products/${getProductId(item)}`}
                            className="line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-gray-600"
                          >
                            {name}
                          </Link>

                          {item.rating != null && (
                            <div className="mt-2">
                              <Rating
                                value={Number(
                                  item.rating?.average ?? item.rating
                                )}
                                count={item.rating?.count}
                                size="sm"
                              />
                            </div>
                          )}

                          <p className="mt-2 text-sm text-gray-500">
                            Price: {formatPrice(price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(getProductId(item))}
                          aria-label={`Remove ${name}`}
                          title="Remove item"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                        {/* Quantity control */}
                        <div className="inline-flex items-center rounded-xl border border-gray-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(getProductId(item), -1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                            className="rounded-l-xl p-2.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="min-w-10 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(getProductId(item), 1)
                            }
                            disabled={item.quantity >= 99}
                            aria-label="Increase quantity"
                            className="rounded-r-xl p-2.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear your cart?"
                  )
                ) {
                  updateCart([]);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 transition hover:text-red-600"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between gap-4 text-green-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Shipping and discounts shown are demo calculations.
                </p>
              </div>
            </div>

            {/* Coupon form */}
            <form onSubmit={applyCoupon} className="mt-6">
              <label
                htmlFor="coupon"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Promo Code
              </label>

              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Tag
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="Enter code"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none transition focus:border-gray-900"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl border border-gray-300 px-4 text-sm font-semibold transition hover:bg-gray-100"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p
                  role="status"
                  className={`mt-2 text-xs ${
                    discount > 0 ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {couponMessage}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Demo coupon: WELCOME10
              </p>
            </form>

            {/* Checkout */}
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-700"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <Link
              to="/shop"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>

            {/* Trust indicators */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Truck size={18} className="shrink-0 text-gray-700" />
                <span>
                  {subtotal >= 999
                    ? "Your order qualifies for free shipping"
                    : `Free shipping on orders over ${formatPrice(999)}`}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-gray-700"
                />
                <span>Secure checkout experience (demo UI)</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
