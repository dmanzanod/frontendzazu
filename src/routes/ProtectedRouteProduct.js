import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRouteProduct = ({
      
    redirectPath = '/login',
    children,
  }) => {
    if (!localStorage.getItem('Auth')&&localStorage.getItem('type')!=='products') {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  }


export default ProtectedRouteProduct