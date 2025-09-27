import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronUp, FiChevronDown, FiPackage } from 'react-icons/fi';
import { useAuthContext } from '../../../contexts/Auth';
import ScreenLoader from '../../../components/ScreenLoader';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const ProductDetail = () => {
  const { getAllProduct, isAppLoading, setIsAppLoading, getAllProductFunction } = useAuthContext();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Process products for display
  const processedProducts = useMemo(() => {
    if (!Array.isArray(getAllProduct)) return [];
    
    return getAllProduct.map(product => ({
      ...product,
      readableDate: product.createdAt?.seconds
        ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
        : "N/A"
    }));
  }, [getAllProduct]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...processedProducts];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      products = products.filter(product => 
        product.name?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.price?.toString().includes(term)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      products.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for dates
        if (sortConfig.key === 'createdAt') {
          aValue = a.createdAt?.seconds || 0;
          bValue = b.createdAt?.seconds || 0;
        }

        // Handle undefined values
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        // String comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Numeric comparison
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return products;
  }, [processedProducts, searchTerm, sortConfig]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Sorting handler
  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'ascending' 
          ? 'descending' 
          : 'ascending'
    }));
  }, []);

  // Delete product handler
  const handleDelete = async (id) => {
    setIsAppLoading(true);
    try {
      await deleteDoc(doc(firestore, "products", id));
      window.toastify("Product deleted successfully", "success");
      getAllProductFunction();
    } catch (error) {
      console.log(error);
      window.toastify("Failed to delete product", "error");
    } finally {
      setIsAppLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      {isAppLoading && <ScreenLoader />}
      
      <div className="max-w-7xl mx-auto">
        <div className="py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <FiPackage className="text-gray-900 text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              Product Management
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="mt-12 bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">No Products Found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or add a new product</p>
            <Link to={"/dashboard/add-product"}>
              <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-500 transition-all duration-200">
                Add Product
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-4 px-6 text-left">ID</th>
                      <th className="py-4 px-6 text-left">Image</th>
                      <th className="py-4 px-6 text-left">
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                          onClick={() => handleSort('name')}
                        >
                          <span>Title</span>
                          {sortConfig.key === 'name' && (
                            sortConfig.direction === 'ascending' 
                              ? <FiChevronUp /> 
                              : <FiChevronDown />
                          )}
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left">
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                          onClick={() => handleSort('price')}
                        >
                          <span>Price</span>
                          {sortConfig.key === 'price' && (
                            sortConfig.direction === 'ascending' 
                              ? <FiChevronUp /> 
                              : <FiChevronDown />
                          )}
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left">
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                          onClick={() => handleSort('category')}
                        >
                          <span>Category</span>
                          {sortConfig.key === 'category' && (
                            sortConfig.direction === 'ascending' 
                              ? <FiChevronUp /> 
                              : <FiChevronDown />
                          )}
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left">
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                          onClick={() => handleSort('createdAt')}
                        >
                          <span>Date</span>
                          {sortConfig.key === 'createdAt' && (
                            sortConfig.direction === 'ascending' 
                              ? <FiChevronUp /> 
                              : <FiChevronDown />
                          )}
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className="border-t border-gray-700 transition-all duration-200 hover:bg-gray-700 hover:bg-opacity-50"
                      >
                        <td className="py-4 px-6 text-gray-300">
                          <span className="bg-gray-900 px-3 py-1 rounded-full text-sm">
                            #{indexOfFirstProduct + index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <img
                            src={product.imageURL}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md border border-gray-700"
                          />
                        </td>
                        <td className="py-4 px-6 font-medium max-w-xs">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-purple-400 font-semibold">
                          Rs {product.price}
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          {product.readableDate}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/dashboard/update-product/${product.id}`)}
                              className="p-2 bg-gray-700 rounded-lg hover:bg-purple-500 transition-colors duration-200"
                              aria-label="Edit product"
                            >
                              <FiEdit2 className="text-gray-300" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this product?")) {
                                  handleDelete(product.id);
                                }
                              }}
                              className="p-2 bg-gray-700 rounded-lg hover:bg-red-500 transition-colors duration-200"
                              aria-label="Delete product"
                            >
                              <FiTrash2 className="text-gray-300" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-400">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredAndSortedProducts.length)} of{' '}
                {filteredAndSortedProducts.length} products
              </div>

              <div className="flex items-center gap-4">
                <div className="text-gray-400 hidden sm:block">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all ${currentPage === 1
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                        }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                            ? "bg-purple-900 text-purple-400 cursor-not-allowed opacity-70"
                            : "bg-purple-600 text-white hover:bg-purple-500 hover:scale-[1.03] active:scale-95"
                        }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

<style>
        {`
          .dark-form .ant-form-item-label > label {
            color: #BBBBBB !important;
          }
          
          .dark-input input, .dark-input .ant-select-selector, 
          .dark-input textarea, .dark-input .ant-upload {
            background-color: #1E1E1E !important;
            border-color: #2D2D2D !important;
            color: #FFFFFF !important;
          }
          
          .dark-input input::placeholder, 
          .dark-input textarea::placeholder {
            color: #777777 !important;
          }
          
          .dark-input input:hover, .dark-input textarea:hover,
          .dark-input .ant-select-selector:hover {
            border-color: #BB86FC !important;
          }
          
          .dark-input input:focus, .dark-input textarea:focus,
          .dark-input .ant-select-focused .ant-select-selector {
            border-color: #BB86FC !important;
            box-shadow: 0 0 0 2px rgba(187, 134, 252, 0.2) !important;
          }
          
          .dark-button {
            background: #BB86FC !important;
            color: #121212 !important;
            border-color: #BB86FC !important;
            font-weight: 500 !important;
            transition: all 0.2s !important;
          }
          
          .dark-button:hover {
            filter: brightness(110%) !important;
            transform: scale(1.05) !important;
          }
          
          .dark-button:active {
            transform: scale(0.95) !important;
          }
          
          .dark-upload .ant-upload-btn {
            background: #1E1E1E !important;
            border-color: #2D2D2D !important;
            color: #FFFFFF !important;
          }
          
          .dark-upload .ant-upload-btn:hover {
            border-color: #BB86FC !important;
            color: #BB86FC !important;
          }
          
          .ant-select-dropdown {
            background-color: #1E1E1E !important;
            border: 1px solid #2D2D2D !important;
          }
          
          .ant-select-item {
            color: #FFFFFF !important;
          }
          
          .ant-select-item:hover {
            background-color: #2D2D2D !important;
          }
          
          .ant-select-item-option-selected {
            background-color: #2D2D2D !important;
            color: #BB86FC !important;
          }
          
          .ant-upload-list-item-name {
            color: #FFFFFF !important;
          }
        `}
      </style>