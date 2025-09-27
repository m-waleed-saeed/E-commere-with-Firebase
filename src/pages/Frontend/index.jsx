import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductInfo from './ProductInfo/index'
import Cart from './Cart/index'
import Shop from './Shop'
import User from './User'
import Category from './Category'
import PrivateRouteForUser from '../../components/PrivateRouteForUser'
import Favorites from './Favorite'
import PageNotFound from '../../components/PageNotFound'


const Frontend = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/user-dashboard' element={<PrivateRouteForUser Component={User} requiredRole="user" />} />
                    <Route path='/product-info/:id' element={<ProductInfo />} />
                    <Route path='/category/:categoryname' element={<Category />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default Frontend