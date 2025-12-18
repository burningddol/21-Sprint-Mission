import styled from 'styled-components';
import AllProductsListNav from './AllProductsListNav';
import EachProduct from './EachProduct';
import media from '../utils/media';
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 24px;
  gap: 40px 24px;

  ${media.nowTablet`
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px 16px;
    `}

  ${media.nowMobile`
    grid-template-columns: 1fr 1fr;
    gap: 32px 8px;
    `}
`;

export default function AllProductsList({ products, search, setOrderBy }) {
  return (
    <>
      <AllProductsListNav search={search} setOrderBy={setOrderBy} />
      <ProductsGrid>
        {products.map((product) => (
          <EachProduct key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </>
  );
}
