import React from "react";
import { useAuthContext } from "../../../contexts/Auth";
import ProductCard from "../../../components/ProductCard";

const Product = () => {
  const { getAllProduct = [] } = useAuthContext();

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Bestselling Products</h1>

      {getAllProduct.length > 0 ? (
        <div
          className="
            grid 
            grid-cols-2        /* 👈 default: 2 columns (mobile) */
            sm:grid-cols-2     /* small screens: still 2 */
            md:grid-cols-3     /* medium: 3 */
            lg:grid-cols-4     /* large: 4 */
            gap-4 sm:gap-6     /* tighter gap on mobile, bigger on larger */
          "
        >
          {getAllProduct
            .slice(0, 8)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-gray-400">No products available.</p>
      )}
    </div>
  );
};

export default Product;
