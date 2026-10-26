
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { name: "All Products", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "My Wishlist", path: "/wishlist" },
    { name: "Shopping Cart", path: "/cart" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "My Account", path: "/login" },
    { name: "Create Account", path: "/register" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/", symbol: "◎" },
    { name: "Portfolio", href: "/", symbol: "</>" },
    { name: "Email", href: "mailto:support@shopease.com", symbol: "✉" },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Newsletter Section */}
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              The LUXE Edit
            </p>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              A little luxury, delivered.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400">
              Discover new arrivals, timeless essentials and exclusive
              collections curated for you.
            </p>
          </div>

          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                "Newsletter subscription is a demo. Connect a backend to enable it."
              );
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-none border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-amber-400"
            />

            <button
              type="submit"
              className="flex items-center gap-2 bg-amber-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
            >
              Subscribe <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Link
            to="/"
            aria-label="LUXE home"
            className="inline-flex items-center"
          >
            <span className="text-3xl font-black tracking-[0.18em] text-white">
              LUXE<span className="text-amber-400">.</span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-400">
            Thoughtfully curated style for modern living. Explore our
            collection and discover pieces that make every day feel special.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={
                  social.href.startsWith("https://") ? "_blank" : undefined
                }
                rel={
                  social.href.startsWith("https://")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-sm font-semibold text-neutral-300 transition hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950"
              >
                {social.symbol}
              </a>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Shop
          </h3>

          <ul className="space-y-4">
            {shopLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-neutral-400 transition hover:text-amber-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Company
          </h3>

          <ul className="space-y-4">
            {companyLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-neutral-400 transition hover:text-amber-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Get in Touch
          </h3>

          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <span className="text-lg text-amber-400" aria-hidden="true">
                ✉
              </span>

              <div>
                <p className="text-xs text-neutral-500">Email us</p>
                <a
                  href="mailto:support@shopease.com"
                  className="mt-1 break-all text-sm text-neutral-300 transition hover:text-amber-400"
                >
                  support@shopease.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-lg text-amber-400" aria-hidden="true">
                ☎
              </span>

              <div>
                <p className="text-xs text-neutral-500">Call us</p>
                <a
                  href="tel:+919876543210"
                  className="mt-1 text-sm text-neutral-300 transition hover:text-amber-400"
                >
                  +91 98765 43210
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-lg text-amber-400" aria-hidden="true">
                ⌖
              </span>

              <div>
                <p className="text-xs text-neutral-500">Location</p>
                <p className="mt-1 text-sm text-neutral-300">India</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-center text-xs text-neutral-500 md:text-left">
            © {currentYear} LUXE. All rights reserved.
          </p>

          <p className="text-center text-xs text-neutral-500">
            Crafted with <span className="text-amber-400">♥</span> for
            timeless style
          </p>

          <Link
            to="/shop"
            className="text-center text-xs font-medium text-neutral-400 transition hover:text-amber-400"
          >
            Explore Collection <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
