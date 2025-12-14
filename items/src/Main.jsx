import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';
import ItemsListPage from './pages/ItemsListPage';
import NotFoundPage from './pages/NotFoundPage';
import AddItemPage from "./pages/AddItemPage";



function Main() {
  

  return (
     <BrowserRouter basename="/items">
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<ItemsListPage/>} />
          <Route path="/additem" element={<AddItemPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Main;
