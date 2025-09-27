import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '../contexts/Auth'
import PrivateRoute from '../components/PrivateRoute'

const index = () => {
    const { isAuth } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to={"/"} />} />
                <Route path="dashboard/*" element={<PrivateRoute Component={Dashboard} requiredRole="admin" />} />
            </Routes>
        </>
    )
}

export default index