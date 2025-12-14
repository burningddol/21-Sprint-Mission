import styled from "styled-components";
import styles from "./AllItemsList.module.scss";
import AllItemsListNav from "./AllItemsListNav";
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

function AllItem({item}) {

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


const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 24px;
  gap: 40px 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px 16px;
  };

  @media (max-width: 744px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px 8px;
  };

`;

export default function AllItemsList({items, search, setOrderBy, setSearch, setSearchParams}) {


  return (
    <>
      <AllItemsListNav search={search} setOrderBy={setOrderBy} setSearch={setSearch} setSearchParams={setSearchParams}/>
      <ItemsGrid>
        {items.map((item)=>
          <AllItem key={item.id} item={item} />
        )}
      </ItemsGrid>
    </>
  );
}