
import { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

function ProductFilters({
  categories = [],
  filters,
  onFilterChange,
  onReset,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const defaultFilters = {
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
  };

  const currentFilters = {
    ...defaultFilters,
    ...filters,
  };

  function updateFilter(name, value) {
    onFilterChange?.({
      ...currentFilters,
      [name]: value,
    });
  }

  function resetFilters() {
    onReset?.();
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="mb-3 font-semibold text-slate-900">
          Category
        </h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
            <input
              type="radio"
              name="category"
              checked={currentFilters.category === "all"}
              onChange={() => updateFilter("category", "all")}
              className="accent-slate-900"
            />
            All Categories
          </label>

          {categories.map((category) => {
            const value =
              typeof category === "string"
                ? category
                : category.value;

            const label =
              typeof category === "string"
                ? category
                : category.label;

            return (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="category"
                  checked={currentFilters.category === value}
                  onChange={() => updateFilter("category", value)}
                  className="accent-slate-900"
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-3 font-semibold text-slate-900">
          Price Range
        </h3>

        <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
          <span>₹{currentFilters.minPrice}</span>
          <span>₹{currentFilters.maxPrice}</span>
        </div>

        <label
          htmlFor="min-price"
          className="mb-1 block text-xs text-slate-500"
        >
          Minimum price
        </label>

        <input
          id="min-price"
          type="number"
          min="0"
          value={currentFilters.minPrice}
          onChange={(event) =>
            updateFilter(
              "minPrice",
              Math.max(0, Number(event.target.value))
            )
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />

        <label
          htmlFor="max-price"
          className="mb-1 mt-3 block text-xs text-slate-500"
        >
          Maximum price
        </label>

        <input
          id="max-price"
          type="number"
          min={currentFilters.minPrice}
          value={currentFilters.maxPrice}
          onChange={(event) =>
            updateFilter(
              "maxPrice",
              Math.max(
                currentFilters.minPrice,
                Number(event.target.value)
              )
            )
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
        />
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3 font-semibold text-slate-900">
          Minimum Rating
        </h3>

        <select
          value={currentFilters.minRating}
          onChange={(event) =>
            updateFilter("minRating", Number(event.target.value))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
        >
          <option value={0}>All Ratings</option>
          <option value={3}>3★ & above</option>
          <option value={4}>4★ & above</option>
          <option value={4.5}>4.5★ & above</option>
        </select>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={resetFilters}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        <RotateCcw size={16} />
        Reset Filters
      </button>
    </div>
  );

  return (
    <aside className="w-full">
      {/* Mobile filter toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-800 lg:hidden"
      >
        <SlidersHorizontal size={18} />
        {mobileOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Desktop filters */}
      <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
        <h2 className="mb-6 text-lg font-bold text-slate-950">
          Filters
        </h2>

        {filterContent}
      </div>

      {/* Mobile filters */}
      {mobileOpen && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 lg:hidden">
          <h2 className="mb-6 text-lg font-bold text-slate-950">
            Filters
          </h2>

          {filterContent}
        </div>
      )}
    </aside>
  );
}

export default ProductFilters;
