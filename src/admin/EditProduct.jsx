
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Save,
  RotateCcw,
  ImagePlus,
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  Boxes,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Accessories",
  "Footwear",
  "Audio",
];

const EMPTY_FORM = {
  name: "",
  sku: "",
  category: "",
  price: "",
  comparePrice: "",
  stock: "",
  status: "Active",
  description: "",
  image: "",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

function readProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem("demoProducts") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    const products = readProducts();
    const product = products.find(
      (item) => String(item.id ?? item._id) === String(id)
    );

    if (!product) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setForm({
      name: product.name || product.title || "",
      sku: product.sku || "",
      category:
        typeof product.category === "string"
          ? product.category
          : product.category?.name || "",
      price: String(product.price ?? product.sellingPrice ?? ""),
      comparePrice:
        product.comparePrice == null ? "" : String(product.comparePrice),
      stock: String(product.stock ?? product.countInStock ?? ""),
      status: product.status || "Active",
      description: product.description || "",
      image:
        product.image ||
        (Array.isArray(product.images) ? product.images[0] : "") ||
        "",
    });

    setLoading(false);
  }, [id]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setNotice("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Product name is required.";
    } else if (form.name.trim().length < 3) {
      nextErrors.name = "Enter at least 3 characters.";
    }

    if (!form.sku.trim()) {
      nextErrors.sku = "SKU is required.";
    }

    if (!form.category) {
      nextErrors.category = "Select a category.";
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      nextErrors.price = "Enter a price greater than ₹0.";
    }

    if (
      form.comparePrice !== "" &&
      (!Number.isFinite(Number(form.comparePrice)) ||
        Number(form.comparePrice) < Number(form.price))
    ) {
      nextErrors.comparePrice =
        "Compare-at price must be equal to or greater than selling price.";
    }

    if (
      form.stock === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      nextErrors.stock = "Enter a valid whole-number stock quantity.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Product description is required.";
    } else if (form.description.trim().length < 10) {
      nextErrors.description = "Enter at least 10 characters.";
    }

    if (form.image.trim()) {
      try {
        const imageUrl = new URL(form.image.trim());

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          nextErrors.image = "Use a valid HTTP or HTTPS image URL.";
        }
      } catch {
        nextErrors.image = "Enter a valid image URL.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!validate()) {
      setNotice("Please fix the highlighted fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const products = readProducts();
      const productIndex = products.findIndex(
        (item) => String(item.id ?? item._id) === String(id)
      );

      if (productIndex === -1) {
        setNotFound(true);
        setNotice("Product could not be found in demo storage.");
        return;
      }

      const duplicateSku = products.some(
        (product, index) =>
          index !== productIndex &&
          String(product.sku || "").toLowerCase() ===
            form.sku.trim().toLowerCase()
      );

      if (duplicateSku) {
        setErrors({ sku: "This SKU is already used by another product." });
        setNotice("Please enter a unique SKU.");
        return;
      }

      const previousProduct = products[productIndex];

      const updatedProduct = {
        ...previousProduct,
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category,
        price: Number(form.price),
        comparePrice:
          form.comparePrice === "" ? null : Number(form.comparePrice),
        stock: Number(form.stock),
        status:
          Number(form.stock) === 0 ? "Out of Stock" : form.status,
        description: form.description.trim(),
        image: form.image.trim(),
        updatedAt: new Date().toISOString(),
      };

      products[productIndex] = updatedProduct;
      localStorage.setItem("demoProducts", JSON.stringify(products));

      setNotice("Product updated successfully in demo storage.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setNotice("Unable to save changes. Check browser storage settings.");
    }
  };

  const resetChanges = () => {
    const product = readProducts().find(
      (item) => String(item.id ?? item._id) === String(id)
    );

    if (!product) return;

    setForm({
      name: product.name || product.title || "",
      sku: product.sku || "",
      category:
        typeof product.category === "string"
          ? product.category
          : product.category?.name || "",
      price: String(product.price ?? product.sellingPrice ?? ""),
      comparePrice:
        product.comparePrice == null ? "" : String(product.comparePrice),
      stock: String(product.stock ?? product.countInStock ?? ""),
      status: product.status || "Active",
      description: product.description || "",
      image:
        product.image ||
        (Array.isArray(product.images) ? product.images[0] : "") ||
        "",
    });

    setErrors({});
    setNotice("");
    setPreviewError(false);
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      errors[field]
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-50"
        : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
    }`;

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
          <p className="mt-4 text-sm text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Package size={27} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Product not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This product is not present in the saved demo products. The
            sample products in Products.jsx are separate from demoProducts.
          </p>

          <Link
            to="/admin/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Heading */}
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/dashboard" className="hover:text-slate-900">
              Admin
            </Link>
            <span>/</span>
            <Link to="/admin/products" className="hover:text-slate-900">
              Products
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-800">Edit Product</span>
          </div>

          <Link
            to="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to products
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Edit Product
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Update your product details and inventory information.
              </p>
            </div>

            <span className="inline-flex self-start items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
              <Package size={15} />
              ID: {id}
            </span>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
              notice.startsWith("Product updated")
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {notice.startsWith("Product updated") ? (
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
            )}
            <span className="flex-1">{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSave} noValidate>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Basic Information
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Product name, SKU and description
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Product Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      maxLength={120}
                      placeholder="Enter product name"
                      className={inputClass("name")}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="sku" className={labelClass}>
                        SKU / Product Code *
                      </label>
                      <input
                        id="sku"
                        name="sku"
                        value={form.sku}
                        onChange={updateField}
                        maxLength={50}
                        placeholder="e.g. HEAD-001"
                        className={inputClass("sku")}
                        aria-invalid={Boolean(errors.sku)}
                      />
                      {errors.sku && <FieldError>{errors.sku}</FieldError>}
                    </div>

                    <div>
                      <label htmlFor="category" className={labelClass}>
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={updateField}
                        className={inputClass("category")}
                        aria-invalid={Boolean(errors.category)}
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                        {form.category &&
                          !CATEGORIES.includes(form.category) && (
                            <option value={form.category}>
                              {form.category}
                            </option>
                          )}
                      </select>
                      {errors.category && (
                        <FieldError>{errors.category}</FieldError>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className={labelClass}>
                      Product Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      maxLength={2000}
                      value={form.description}
                      onChange={updateField}
                      placeholder="Describe product features and benefits..."
                      className={`${inputClass("description")} resize-y`}
                      aria-invalid={Boolean(errors.description)}
                    />
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      {errors.description ? (
                        <FieldError>{errors.description}</FieldError>
                      ) : (
                        <p className="text-xs text-slate-400">
                          Keep the description clear and informative.
                        </p>
                      )}
                      <span className="text-xs text-slate-400">
                        {form.description.length}/2000
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <IndianRupee size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Pricing & Inventory
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage selling price and stock
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  <div>
                    <label htmlFor="price" className={labelClass}>
                      Selling Price (₹) *
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.price}
                      onChange={updateField}
                      placeholder="2499"
                      className={inputClass("price")}
                      aria-invalid={Boolean(errors.price)}
                    />
                    {errors.price && <FieldError>{errors.price}</FieldError>}
                  </div>

                  <div>
                    <label htmlFor="comparePrice" className={labelClass}>
                      Compare-at Price (₹)
                    </label>
                    <input
                      id="comparePrice"
                      name="comparePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.comparePrice}
                      onChange={updateField}
                      placeholder="2999"
                      className={inputClass("comparePrice")}
                      aria-invalid={Boolean(errors.comparePrice)}
                    />
                    {errors.comparePrice && (
                      <FieldError>{errors.comparePrice}</FieldError>
                    )}
                  </div>

                  <div>
                    <label htmlFor="stock" className={labelClass}>
                      Stock Quantity *
                    </label>
                    <div className="relative">
                      <Boxes
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        onChange={updateField}
                        placeholder="50"
                        className={`${inputClass("stock")} pl-10`}
                        aria-invalid={Boolean(errors.stock)}
                      />
                    </div>
                    {errors.stock && <FieldError>{errors.stock}</FieldError>}
                  </div>

                  <div>
                    <label htmlFor="status" className={labelClass}>
                      Product Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={form.status === "Out of Stock" ? "Active" : form.status}
                      onChange={updateField}
                      className={inputClass("status")}
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <p className="mt-2 text-xs text-slate-400">
                      Zero stock automatically sets Out of Stock.
                    </p>
                  </div>

                  {form.price !== "" &&
                    form.stock !== "" &&
                    Number(form.price) > 0 &&
                    Number(form.stock) >= 0 && (
                      <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                        <p className="text-xs font-medium text-slate-500">
                          Inventory value
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {formatPrice(Number(form.price) * Number(form.stock))}
                        </p>
                      </div>
                    )}
                </div>
              </section>
            </div>

            {/* Side column */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <ImagePlus size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Product Image
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Update the image URL
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    {form.image && !previewError ? (
                      <img
                        src={form.image}
                        alt="Product preview"
                        onError={() => setPreviewError(true)}
                        onLoad={() => setPreviewError(false)}
                        className="max-h-64 w-full rounded-lg object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <ImagePlus
                          size={30}
                          className="mx-auto text-slate-400"
                        />
                        <p className="mt-3 text-sm text-slate-500">
                          {previewError
                            ? "Image could not be loaded"
                            : "No image URL provided"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="image" className={labelClass}>
                      Image URL
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="url"
                      value={form.image}
                      onChange={(event) => {
                        updateField(event);
                        setPreviewError(false);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className={inputClass("image")}
                      aria-invalid={Boolean(errors.image)}
                    />
                    {errors.image && <FieldError>{errors.image}</FieldError>}
                  </div>

                  {form.image && (
                    <a
                      href={form.image}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Open image URL
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <p className="text-xs leading-5 text-slate-400">
                    Demo uses a public image URL. Production uploads should
                    use a secure image-storage service.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-bold text-slate-900">Current Listing</h2>
                <div className="mt-4 space-y-4">
                  <SummaryRow label="Product ID" value={id} />
                  <SummaryRow
                    label="Product name"
                    value={form.name || "—"}
                  />
                  <SummaryRow
                    label="Category"
                    value={form.category || "—"}
                  />
                  <SummaryRow
                    label="Price"
                    value={
                      form.price !== "" ? formatPrice(form.price) : "—"
                    }
                  />
                  <SummaryRow
                    label="Stock"
                    value={form.stock === "" ? "—" : form.stock}
                  />
                </div>

                <div className="mt-5 rounded-xl bg-amber-50 p-3">
                  <p className="text-xs leading-5 text-amber-800">
                    Changes are saved only in this browser's demo storage.
                    They are not sent to a database.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Form actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button
              type="button"
              onClick={resetChanges}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset Changes
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldError({ children }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs text-rose-600">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      {children}
    </p>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="break-words text-right font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}
