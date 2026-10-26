
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "cart";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter((item) => item && (item.id != null || item._id != null))
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch {
    return [];
  }
};

const getProductId = (product) => String(product._id ?? product.id);

const getPrice = (product) =>
  Number(product.price ?? product.sellingPrice ?? product.salePrice ?? 0);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Cart ko localStorage mein save karo.
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Cart save nahi ho paya:", error);
    }
  }, [cartItems]);

  // Product cart mein add karo.
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || (product.id == null && product._id == null)) {
      return false;
    }

    const productId = getProductId(product);
    const amount = Math.max(1, Number(quantity) || 1);

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => getProductId(item) === productId
      );

      if (existingItem) {
        return previousItems.map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: amount,
        },
      ];
    });

    return true;
  }, []);

  // Quantity increase/decrease karo.
  const updateQuantity = useCallback((productId, quantity) => {
    const id = String(productId);
    const amount = Number(quantity);

    if (!Number.isFinite(amount)) return;

    if (amount < 1) {
      setCartItems((items) =>
        items.filter((item) => getProductId(item) !== id)
      );
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        getProductId(item) === id
          ? { ...item, quantity: Math.floor(amount) }
          : item
      )
    );
  }, []);

  // Ek product remove karo.
  const removeFromCart = useCallback((productId) => {
    const id = String(productId);

    setCartItems((items) =>
      items.filter((item) => getProductId(item) !== id)
    );
  }, []);

  // Poora cart clear karo.
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total quantity aur price calculate karo.
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + getPrice(item) * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      totalItems,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cartItems,
      totalItems,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart ko CartProvider ke andar use karo.");
  }

  return context;
}

export default CartContext;
