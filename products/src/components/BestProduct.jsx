import { Link } from 'react-router-dom';
import styles from './BestProduct.module.scss';
import styled from 'styled-components';
import favoriteIcon from '../assets/favorite.png';
import media from '../utils/media';

const ProductBox = styled.div`
  height: 378px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.nowTablet`
    height: 434px;
    `};
`;

const ProductInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${media.nowTablet`
    height: 81px;
    `};
`;

const BestProductImg = styled.img`
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

  ${media.nowTablet`
  width: 343px;
  height: 343px;
  `};
`;

export default function BestProduct({ product }) {
  return (
    <ProductBox>
      <Link to={`/${product.id}`}>
        <BestProductImg src={product.images} />
      </Link>

      <ProductInfo>
        <Link to={`/${product.id}`}>
          <span className={styles.name}> {product.name} </span>
        </Link>

        <Link to={`/${product.id}`}>
          <span className={styles.price}> {product.price}원 </span>
        </Link>

        <div className={styles.favoriteBox}>
          <img src={favoriteIcon} />
          <span className={styles.favorite}> {product.favoriteCount} </span>
        </div>
      </ProductInfo>
    </ProductBox>
  );
}
