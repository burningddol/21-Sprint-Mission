import styled from "styled-components";
import AllProductsListNav from "./AllProductsListNav";
import EachProduct from "./EachProduct";



const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 24px;
  gap: 40px 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px 16px;
  };

  @media (max-width: 744px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px 8px;
  };

`;

export default function AllProductsList({products, search, setOrderBy, setSearch}) {


  return (
    <>
      <AllProductsListNav search={search} setOrderBy={setOrderBy} setSearch={setSearch}/>
      <ProductsGrid>
        {products.map((product)=>
          <EachProduct key={product.id} product={product} />
        )}
      </ProductsGrid>
    </>
  );
}