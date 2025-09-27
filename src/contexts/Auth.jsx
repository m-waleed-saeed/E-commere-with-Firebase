// AuthContext.js
import React, { createContext, useCallback, useContext, useEffect, useState, useReducer } from 'react';
import { auth, firestore } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, orderBy, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

const initialState = { isAuth: false, user: {} };

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuth: true, user: action.payload };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};


const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([])
    const [getAllUser, setGetAllUser] = useState([])
    const [favorites, setFavorites] = useState({});


    const readProfile = useCallback(async (user) => {
        const docSnap = await getDoc(doc(firestore, "users", user.uid));
        if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch({ type: 'LOGIN', payload: { ...userData, uid: user.uid } });

            const favObj = {};
            (userData.favorites || []).forEach(id => favObj[id] = true);
            setFavorites(favObj);
        } else {
            console.log("No such document!");
        }
        setIsAppLoading(false);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                readProfile(user);
            } else {
                dispatch(initialState);
                setIsAppLoading(false);
            }
        });
        return () => unsubscribe();
    }, [readProfile]);

    // Handle Lodgout

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT' });
                window.toastify("Logout Successful", "success");
            })
            .catch((error) => {
                window.toastify("Something went wrong while logging out", "error");
                console.error(error);
            });
    };

    // Get All Product Function

    const getAllProductFunction = useCallback(async () => {
        try {
            const q = query(collection(firestore, "products"), orderBy("createdAt"));
            const snapshot = await getDocs(q);
            const productArray = snapshot.docs.reverse().map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setGetAllProduct(productArray);
        } catch (error) {
            console.error("Error getting products:", error);
        }
    }, []);

    useEffect(() => {
        const q = query(collection(firestore, "products"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productArray = snapshot.docs.reverse().map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setGetAllProduct(productArray);
            setIsAppLoading(false);
        }, (error) => {
            console.error("Error getting products:", error);
            setIsAppLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Get All Order Function

    const getAllOrderFunction = useCallback(() => {
        const q = query(collection(firestore, "orders"), orderBy("time"));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const orderArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGetAllOrder(orderArray);
                setIsAppLoading(false);
            },
            (error) => {
                console.error("Error fetching orders:", error);
                setIsAppLoading(false);
            }
        );

        return unsubscribe;
    }, []);


    // Delete Order

    const deleteOrder = async (id) => {
        setIsAppLoading(true)
        try {
            await deleteDoc(doc(firestore, 'orders', id))
            window.toastify('Order deleted successfully', 'success')
            getAllOrderFunction();
            setIsAppLoading(false)
        } catch (error) {
            console.log(error)
            setIsAppLoading(false)
        }
    }

    // Get All User Fuction

    const getAllUserFunction = () => {
        const q = query(collection(firestore, 'users'), orderBy("createdAt"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setGetAllUser(userArray);
            setIsAppLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setIsAppLoading(false);
        });

        return unsubscribe; // ✅ proper cleanup
    };

    // Favorite Function 
    const toggleFavorite = async (productId) => {
        const userRef = doc(firestore, "users", state.user.uid);

        let updatedFavorites;
        if (favorites[productId]) {
            // remove from favorites
            updatedFavorites = Object.keys(favorites).filter(id => id !== productId);
        } else {
            // add to favorites
            updatedFavorites = [...Object.keys(favorites), productId];
        }

        try {
            await updateDoc(userRef, { favorites: updatedFavorites });
            const favObj = {};
            updatedFavorites.forEach(id => favObj[id] = true);
            setFavorites(favObj);
            window.toastify("Favorites updated", "success");
        } catch (err) {
            console.error("Error updating favorites", err);
            window.toastify("Failed to update favorites", "error");
        }
    };

    // Use Effect

    useEffect(() => {
        getAllProductFunction();
        const unsubscribeOrders = getAllOrderFunction();
        const unsubscribeUsers = getAllUserFunction();

        return () => {
            unsubscribeOrders();
            unsubscribeUsers();
        };
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            dispatch,
            isAppLoading,
            setIsAppLoading,
            handleLogout,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            deleteOrder,
            getAllUser,
            toggleFavorite,
            favorites
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
