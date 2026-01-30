import { useState, useRef, useCallback } from 'react';
import { getProductCommentsById } from '../api/productApi';
import { useToast } from '../components/common/Toast';
import type { ProductComment } from '../types/product';

const COMMENTS_LIMIT = 6;

export default function useProductComments(productId: string) {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const cursorRef = useRef(0);
  const initialLoadRef = useRef(false);
  const { showToast } = useToast();

  const fetchComments = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = await getProductCommentsById(
        productId,
        COMMENTS_LIMIT,
        cursorRef.current
      );

      setComments((prev) =>
        initialLoadRef.current ? [...prev, ...data.list] : data.list
      );
      initialLoadRef.current = true;
      cursorRef.current = data.nextCursor ?? 0;

      if (!data.nextCursor) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      showToast('댓글을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [productId, isLoading]);

  return { comments, hasMore, isLoading, loadComments: fetchComments };
}
