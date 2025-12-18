import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  getProductById,
  getProductCommentsById,
} from '../utils/getProductsApi';
import ProductInfo from '../components/ProductInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductComments from '../components/ProductComments';

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [productComments, setProductComments] = useState([]);
  const [commentsLimit, setCommentLimit] = useState(5);

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    async function loadProductInfo() {
      try {
        setIsLoading(true);
        const [product, commentsData] = await Promise.all([
          getProductById(productId),
          getProductCommentsById(productId, commentsLimit),
        ]);
        setProduct(product);
        setProductComments(commentsData.list);
      } catch (e) {
        console.log(e + '에러');
        navigate('*');
      } finally {
        setIsLoading(false);
      }
    }
    loadProductInfo();
  }, []);

  if (isLoading) return <LoadingSpinner message="페이지를 찾는중 ㅋㅋ" />;

  return (
    <>
      <ProductInfo product={product} />
      <ProductComments productComments={productComments} />
    </>
  );
}
