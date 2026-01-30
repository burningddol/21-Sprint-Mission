import styled from 'styled-components';
import AllProductsList from '../components/productList/AllProductsList';
import BestProductsList from '../components/productList/BestProductsList';
import Pagination from '../components/productList/Pagination';
import useProducts from '../hooks/useProducts';
import useBestProducts from '../hooks/useBestProducts';
import media from '../utils/media';

const Container = styled.div`
  width: 1200px;
  margin: 25px auto 0;

  ${media.nowTablet`
    width: 696px;
  `}

  ${media.nowMobile`
    width: 344px;
  `}
`;

export default function ProductsListPage() {
  const {
    products,
    totalPages,
    currentPage,
    search,
    setSearch,
    pageSize,
    isLoading,
  } = useProducts();

  const { bestProducts, isLoading: isLoadingBest } = useBestProducts();

  return (
    <>
      <Container>
        <BestProductsList
          products={bestProducts}
          pageSize={pageSize}
          isLoadingBest={isLoadingBest}
        />
        <AllProductsList
          products={products}
          search={search}
          setSearch={setSearch}
          pageSize={pageSize}
          isLoading={isLoading}
        />
      </Container>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
