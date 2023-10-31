import React from 'react';
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
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VreifyPage';
import RequestNewPasswordPage from './pages/RequestNewPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HelpPage from './pages/HelpPage';
import CreateProductPage from './pages/CreateProductPage';
import ProductUpdatePage from './pages/ProductUpdatePage';
import ReportPage from './pages/ReportPage';
import { Provider } from 'react-redux';
import {store} from './app/store'
import SchedulePage from './pages/SchedulePage';
import ExcelUploadPage from './pages/ExcelUploadPage';
function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path='/' element={<DashboardPage/>}/>
        <Route exact path='/qr' element ={<QRPage/>}/>
        <Route exact path='/help' element ={<HelpPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/signUp' element={<SignUpPage/>}/>
        <Route exact path='/forgotPassword' element={<RequestNewPasswordPage/>}/>
        <Route exact path='/users/:id/verify/:token' element={<VerifyPage/>}/>
        <Route exact path='/users/:id/password/:token' element={<ChangePasswordPage/>}/>
        <Route exact path='/categories/:id' element={<ProtectedRoute redirectPath='/login'><CategoryPage/></ProtectedRoute>}/>
        <Route exact path='/products/:id' element={<ProtectedRoute redirectPath='/login'><ProductService/></ProtectedRoute>}/>
        <Route exact path='/categoryUpdate/:id' element={<ProtectedRoute redirectPath='/login'><UpdateCategoryPage/></ProtectedRoute>}/>
        <Route exact path='/serviceUpdate/:id' element={<ProtectedRouteServices redirectPath='/login'><UpdateServicePage/></ProtectedRouteServices>}/>
        <Route exact path="/schedule" element={<SchedulePage/>}/>
        <Route exact path='/productUpdate/:id' element={<ProtectedRouteProduct redirectPath='/login'><ProductUpdatePage/></ProtectedRouteProduct>}/>
        <Route exact path='/newService' element={<ProtectedRouteServices redirectPath='/login'><CreateServicePage/></ProtectedRouteServices>}/>
        <Route exact path='/newProduct' element={<ProtectedRouteProduct redirectPath='/login'><CreateProductPage/></ProtectedRouteProduct>}/>
        <Route exact path='/businessDetailsUpdate/:id' element={<ProtectedRoute redirectPath='/login'><BusinessDetailsUpdate/></ProtectedRoute>}/>
        <Route exact path='/report' element={<ProtectedRoute redirectPath='/login'><ReportPage/></ProtectedRoute>}/>
        <Route exact path='/bookingDetails/:id' element={<ProtectedRoute redirectPath='/login'><BookingDetailsPage/></ProtectedRoute>}/> 
        <Route exact path='/excelUpload' element={<ProtectedRoute redirectPath='/login'><ExcelUploadPage/></ProtectedRoute>}></Route>
      </Routes>

    </Router>
      </Provider>
   
  );
}

export default App;
