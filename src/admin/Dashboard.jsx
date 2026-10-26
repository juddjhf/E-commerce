
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  CalendarDays,
  MoreHorizontal,
  Eye,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react";

const demoOrders = [
  {
    id: "ORD-1008",
    customer: "Aarav Sharma",
    initials: "AS",
    email: "aarav@example.com",
    product: "Wireless Headphones",
    amount: 2499,
    date: "Today, 10:42 AM",
    status: "Delivered",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "ORD-1007",
    customer: "Priya Verma",
    initials: "PV",
    email: "priya@example.com",
    product: "Classic Sneakers",
    amount: 3299,
    date: "Today, 09:18 AM",
    status: "Processing",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "ORD-1006",
    customer: "Rahul Mehta",
    initials: "RM",
    email: "rahul@example.com",
    product: "Smart Watch",
    amount: 4599,
    date: "Yesterday",
    status: "Shipped",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "ORD-1005",
    customer: "Ananya Singh",
    initials: "AS",
    email: "ananya@example.com",
    product: "Everyday Backpack",
    amount: 1799,
    date: "Yesterday",
    status: "Pending",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "ORD-1004",
    customer: "Karan Patel",
    initials: "KP",
    email: "karan@example.com",
    product: "Minimal Desk Lamp",
    amount: 1299,
    date: "22 Oct 2026",
    status: "Cancelled",
    color: "bg-gray-100 text-gray-600",
  },
];

const salesData = {
  "7 days": [
    { label: "Mon", revenue: 4200, orders: 12 },
    { label: "Tue", revenue: 6800, orders: 18 },
    { label: "Wed", revenue: 5100, orders: 14 },
    { label: "Thu", revenue: 8900, orders: 25 },
    { label: "Fri", revenue: 7200, orders: 21 },
    { label: "Sat", revenue: 11200, orders: 32 },
    { label: "Sun", revenue: 9400, orders: 28 },
  ],
  "30 days": [
    { label: "Week 1", revenue: 24500, orders: 74 },
    { label: "Week 2", revenue: 31800, orders: 91 },
    { label: "Week 3", revenue: 28600, orders: 83 },
    { label: "Week 4", revenue: 41200, orders: 116 },
  ],
  "90 days": [
    { label: "Aug", revenue: 82000, orders: 230 },
    { label: "Sep", revenue: 96500, orders: 278 },
    { label: "Oct", revenue: 126000, orders: 354 },
  ],
};

