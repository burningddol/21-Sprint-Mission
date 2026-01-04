import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductApp from './components/app/ProductApp';
import ProductsListPage from './pages/ProductsListPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="products" element={<ProductApp />}>
            <Route index element={<ProductsListPage />} />
            <Route path=":productId" element={<ProductPage />} />
            <Route path="addproduct" element={<AddProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
