import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const { getAllProduct } = useAuthContext();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterSearchData = getAllProduct
    .filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <motion.div
        initial={{ width: "100%" }}
        className="flex items-center relative"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="bg-[#1E1E1E] placeholder-gray-400 rounded-lg px-4 py-2 w-full outline-none text-white pr-10"
        />
        {search ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearch("")}
            className="absolute right-3 text-gray-400 hover:text-white"
          >
            <FiX />
          </motion.button>
        ) : (
          <FiSearch className="absolute right-3 text-gray-400" />
        )}
      </motion.div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isFocused && search && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-[#1E1E1E] rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {filterSearchData.length > 0 ? (
              <div className="py-2">
                {filterSearchData.map((item, index) => (
                  <motion.div
                    whileHover={{ backgroundColor: "#2D2D2D" }}
                    key={index}
                    onClick={() => {
                      navigate(`/product-info/${item.id}`);
                      setIsFocused(false);
                    }}
                    className="px-4 py-3 cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-[#BB86FC] text-sm">
                        Rs {item.price?.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                  alt="No results"
                  className="w-16 mx-auto opacity-70"
                />
                <p className="text-gray-400 mt-2">No products found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;