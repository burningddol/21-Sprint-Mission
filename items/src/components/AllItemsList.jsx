import styled from "styled-components";
import AllItemsListNav from "./AllItemsListNav";



const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;

`;

export default function AllItemsList({orderBy, setOrderBy}) {


  return (
    <>
      <AllItemsListNav orderBy={orderBy} setOrderBy={setOrderBy}/>
      <ItemsGrid>
        
      </ItemsGrid>
    </>
  );
}