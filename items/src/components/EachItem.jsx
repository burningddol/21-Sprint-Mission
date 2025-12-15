import styled from "styled-components";
import styles from "./EachItem.module.scss";
import favoriteIcon from "../assets/favorite.png";


const ItemBox = styled.div`
  height: 317px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 744px) {
    height: 264px;
  };
`;

const AllItemImg = styled.img`
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

const ItemInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default function EachItem({item}) {

  return(
    <ItemBox>
          <AllItemImg src={item.images}/>
          <ItemInfo>
            <span className={styles.name}> {item.name} </span>
            <span className={styles.price}> {item.price}원 </span>
            <div className={styles.favoriteBox}>
              <img src={favoriteIcon}/>
              <span className={styles.favorite}> {item.favoriteCount} </span>
            </div>
          </ItemInfo>
        </ItemBox>

  );
}