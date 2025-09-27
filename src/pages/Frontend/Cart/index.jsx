import React, { useState } from 'react';
import { Trash, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartContext } from '../../../contexts/Cart';
import BuyNowModal from '../../../components/BuyNow/BuyNowModal';
import { useAuthContext } from '../../../contexts/Auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../config/firebase';
import EmptyState from '../../../components/EmptyState';

const CartPage = () => {
    const {
        cartItems,
        deleteFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart // Now available
    } = useCartContext();
    const { user } = useAuthContext();
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        mobileNumber: "",
        zipCode: "",
        time: Timestamp.now()
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();

    const handleOrderSubmit = async (addressValues) => {
        setIsProcessing(true);
        const orderInfo = {
            cartItems,
            addressInfo: addressValues,
            email: user.email,
            status: "confirmed",
            userUid: user.uid,
            time: Timestamp.now()
        };

        try {
            const orderRef = collection(firestore, "orders");
            await addDoc(orderRef, orderInfo);
            setAddressInfo({ name: "", address: "", mobileNumber: "", zipCode: "" });

            // Clear cart after successful order
            clearCart();

            window.toastify("Order successfully placed", "success");

            // Redirect to order confirmation
            setTimeout(() => navigate("/user-dashboard"), 2000);
        } catch (error) {
            console.log(error);
            window.toastify("Error while placing the order", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const parsePrice = (priceString) =>
        parseInt(String(priceString).replace(/[^\d]/g, ''), 10) || 0;

    const totalOriginal = cartItems.reduce((total, item) => {
        const price = parsePrice(item.originalPrice || item.price);
        return total + price * item.quantity;
    }, 0);

    const totalDiscount = Math.round(totalOriginal * 0.10);

    const totalFinal = totalOriginal - totalDiscount;


    return (
        <div className="min-h-screen bg-[#121212] text-[#FFFFFF] font-sans pt-[88px]">
            {/* Header */}
            <header className="bg-[#1E1E1E] border-b border-[#2D2D2D] sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
                <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-[#BB86FC] hover:text-white transition-colors mr-4"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        <span className="sr-only">Go Back</span>
                    </button>
                    <ShoppingBag className="text-[#BB86FC] mr-2" size={24} />
                    <h1 className="text-2xl font-bold tracking-tight">Shopping Cart</h1>
                    <div className="ml-auto bg-[#BB86FC] text-[#121212] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {cartItems.length}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-7xl lg:px-0 py-8">
                <div className="mx-auto max-w-7xl">
                    {cartItems.length === 0 ?
                        <EmptyState />
                        : (
                            <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
                                {/* Cart Items */}
                                <section className="lg:col-span-8">
                                    <ul className="space-y-4">
                                        {cartItems.map((product) => (
                                            <li
                                                key={product.id}
                                                className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-4 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)] transition-all duration-300"
                                            >
                                                <div className="flex">
                                                    <div className="flex-shrink-0 relative">
                                                        <img
                                                            src={product.imageURL}
                                                            alt={product.name}
                                                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-lg object-contain bg-white p-1"
                                                        />
                                                        {product.quantity > 1 && (
                                                            <div className="absolute -top-2 -right-2 bg-[#BB86FC] text-[#121212] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                                {product.quantity}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col justify-between">
                                                        <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-white">
                                                                    {product.name}
                                                                </h3>
                                                                <div className="mt-1 flex text-sm text-[#BBBBBB]">
                                                                    <p>{product.color}</p>
                                                                    {product.size && (
                                                                        <p className="ml-4 border-l border-[#2D2D2D] pl-4">{product.size}</p>
                                                                    )}
                                                                </div>
                                                                <div className="mt-2 flex items-end">
                                                                    {product.originalPrice && (
                                                                        <p className="text-sm text-[#BBBBBB] line-through">
                                                                            Rs{parsePrice(product.originalPrice)}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-lg font-medium text-white ml-2">
                                                                        Rs{parsePrice(product.price) * product.quantity}
                                                                    </p>
                                                                    {product.discount && (
                                                                        <p className="ml-3 px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-full">
                                                                            {product.discount}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 sm:mt-0 flex justify-end">
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#2D2D2D] text-[#BB86FC] hover:bg-[#3D3D3D] transition-colors"
                                                                        onClick={() => decrementQuantity(product.id)}
                                                                        disabled={product.quantity <= 1}
                                                                    >
                                                                        <Minus size={16} />
                                                                    </button>
                                                                    <input
                                                                        type="text"
                                                                        className="mx-2 h-8 w-10 rounded-md border border-[#2D2D2D] bg-[#121212] text-center text-white"
                                                                        readOnly
                                                                        value={product.quantity}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#2D2D2D] text-[#BB86FC] hover:bg-[#3D3D3D] transition-colors"
                                                                        onClick={() => incrementQuantity(product.id)}
                                                                    >
                                                                        <Plus size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex justify-end">
                                                            <button
                                                                type="button"
                                                                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#BBBBBB] hover:text-[#BB86FC] transition-colors"
                                                                onClick={() => deleteFromCart(product.id)}
                                                            >
                                                                <Trash size={16} />
                                                                <span className="text-sm">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Order Summary */}
                                <section className="mt-8 lg:mt-0 lg:col-span-4">
                                    <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl overflow-hidden">
                                        <h2 className="bg-[#1E1E1E] px-4 py-3 text-lg font-semibold text-white border-b border-[#2D2D2D]">
                                            Price Details
                                        </h2>

                                        <div className="p-4">
                                            <dl className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <dt className="text-[#BBBBBB]">Price ({cartItems.length} items)</dt>
                                                    <dd className="text-white">Rs{totalOriginal}</dd>
                                                </div>

                                                <div className="flex items-center justify-between pt-2">
                                                    <dt className="text-[#BBBBBB]">Discount</dt>
                                                    <dd className="text-green-500">Rs{totalDiscount}</dd>
                                                </div>

                                                <div className="flex items-center justify-between py-2">
                                                    <dt className="text-[#BBBBBB]">Delivery Charges</dt>
                                                    <dd className="text-green-500">Free</dd>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-[#2D2D2D] pt-4">
                                                    <dt className="text-lg font-semibold text-white">Total Amount</dt>
                                                    <dd className="text-xl font-bold text-white">Rs{totalFinal}</dd>
                                                </div>
                                            </dl>

                                            <div className="mt-6">
                                                {user && user.email ? (
                                                    <BuyNowModal
                                                        addressInfo={addressInfo}
                                                        setAddressInfo={setAddressInfo}
                                                        onSubmit={handleOrderSubmit}
                                                        triggerComponent={
                                                            <button
                                                                className={`w-full bg-[#BB86FC] text-[#121212] py-3 rounded-lg font-medium transition-all duration-200 focus:outline-2 focus:outline-[#BB86FC] ${isProcessing
                                                                    ? 'opacity-70 cursor-not-allowed'
                                                                    : 'hover:brightness-110 hover:scale-[1.02]'
                                                                    }`}
                                                                disabled={isProcessing}
                                                            >
                                                                {isProcessing ? (
                                                                    <span className="flex items-center justify-center">
                                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#121212]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                        </svg>
                                                                        Processing...
                                                                    </span>
                                                                ) : (
                                                                    "Proceed to Checkout"
                                                                )}
                                                            </button>
                                                        }
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() => navigate("/auth/login")}
                                                        className="w-full bg-[#BB86FC] text-[#121212] py-3 rounded-lg font-medium hover:brightness-110 hover:scale-[1.02] transition-all duration-200 focus:outline-2 focus:outline-[#BB86FC]"
                                                    >
                                                        Login to Checkout
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center text-[#BBBBBB] text-sm p-3 bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg">
                                        <p>✅ Your order is eligible for FREE Delivery</p>
                                        <p className="mt-1">🔒 Secure SSL encrypted payment</p>
                                    </div>
                                </section>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;