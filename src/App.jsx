import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BusinessSolutionsPage from './pages/BusinessSolutionsPage';
import NotFoundPage from './pages/NotFoundPage';

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'shop-by-category') {
      const scrollToCategory = () => {
        const target = document.getElementById('shop-by-category');

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          return true;
        }

        return false;
      };

      let attempts = 0;

      const tryScroll = () => {
        attempts += 1;

        if (!scrollToCategory() && attempts < 10) {
          requestAnimationFrame(tryScroll);
        }
      };

      requestAnimationFrame(tryScroll);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <RouteScrollManager />

        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/category/:slug"
              element={<CategoryPage />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />
            <Route
              path="/business-solutions"
              element={<BusinessSolutionsPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;