import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";
import { useCartContext } from "../contexts/Cart";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useAuthContext();
  const { cartItems, addToCart, deleteFromCart } = useCartContext();

  if (!product?.id) return null;

  const { id, name, price, imageURL, rating = 4.5 } = product;
  const isInCart = cartItems.some((item) => item?.id === id);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] hover:border-[#BB86FC]/30 hover:shadow-[0_0_25px_rgba(187,134,252,0.2)] transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product-info/${id}`)}
    >
      {/* Favorite Button (hide on mobile) */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(id);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-[#121212]/90 backdrop-blur-md rounded-full hover:bg-[#BB86FC]/20 transition-all hidden sm:block"
        aria-label="Add to favorites"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 12px rgba(187, 134, 252, 0.5)",
        }}
      >
        {favorites[id] ? (
          <FaHeart className="h-5 w-5 text-[#BB86FC] drop-shadow-[0_0_8px_rgba(187,134,252,0.7)]" />
        ) : (
          <FaRegHeart className="h-5 w-5 text-gray-400 hover:text-[#BB86FC] transition-colors" />
        )}
      </motion.button>

      {/* Premium Badge (hide on mobile) */}
      {rating >= 4.7 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#BB86FC] to-[#7F4BFF] text-[#121212] text-xs font-bold px-3 py-1 rounded-full hidden sm:block">
          PREMIUM
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-40 sm:h-72 overflow-hidden">
        {imageURL ? (
          <motion.img
            className="w-full h-full object-cover"
            src={imageURL}
            alt={name}
            loading="lazy"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.5 },
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] flex items-center justify-center">
            <div className="bg-[#121212] border border-[#BB86FC]/20 rounded-lg w-16 h-16 flex items-center justify-center">
              <span className="text-[#BB86FC] text-xs font-medium">No Image</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Price for small screens (overlay) */}
        <div className="absolute bottom-0 left-5 sm:hidden bg-[#121212]/80 text-[#BB86FC] font-bold px-3 py-1 rounded-sm  text-sm shadow-md">
          Rs{typeof price === "number" ? price.toFixed(2) : "0.00"}
          
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Product Name (always visible) */}
        <motion.h4
          className="text-sm sm:text-lg font-semibold text-white hover:text-[#BB86FC] transition-colors line-clamp-2"
          whileHover={{ color: "#BB86FC" }}
        >
          {name}
        </motion.h4>

        {/* Extra details → hidden on mobile */}
        <div className="hidden sm:block mt-3">
          {/* Rating */}
          <motion.div className="flex items-center mb-2" whileHover={{ y: -2 }}>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={`star-${id}-${i}`}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "text-[#BB86FC] drop-shadow-[0_0_4px_rgba(187,134,252,0.7)]"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">
              ({rating.toFixed(1)})
            </span>
          </motion.div>

          {/* Price (desktop) */}
          <p className="text-xl font-bold text-[#BB86FC] mb-4 flex items-center">
            Rs{typeof price === "number" ? price.toFixed(2) : "0.00"}
            {price > 500 && (
              <span className="ml-2 text-xs font-normal bg-[#BB86FC]/10 text-[#BB86FC] px-2 py-1 rounded">
                Free Shipping
              </span>
            )}
          </p>

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
              isInCart
                ? "bg-transparent border border-[#BB86FC] text-[#BB86FC] hover:bg-[#BB86FC]/10"
                : "bg-gradient-to-r from-[#BB86FC] to-[#7F4BFF] text-[#121212] hover:from-[#BB86FC]/90 hover:to-[#7F4BFF]/90"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (isInCart) {
                deleteFromCart(id);
                window.toastify &&
                  window.toastify("Removed from cart", "success");
              } else {
                addToCart(product);
                window.toastify &&
                  window.toastify("Added to cart", "success");
              }
            }}
            whileHover={{ scale: 1.03 }}
          >
            <FaShoppingCart className="h-5 w-5" />
            {isInCart ? "Remove From Cart" : "Add To Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
