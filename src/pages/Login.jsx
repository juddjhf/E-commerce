
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Demo-only login. Replace with your backend API later.
      const savedUsers = JSON.parse(
        localStorage.getItem("demoUsers") || "[]"
      );

      const users = Array.isArray(savedUsers) ? savedUsers : [];

      const user = users.find(
        (item) =>
          item.email?.toLowerCase() ===
            form.email.trim().toLowerCase() &&
          item.password === form.password
      );

      if (!user) {
        setError(
          "Account not found or password is incorrect. Register first, or connect the backend login API."
        );
        return;
      }

      const sessionUser = {
        id: user.id ?? user._id ?? "",
        name: user.name ?? user.fullName ?? "Customer",
        email: user.email,
      };

      const storage = form.remember
        ? localStorage
        : sessionStorage;

      storage.setItem("demoUser", JSON.stringify(sessionUser));

      const redirectTo = location.state?.from?.pathname || "/";

      navigate(redirectTo, { replace: true });
    } catch {
      setError(
        "Unable to sign in. Please check your browser storage and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-100";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
        {/* Left visual panel */}
        <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gray-900 p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/[0.04]" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-900">
              <ShoppingBag size={25} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Shop<span className="text-gray-400">Ease</span>
            </span>
          </Link>

          <div className="relative z-10 max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Welcome back
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
              Good things are waiting for you.
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-300">
              Sign in to continue exploring our collection and manage your
              shopping experience in one place.
            </p>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-semibold">Your shopping space</p>
                <p className="mt-1 text-sm text-gray-400">
                  A clean, convenient shopping experience.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-gray-500">
            © {new Date().getFullYear()} ShopEase. Demo storefront.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 lg:hidden"
            >
              <ShoppingBag size={20} />
              <span className="font-bold text-gray-900">ShopEase</span>
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Account access
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Welcome back! Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-gray-700 transition hover:text-black hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:text-gray-900"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                />
                Keep me signed in on this device
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                NEW TO SH OPEASE
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-gray-900 underline underline-offset-4 transition hover:text-gray-500"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              This is a frontend demo login. For a real store, use a backend
              authentication API and securely hashed passwords.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
