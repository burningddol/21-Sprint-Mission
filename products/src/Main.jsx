import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import ProductsListPage from './pages/ProductsListPage';
import NotFoundPage from './pages/NotFoundPage';
import AddProductPage from './pages/AddProductPage';
import ProductPage from './pages/ProductPage';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProductsListPage />} />
          <Route path=":productId" element={<ProductPage />} />
          <Route path="addproduct" element={<AddProductPage />} />
          <Route path="/boards" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
