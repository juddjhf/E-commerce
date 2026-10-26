
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";

const CART_KEY = "cart";
const SHIPPING_FEE = 79;
const FREE_SHIPPING_LIMIT = 999;

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

const getPrice = (product) =>
  Number(
    product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      0
  );

const getName = (product) =>
  product?.name ?? product?.title ?? "Product";

const getImage = (product) => {
  if (typeof product?.image === "string") return product.image;
  if (typeof product?.thumbnail === "string") return product.thumbnail;

  if (Array.isArray(product?.images) && product.images.length > 0) {
    const image = product.images[0];
    return typeof image === "string" ? image : image?.url ?? "";
  }

  return "";
};

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    notes: "",
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );
      setCart(Array.isArray(stored) ? stored : []);
    } catch {
      setCart([]);
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + getPrice(item) * Math.max(1, Number(item.quantity) || 1),
    0
  );

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT
      ? 0
      : SHIPPING_FEE;

  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = {
        id: `DEMO-${Date.now()}`,
        items: cart,
        customer: form,
        paymentMethod,
        subtotal,
        shipping,
        total,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      const previousOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      localStorage.setItem(
        "orders",
        JSON.stringify([
          order,
          ...(Array.isArray(previousOrders) ? previousOrders : []),
        ])
      );

      localStorage.setItem(CART_KEY, "[]");
      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/order-success", {
        state: { order },
      });
    } catch {
      setError(
        "Unable to save your demo order. Please check your browser storage and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100";

  const labelClass = "text-sm font-medium text-gray-700";

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag size={34} className="text-gray-500" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-gray-900">
            Cart
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Checkout</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Almost there
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details to complete your demo order.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[
            { label: "Shopping Cart", number: "01", done: true },
            { label: "Checkout", number: "02", done: true },
            { label: "Confirmation", number: "03", done: false },
          ].map((step) => (
            <div
              key={step.number}
              className={`rounded-xl border p-3 sm:p-4 ${
                step.label === "Checkout"
                  ? "border-gray-900 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-xs text-gray-400">{step.number}</p>
              <p className="mt-1 text-xs font-semibold text-gray-800 sm:text-sm">
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3"
        >
          {/* Checkout form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact details */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <PackageCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Contact Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Your order contact details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  First Name *
                  <input
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    placeholder="First name"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Last Name *
                  <input
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    placeholder="Last name"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Email Address *
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Mobile Number *
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel-national"
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </label>
              </div>
            </section>

            {/* Delivery address */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <MapPin size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Delivery Address
                  </h2>
                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className={`${labelClass} sm:col-span-2`}>
                  Street Address *
                  <input
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    autoComplete="street-address"
                    placeholder="House no., street, area"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  City *
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    placeholder="Your city"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  State *
                  <input
                    required
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    placeholder="Your state"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  PIN Code *
                  <input
                    required
                    inputMode="numeric"
                    maxLength={6}
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    placeholder="6-digit PIN code"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Country *
                  <input
                    required
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className={inputClass}
                  />
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Order Notes (Optional)
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Delivery instructions or additional notes"
                    className={inputClass}
                  />
                </label>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>
                  <p className="text-sm text-gray-500">
                    Select a demo payment preference
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="mt-1 accent-gray-900"
                  />

                  <Truck size={21} className="mt-0.5 text-gray-700" />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order arrives. Demo selection only.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === "online"
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="mt-1 accent-gray-900"
                  />

                  <Wallet size={21} className="mt-0.5 text-gray-700" />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Online Payment
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Gateway integration can be added later.
                    </p>
                  </div>
                </label>
              </div>

              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                Demo mode: selecting Online Payment does not charge money.
                A real payment gateway and backend verification are required
                before accepting payments.
              </p>
            </section>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                <ArrowLeft size={17} />
                Back to Cart
              </Link>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Place Demo Order"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900">
              Your Order
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {cart.reduce(
                (sum, item) =>
                  sum + Math.max(1, Number(item.quantity) || 1),
                0
              )}{" "}
              item(s)
            </p>

            <div className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
              {cart.map((item, index) => {
                const image = getImage(item);
                const quantity = Math.max(
                  1,
                  Number(item.quantity) || 1
                );

                return (
                  <div
                    key={item._id ?? item.id ?? index}
                    className="flex gap-3"
                  >
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                      {image ? (
                        <img
                          src={image}
                          alt={getName(item)}
                          className="h-full w-full rounded-xl object-contain p-1"
                        />
                      ) : (
                        <ShoppingBag
                          size={24}
                          className="text-gray-300"
                        />
                      )}

                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
                        {quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-gray-800">
                        {getName(item)}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatPrice(getPrice(item))} × {quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                      {formatPrice(getPrice(item) * quantity)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 text-sm">
              <div className="flex justify-between gap-3 text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-3 text-gray-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <LockKeyhole
                size={20}
                className="shrink-0 text-gray-600"
              />
              <p className="text-xs leading-5 text-gray-500">
                This is a frontend demo. Orders are stored in this browser,
                not sent to a server.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
