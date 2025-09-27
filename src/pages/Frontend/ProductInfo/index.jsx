import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../contexts/Auth";
import { useCartContext } from "../../../contexts/Cart";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShare,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ProductInfo = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false); // 👈 new state

  const { isAppLoading, favorites, toggleFavorite } = useAuthContext();
  const { addToCart, cartItems, deleteFromCart } = useCartContext();

  const fetchProduct = useCallback(async () => {
    try {
      const productRef = doc(firestore, "products", param.id);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error("Product not found");
      }

      const productData = productSnap.data();
      const completeProduct = {
        id: productSnap.id,
        name: productData.name || "No Name",
        price: productData.price || 0,
        description:
          productData.description || "No description available",
        category: productData.category || "uncategorized",
        imageURL:
          productData.imageURL ||
          "https://via.placeholder.com/500x500?text=No+Image",
        rating: productData.rating || 4.5,
        createdAt: productData.createdAt?.toDate() || new Date(),
      };

      setProduct(completeProduct);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  }, [param.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isAppLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB86FC]"
        ></motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#121212]">
        <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error || "Product data not available"}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          className="px-6 py-2.5 bg-[#BB86FC] text-[#121212] rounded-lg hover:bg-[#BB86FC]/90 transition-colors font-medium"
        >
          Browse Products
        </motion.button>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 lg:py-12 bg-[#121212] min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-[#BB86FC] transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <span className="text-gray-600 mx-2">/</span>
            </li>
            <li>
              <button
                onClick={() => navigate("/products")}
                className="text-gray-400 hover:text-[#BB86FC] transition-colors"
              >
                Products
              </button>
            </li>
            <li>
              <span className="text-gray-600 mx-2">/</span>
            </li>
            <li aria-current="page">
              <span className="text-[#BB86FC] font-medium">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:grid lg:grid-cols-2 lg:gap-8 bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] overflow-hidden"
        >
          {/* Product Image */}
          <div className="p-6">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl">
              <motion.img
                src={product.imageURL}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 lg:border-l lg:border-[#2D2D2D]">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {product.name}
              </h3>
              <div className="flex space-x-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="p-2 text-gray-400 hover:text-[#BB86FC] transition-colors"
                >
                  {favorites[product.id] ? (
                    <FaHeart className="h-6 w-6 text-[#BB86FC]" />
                  ) : (
                    <FaRegHeart className="h-6 w-6 hover:text-[#BB86FC]" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-[#BB86FC] transition-colors"
                >
                  <FaShare className="h-6 w-6" />
                </motion.button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={`star-${i}`}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-[#BB86FC]"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400 ml-2">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-3xl font-bold text-[#BB86FC]">
                Rs{product?.price?.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-white">
                Description
              </h2>
              <p className="mt-2 text-gray-400">
                {product.description?.length > 200 ? (
                  <>
                    {showFullDesc
                      ? product.description
                      : product.description.slice(0, 200) + "..."}
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="ml-2 text-[#BB86FC] hover:underline"
                    >
                      {showFullDesc ? "Read Less" : "Read More"}
                    </button>
                  </>
                ) : (
                  product.description
                )}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Quantity
              </label>
              <div className="flex items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-3 py-2 bg-[#2D2D2D] text-gray-300 hover:text-white rounded-l-md transition-colors"
                >
                  <FaMinus className="h-3 w-3" />
                </motion.button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-16 text-center bg-[#2D2D2D] text-white border-t border-b border-[#2D2D2D] py-2"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-[#2D2D2D] text-gray-300 hover:text-white rounded-r-md transition-colors"
                >
                  <FaPlus className="h-3 w-3" />
                </motion.button>
              </div>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {cartItems.some((e) => e.id === param.id) ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-[#121212] py-3 px-4 rounded-lg font-medium transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFromCart(product.id);
                    window.toastify &&
                      window.toastify("Removed from cart", "success");
                  }}
                >
                  <FaShoppingCart className="h-5 w-5" />
                  Remove From Cart
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BB86FC] hover:bg-[#BB86FC]/90 text-[#121212] py-3 px-4 rounded-lg font-medium transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...product, quantity });
                    window.toastify &&
                      window.toastify("Added to cart", "success");
                  }}
                >
                  <FaShoppingCart className="h-5 w-5" />
                  Add To Cart
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-transparent border border-[#BB86FC] text-[#BB86FC] hover:bg-[#BB86FC]/10 py-3 px-4 rounded-lg font-medium transition-all"
              >
                Buy now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t border-[#2D2D2D] pt-8">
              <h2 className="text-lg font-medium text-white mb-4">
                Details
              </h2>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-gray-400 w-32">Category</span>
                  <span className="text-white capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">SKU</span>
                  <span className="text-white">{product.id}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Created At</span>
                  <span className="text-white">
                    {product?.createdAt?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductInfo;
