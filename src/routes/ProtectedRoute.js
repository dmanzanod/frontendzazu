import React from 'react'
import { Navigate } from 'react-router-dom'



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