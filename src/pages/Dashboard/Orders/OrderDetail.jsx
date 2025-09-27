import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiTrash2, FiSearch, FiChevronUp, FiChevronDown, FiPackage } from 'react-icons/fi';
import { useAuthContext } from '../../../contexts/Auth';

const OrderDetail = () => {
    const { getAllOrder, deleteOrder } = useAuthContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Flatten order items for table display
    const flattenedOrders = useMemo(() => {
        if (!Array.isArray(getAllOrder)) return [];
        
        return getAllOrder.flatMap(order => 
            order.cartItems.map(item => ({
                ...item,
                orderId: order.id,
                status: order.status,
                addressInfo: order.addressInfo,
                email: order.email,
                time: order.time,
                totalPrice: item.quantity * item.price
            }))
        );
    }, [getAllOrder]);

    // Filter and sort orders
    const filteredAndSortedOrders = useMemo(() => {
        let orders = [...flattenedOrders];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            orders = orders.filter(order => 
                order.name?.toLowerCase().includes(term) ||
                order.category?.toLowerCase().includes(term) ||
                order.email?.toLowerCase().includes(term) ||
                order.addressInfo?.name?.toLowerCase().includes(term) ||
                order.status?.toLowerCase().includes(term)
            );
        }

        // Apply sorting
        if (sortConfig.key) {
            orders.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Special handling for dates
                if (sortConfig.key === 'time') {
                    aValue = aValue?.toDate().getTime();
                    bValue = bValue?.toDate().getTime();
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

        return orders;
    }, [flattenedOrders, searchTerm, sortConfig]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortConfig]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

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

    // Delete order handler
    const handleDelete = (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (confirmDelete) deleteOrder(orderId);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <FiPackage className="text-gray-900 text-xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                            Order Management
                        </h2>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="py-4 px-6 text-left">S.No.</th>
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
                                    <th className="py-4 px-6 text-left">Price</th>
                                    <th className="py-4 px-6 text-left">Qty</th>
                                    <th className="py-4 px-6 text-left">Total</th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('status')}
                                        >
                                            <span>Status</span>
                                            {sortConfig.key === 'status' && (
                                                sortConfig.direction === 'ascending' 
                                                    ? <FiChevronUp /> 
                                                    : <FiChevronDown />
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">Customer</th>
                                    <th className="py-4 px-6 text-left">
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                                            onClick={() => handleSort('time')}
                                        >
                                            <span>Date</span>
                                            {sortConfig.key === 'time' && (
                                                sortConfig.direction === 'ascending' 
                                                    ? <FiChevronUp /> 
                                                    : <FiChevronDown />
                                            )}
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr
                                        key={`${item.orderId}-${item.id}`}
                                        className="border-t border-gray-700 transition-all duration-200 hover:bg-gray-700 hover:bg-opacity-50"
                                    >
                                        <td className="py-4 px-6 text-gray-300">
                                            <span className="bg-gray-900 px-3 py-1 rounded-full text-sm">
                                                #{indexOfFirstItem + index + 1}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <img
                                                src={item.imageURL}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="py-4 px-6 font-medium max-w-xs">
                                            {item.name}
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            {item.category}
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            Rs {item.price}
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            {item.quantity}
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            Rs {item.totalPrice}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                item.status === 'Delivered' 
                                                    ? 'bg-green-900 text-green-300' 
                                                    : item.status === 'Processing' 
                                                        ? 'bg-yellow-900 text-yellow-300'
                                                        : 'bg-purple-900 text-purple-300'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">
                                            <div>
                                                <div className="font-medium">{item.addressInfo?.name}</div>
                                                <div className="text-sm">{item.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300 text-sm">
                                            {item.time?.toDate().toLocaleString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => handleDelete(item.orderId)}
                                                className="p-2 bg-gray-700 rounded-lg hover:bg-red-500 transition-colors duration-200"
                                                aria-label="Delete order"
                                            >
                                                <FiTrash2 className="text-gray-300" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAndSortedOrders.length === 0 && (
                        <div className="py-12 text-center text-gray-400">
                            <div className="text-5xl mb-4">📦</div>
                            <p className="text-xl">No orders found</p>
                            <p className="mt-2">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400">
                        Showing {indexOfFirstItem + 1}-
                        {Math.min(indexOfLastItem, filteredAndSortedOrders.length)} of{' '}
                        {filteredAndSortedOrders.length} orders
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
            </div>
        </div>
    );
};

export default OrderDetail;