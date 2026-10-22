import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './App.css';
import './styles/cart-product-polish.css';
import './styles/desktop-layout-fix.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BusinessSolutionsPage from './pages/BusinessSolutionsPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

import {
  getProductById,
  getCategoryById,
  getCategoryBySlug
} from './data/products';

const SITE_NAME = 'VAULT KHAZANA';

const DEFAULT_DESCRIPTION =
  'Shop packaging and food-service supplies for homes, restaurants, cafes and businesses. Local delivery in Islamabad and Rawalpindi.';

function updateMetaTag(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function getPageMetadata(pathname) {
  if (pathname === '/') {
    return {
      title: `${SITE_NAME} | Packaging & Food-Service Supplies`,
      description: DEFAULT_DESCRIPTION,
      indexable: true
    };
  }

  const categoryMatch = pathname.match(/^\/category\/([^/]+)/);

  if (categoryMatch) {
    const category = getCategoryBySlug(
      decodeURIComponent(categoryMatch[1])
    );

    if (category) {
      return {
        title: `${category.name} | ${SITE_NAME}`,
        description:
          `${category.description}. Shop packaging and food-service ` +
          'supplies with local delivery in Islamabad and Rawalpindi.',
        indexable: true
      };
    }

    return {
      title: `Category Not Found | ${SITE_NAME}`,
      description: 'This product category could not be found.',
      indexable: false
    };
  }

  const productMatch = pathname.match(/^\/product\/([^/]+)/);

  if (productMatch) {
    const product = getProductById(
      decodeURIComponent(productMatch[1])
    );

    if (product) {
      const category = getCategoryById(product.categoryId);

      const productDescription =
        product.overview ||
        product.description ||
        `${product.name} available from VAULT KHAZANA.`;

      return {
        title: `${product.name} | ${SITE_NAME}`,
        description:
          `${productDescription} ` +
          'Local delivery in Islamabad and Rawalpindi.',
        indexable: true,
        categoryName: category?.name || ''
      };
    }

    return {
      title: `Product Not Found | ${SITE_NAME}`,
      description: 'This product could not be found.',
      indexable: false
    };
  }

  const pages = {
    '/about-us': {
      title: `About Us | ${SITE_NAME}`,
      description:
        'Learn about VAULT KHAZANA and our packaging and food-service supplies.',
      indexable: true
    },
    '/business-solutions': {
      title: `Custom Packaging & Branding | ${SITE_NAME}`,
      description:
        'Explore custom packaging, printed cups, branded bags, labels and printing support for your business.',
      indexable: true
    },
    '/shipping-policy': {
      title: `Shipping & Payment Policy | ${SITE_NAME}`,
      description:
        'Read VAULT KHAZANA delivery coverage, delivery charges and payment information.',
      indexable: true
    },
    '/privacy-policy': {
      title: `Privacy Policy | ${SITE_NAME}`,
      description:
        'Read how VAULT KHAZANA handles information submitted through its website.',
      indexable: true
    },
    '/terms-of-service': {
      title: `Terms of Service | ${SITE_NAME}`,
      description:
        'Review the terms for using the VAULT KHAZANA website and placing orders.',
      indexable: true
    },
    '/cart': {
      title: `Your Cart | ${SITE_NAME}`,
      description: 'Review your selected VAULT KHAZANA products.',
      indexable: false
    },
    '/checkout': {
      title: `Checkout | ${SITE_NAME}`,
      description: 'Submit your VAULT KHAZANA order details.',
      indexable: false
    }
  };

  return pages[pathname] || {
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The requested VAULT KHAZANA page could not be found.',
    indexable: false
  };
}

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(location.pathname);

    const description = String(metadata.description || DEFAULT_DESCRIPTION)
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    document.title = metadata.title;

    updateMetaTag('name', 'description', description);

    updateMetaTag(
      'name',
      'robots',
      metadata.indexable ? 'index, follow' : 'noindex, nofollow'
    );

    updateMetaTag('property', 'og:site_name', SITE_NAME);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:title', metadata.title);
    updateMetaTag('property', 'og:description', description);

    updateMetaTag('name', 'twitter:card', 'summary');
    updateMetaTag('name', 'twitter:title', metadata.title);
    updateMetaTag('name', 'twitter:description', description);
  }, [location.pathname]);

  return null;
}

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
      <RouteMetadata />
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
            path="/shipping-policy"
            element={<ShippingPolicyPage />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage />}
          />

          <Route
            path="/terms-of-service"
            element={<TermsOfServicePage />}
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