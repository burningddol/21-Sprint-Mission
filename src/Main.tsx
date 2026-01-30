import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import ProductLayout from './components/layout/ProductLayout';
import ProductsListPage from './pages/ProductsListPage';
import NotFoundPage from './pages/NotFoundPage';
import AddProductPage from './pages/AddProductPage';
import ProductPage from './pages/ProductPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { UserProvider } from './components/common/UserProvider';

export default function Main() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastProvider>
          <Routes>
            <Route path="/">
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="products" element={<ProductLayout />}>
                <Route index element={<ProductsListPage />} />
                <Route path=":productId" element={<ProductPage />} />
                <Route path="addproduct" element={<AddProductPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
