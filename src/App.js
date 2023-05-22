import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import QRPage from './pages/QRPage';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import CategoryPage from './pages/CategoryPage';
import ProductService from './pages/ProductService';
import UpdateCategoryPage from './pages/UpdateCategoryPage';
import UpdateServicePage from './pages/UpdateServicePage';
import BusinessDetailsUpdate from './pages/BusinessDetailsUpdate';
import BookingDetailsPage from './pages/BookingDetailsPage';
import CreateServicePage from './pages/CreateServicePage';
import ProtectedRoute from './routes/ProtectedRoute';
import ProtectedRouteServices from './routes/ProtectedRouteServices';
import ProtectedRouteProduct from './routes/ProtectedRouteProduct';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<DashboardPage/>}/>
        <Route exact path='/qr' element ={<QRPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/categories/:id' element={<ProtectedRoute redirectPath='/login'><CategoryPage/></ProtectedRoute>}/>
        <Route exact path='/products/:id' element={<ProtectedRoute redirectPath='/login'><ProductService/></ProtectedRoute>}/>
        <Route exact path='/categoryUpdate/:id' element={<ProtectedRoute redirectPath='/login'><UpdateCategoryPage/></ProtectedRoute>}/>
        <Route exact path='/serviceUpdate/:id' element={<ProtectedRouteServices redirectPath='/login'><UpdateServicePage/></ProtectedRouteServices>}/>
        <Route exact path='/productUpdate/:id' element={<ProtectedRouteProduct redirectPath='/login'><UpdateServicePage/></ProtectedRouteProduct>}/>
        <Route exact path='/newService' element={<ProtectedRouteServices redirectPath='/login'><CreateServicePage/></ProtectedRouteServices>}/>
        <Route exact path='/newProduct' element={<ProtectedRouteProduct redirectPath='/login'><CreateServicePage/></ProtectedRouteProduct>}/>
        <Route exact path='/businessDetailsUpdate/:id' element={<ProtectedRoute redirectPath='/login'><BusinessDetailsUpdate/></ProtectedRoute>}/>
        <Route exact path='/bookingDetails/:id' element={<ProtectedRoute redirectPath='/login'><BookingDetailsPage/></ProtectedRoute>}/> 
      </Routes>

    </Router>
      
   
  );
}

export default App;
