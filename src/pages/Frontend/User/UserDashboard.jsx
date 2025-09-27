import React from "react";
import { FiShoppingBag, FiUser, FiCalendar, FiMail, FiCreditCard, FiStar } from "react-icons/fi";
import { useAuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const { user, getAllOrder } = useAuthContext();

    const navigate = useNavigate()

    const formatTimestamp = (timestamp) => {
        if (!timestamp || !timestamp.toDate) return "N/A";
        return timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    // Mock orders data
    const orders = getAllOrder.filter((obj) => obj.userUid === user?.uid);
    
    return (
        <div className="min-h-screen bg-[#121212] text-white font-sans pt-[88px]">
            {/* Gradient Top Bar */}
            <div className="bg-gradient-to-r from-[#121212] to-[#2a1a44] h-64 w-full absolute top-0 left-0 -z-10"></div>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* User Profile Card */}
                <div className="bg-[#1E1E1E] rounded-2xl border border-[#2D2D2D] p-6 mb-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(187,134,252,0.3)] relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#BB86FC] opacity-10 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#BB86FC] opacity-5 rounded-full"></div>

                    <div className="flex flex-col md:flex-row items-center relative z-10">
                        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                            <div className="bg-gradient-to-br from-[#2a1a44] to-[#121212] rounded-full p-1 border-2 border-[#BB86FC] shadow-lg">
                                <div className="bg-[#2D2D2D] rounded-full p-4">
                                    <FiUser className="text-[#BB86FC] text-4xl" />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start">
                                <h1 className="text-2xl lg:text-3xl font-bold mr-3">{user?.fullName}</h1>
                                <span className="bg-gradient-to-r from-[#BB86FC] to-[#7a4dcc] text-xs px-2 py-1 rounded-full flex items-center">
                                    <FiStar className="mr-1" /> Premium
                                </span>
                            </div>

                            <div className="mt-3 space-y-2">
                                <p className="text-[#BBBBBB] flex items-center justify-center md:justify-start">
                                    <FiMail className="mr-2 text-[#BB86FC]" />
                                    {user?.email}
                                </p>
                                <p className="text-[#BBBBBB] flex items-center justify-center md:justify-start">
                                    <FiCalendar className="mr-2 text-[#BB86FC]" />
                                    Member since: {user?.createdAt ? formatTimestamp(user.createdAt) : "N/A"}
                                </p>
                                <p className="text-[#BB86FC] font-medium flex items-center justify-center md:justify-start">
                                    <FiCreditCard className="mr-2" />
                                    {user?.role}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex space-x-4">
                            <div className="bg-gradient-to-b from-[#2a1a44] to-[#1E1E1E] px-4 py-3 rounded-xl text-center border border-[#2D2D2D]">
                                <p className="text-[#BBBBBB] text-sm">Total Orders</p>
                                <p className="text-2xl font-bold">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Orders Section */}
                { (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl lg:text-3xl font-bold flex items-center">
                                <FiShoppingBag className="mr-2 text-[#BB86FC]" />
                                Order History
                            </h2>
                            <div className="text-sm text-[#BBBBBB]">
                                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                            </div>
                        </div>

                        {orders.length === 0 ? (
                            <div className="bg-[#1E1E1E] rounded-2xl border border-[#2D2D2D] p-12 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(187,134,252,0.2)]">
                                <div className="bg-[#2a1a44] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiShoppingBag className="text-[#BB86FC] text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
                                <p className="text-[#BBBBBB] max-w-md mx-auto mb-6">
                                    You haven't placed any orders. Start shopping to see your order history here.
                                </p>
                                <button onClick={() => navigate('/shop')} className="bg-[#BB86FC] text-[#121212] px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95">
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {orders.map((order, orderIndex) => (
                                    <div key={orderIndex}
                                        className="bg-[#1E1E1E] rounded-2xl border border-[#2D2D2D] overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(187,134,252,0.25)]">
                                        <div className="p-6 border-b border-[#2D2D2D] bg-gradient-to-r from-[#1a1a2e] to-[#1E1E1E]">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                <div>
                                                    <span className="text-[#BBBBBB] text-sm">Order ID</span>
                                                    <h3 className="font-bold text-lg">{order.id || "No ID"}</h3>
                                                </div>
                                                <div className="mt-2 md:mt-0">
                                                    <span className="text-[#BBBBBB] text-sm">Date</span>
                                                    <p>{order.date ? formatTimestamp(order.date) : "N/A"}</p>
                                                </div>
                                                <div className="mt-2 md:mt-0">
                                                    <span className="text-[#BBBBBB] text-sm">Status </span>
                                                    <p className={`font-medium px-3 py-1 rounded-full text-sm inline-block ${order.status === 'delivered'
                                                        ? 'bg-green-900/30 text-green-400'
                                                        : order.status === 'processing'
                                                            ? 'bg-yellow-900/30 text-yellow-400'
                                                            : 'bg-purple-900/30 text-[#BB86FC]'
                                                        }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {order.cartItems.map((item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className="flex flex-col md:flex-row justify-between items-start py-4 border-b border-[#2D2D2D]/50 last:border-0">
                                                        <div className="flex items-start w-full">
                                                            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#2D2D2D] bg-[#2D2D2D] flex items-center justify-center flex-shrink-0">
                                                                <img
                                                                    src={item.imageURL}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-contain" />
                                                            </div>
                                                            <div className="ml-4 flex-1">
                                                                <div className="flex justify-between">
                                                                    <h4 className="font-bold">{item.name}</h4>
                                                                    <p className="font-bold">Rs {item.price}</p>
                                                                </div>
                                                                <p className="text-[#BBBBBB] text-sm">{item.category}</p>
                                                                <div className="flex justify-between mt-2">
                                                                    <p className="text-sm text-[#BBBBBB]">Quantity: {item.quantity}</p>
                                                                    <p className="text-sm text-[#BBBBBB]">Total: Rs {item.price * item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-[#2D2D2D] flex justify-end">
                                                <div className="text-right mt-4 md:mt-0">
                                                    <p className="text-[#BBBBBB]">Total Amount</p>
                                                    <p className="text-xl font-bold text-[#BB86FC]">
                                                        Rs {order.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;