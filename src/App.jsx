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
import AboutUsPage from './pages/AboutUsPage';
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

function DeliveryAnnouncement() {
  return (
    <div
      className="delivery-announcement"
      role="region"
      aria-label="Delivery information"
    >
      <div
        className="delivery-announcement__track"
        aria-hidden="true"
      >
        <span className="delivery-announcement__message">
          LOCAL DELIVERY ONLY — ISLAMABAD &amp; RAWALPINDI
        </span>

        <span className="delivery-announcement__message delivery-announcement__message--second">
          DELIVERY CHARGES CONFIRMED BEFORE DISPATCH
        </span>
      </div>

      <p className="delivery-announcement__accessible">
        Local delivery only in Islamabad and Rawalpindi.
        Delivery charges are confirmed before dispatch.
      </p>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <RouteScrollManager />

      <Header />

      {isHomePage && <DeliveryAnnouncement />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/about-us"
            element={<AboutUsPage />}
          />

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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;