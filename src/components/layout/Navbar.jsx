
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  UserRound,
} from "lucide-react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-slate-950"
        : "text-slate-500 hover:text-slate-950"
    }`;

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      {/* Announcement bar */}
      <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        FREE SHIPPING ON ORDERS OVER ₹999
      </div>

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="shrink-0 text-2xl font-extrabold tracking-tight text-slate-950"
        >
          LUXE<span className="text-indigo-600">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-xs flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-slate-400 md:flex"
        >
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

          <button type="submit" className="sr-only">
            Search
          </button>
        </form>

        {/* Action icons */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            to="/login"
            aria-label="Account"
            className="hidden text-slate-700 transition hover:text-indigo-600 sm:block"
          >
            <UserRound size={22} />
          </Link>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="text-slate-700 transition hover:text-indigo-600"
          >
            <Heart size={22} />
          </Link>

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="text-slate-700 transition hover:text-indigo-600"
          >
            <ShoppingBag size={22} />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="text-slate-800 lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </form>

          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
