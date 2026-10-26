
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  Store,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setServerError("");

    try {
      /*
       * DEMO LOGIN ONLY.
       * This checks a demo user saved by the browser.
       * Replace with a backend authentication API before deployment.
       */
      const savedAdmin = localStorage.getItem("demoAdmin");

      if (!savedAdmin) {
        setServerError(
          "Admin authentication is not configured yet. Connect your backend API to enable login."
        );
        return;
      }

      let admin;

      try {
        admin = JSON.parse(savedAdmin);
      } catch {
        setServerError("Demo admin data is invalid. Please reset the demo setup.");
        return;
      }

      const emailMatches =
        admin.email?.toLowerCase() === formData.email.trim().toLowerCase();

      const passwordMatches = admin.password === formData.password;

      if (!emailMatches || !passwordMatches) {
        setServerError("Invalid email or password.");
        return;
      }

      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          name: admin.name || "Store Admin",
          email: admin.email,
          role: "admin",
        })
      );

      navigate("/admin/dashboard", { replace: true });
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-white">
      {/* Left branding panel */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gray-950 p-10 text-white lg:flex xl:p-14">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-16 top-36 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-white/[0.04]" />

        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-950">
            <ShoppingBag size={26} />
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight">ShopEase</p>
            <p className="text-xs text-gray-400">E-commerce Platform</p>
          </div>
        </Link>

        <div className="relative z-10 max-w-xl py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300">
            <ShieldCheck size={16} />
            Store administration
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
            Manage your store.
            <span className="mt-2 block text-gray-400">
              All in one place.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-gray-300">
            Access your store dashboard to manage products, review orders,
            and organize your online store operations.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Manage your product catalog",
              "Review and organize customer orders",
              "Monitor store activity from one dashboard",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                <ShieldCheck size={18} className="shrink-0 text-gray-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} ShopEase</span>
          <span>Admin Portal</span>
        </div>
      </section>

      {/* Login form panel */}
      <section className="flex w-full items-center justify-center px-4 py-12 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
              <ShoppingBag size={23} />
            </div>

            <div>
              <p className="text-lg font-bold">ShopEase</p>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </Link>

          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
            <LockKeyhole size={27} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Welcome back
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Admin sign in
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter your administrator credentials to access your store.
          </p>

          {serverError && (
            <div
              role="alert"
              className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>

              <div
                className={`flex items-center gap-3 rounded-xl border px-4 transition focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              >
                <Mail size={19} className="shrink-0 text-gray-400" />

                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="admin-password"
                  className="text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border px-4 transition focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              >
                <LockKeyhole size={19} className="shrink-0 text-gray-400" />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-400 transition hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-4 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">ADMIN ACCESS ONLY</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-gray-600" />

              <div>
                <p className="text-sm font-semibold">Protected area</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This page is intended for authorized store administrators.
                  Authentication must be verified by the backend in production.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
          >
            <Store size={17} />
            Back to Store
          </Link>
        </div>
      </section>
    </main>
  );
}
