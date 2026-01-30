import { useState, useEffect } from 'react';
import { getProductById } from '../api/productApi';
import { useToast } from '../components/common/Toast';
import type { Product } from '../types/product';

export default function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error(err);
        showToast('상품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  return { product, isLoading };
}
