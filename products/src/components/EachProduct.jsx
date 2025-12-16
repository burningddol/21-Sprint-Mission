import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./EachProduct.module.scss";
import favoriteIcon from "../assets/favorite.png";


const ProductBox = styled.div`
  height: 317px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 744px) {
    height: 264px;
  };
`;

const AllProductImg = styled.img`
  width: 221px;
  height: 221px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 744px) {
    width: 168px;
    height: 168px;
  };

`;

const ProductInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default function EachProduct({product}) {

  return(
    <ProductBox>

      <Link to={`/${product.id}`}>
        <AllProductImg src={product.images}/>
      </Link>

      <ProductInfo>
        <Link to={`/${product.id}`}>
          <span className={styles.name}> {product.name} </span>
        </Link>

        <Link to={`/${product.id}`}>
          <span className={styles.price}> {product.price}원 </span>
        </Link>
        
        <div className={styles.favoriteBox}>
          <img src={favoriteIcon}/>
          <span className={styles.favorite}> {product.favoriteCount} </span>
        </div>
      </ProductInfo>
    </ProductBox>

  );
}