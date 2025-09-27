import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './Auth';
import { collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const NewsLetterContext = createContext();

const NewsletterProvider = ({ children }) => {

    const [subscribers, setSubscribers] = useState([])

    const { isAppLoading, setIsAppLoading } = useAuthContext()

    const fetchSubscribers = useCallback(async () => {
        try {
            setIsAppLoading(true)
            const q = query(collection(firestore, 'newsletter'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setSubscribers(data);
        } catch (error) {
            console.error('Error fetching newsletter subscribers:', error)
        } finally {
            setIsAppLoading(false)
        }
    }, [])

    const addSubscriber = useCallback(async (email) => {
        try {
            const docRef = await addDoc(collection(firestore, 'newsletter'), {
                email,
                createdAt: serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding subscriber:', error);
            throw error;
        }
    }, [fetchSubscribers]);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);
    return (
        <NewsLetterContext.Provider value={{ subscribers,fetchSubscribers, isAppLoading, addSubscriber }}>
            {children}
        </NewsLetterContext.Provider>
    )
}

export const useNewsLetter = () => useContext(NewsLetterContext)

export default NewsletterProvider;