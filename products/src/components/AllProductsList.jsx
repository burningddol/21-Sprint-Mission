import styled from 'styled-components';
import AllProductsListNav from './AllProductsListNav';
import EachProduct from './EachProduct';
import media from '../utils/media';
import EachProductSkeleton from './EachProductSkeleton';

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

export default function AllProductsList({
  products,
  search,
  setSearch,
  setOrderBy,
  isLoading,
  pageSize,
}) {
  return (
    <>
      <AllProductsListNav
        search={search}
        setSearch={setSearch}
        setOrderBy={setOrderBy}
      />
      <ProductsGrid>
        {isLoading
          ? Array.from({ length: pageSize.all }).map((_, index) => (
              <EachProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <EachProduct key={product.id} product={product} />
            ))}
      </ProductsGrid>
    </>
  );
}
