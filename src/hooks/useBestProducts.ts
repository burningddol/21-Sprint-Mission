import { useState, useEffect } from 'react';
import { getBestProductsList } from '../api/productApi';
import { useToast } from '../components/common/Toast';
import useResponsivePageSize from './useResponsivePageSize';
import type { Product, PageSize } from '../types/product';

export default function useBestProducts() {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const pageSize = useResponsivePageSize();
  const { showToast } = useToast();

  const isLoading = bestProducts.length === 0;

  useEffect(() => {
    async function fetchBestProducts() {
      try {
        const data = await getBestProductsList(pageSize.best);
        setBestProducts(data.list);
      } catch (err) {
        console.error(err);
        showToast('베스트 상품을 불러오는 데 실패했습니다.');
      }
    }
    fetchBestProducts();
  }, [pageSize.best]);

  return { bestProducts, isLoading, pageSize };
}
