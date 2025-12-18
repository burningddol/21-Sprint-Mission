import { useState, useEffect } from 'react';
import { getProductsList, getBestProductsList } from '../utils/getProductsApi';
import styled from 'styled-components';
import AllProductsList from '../components/AllProductsList';
import BestProductsList from '../components/BestProductsList';
import Pagination from '../components/Pagination';
import useSearchParam from '../hooks/useSearchParam';
import usePaginationParam from '../hooks/usePaginationParam';
import useSortParam from '../hooks/useSortParam';
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const { orderBy } = useSortParam();
  const [totalPages, setTotalPages] = useState(50);
  const [pageSize, setPageSize] = useState({ best: 4, all: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBest, setIsLoadingBest] = useState(false);

  const { currentPage } = usePaginationParam();
  const { search, setSearch } = useSearchParam();

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
        setIsLoading(true);
        const data = await getProductsList(
          currentPage,
          pageSize.all,
          search,
          orderBy
        );

        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / pageSize.all));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [currentPage, search, orderBy, pageSize.all]);

  useEffect(() => {
    async function loadBestProducts() {
      try {
        setIsLoadingBest(true);
        const data = await getBestProductsList(pageSize.best);
        setBestProducts(data.list);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingBest(false);
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
