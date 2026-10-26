
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  if (!product) return null;

  const {
    _id,
    id,
    name,
    title,
    image,
    price,
    originalPrice,
    rating = 0,
    discount = 0,
  } = product;

  const productId = _id || id;
  const productName = name || title || "Untitled Product";
  const productImage =
    image || "https://placehold.co/600x600?text=Product";

  const formattedPrice = Number(price || 0).toLocaleString("en-IN");

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link
          to={productId ? `/products/${productId}` : "/shop"}
          aria-label={`View ${productName}`}
        >
          <img
            src={productImage}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-slate-700"
            }
          />
        </button>
      </div>

      {/* Product information */}
      <div className="p-4">
        <Link to={productId ? `/products/${productId}` : "/shop"}>
          <h3 className="line-clamp-2 min-h-12 font-semibold text-slate-900 transition hover:text-indigo-600">
            {productName}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <Star
            size={16}
            className="fill-amber-400 text-amber-400"
          />

          <span className="text-sm font-medium text-slate-700">
            {Number(rating).toFixed(1)}
          </span>

          <span className="text-xs text-slate-400">
            / 5
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-slate-950">
            ₹{formattedPrice}
          </span>

          {originalPrice > price && (
            <span className="text-sm text-slate-400 line-through">
              ₹{Number(originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
