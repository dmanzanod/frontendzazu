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
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<DashboardPage/>}/>
        <Route exact path='/qr' element ={<QRPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/categories/:id' element={<CategoryPage/>}/>
        <Route exact path='/products/:id' element={<ProductService/>}/>
      </Routes>

    </Router>
      
   
  );
}

export default App;
