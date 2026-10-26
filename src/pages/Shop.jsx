
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import { products } from "../data/products";

function getPrice(product) {
  return Number(
    product.price ?? product.sellingPrice ?? product.salePrice ?? 0
  );
}

function getRating(product) {
  return Number(
    product.rating ?? product.ratings?.average ?? 0
  );
}

function getCategory(product) {
  const category = product.category;

  if (typeof category === "string") return category;
  if (category && typeof category === "object") {
    return category.name ?? category.title ?? "";
  }

  return "";
}

function getProductName(product) {
  return product.name ?? product.title ?? "";
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = Array.isArray(products) ? products : [];

  const maxAvailablePrice = Math.max(
    10000,
    ...allProducts.map(getPrice)
  );

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [sortBy, setSortBy] = useState("featured");

  const [filters, setFilters] = useState(() => ({
    category: searchParams.get("category") || "all",
    minPrice: 0,
    maxPrice: maxAvailablePrice,
    minRating: 0,
  }));

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update search and category when URL parameters change.
  useEffect(() => {
    setSearch(searchParams.get("search") || "");

    setFilters((current) => ({
      ...current,
      category: searchParams.get("category") || "all",
    }));
  }, [searchParams]);

  // Create category options from the available products.
  const categories = useMemo(() => {
    return [
      ...new Set(
        allProducts
          .map(getCategory)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [allProducts]);

  // Apply search, category, price and rating filters.
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = allProducts.filter((product) => {
      const name = getProductName(product).toLowerCase();
      const description = String(product.description || "").toLowerCase();
      const brand = String(product.brand || "").toLowerCase();
      const category = getCategory(product);

      const matchesSearch =
        !normalizedSearch ||
        name.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        brand.includes(normalizedSearch) ||
        category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        filters.category === "all" ||
        category.toLowerCase() === filters.category.toLowerCase();

      const price = getPrice(product);

      const matchesPrice =
        price >= Number(filters.minPrice) &&
        price <= Number(filters.maxPrice);

      const matchesRating =
        getRating(product) >= Number(filters.minRating);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      );
    });

    // Sort the filtered products.
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => getPrice(a) - getPrice(b));
        break;

      case "price-high":
        result.sort((a, b) => getPrice(b) - getPrice(a));
        break;

      case "rating":
        result.sort((a, b) => getRating(b) - getRating(a));
        break;

      case "name":
        result.sort((a, b) =>
          getProductName(a).localeCompare(getProductName(b))
        );
        break;

      default:
        break;
    }

    return result;
  }, [allProducts, search, filters, sortBy]);

  function handleSearch(event) {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams);

    if (search.trim()) {
      nextParams.set("search", search.trim());
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  }

  function handleFilterChange(nextFilters) {
    setFilters(nextFilters);

    const nextParams = new URLSearchParams(searchParams);

    if (nextFilters.category === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextFilters.category);
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    setFilters({
      category: "all",
      minPrice: 0,
      maxPrice: maxAvailablePrice,
      minRating: 0,
    });

    setSearch("");
    setSortBy("featured");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page heading */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <nav className="mb-4 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Shop</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            The collection
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Shop All Products
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Explore our collection, discover new favourites and find
            products that fit your everyday lifestyle.
          </p>
        </div>
      </section>

      {/* Main shop content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mb-8 flex gap-2"
        >
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, brands or categories..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 sm:px-7"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar filters */}
          <aside>
            <div className="hidden lg:block">
              <ProductFilters
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />
            </div>

            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters((open) => !open)}
              aria-expanded={showMobileFilters}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-800 lg:hidden"
            >
              {showMobileFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showMobileFilters && (
              <div className="mt-4 lg:hidden">
                <ProductFilters
                  categories={categories}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
            )}
          </aside>

          {/* Products section */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  All Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort-products"
                  className="shrink-0 text-sm text-slate-600"
                >
                  Sort by:
                </label>

                <select
                  id="sort-products"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name: A to Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {search.trim() && (
              <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span>Search results for:</span>

                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-900">
                  {search}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    const nextParams = new URLSearchParams(searchParams);
                    nextParams.delete("search");
                    setSearchParams(nextParams);
                  }}
                  className="font-semibold underline underline-offset-2"
                >
                  Clear search
                </button>
              </div>
            )}

            <ProductGrid
              products={filteredProducts}
              columns={3}
            />

            {filteredProducts.length === 0 && (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
