import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/Auth'

const PrivateRoute = ({ Component, requiredRole }) => {
    const { isAuth, user, isAppLoading } = useAuthContext()

    if (isAppLoading) return <p>Loading...</p>

    if (!isAuth) return <Navigate to="/auth/login" />

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />
    }

    return <Component />
}

export default PrivateRoute
