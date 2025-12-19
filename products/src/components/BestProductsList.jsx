import styled from 'styled-components';
import media from '../utils/media';
import BestProduct from './BestProduct';
import BestProductSkeleton from './BestProductSkeleton';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 40px;
  gap: 24px;
  ${media.nowTablet`
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    `};
`;

const TitleSpan = styled.span`
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
  display: block;
  margin-bottom: 20px;
`;
function BestProductsList({ products, pageSize, isLoadingBest }) {
  return (
    <>
      <TitleSpan>베스트 상품</TitleSpan>
      <ProductsGrid>
        {isLoadingBest
          ? Array.from({ length: pageSize.best }).map((_, index) => (
              <BestProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <BestProduct key={product.id} product={product} />
            ))}
      </ProductsGrid>
    </>
  );
}

export default BestProductsList;
