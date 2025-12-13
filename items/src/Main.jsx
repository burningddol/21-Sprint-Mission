import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';
import ItemsPage from './pages/ItemsPage';
import NotFoundPage from './pages/NotFoundPage';




function Main() {
  

  return (
     <BrowserRouter basename="/items">
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<ItemsPage/>} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Main;
