import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../contexts/Auth";
import ProductCard from "../../../components/ProductCard";

const Favorites = () => {
    const { getAllProduct, favorites, isAppLoading } = useAuthContext();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (getAllProduct.length && favorites !== null) {
            setIsReady(true);
        }
    }, [getAllProduct, favorites]);


    const favoriteProducts = useMemo(() => {
        return getAllProduct.filter(p => p?.id && favorites[p.id]);
    }, [getAllProduct, favorites]);

    if (isAppLoading || favorites === null || !getAllProduct.length) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white">
                Loading favorites...
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#121212] text-white p-4">
            <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
            {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            ) : (
                <p className="text-gray-400">No favorite products yet.</p>
            )}
        </div>
    );
};

export default Favorites;