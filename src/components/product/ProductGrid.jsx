
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

function ProductGrid({
  products = [],
  loading = false,
  error = "",
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  columns = 4,
}) {
  const columnStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
      >
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No products found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Please check back later or explore another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-5 sm:gap-6 ${
        columnStyles[columns] || columnStyles[4]
      }`}
    >
      {products.map((product) => {
        const productId = product._id || product.id;

        return (
          <ProductCard
            key={productId || product.name || product.title}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.some(
              (id) => String(id) === String(productId)
            )}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
