import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  getProductById,
  getProductCommentsById,
} from '../utils/getProductsApi';
import styled from 'styled-components';
import ProductInfo from '../components/ProductInfo';
import ProductCommentsList from '../components/ProductCommentsList';
import returnIc from '../assets/return.png';

const Button = styled.button`
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
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [productComments, setProductComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [nextCursor, setNextCursor] = useState(0);
  const [isLoadMoreOpen, setIsLoadMoreOpen] = useState(true);

  const navigate = useNavigate();
  const { productId } = useParams();

  const commentsLimit = 6;

  useEffect(() => {
    async function loadProductInfo() {
      try {
        setIsLoading(true);
        const [product, commentsData] = await Promise.all([
          getProductById(productId),
          getProductCommentsById(productId, commentsLimit, nextCursor),
        ]);
        setProduct(product);
        setProductComments((prev) => [...prev, ...commentsData.list]);

        if (!commentsData.nextCursor) {
          setIsLoadMoreOpen(false);
          return;
        }

        setNextCursor(commentsData?.nextCursor);
      } catch (e) {
        console.log(e + '에러');
      } finally {
        setIsLoading(false);
      }
    }
    loadProductInfo();
  }, [commentsPage]);

  return (
    <section>
      <ProductInfo product={product} />
      <ProductCommentsList
        productComments={productComments}
        setCommentsPage={setCommentsPage}
        isLoadMoreOpen={isLoadMoreOpen}
        isLoading={isLoading}
        nextCursor={nextCursor}
      />
      <Link to="/">
        <Button>
          목록으로 돌아가기
          <img src={returnIc} />
        </Button>
      </Link>
    </section>
  );
}
