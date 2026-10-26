
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  ImagePlus,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Tag,
  IndianRupee,
  Boxes,
  FileText,
} from "lucide-react";

const initialForm = {
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

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Accessories",
  "Footwear",
  "Audio",
];

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setNotice("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Product name is required.";
    } else if (form.name.trim().length < 3) {
      nextErrors.name = "Enter at least 3 characters.";
    }

    if (!form.sku.trim()) {
      nextErrors.sku = "Product SKU is required.";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category.";
    }

    if (form.price === "" || Number(form.price) <= 0) {
      nextErrors.price = "Enter a price greater than ₹0.";
    }

    if (
      form.comparePrice !== "" &&
      Number(form.comparePrice) < Number(form.price)
    ) {
      nextErrors.comparePrice =
        "Compare-at price should be equal to or higher than the selling price.";
    }

    if (
      form.stock === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      nextErrors.stock = "Enter a valid stock quantity.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Product description is required.";
    } else if (form.description.trim().length < 10) {
      nextErrors.description =
        "Description should contain at least 10 characters.";
    }

    if (form.image.trim()) {
      try {
        const parsedUrl = new URL(form.image.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          nextErrors.image = "Use a valid HTTP or HTTPS image URL.";
        }
      } catch {
        nextErrors.image = "Enter a valid image URL.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveProduct = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setNotice("Please correct the highlighted fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const newProduct = {
      id: `PRD-${Date.now()}`,
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category,
      price: Number(form.price),
      comparePrice:
        form.comparePrice === "" ? null : Number(form.comparePrice),
      stock: Number(form.stock),
      status:
        Number(form.stock) === 0
          ? "Out of Stock"
          : form.status,
      description: form.description.trim(),
      image: form.image.trim(),
      createdAt: new Date().toISOString(),
    };

    // Demo only: save products in browser storage.
    // Replace this with a POST request to your backend API.
    try {
      const storedProducts = JSON.parse(
        localStorage.getItem("demoProducts") || "[]"
      );

      if (!Array.isArray(storedProducts)) {
        throw new Error("Invalid product storage");
      }

      const duplicateSku = storedProducts.some(
        (product) =>
          String(product.sku || "").toLowerCase() ===
          newProduct.sku.toLowerCase()
      );

      if (duplicateSku) {
        setErrors({
          sku: "This SKU already exists in the saved demo products.",
        });
        setNotice("Please use a unique SKU.");
        return;
      }

      localStorage.setItem(
        "demoProducts",
        JSON.stringify([newProduct, ...storedProducts])
      );

      setNotice("Product saved in this browser's demo storage.");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setNotice(
        "Unable to save the demo product. Check browser storage settings."
      );
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setPreview("");
    setImageError(false);
    setNotice("");
  };

  const setImagePreview = () => {
    const value = form.image.trim();

    if (!value) {
      setPreview("");
      setImageError(false);
      return;
    }

    try {
      const url = new URL(value);

      if (!["http:", "https:"].includes(url.protocol)) {
        setErrors((previous) => ({
          ...previous,
          image: "Use a valid HTTP or HTTPS image URL.",
        }));
        return;
      }

      setPreview(value);
      setImageError(false);
      setErrors((previous) => ({ ...previous, image: "" }));
    } catch {
      setErrors((previous) => ({
        ...previous,
        image: "Enter a valid image URL.",
      }));
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      errors[field]
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-50"
        : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
    }`;

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Breadcrumb and heading */}
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              to="/admin/dashboard"
              className="transition hover:text-slate-900"
            >
              Admin
            </Link>
            <span>/</span>
            <Link
              to="/admin/products"
              className="transition hover:text-slate-900"
            >
              Products
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-800">
              Add Product
            </span>
          </div>

          <Link
            to="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to products
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Add Product
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Create a product listing for your online store.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
              <Package size={15} />
              Product Catalogue
            </div>
          </div>
        </div>

        {/* Feedback message */}
        {notice && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
              notice.startsWith("Product saved")
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {notice.startsWith("Product saved") ? (
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
            )}

            <div className="flex-1">{notice}</div>

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

        <form onSubmit={saveProduct} noValidate>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* Main form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic information */}
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
                      Product Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="e.g. Premium Wireless Headphones"
                      className={inputClass("name")}
                      maxLength={120}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && (
                      <FieldError>{errors.name}</FieldError>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="sku" className={labelClass}>
                        SKU / Product Code{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sku"
                        name="sku"
                        value={form.sku}
                        onChange={updateField}
                        placeholder="e.g. HEAD-001"
                        className={inputClass("sku")}
                        maxLength={50}
                        aria-invalid={Boolean(errors.sku)}
                      />
                      {errors.sku && (
                        <FieldError>{errors.sku}</FieldError>
                      )}
                    </div>

                    <div>
                      <label htmlFor="category" className={labelClass}>
                        Category <span className="text-rose-500">*</span>
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
                        {categories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <FieldError>{errors.category}</FieldError>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className={labelClass}>
                      Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={updateField}
                      placeholder="Describe the product's features, materials and benefits..."
                      rows={5}
                      maxLength={2000}
                      className={`${inputClass("description")} resize-y`}
                      aria-invalid={Boolean(errors.description)}
                    />
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      {errors.description ? (
                        <FieldError>{errors.description}</FieldError>
                      ) : (
                        <p className="text-xs text-slate-400">
                          Write a clear description for customers.
                        </p>
                      )}
                      <span className="text-xs text-slate-400">
                        {form.description.length}/2000
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pricing and inventory */}
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
                      Set selling price and available quantity
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  <div>
                    <label htmlFor="price" className={labelClass}>
                      Selling Price (₹){" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={form.price}
                        onChange={updateField}
                        placeholder="2499"
                        className={`${inputClass("price")} pl-9`}
                        aria-invalid={Boolean(errors.price)}
                      />
                    </div>
                    {errors.price && (
                      <FieldError>{errors.price}</FieldError>
                    )}
                  </div>

                  <div>
                    <label htmlFor="comparePrice" className={labelClass}>
                      Compare-at Price (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="comparePrice"
                        name="comparePrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.comparePrice}
                        onChange={updateField}
                        placeholder="2999"
                        className={`${inputClass("comparePrice")} pl-9`}
                        aria-invalid={Boolean(errors.comparePrice)}
                      />
                    </div>
                    {errors.comparePrice && (
                      <FieldError>{errors.comparePrice}</FieldError>
                    )}
                    <p className="mt-2 text-xs text-slate-400">
                      Optional original price for showing a discount.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="stock" className={labelClass}>
                      Stock Quantity{" "}
                      <span className="text-rose-500">*</span>
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
                    {errors.stock && (
                      <FieldError>{errors.stock}</FieldError>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className={labelClass}>
                      Product Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={form.status}
                      onChange={updateField}
                      className={inputClass("status")}
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <p className="mt-2 text-xs text-slate-400">
                      Products with zero stock will be marked out of stock.
                    </p>
                  </div>

                  {form.price !== "" &&
                    form.stock !== "" &&
                    Number(form.price) > 0 &&
                    Number(form.stock) >= 0 && (
                      <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                        <p className="text-xs font-medium text-slate-500">
                          Potential inventory value
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          }).format(
                            Number(form.price) * Number(form.stock)
                          )}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Selling price × stock quantity
                        </p>
                      </div>
                    )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image */}
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
                      Add an image URL
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    {preview && !imageError ? (
                      <div className="relative w-full">
                        <img
                          src={preview}
                          alt="Product preview"
                          onError={() => setImageError(true)}
                          onLoad={() => setImageError(false)}
                          className="mx-auto max-h-64 w-full rounded-lg object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview("");
                            setImageError(false);
                            setForm((previous) => ({
                              ...previous,
                              image: "",
                            }));
                          }}
                          className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-600 shadow hover:text-rose-600"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                          {imageError ? (
                            <AlertCircle size={26} />
                          ) : (
                            <Upload size={26} />
                          )}
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-700">
                          {imageError
                            ? "Unable to load image"
                            : "No image selected"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Paste an image URL below to preview it.
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
                      onChange={updateField}
                      placeholder="https://example.com/product.jpg"
                      className={inputClass("image")}
                      aria-invalid={Boolean(errors.image)}
                    />
                    {errors.image && (
                      <FieldError>{errors.image}</FieldError>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={setImagePreview}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Preview Image
                  </button>

                  <p className="text-xs leading-5 text-slate-400">
                    This demo accepts image URLs. For a real store, upload
                    images through a storage service such as Cloudinary.
                  </p>
                </div>
              </section>

              {/* Preview summary */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-slate-500" />
                  <h2 className="font-bold text-slate-900">
                    Listing Summary
                  </h2>
                </div>

                <div className="mt-4 space-y-3">
                  <SummaryRow
                    label="Product"
                    value={form.name.trim() || "Not added yet"}
                  />
                  <SummaryRow
                    label="Category"
                    value={form.category || "Not selected"}
                  />
                  <SummaryRow
                    label="Selling price"
                    value={
                      form.price !== "" && Number(form.price) > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          }).format(Number(form.price))
                        : "—"
                    }
                  />
                  <SummaryRow
                    label="Stock"
                    value={form.stock !== "" ? form.stock : "—"}
                  />
                </div>

                <div className="mt-5 rounded-xl bg-blue-50 p-3">
                  <p className="text-xs leading-5 text-blue-800">
                    Review the product details before saving. This is a
                    frontend demo and does not publish products to a live
                    storefront.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={17} />
              Reset Form
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admin/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                <Save size={17} />
                Save Product
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
