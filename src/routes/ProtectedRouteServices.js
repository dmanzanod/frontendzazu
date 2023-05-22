import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRouteServices = ({
      
    redirectPath = '/login',
    children,
  }) => {
    if (!localStorage.getItem('Auth')&&localStorage.getItem('type')!=='services') {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  }

export default ProtectedRouteServices