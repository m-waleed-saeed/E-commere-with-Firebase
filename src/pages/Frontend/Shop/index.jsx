import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../../components/ProductCard";
import { useAuthContext } from "../../../contexts/Auth";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const Shop = () => {
  const { getAllProduct } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const productsData = getAllProduct;
    setProducts(productsData);
    setFilteredProducts(productsData);

    const uniqueCategories = [...new Set(productsData.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase()))];
    setCategories(["All", ...uniqueCategories]);
  }, [getAllProduct]);


  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, sortOption, priceRange, selectedCategory, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  console.log(products.length, filteredProducts.length, currentProducts.length)


  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("featured");
    setPriceRange([0, 1000]);
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-[88px] px-4 md:px-8 pb-12">
      <div className="text-center mb-10">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-white">
          Premium Collection
        </motion.h1>
        <p className="text-[#BBBBBB] mt-2">
          Discover our exclusive range of beautifully crafted products.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-lg">Filters</h3>
            <button onClick={resetFilters} className="text-sm text-[#BB86FC] hover:text-white">
              Reset
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2.5 pl-10 pr-4 rounded-lg bg-[#121212] border border-[#2D2D2D] text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BBBBBB]" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#BBBBBB]"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <h4 className="text-white mb-2">Categories</h4>
            {categories.map((cat) => (
              <div key={cat} className="mb-1">
                <label className="text-white">
                  <input
                    type="radio"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="mr-2 accent-[#BB86FC]"
                  />
                  {cat}
                </label>
              </div>
            ))}
          </div>

          {/* Price */}
          <div>
            <h4 className="text-white mb-2">Max Price: Rs {priceRange[1]}</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Products List */}
        <div className="lg:w-3/4">
          {/* Sort and Info */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-[#BBBBBB]">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-[#BBBBBB]">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#121212] text-white border border-[#2D2D2D] px-4 py-2 rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="text-center text-white col-span-full py-20">
                <h2 className="text-2xl mb-2">No products found</h2>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-gradient-to-r from-[#BB86FC] to-[#7F4BFF] text-[#121212] px-6 py-2 rounded-xl font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg ${currentPage === page
                    ? "bg-gradient-to-r from-[#BB86FC] to-[#7F4BFF] text-[#121212]"
                    : "bg-[#1A1A1A] border border-[#2D2D2D] text-white"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;