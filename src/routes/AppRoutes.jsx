
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../admin/AdminLayout";

// Public pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// Admin pages
import AdminLogin from "../admin/AdminLogin";
import Dashboard from "../admin/Dashboard";
import Products from "../admin/Products";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import Orders from "../admin/Orders";

function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin login — separate from public layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard and management */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />

        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
