
export const STORE_INFO = {
  name: "ShopEase",
  tagline: "Discover. Shop. Enjoy.",
  description: "Your everyday shopping destination.",
  currency: "INR",
  locale: "en-IN",
  supportEmail: "support@shopease.com",
  supportPhone: "+91 98765 43210",
};

// Main website navigation
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Footer navigation
export const FOOTER_LINKS = {
  shopping: [
    { name: "All Products", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Cart", path: "/cart" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ],
  account: [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
};

// Product categories
export const PRODUCT_CATEGORIES = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Home & Living", value: "home" },
  { label: "Accessories", value: "accessories" },
  { label: "Footwear", value: "footwear" },
  { label: "Audio", value: "audio" },
];

// Product sorting options
export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest First", value: "newest" },
];

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Cart and shipping
export const CART_CONFIG = {
  freeShippingThreshold: 999,
  shippingFee: 79,
  defaultQuantity: 1,
};

// Demo coupon
export const DEMO_COUPONS = {
  WELCOME10: {
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 500,
  },
};

// Order statuses
export const ORDER_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

// Payment methods
export const PAYMENT_METHODS = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "Online Payment", value: "online" },
];

// Admin navigation
export const ADMIN_NAV_LINKS = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Add Product", path: "/admin/products/add" },
  { name: "Orders", path: "/admin/orders" },
];

// Local storage keys
export const STORAGE_KEYS = {
  cart: "cart",
  wishlist: "wishlist",
  user: "demoUser",
  adminUser: "adminUser",
  adminToken: "adminToken",
  accessToken: "accessToken",
  orders: "orders",
  demoUsers: "demoUsers",
  demoProducts: "demoProducts",
};

export default STORE_INFO;
