import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Category from './pages/Category';
import AdminPanel from './pages/AdminPanel';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import Premium from './pages/Premium';
import Layout from './Layout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/premium' element={<Premium />} />
            <Route path='/category/:id' element={<Category />} />
            <Route path='/admin' element={<AdminPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>,
);
