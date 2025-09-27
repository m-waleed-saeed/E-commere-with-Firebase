import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
                <ShoppingBag className="text-[#BB86FC] w-16 h-16" />
                <div className="absolute -top-2 -right-2 bg-[#BB86FC] text-[#121212] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    0
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Your cart is empty</h2>
            <p className="text-[#BBBBBB] mt-2 max-w-md text-center">
                Looks like you haven’t added anything yet. Start shopping now!
            </p>
            <button
                onClick={() => navigate('/shop')}
                className="mt-6 bg-[#BB86FC] text-[#121212] px-6 py-3 rounded-lg font-medium hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center"
            >
                <ShoppingBag className="mr-2" size={18} />
                Continue Shopping
            </button>
        </div>
    );
};

export default EmptyState;