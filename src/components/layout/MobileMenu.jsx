
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Heart,
  UserRound,
  X,
} from "lucide-react";

function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/shop", icon: ShoppingBag },
    { name: "Categories", path: "/categories", icon: LayoutGrid },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "My Account", path: "/login", icon: UserRound },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Background overlay */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Menu panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <NavLink
            to="/"
            onClick={onClose}
            className="text-2xl font-extrabold tracking-tight text-slate-950"
          >
            LUXE<span className="text-indigo-600">.</span>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

          <NavLink
            to="/cart"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <ShoppingBag size={20} />
            <span className="text-sm font-medium">Shopping Cart</span>
          </NavLink>
        </nav>

        {/* Bottom message */}
        <div className="border-t border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">
            Welcome to LUXE
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Discover products you'll love.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;
