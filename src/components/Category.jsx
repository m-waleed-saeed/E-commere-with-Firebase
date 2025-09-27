import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Typography } from "antd";

const categories = [
  {
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwcGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Mobile'
  },
  {
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwbGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    name: 'Laptop'
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Watch'
  },
  {
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    name: 'Tablet'
  },
  {
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Airpods'
  },
  {
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Gaming'
  },
  {
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBjYXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    name: 'Phone Case'
  },
  {
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    name: 'Headphones'
  }
];

const { Title } = Typography

const Category = () => {

  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#121212] py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <Title level={2} className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-[#BB86FC]">Collections</span>
          </Title>
          <button onClick={() => setShowAll(!showAll)} className="hidden md:flex items-center text-[#BBBBBB] hover:text-[#BB86FC] transition-colors">
            {showAll ? 'Show less' : 'View all'} <FaArrowRight className="ml-2" />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="aspect-square bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#2D2D2D] transition-all duration-300 group-hover:border-[#BB86FC] group-hover:shadow-[0_0_20px_rgba(187,134,252,0.2)] cursor-pointer"
              >
                <div className="relative h-full w-full">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/20 to-transparent z-10" />
                  {/* Product image */}
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-2 bg-[#BB86FC] opacity-0 rounded-xl blur-md transition-opacity duration-300 group-hover:opacity-20"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <motion.h3
                  className="text-lg font-medium text-white group-hover:text-[#BB86FC] transition-colors duration-300"
                >
                  {item.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-[#BBBBBB] mt-1"
                >
                  {Math.floor(Math.random() * 50) + 10} products
                </motion.p>
              </div>
            </motion.div>
          )).slice(0, showAll ? categories.length : 4)}
        </div>

        {/* Mobile view all button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowAll(!showAll)}
          className="md:hidden flex items-center justify-center w-full mt-8 py-3 bg-[#1E1E1E] text-white rounded-lg hover:bg-[#BB86FC] hover:text-[#121212] transition-all"
        >
          {showAll ? 'Show less' : 'View all categories'}<FaArrowRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default Category;