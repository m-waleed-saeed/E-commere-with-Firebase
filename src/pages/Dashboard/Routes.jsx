import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllProductDetails from './Products/AllProductDetails';
import OrderDetail from './Orders/OrderDetail';
import UserDetail from './Users/UserDetail';
import AddProductPage from './Products/AddProductPage';
import UpdateProductPage from './Products/UpdateProductPage';
import NewsLetterList from './NewsLatter/NewsLetterList'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/all-product-details" element={<AllProductDetails />} />
      <Route path="/orders" element={<OrderDetail />} />
      <Route path="/users" element={<UserDetail />} />
      <Route path="/newsletter-list" element={<NewsLetterList />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/update-product/:id" element={<UpdateProductPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
