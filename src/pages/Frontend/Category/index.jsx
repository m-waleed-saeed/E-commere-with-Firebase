import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../../contexts/Auth";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCartContext } from '../../../contexts/Cart';

const CategoryPage = () => {
  const { getAllProduct = [], isAppLoading, favorites = {}, toggleFavorite } = useAuthContext();
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const { addToCart, deleteFromCart, cartItems } = useCartContext();

  const filteredProducts = getAllProduct.filter((obj) =>
    obj.category?.toLowerCase().includes(categoryname?.toLowerCase())
  );

  if (isAppLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-center text-3xl font-bold capitalize mb-8'>{categoryname}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              navigate={navigate}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
              cartItems={cartItems}
            />
          ))
        ) : (
          <NotFound categoryname={categoryname} />
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  item,
  favorites,
  toggleFavorite,
  navigate,
  addToCart,
  deleteFromCart,
  cartItems
}) => {
  const { id, name, price, imageURL, rating = 4.5 } = item;

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product-info/${id}`)}>
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(id);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-pink-50 transition-colors"
        aria-label="Add to favorites">
        {favorites[id] ? (
          <FaHeart className="h-5 w-5 text-pink-500" />
        ) : (
          <FaRegHeart className="h-5 w-5 text-gray-400 hover:text-pink-500" />
        )}
      </button>

      {/* Product Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={imageURL}
          alt={name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-pink-600 transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mb-4">
          Rs{price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <div>
          {cartItems.some((e) => e.id === item.id) ? (
            <button
              className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                deleteFromCart(item.id);
                window.toastify("Removed from cart", "success");
              }}
            >
              <FaShoppingCart className="h-5 w-5" />
              Remove From Cart
            </button>
          ) : (
            <button
              className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 group-hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
                window.toastify("Added to cart", "success");
              }}
            >
              <FaShoppingCart className="h-5 w-5" />
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotFound = ({ categoryname }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12">
    <img
      className="w-32 h-32 mb-4"
      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
      alt="No products found"
    />
    <h1 className="text-2xl font-semibold text-gray-700">
      No {categoryname} products found
    </h1>
  </div>
);

export default CategoryPage;