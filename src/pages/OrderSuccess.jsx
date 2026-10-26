
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  ClipboardCheck,
} from "lucide-react";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const getName = (product) =>
  product?.name ?? product?.title ?? "Product";

const getPrice = (product) =>
  Number(
    product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      0
  );

const getImage = (product) => {
  if (typeof product?.image === "string") return product.image;
  if (typeof product?.thumbnail === "string") return product.thumbnail;

  if (Array.isArray(product?.images) && product.images.length > 0) {
    const image = product.images[0];
    return typeof image === "string" ? image : image?.url ?? "";
  }

  return "";
};

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order ?? null;

  if (!order) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <ClipboardCheck size={36} className="text-gray-400" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          No order details found
        </h1>

        <p className="mt-2 max-w-md text-gray-500">
          Your order confirmation details are not available in this session.
          You can continue shopping or review your previous demo orders.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const customer = order.customer ?? {};

  const subtotal =
    order.subtotal ??
    items.reduce(
      (sum, item) =>
        sum +
        getPrice(item) * Math.max(1, Number(item.quantity) || 1),
      0
    );

  const shipping = Number(order.shipping) || 0;
  const total = Number(order.total ?? subtotal + shipping);

  const orderDate = order.createdAt
    ? new Date(order.createdAt)
    : new Date();

  const formattedDate = Number.isNaN(orderDate.getTime())
    ? "Date unavailable"
    : orderDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  const paymentLabel =
    order.paymentMethod === "cod"
      ? "Cash on Delivery"
      : order.paymentMethod === "online"
        ? "Online Payment (Demo)"
        : order.paymentMethod ?? "Not specified";

  const statusLabel =
    order.status === "Pending"
      ? "Pending"
      : order.status ?? "Order received";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Success header */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <CheckCircle2 size={46} strokeWidth={1.7} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Order confirmation
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
              Your demo order has been saved successfully in this browser.
              Here are your order details for reference.
            </p>

            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <Package size={18} />
              <span className="text-sm text-gray-300">Order ID:</span>
              <span className="break-all font-semibold">
                {order.id ?? "Order ID unavailable"}
              </span>
            </div>
          </div>

          {/* Order overview */}
          <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5 text-center sm:p-6">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="mt-2 font-semibold text-gray-900">
                {formattedDate}
              </p>
            </div>

            <div className="p-5 text-center sm:p-6">
              <p className="text-sm text-gray-500">Order Status</p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {statusLabel}
              </span>
            </div>

            <div className="p-5 text-center sm:p-6">
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatPrice(total)}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-5">
          {/* Product details */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:col-span-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <ShoppingBag size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Order Items
                </h2>
                <p className="text-sm text-gray-500">
                  {items.reduce(
                    (sum, item) =>
                      sum + Math.max(1, Number(item.quantity) || 1),
                    0
                  )}{" "}
                  item(s) ordered
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-gray-100">
              {items.map((item, index) => {
                const image = getImage(item);
                const quantity = Math.max(
                  1,
                  Number(item.quantity) || 1
                );

                return (
                  <div
                    key={item._id ?? item.id ?? index}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                      {image ? (
                        <img
                          src={image}
                          alt={getName(item)}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <ShoppingBag
                          size={28}
                          className="text-gray-300"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold text-gray-900">
                        {getName(item)}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-700">
                        {formatPrice(getPrice(item))} each
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-gray-900">
                      {formatPrice(getPrice(item) * quantity)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm">
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

              {Number(order.discount) > 0 && (
                <div className="flex justify-between gap-3 text-green-700">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between gap-3 border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
                <span>Total Paid / Payable</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </section>

          {/* Delivery and payment */}
          <div className="space-y-6 md:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <MapPin size={21} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="mt-5 text-sm leading-6 text-gray-600">
                <p className="font-semibold text-gray-900">
                  {[customer.firstName, customer.lastName]
                    .filter(Boolean)
                    .join(" ") || "Customer"}
                </p>

                {customer.address && <p>{customer.address}</p>}

                <p>
                  {[customer.city, customer.state, customer.pincode]
                    .filter(Boolean)
                    .join(", ")}
                </p>

                {customer.country && <p>{customer.country}</p>}

                {customer.phone && (
                  <p className="mt-3">Phone: {customer.phone}</p>
                )}

                {customer.email && <p>Email: {customer.email}</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <CreditCard size={21} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">
                  Payment Details
                </h2>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Selected method
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {paymentLabel}
              </p>

              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                Demo order only. No real payment has been processed, and
                this page does not confirm a real shipment.
              </p>
            </section>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Truck size={21} className="text-gray-700" />
                <h2 className="font-bold text-gray-900">
                  What happens next?
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                In a production store, order confirmation, shipping updates,
                and delivery tracking would be provided by the backend.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700"
          >
            <ShoppingBag size={18} />
            Continue Shopping
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