const topProducts = [
  {
    id: "P-101",
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 124,
    revenue: 309876,
    icon: "🎧",
  },
  {
    id: "P-102",
    name: "Classic Sneakers",
    category: "Footwear",
    sold: 98,
    revenue: 323302,
    icon: "👟",
  },
  {
    id: "P-103",
    name: "Smart Watch",
    category: "Electronics",
    sold: 76,
    revenue: 349524,
    icon: "⌚",
  },
  {
    id: "P-104",
    name: "Everyday Backpack",
    category: "Accessories",
    sold: 63,
    revenue: 113337,
    icon: "🎒",
  },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-green-50 text-green-700 ring-green-600/20",
    Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Shipped: "bg-purple-50 text-purple-700 ring-purple-600/20",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Cancelled: "bg-gray-100 text-gray-600 ring-gray-500/20",
  };

  const icons = {
    Delivered: CheckCircle2,
    Processing: Clock3,
    Shipped: Truck,
    Pending: Clock3,
    Cancelled: XCircle,
  };

  const Icon = icons[status] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || styles.Pending
      }`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  iconStyle,
  description,
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}>
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-green-700" : "text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {change}
        </span>

        <span className="text-xs text-gray-400">{description}</span>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState("7 days");
  const [orderFilter, setOrderFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const chartData = salesData[period];

  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));

  const filteredOrders = useMemo(() => {
    return demoOrders.filter((order) => {
      const matchesStatus =
        orderFilter === "All" || order.status === orderFilter;

      const query = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orderFilter, searchTerm]);

  const downloadOrders = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Product",
      "Amount",
      "Date",
      "Status",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.email,
      order.product,
      order.amount,
      order.date,
      order.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "shopease-demo-orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="mx-auto max-w-[1600px] space-y-7">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="font-medium text-gray-900">Dashboard</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Monitor your store performance and manage daily operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products/add"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <Plus size={17} />
            Add Product
          </Link>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            View Orders
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <Activity size={20} className="mt-0.5 shrink-0" />

        <div>
          <p className="text-sm font-semibold">Demo dashboard</p>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            All figures, orders, and product statistics below are sample data.
            Connect your backend API to display real store information.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">Store Performance</h2>
          <span className="text-xs text-gray-400">Sample metrics</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatPrice(248560)}
            change="+12.8%"
            positive={true}
            icon={IndianRupee}
            iconStyle="bg-green-50 text-green-700"
            description="vs previous period"
          />

          <MetricCard
            title="Total Orders"
            value="1,284"
            change="+8.2%"
            positive={true}
            icon={ShoppingCart}
            iconStyle="bg-blue-50 text-blue-700"
            description="vs previous period"
          />

          <MetricCard
            title="Total Products"
            value="156"
            change="+4.5%"
            positive={true}
            icon={Package}
            iconStyle="bg-purple-50 text-purple-700"
            description="vs previous period"
          />

          <MetricCard
            title="Total Customers"
            value="892"
            change="-2.4%"
            positive={false}
            icon={Users}
            iconStyle="bg-orange-50 text-orange-700"
            description="vs previous period"
          />
        </div>
      </section>

      {/* Chart and order summary */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        {/* Sales chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">Sales Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Sample revenue performance over time
              </p>
            </div>

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Sales chart period"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-gray-900"
            >
              <option value="7 days">Last 7 days</option>
              <option value="30 days">Last 30 days</option>
              <option value="90 days">Last 90 days</option>
            </select>
          </div>

          <div className="mt-7">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
              <span className="text-xs text-gray-500">Revenue (₹)</span>
            </div>

            <div className="mt-5 flex h-56 items-end gap-2 border-b border-gray-200 pb-2 sm:gap-4">
              {chartData.map((item) => {
                const height = Math.max(
                  8,
                  (item.revenue / maxRevenue) * 100
                );

                return (
                  <div
                    key={item.label}
                    className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <div className="mb-2 hidden rounded-md bg-gray-950 px-2 py-1 text-[10px] text-white group-hover:block">
                      {formatPrice(item.revenue)}
                    </div>

                    <div className="flex w-full flex-1 items-end justify-center">
                      <div
                        title={`${item.label}: ${formatPrice(item.revenue)}`}
                        style={{ height: `${height}%` }}
                        className="w-full max-w-12 rounded-t-lg bg-gray-900 transition-all duration-300 hover:bg-gray-600"
                      />
                    </div>

                    <span className="mt-3 whitespace-nowrap text-[10px] text-gray-500 sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Revenue in selection</p>
                <p className="mt-2 text-lg font-bold">
                  {formatPrice(
                    chartData.reduce((sum, item) => sum + item.revenue, 0)
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Orders in selection</p>
                <p className="mt-2 text-lg font-bold">
                  {chartData.reduce((sum, item) => sum + item.orders, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order status summary */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Order Status</h2>
              <p className="mt-1 text-sm text-gray-500">
                Sample order breakdown
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <ShoppingCart size={20} />
            </div>
          </div>

          {[
            {
              label: "Delivered",
              count: 742,
              percentage: 72,
              color: "bg-green-500",
              text: "text-green-700",
            },
            {
              label: "Processing",
              count: 156,
              percentage: 48,
              color: "bg-blue-500",
              text: "text-blue-700",
            },
            {
              label: "Shipped",
              count: 204,
              percentage: 58,
              color: "bg-purple-500",
              text: "text-purple-700",
            },
            {
              label: "Pending",
              count: 124,
              percentage: 32,
              color: "bg-amber-500",
              text: "text-amber-700",
            },
          ].map((item) => (
            <div key={item.label} className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>

                <span className={`text-sm font-bold ${item.text}`}>
                  {item.count}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}

          <Link
            to="/admin/orders"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold transition hover:bg-gray-50"
          >
            Manage All Orders
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Recent orders */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review and search recent demo orders
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadOrders}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Download size={16} />
              Export CSV
            </button>

            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              View All
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search order, customer or product..."
            aria-label="Search recent orders"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-900 sm:max-w-sm"
          />

          <select
            value={orderFilter}
            onChange={(event) => setOrderFilter(event.target.value)}
            aria-label="Filter orders by status"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900"
          >
            <option value="All">All statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Order",
                  "Customer",
                  "Product",
                  "Date",
                  "Amount",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-900">
                      {order.id}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${order.color}`}
                      >
                        {order.initials}
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold">
                          {order.customer}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {order.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.product}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                    {order.date}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-bold">
                    {formatPrice(order.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to="/admin/orders"
                      aria-label={`View ${order.id}`}
                      title={`View ${order.id}`}
                      className="inline-flex rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No orders match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {filteredOrders.length} of {demoOrders.length} demo orders
          </p>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:underline"
          >
            All orders
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Top products */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Top Selling Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              Sample product performance
            </p>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:underline"
          >
            Manage Products
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-6 divide-y divide-gray-100">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0 sm:flex-nowrap"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                {product.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {product.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {product.category} · {product.sold} units sold
                </p>
              </div>

              <div className="ml-auto text-right">
                <p className="text-sm font-bold text-gray-900">
                  {formatPrice(product.revenue)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Revenue · #{index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/admin/products/add"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Package size={23} />
            </div>
            <div>
              <p className="font-bold">Add a New Product</p>
              <p className="mt-1 text-sm text-gray-500">
                Expand your product catalog
              </p>
            </div>
          </div>

          <ArrowUpRight
            size={19}
            className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>

        <Link
          to="/admin/orders"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <CalendarDays size={23} />
            </div>
            <div>
              <p className="font-bold">Review Orders</p>
              <p className="mt-1 text-sm text-gray-500">
                Check order details and status
              </p>
            </div>
          </div>

          <ArrowUpRight
            size={19}
            className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </section>
    </main>
  );
}
