
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
  X,
  ChevronDown,
  Download,
} from "lucide-react";

const initialProducts = [
  {
    id: "PRD-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 42,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-002",
    name: "Classic Everyday Sneakers",
    category: "Footwear",
    price: 1899,
    stock: 28,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-003",
    name: "Minimal Leather Backpack",
    category: "Accessories",
    price: 3299,
    stock: 8,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-004",
    name: "Modern Ceramic Coffee Mug",
    category: "Home",
    price: 499,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-005",
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 4599,
    stock: 15,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-006",
    name: "Everyday Cotton T-Shirt",
    category: "Fashion",
    price: 799,
    stock: 5,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-007",
    name: "Premium Sunglasses",
    category: "Accessories",
    price: 1299,
    stock: 31,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=160&h=160&fit=crop",
  },
  {
    id: "PRD-008",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 1599,
    stock: 12,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=160&h=160&fit=crop",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Draft: "bg-slate-100 text-slate-600 ring-slate-500/20",
  "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [selectedIds, setSelectedIds] = useState([]);

  const categories = [
    "All Categories",
    ...new Set(initialProducts.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All Categories" || product.category === category;

      const statusMatch =
        status === "All Status" || product.status === status;

      const stockMatch =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && product.stock > 5) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= 5) ||
        (stockFilter === "Out of Stock" && product.stock === 0);

      return searchMatch && categoryMatch && statusMatch && stockMatch;
    });
  }, [products, search, category, status, stockFilter]);

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stock === 0
  ).length;

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredProducts.map((product) => product.id);
    const allVisibleSelected = visibleIds.every((id) =>
      selectedIds.includes(id)
    );

    setSelectedIds((previous) =>
      allVisibleSelected
        ? previous.filter((id) => !visibleIds.includes(id))
        : [...new Set([...previous, ...visibleIds])]
    );
  };

  const deleteProduct = (id) => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const confirmed = window.confirm(
      `Delete "${product.name}" from this demo list?`
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((item) => item.id !== id)
    );
    setSelectedIds((previous) => previous.filter((item) => item !== id));
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected demo product(s)?`
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((product) => !selectedIds.includes(product.id))
    );
    setSelectedIds([]);
  };

  const exportProducts = () => {
    const rows = [
      ["Product ID", "Product Name", "Category", "Price", "Stock", "Status"],
      ...filteredProducts.map((product) => [
        product.id,
        product.name,
        product.category,
        product.price,
        product.stock,
        product.status,
      ]),
    ];

    const csv = rows
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
    link.download = "shopease-products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-slate-800">Products</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your catalogue, pricing and inventory.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={exportProducts}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <Download size={17} />
              Export CSV
            </button>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Package}
            label="Total Products"
            value={products.length}
            note="Products in demo catalogue"
            iconClass="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            icon={TrendingUp}
            label="Inventory Value"
            value={formatPrice(totalValue)}
            note="Based on current stock"
            iconClass="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            icon={AlertTriangle}
            label="Low Stock"
            value={lowStockCount}
            note="5 units or fewer"
            iconClass="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            icon={Package}
            label="Out of Stock"
            value={outOfStockCount}
            note="Needs restocking"
            iconClass="bg-rose-50 text-rose-600"
          />
        </div>

        {/* Product table card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  All Products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 sm:w-72">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products or ID..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All Categories");
                    setStatus("All Status");
                    setStockFilter("All Stock");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <SlidersHorizontal size={16} />
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <FilterSelect
                label="Category"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <FilterSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={["All Status", "Active", "Draft", "Out of Stock"]}
              />

              <FilterSelect
                label="Inventory"
                value={stockFilter}
                onChange={setStockFilter}
                options={[
                  "All Stock",
                  "In Stock",
                  "Low Stock",
                  "Out of Stock",
                ]}
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">
                  {selectedIds.length} product(s) selected
                </p>

                <button
                  type="button"
                  onClick={deleteSelected}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 size={15} />
                  Delete selected
                </button>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50/80">
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        filteredProducts.every((product) =>
                          selectedIds.includes(product.id)
                        )
                      }
                      onChange={toggleSelectAll}
                      aria-label="Select all visible products"
                      className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                    />
                  </th>
                  <th className="px-4 py-4">Product</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Stock</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        aria-label={`Select ${product.name}`}
                        className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-[250px] items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-14 w-14 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-[250px] truncate text-sm font-semibold text-slate-800">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            product.stock === 0
                              ? "bg-rose-500"
                              : product.stock <= 5
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                        />
                        <span className="text-sm text-slate-700">
                          {product.stock} units
                        </span>
                      </div>
                      {product.stock > 0 && product.stock <= 5 && (
                        <p className="mt-1 text-xs text-amber-600">
                          Low stock
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          statusStyles[product.status] || statusStyles.Draft
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          title="View product"
                          onClick={() =>
                            window.alert(
                              `${product.name}\nPrice: ${formatPrice(
                                product.price
                              )}\nStock: ${product.stock}`
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={17} />
                        </button>

                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          title="Edit product"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          title="Delete product"
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile product cards */}
          <div className="grid gap-3 p-4 md:hidden">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    aria-label={`Select ${product.name}`}
                    className="mt-1 h-4 w-4 accent-slate-900"
                  />

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-16 w-16 rounded-xl border border-slate-100 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {product.id} · {product.category}
                    </p>
                    <p className="mt-2 font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs text-slate-500">Inventory</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {product.stock} units
                    </p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                      statusStyles[product.status] || statusStyles.Draft
                    }`}
                  >
                    {product.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      aria-label={`Edit ${product.name}`}
                      className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Pencil size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      aria-label={`Delete ${product.name}`}
                      className="rounded-lg p-2 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Package size={27} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Categories");
                  setStatus("All Status");
                  setStockFilter("All Stock");
                }}
                className="mt-4 text-sm font-semibold text-slate-900 underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-slate-500">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              <Plus size={16} />
              Add another product
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          ShopEase Admin · Demo product data
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, note, iconClass }) {
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
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
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
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}
