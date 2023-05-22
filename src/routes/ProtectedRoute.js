import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'


    const ProtectedRoute = ({
      
        redirectPath = '/login',
        children,
      }) => {
        if (!localStorage.getItem('Auth')) {
          return <Navigate to={redirectPath} replace />;
        }
      
        return children;
      }


export default ProtectedRoute