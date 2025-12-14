import styles from "./BestItemsList.module.scss";
import styled from "styled-components";
import favoriteIcon from "../assets/favorite.png";

const ItemBox = styled.div`
  height: 378px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1200px) {
    height: 434px;
  };
`;

const ItemInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  @media (max-width: 1200px) {
    height: 81px;
  };
`;

const BestItemImg = styled.img`
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 1200px) {
  width: 343px;
  height: 343px;
  };
`;

function BestItem({item}) {

  return (
    <ItemBox>
      <BestItemImg src={item.images}/>
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

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 40px;
  gap: 24px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  };
`;


export default function BestItemsList({items}) {

  return(
    <>
      <span className={styles.title}>베스트 상품</span>
      <ItemsGrid>
        { items.map((item)=>
          <BestItem key={item.id} item={item} />
        )}
      </ItemsGrid>
    </>
  );
};