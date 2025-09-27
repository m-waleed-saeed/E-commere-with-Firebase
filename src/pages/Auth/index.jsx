import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const Auth = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<h1>Page not Found</h1>} />
      </Routes>
    </>
  )
}

export default Auth