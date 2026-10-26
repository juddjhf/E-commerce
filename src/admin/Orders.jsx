
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  IndianRupee,
  Clock3,
  CheckCircle2,
  Truck,
  Package,
  Eye,
  X,
  Download,
  ChevronDown,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  UserRound,
  ArrowUpRight,
  RotateCcw,
  Filter,
} from "lucide-react";

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
    date: "2026-10-25T10:30:00",
    total: 4298,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Delivered",
    items: [
      {
        id: "p1",
        name: "Premium Wireless Headphones",
        price: 2499,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
      },
      {
        id: "p2",
        name: "Classic Everyday Sneakers",
        price: 1799,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
      },
    ],
    address: "Connaught Place, New Delhi, Delhi 110001",
  },
  {
    id: "ORD-1002",
    customer: "Priya Verma",
    email: "priya@example.com",
    phone: "9876501234",
    date: "2026-10-25T12:15:00",
    total: 3299,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Processing",
    items: [
      {
        id: "p3",
        name: "Minimal Leather Backpack",
        price: 3299,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop",
      },
    ],
    address: "Rohini, New Delhi, Delhi 110085",
  },
  {
    id: "ORD-1003",
    customer: "Rohan Gupta",
    email: "rohan@example.com",
    phone: "9811122233",
    date: "2026-10-24T16:45:00",
    total: 4599,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Shipped",
    items: [
      {
        id: "p4",
        name: "Smart Fitness Watch",
        price: 4599,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
      },
    ],
    address: "Dwarka, New Delhi, Delhi 110075",
  },
  {
    id: "ORD-1004",
    customer: "Ananya Singh",
    email: "ananya@example.com",
    phone: "9899001122",
    date: "2026-10-24T11:20:00",
    total: 1298,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Pending",
    items: [
      {
        id: "p5",
        name: "Everyday Cotton T-Shirt",
        price: 799,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop",
      },
      {
        id: "p6",
        name: "Modern Ceramic Coffee Mug",
        price: 499,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=120&h=120&fit=crop",
      },
    ],
    address: "Lajpat Nagar, New Delhi, Delhi 110024",
  },
  {
    id: "ORD-1005",
    customer: "Kabir Mehta",
    email: "kabir@example.com",
    phone: "9898123456",
    date: "2026-10-23T09:10:00",
    total: 1599,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Cancelled",
    items: [
      {
        id: "p7",
        name: "Portable Bluetooth Speaker",
        price: 1599,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=120&h=120&fit=crop",
      },
    ],
    address: "Janakpuri, New Delhi, Delhi 110058",
  },
  {
    id: "ORD-1006",
    customer: "Isha Kapoor",
    email: "isha@example.com",
    phone: "9810012345",
    date: "2026-10-22T14:00:00",
    total: 2499,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Processing",
    items: [
      {
        id: "p8",
        name: "Premium Wireless Headphones",
        price: 2499,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
      },
    ],
    address: "Pitampura, New Delhi, Delhi 110034",
  },
];

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Shipped: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-rose-50 text-rose-700",
  Refunded: "bg-slate-100 text-slate-600",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

