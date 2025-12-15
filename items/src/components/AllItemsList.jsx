import styled from "styled-components";
import AllItemsListNav from "./AllItemsListNav";
import EachItem from "./EachItem";



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

export default function AllItemsList({items, search, setOrderBy, setSearch}) {


  return (
    <>
      <AllItemsListNav search={search} setOrderBy={setOrderBy} setSearch={setSearch}/>
      <ItemsGrid>
        {items.map((item)=>
          <EachItem key={item.id} item={item} />
        )}
      </ItemsGrid>
    </>
  );
}