import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './EachProduct.module.scss';
import favoriteIcon from '../../assets/favorite.png';
import media from '../../utils/media';

const ProductBox = styled.div`
  height: 317px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.nowMobile`
    height: 264px;
    `};
`;

const AllProductImg = styled.img`
  width: 221px;
  height: 221px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  object-fit: cover;
  aspect-ratio: 1/1;
  transition: 0.3s cubic-bezier(0.15, 0, 0.2, 1);

  &:hover {
    transform: scale(1.04);
  }

  ${media.nowMobile`
    width: 168px;
    height: 168px;
    `};
`;

const ImgBox = styled.div`
  overflow: hidden;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const ProductInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default function EachProduct({ product }) {
  return (
    <ProductBox>
      <Link to={`/products/${product.id}`}>
        <ImgBox>
          <AllProductImg src={product.images} />
        </ImgBox>
      </Link>

      <ProductInfo>
        <Link to={`/products/${product.id}`}>
          <span className={styles.name}> {product.name} </span>
        </Link>

        <Link to={`/products/${product.id}`}>
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
