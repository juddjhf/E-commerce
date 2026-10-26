
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(form.password) ||
        !/[a-z]/.test(form.password) ||
        !/\d/.test(form.password)) {
      setError(
        "Use at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Demo only: replace with a backend registration API.
      const savedUsers = JSON.parse(
        localStorage.getItem("demoUsers") || "[]"
      );

      const users = Array.isArray(savedUsers) ? savedUsers : [];

      const alreadyRegistered = users.some(
        (user) => user.email?.toLowerCase() === email
      );

      if (alreadyRegistered) {
        setError(
          "This email is already registered. Please sign in instead."
        );
        return;
      }

      const newUser = {
        id: `USER-${Date.now()}`,
        name,
        email,
        phone,
        // Demo only. Never store real passwords in localStorage.
        password: form.password,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "demoUsers",
        JSON.stringify([...users, newUser])
      );

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", {
          state: { email },
          replace: true,
        });
      }, 900);
    } catch {
      setError(
        "Unable to create your account. Please check browser storage and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
        {/* Left information panel */}
        <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden bg-gray-900 p-10 text-white lg:flex xl:p-14">
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
              Join our community
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
              Shopping made simple.
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-300">
              Create your account to enjoy a convenient shopping experience
              and keep your shopping details together.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Manage your shopping profile",
                "Keep track of your orders",
                "Discover products you love",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-gray-300"
                  />
                  <span className="text-sm text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <ShieldCheck size={26} className="shrink-0" />
              <div>
                <p className="font-semibold">Account security matters</p>
                <p className="mt-1 text-sm text-gray-400">
                  Production authentication should be handled securely by
                  the website backend.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-gray-500">
            © {new Date().getFullYear()} ShopEase. Demo storefront.
          </p>
        </section>

        {/* Registration form */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 lg:hidden"
            >
              <ShoppingBag size={20} />
              <span className="font-bold text-gray-900">ShopEase</span>
            </Link>

            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Create your account
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get started
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Fill in your details to create your shopping account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  At least 8 characters, including uppercase, lowercase, and a number.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:text-gray-900"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 py-2 text-sm leading-5 text-gray-600">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-gray-900"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-gray-900 underline underline-offset-4"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-gray-900 underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm leading-5 text-green-700"
                >
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || Boolean(success)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-gray-900 underline underline-offset-4 hover:text-gray-500"
              >
                Sign In
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              Demo registration only. Real customer accounts require
              backend validation, password hashing, and secure authentication.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
