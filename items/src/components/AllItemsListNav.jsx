import styled from "styled-components";
import styles from "./AllItemsListNav.module.scss";
import { Link } from "react-router-dom";
import searchIcon from "../assets/search.png";
import arrowIcon from "../assets/arrow.png";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const Right = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 11px;
`;

const SearchingInput = styled.input`
  width: 325px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background-color: var(--gray-100);
  padding-left: 45px;
  font-family: pretendard;
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-400);

`;

const Button = styled.button`
  width: 133px;
  height: 42px;
  background-color: var(--blue-100);
  color: var(--gray-100);
  border-radius: 8px;
  border: none;
  font-family: pretendard;
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-100);
`;

const SearchIcon = styled.img`
  position: absolute;
  left:15px;
  top: 22.5%;
`;

const ArrowIcon = styled.img`
   position: absolute;
   right: 15px;
   top: 22.5%;
   pointer-events: none;
`

export default function AllItemsListNav({orderBy, setOrderBy}) {


  return (
    <Container>
      <span>전체상품</span>
      <Right>
        <div className={styles.positionBox} >
          <SearchIcon src={searchIcon} />
          <SearchingInput placeholder="검색할 상품을 입력해주세요"/>
        </div>
        <Button>상품 등록하기</Button>
        <div className={styles.positionBox} >
          <ArrowIcon src={arrowIcon} />
          <select value={orderBy} onChange={(e)=> setOrderBy(e.target.value)}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </Right>
    </Container>

  );
} 