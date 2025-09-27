import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useAuthContext } from './Auth';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, isAppLoading } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.uid || isAppLoading) return;

      try {
        const cartRef = doc(firestore, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().cartItems || []);
        } else {
          setCartItems([]);
        }

        setHasFetchedCart(true);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user, isAppLoading]);

  useEffect(() => {
    const saveCart = async () => {
      if (user?.uid && hasFetchedCart) {
        try {
          const cartRef = doc(firestore, 'carts', user.uid);
          await setDoc(cartRef, { cartItems });
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    saveCart();
  }, [cartItems, user, hasFetchedCart]);

  // ADDED: clearCart function
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const deleteFromCart = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  }, []);

  const incrementQuantity = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart // ADDED to context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartProvider;