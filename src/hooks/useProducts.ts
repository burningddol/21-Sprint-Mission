import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getProductsList } from '../api/productApi';
import { useToast } from '../components/common/Toast';
import usePaginationParam from './usePaginationParam';
import useSortParam from './useSortParam';
import useResponsivePageSize from './useResponsivePageSize';
import useDebouncedValue from './useDebouncedValue';
import type { Product, PageSize } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  totalPages: number;
  currentPage: number;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  pageSize: PageSize;
  isLoading: boolean;
}

export default function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const { orderBy } = useSortParam();
  const { currentPage, setCurrentPage } = usePaginationParam();
  const pageSize = useResponsivePageSize();
  const debouncedSearch = useDebouncedValue(search, 600);
  const { showToast } = useToast();

  const isLoading = products.length === 0 && !search;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    async function fetchProducts() {
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
        console.error(err);
        showToast('상품 목록을 불러오는 데 실패했습니다.');
      }
    }
    fetchProducts();
  }, [currentPage, debouncedSearch, orderBy, pageSize.all]);

  return {
    products,
    totalPages,
    currentPage,
    search,
    setSearch,
    pageSize,
    isLoading,
  };
}
