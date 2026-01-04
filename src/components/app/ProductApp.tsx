import { Outlet } from 'react-router-dom';
import Nav from './Nav';

function ProductApp() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default ProductApp;
