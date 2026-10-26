
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "wishlist";

const getProductId = (product) => String(product?._id ?? product?.id);

const getInitialWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (!Array.isArray(parsedWishlist)) return [];

    // Purane format mein IDs ho sakti hain aur naye format mein products.
    return [
      ...new Set(
        parsedWishlist
          .filter((item) => item != null)
          .map((item) =>
            typeof item === "object" ? getProductId(item) : String(item)
          )
          .filter((id) => id !== "undefined" && id !== "null")
      ),
    ];
  } catch {
    return [];
  }
};

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(getInitialWishlist);

  // Wishlist ko localStorage mein save karo.
  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Wishlist save nahi ho payi:", error);
    }
  }, [wishlistItems]);

  // Check karo ki product wishlist mein hai ya nahi.
  const isInWishlist = useCallback(
    (productOrId) => {
      const id =
        typeof productOrId === "object"
          ? getProductId(productOrId)
          : String(productOrId);

      return wishlistItems.includes(id);
    },
    [wishlistItems]
  );

  // Product add karo; pehle se hai toh remove kar do.
  const toggleWishlist = useCallback((productOrId) => {
    const id =
      typeof productOrId === "object"
        ? getProductId(productOrId)
        : String(productOrId);

    if (!id || id === "undefined" || id === "null") {
      return;
    }

    setWishlistItems((previousItems) =>
      previousItems.includes(id)
        ? previousItems.filter((itemId) => itemId !== id)
        : [...previousItems, id]
    );
  }, []);

  // Wishlist se product remove karo.
  const removeFromWishlist = useCallback((productOrId) => {
    const id =
      typeof productOrId === "object"
        ? getProductId(productOrId)
        : String(productOrId);

    setWishlistItems((previousItems) =>
      previousItems.filter((itemId) => itemId !== id)
    );
  }, []);

  // Puri wishlist clear karo.
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [
      wishlistItems,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist ko WishlistProvider ke andar use karo.");
  }

  return context;
}

export default WishlistContext;
