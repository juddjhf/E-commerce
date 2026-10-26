
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Store,
  ChevronRight,
  UserRound,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    title: "CATALOG",
    items: [
      {
        label: "All Products",
        path: "/admin/products",
        icon: Package,
      },
      {
        label: "Add Product",
        path: "/admin/products/add",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "ORDERS",
    items: [
      {
        label: "All Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
      },
    ],
  },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    // Demo logout. Connect this to your backend auth API later.
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login", { replace: true });
  };

  const closeMobileMenu = () => setMobileOpen(false);

  const sidebarWidth = collapsed ? "lg:w-[88px]" : "lg:w-[260px]";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-gray-200 bg-white transition-all duration-300 ${sidebarWidth} ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <Link
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">
              <Store size={22} />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-base font-bold tracking-tight">
                  ShopEase
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                  Admin Console
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-gray-400">
                  {group.title}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={closeMobileMenu}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-gray-950 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                        } ${collapsed ? "lg:justify-center" : ""}`
                      }
                    >
                      <Icon size={19} className="shrink-0" />

                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          <ChevronRight
                            size={15}
                            className="opacity-0 transition group-hover:opacity-60"
                          />
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar bottom */}
        <div className="shrink-0 border-t border-gray-100 p-3">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 ${
              collapsed ? "lg:justify-center" : ""
            }`}
            title={collapsed ? "View Store" : undefined}
          >
            <ExternalLink size={19} className="shrink-0" />
            {!collapsed && <span>View Store</span>}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
              collapsed ? "lg:justify-center" : ""
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={19} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-[88px]" : "lg:ml-[260px]"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-xl border border-gray-200 p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              onClick={() => setCollapsed((previous) => !previous)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 lg:inline-flex"
            >
              {collapsed ? (
                <PanelLeftOpen size={19} />
              ) : (
                <PanelLeftClose size={19} />
              )}
            </button>

            <div>
              <p className="text-sm font-semibold">Admin Panel</p>
              <p className="hidden text-xs text-gray-500 sm:block">
                Manage your online store
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:inline-flex"
            >
              <Store size={15} />
              View Store
            </Link>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Store Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <UserRound size={21} />
              </div>
            </div>
          </div>
        </header>

        {/* Child pages render here */}
        <div className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
