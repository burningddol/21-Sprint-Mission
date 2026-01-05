import { useState, useEffect, useCallback } from 'react';
import { getProductsList, getBestProductsList } from '../utils/getProductsApi';
import styled from 'styled-components';
import AllProductsList from '../components/productsListPage/AllProductsList';
import BestProductsList from '../components/productsListPage/BestProductsList';
import Pagination from '../components/productsListPage/Pagination';
import usePaginationParam from '../hooks/usePaginationParam';
import useSortParam from '../hooks/useSortParam';
import media from '../utils/media';
import { useDebouncedEffect } from '../hooks/useDebouncedEffect';

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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const { orderBy } = useSortParam();
  const [totalPages, setTotalPages] = useState(50);
  const [pageSize, setPageSize] = useState({ best: 4, all: 10 });
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { currentPage, setCurrentPage } = usePaginationParam();

  const isLoading = products.length == 0 && !search;
  const isLoadingBest = bestProducts.length == 0;

  // 검색 입력 시 데이터 로드 디바운스
  useDebouncedEffect(
    useCallback((value) => setDebouncedSearch(value), []), //아규먼트로 전달되는 함수 참조값이 계속 변경되어 메모처리
    search,
    600
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]); //1page가 아닌 다른페이지에서 검색 시 검색결과 노출 안되는 경향 해결책

  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width : 743px)');
    const tabletMedia = window.matchMedia('(max-width : 1200px)');

    const mobileHandleChange = (e) => {
      if (e.matches) setPageSize({ best: 1, all: 4 });
    };

    const tabletHandleChange = (e) => {
      if (e.matches) setPageSize({ best: 2, all: 6 });
      else setPageSize({ best: 4, all: 10 });
    };

    mobileMedia.addEventListener('change', mobileHandleChange);
    tabletMedia.addEventListener('change', tabletHandleChange);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProductsList(
          currentPage,
          pageSize.all,
          debouncedSearch,
          orderBy
        );

        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / pageSize.all));
      } catch (err) {
        console.log(err);
      }
    }

    loadProducts();
  }, [currentPage, debouncedSearch, orderBy, pageSize.all]);

  useEffect(() => {
    async function loadBestProducts() {
      try {
        const data = await getBestProductsList(pageSize.best);
        setBestProducts(data.list);
      } catch (err) {
        console.log(err);
      }
    }
    loadBestProducts();
  }, [pageSize.best]);

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
