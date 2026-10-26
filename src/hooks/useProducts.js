
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const getProductList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.products)) return response.products;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.products)) {
    return response.data.products;
  }

  return [];
};

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [params, setParams] = useState(initialParams);

  const fetchProducts = useCallback(
    async (customParams = params) => {
      setLoading(true);
      setError("");

      try {
        const response = await getProducts(customParams);
        setProducts(getProductList(response));
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Products load nahi ho paaye."
        );
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refreshProducts = useCallback(() => {
    return fetchProducts();
  }, [fetchProducts]);

  const updateParams = useCallback((newParams) => {
    setParams((previous) => ({
      ...previous,
      ...newParams,
    }));
  }, []);

  return {
    products,
    loading,
    error,
    params,
    updateParams,
    refreshProducts,
    setProducts,
  };
}

export default useProducts;