function readDemoOrders() {
  try {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function normalizeSavedOrder(order, index) {
  const customer = order.customer || {};

  const items = Array.isArray(order.items)
    ? order.items.map((item, itemIndex) => ({
        id: item.id || item._id || `${index}-${itemIndex}`,
        name: item.name || item.title || "Store product",
        price: Number(item.price ?? item.sellingPrice ?? 0),
        quantity: Number(item.quantity ?? 1),
        image:
          item.image ||
          (Array.isArray(item.images) ? item.images[0] : "") ||
          "",
      }))
    : [];

  const paymentMethod =
    order.paymentMethod === "cod"
      ? "Cash on Delivery"
      : order.paymentMethod || "Not specified";

  const addressParts = [
    customer.address || order.address,
    customer.city || order.city,
    customer.state || order.state,
    customer.pincode || order.pincode,
    customer.country || order.country,
  ].filter(Boolean);

  return {
    id: String(order.id || order._id || `ORDER-${index + 1}`),
    customer:
      customer.name ||
      [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
      order.customerName ||
      "Guest Customer",
    email: customer.email || order.email || "",
    phone: customer.phone || order.phone || "",
    date: order.createdAt || order.date || new Date().toISOString(),
    total: Number(
      order.total ??
        order.totalAmount ??
        items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    ),
    paymentMethod,
    paymentStatus: order.paymentStatus || "Pending",
    status: ORDER_STATUSES.includes(order.status) ? order.status : "Pending",
    items,
    address: addressParts.join(", ") || "Address not provided",
  };
}

export default function Orders() {
  const [orders, setOrders] = useState(() => {
    const saved = readDemoOrders().map(normalizeSavedOrder);
    const savedIds = new Set(saved.map((order) => order.id));

    return [
      ...saved,
      ...initialOrders.filter((order) => !savedIds.has(order.id)),
    ];
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Orders");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notice, setNotice] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders
      .filter((order) => {
        const query = search.trim().toLowerCase();

        const searchMatch =
          !query ||
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.phone.toLowerCase().includes(query);

        const statusMatch =
          statusFilter === "All Orders" || order.status === statusFilter;

        const paymentMatch =
          paymentFilter === "All Payments" ||
          order.paymentStatus === paymentFilter;

        const orderDate = new Date(order.date);
        const daysAgo = (now.getTime() - orderDate.getTime()) / 86400000;

        let dateMatch = true;

        if (dateFilter === "Today") {
          dateMatch = orderDate.toDateString() === now.toDateString();
        } else if (dateFilter === "Last 7 Days") {
          dateMatch = daysAgo >= 0 && daysAgo <= 7;
        } else if (dateFilter === "Last 30 Days") {
          dateMatch = daysAgo >= 0 && daysAgo <= 30;
        }

        return searchMatch && statusMatch && paymentMatch && dateMatch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, search, statusFilter, paymentFilter, dateFilter]);

  const totalRevenue = orders
    .filter(
      (order) =>
        order.paymentStatus === "Paid" && order.status !== "Cancelled"
    )
    .reduce((sum, order) => sum + order.total, 0);

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const updateOrderStatus = (orderId, nextStatus) => {
    const target = orders.find((order) => order.id === orderId);
    if (!target) return;

    const previousStatus = target.status;

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: nextStatus }
        : order
    );

    setOrders(updatedOrders);

    try {
      const savedOrders = readDemoOrders();
      const originalOrder = savedOrders.find(
        (order) => String(order.id || order._id) === String(orderId)
      );

      if (originalOrder) {
        const nextSavedOrders = savedOrders.map((order) =>
          String(order.id || order._id) === String(orderId)
            ? { ...order, status: nextStatus }
            : order
        );

        localStorage.setItem("orders", JSON.stringify(nextSavedOrders));
      }

      setNotice(`${orderId} status updated to ${nextStatus}.`);
    } catch {
      setNotice(
        `Status changed in the current view, but browser storage could not be updated.`
      );
    }

    setSelectedOrder((previous) =>
      previous?.id === orderId
        ? { ...previous, status: nextStatus }
        : previous
    );

    if (previousStatus === nextStatus) {
      setNotice(`Order ${orderId} is already ${nextStatus}.`);
    }
  };

  const toggleSelect = (orderId) => {
    setSelectedIds((previous) =>
      previous.includes(orderId)
        ? previous.filter((id) => id !== orderId)
        : [...previous, orderId]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredOrders.map((order) => order.id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id));

    setSelectedIds((previous) =>
      allSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : [...new Set([...previous, ...visibleIds])]
    );
  };

  const exportOrders = () => {
    const rows = [
      [
        "Order ID",
        "Customer",
        "Email",
        "Date",
        "Total",
        "Payment Method",
        "Payment Status",
        "Order Status",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.customer,
        order.email,
        formatDateTime(order.date),
        order.total,
        order.paymentMethod,
        order.paymentStatus,
        order.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shopease-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Orders");
    setPaymentFilter("All Payments");
    setDateFilter("All Time");
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link to="/admin/dashboard" className="hover:text-slate-900">
                Admin
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-800">Orders</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Orders
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track customer orders, payments and fulfilment status.
            </p>
          </div>

          <button
            type="button"
            onClick={exportOrders}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        {notice && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800"
          >
            <CheckCircle2 size={18} className="shrink-0" />
            <p className="flex-1">{notice}</p>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 hover:bg-blue-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ShoppingBag}
            label="Total Orders"
            value={orders.length}
            note="All demo orders"
            iconStyle="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={IndianRupee}
            label="Paid Revenue"
            value={formatPrice(totalRevenue)}
            note="Paid, non-cancelled orders"
            iconStyle="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={Clock3}
            label="Pending Orders"
            value={pendingCount}
            note="Awaiting action"
            iconStyle="bg-amber-50 text-amber-600"
          />

          <StatCard
            icon={Truck}
            label="Processing"
            value={processingCount}
            note="Being prepared"
            iconStyle="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Orders table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Orders
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredOrders.length} matching order
                  {filteredOrders.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="relative sm:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search order, customer, email..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <FilterSelect
                label="Order status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={["All Orders", ...ORDER_STATUSES]}
              />

              <FilterSelect
                label="Payment status"
                value={paymentFilter}
                onChange={setPaymentFilter}
                options={["All Payments", "Paid", "Pending", "Failed", "Refunded"]}
              />

              <FilterSelect
                label="Date range"
                value={dateFilter}
                onChange={setDateFilter}
                options={["All Time", "Today", "Last 7 Days", "Last 30 Days"]}
              />

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 self-end rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Reset Filters
              </button>
            </div>

            {selectedIds.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">
                  {selectedIds.length} order(s) selected
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIds([]);
                    setNotice("Selection cleared.");
                  }}
                  className="text-sm font-semibold text-slate-700 hover:text-slate-950"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50/80">
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filteredOrders.length > 0 &&
                        filteredOrders.every((order) =>
                          selectedIds.includes(order.id)
                        )
                      }
                      onChange={toggleSelectAll}
                      aria-label="Select all visible orders"
                      className="h-4 w-4 accent-slate-900"
                    />
                  </th>
                  <th className="px-4 py-4">Order</th>
                  <th className="px-4 py-4">Customer</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Payment</th>
                  <th className="px-4 py-4">Order Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        aria-label={`Select order ${order.id}`}
                        className="h-4 w-4 accent-slate-900"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="text-sm font-bold text-slate-900 hover:underline"
                      >
                        {order.id}
                      </button>
                      <p className="mt-1 text-xs text-slate-400">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {order.customer}
                      </p>
                      <p className="mt-1 max-w-[190px] truncate text-xs text-slate-400">
                        {order.email}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {formatDate(order.date)}
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(order.date).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-slate-900">
                      {formatPrice(order.total)}
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm text-slate-700">
                        {order.paymentMethod}
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          paymentStyles[order.paymentStatus] ||
                          paymentStyles.Pending
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        aria-label={`Update status for ${order.id}`}
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(order.id, event.target.value)
                        }
                        className={`max-w-[145px] rounded-full border-0 py-1.5 pl-3 pr-8 text-xs font-semibold outline-none ring-1 ring-inset ${
                          statusStyles[order.status] || statusStyles.Pending
                        }`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          title="View order details"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-3 p-4 md:hidden">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {order.id}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(order.date)}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={selectedIds.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    aria-label={`Select order ${order.id}`}
                    className="mt-1 h-4 w-4 accent-slate-900"
                  />
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {order.customer}
                  </p>
                  <p className="mt-1 break-all text-xs text-slate-500">
                    {order.email}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      {formatPrice(order.total)}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[order.status] || statusStyles.Pending
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
                  <label className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-medium text-slate-500">
                      Update status
                    </span>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    <Eye size={16} />
                    Details
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ShoppingBag size={27} />
              </div>
              <h3 className="mt-4 font-bold text-slate-800">
                No orders found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search term or clear the filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-semibold text-slate-900 underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <span>ShopEase Admin · Demo order data</span>
          </div>
        </section>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={updateOrderStatus}
        />
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note, iconStyle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{note}</p>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
      </span>
      <div className="relative">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}

function OrderDetailsModal({ order, onClose, onStatusChange }) {
  const [nextStatus, setNextStatus] = useState(order.status);

  const itemCount = order.items.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Order details
            </p>
            <h2
              id="order-modal-title"
              className="mt-1 text-xl font-bold text-slate-900"
            >
              {order.id}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Placed on {formatDateTime(order.date)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {/* Customer and order status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <UserRound size={17} className="text-slate-400" />
                Customer
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                {order.customer}
              </p>

              {order.email && (
                <p className="mt-2 flex items-start gap-2 break-all text-xs text-slate-500">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  {order.email}
                </p>
              )}

              {order.phone && (
                <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={14} />
                  {order.phone}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Truck size={17} className="text-slate-400" />
                Fulfilment
              </div>

              <span
                className={`mt-4 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                  statusStyles[order.status] || statusStyles.Pending
                }`}
              >
                {order.status}
              </span>

              <label className="mt-3 block">
                <span className="mb-1.5 block text-xs font-medium text-slate-500">
                  Update order status
                </span>
                <select
                  value={nextStatus}
                  onChange={(event) => setNextStatus(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                disabled={nextStatus === order.status}
                onClick={() => onStatusChange(order.id, nextStatus)}
                className="mt-3 w-full rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save Status
              </button>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-bold text-slate-900">Order Items</h3>
              <span className="text-xs text-slate-500">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {order.items.map((item, index) => (
                <div
                  key={item.id || `${item.name}-${index}`}
                  className="flex items-center gap-3 p-3 sm:p-4"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-lg border border-slate-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                      <Package size={22} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-slate-900">
                    {formatPrice(
                      Number(item.price || 0) * Number(item.quantity || 1)
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery address and payment */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <MapPin size={17} className="text-slate-400" />
                Delivery Address
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {order.address || "Address not provided"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <IndianRupee size={17} className="text-slate-400" />
                Payment Summary
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3 text-slate-500">
                  <span>Items subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-3 text-slate-500">
                  <span>Order total</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-2">
                  <p className="text-xs text-slate-500">Payment method</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {order.paymentMethod}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      paymentStyles[order.paymentStatus] ||
                      paymentStyles.Pending
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
