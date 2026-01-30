import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import ProductInfo from '../components/product/ProductInfo';
import ProductCommentList from '../components/product/ProductCommentList';
import useProduct from '../hooks/useProduct';
import useProductComments from '../hooks/useProductComments';
import goBackIcon from '../assets/goBack.png';

const GoBackButton = styled.button`
  display: flex;
  justify-content: center;
  gap: 0 10px;
  align-items: center;
  width: 240px;
  height: 48px;
  margin: 0 auto 40px;
  padding: 1px 0 0 0;
  border: none;
  border-radius: 40px;
  background-color: var(--blue-100);
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-100);
`;

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product } = useProduct(productId!);
  const { comments, hasMore, isLoading, loadComments } = useProductComments(
    productId!
  );

  // 초기 댓글 로딩
  useEffect(() => {
    loadComments();
  }, [productId]);

  if (!product) return null;

  return (
    <section>
      <ProductInfo product={product} />
      <ProductCommentList
        productComments={comments}
        onLoadMore={loadComments}
        hasMoreComments={hasMore}
        isLoading={isLoading}
      />
      <Link to="/products">
        <GoBackButton>
          목록으로 돌아가기
          <img src={goBackIcon} alt="돌아가기" />
        </GoBackButton>
      </Link>
    </section>
  );
}
