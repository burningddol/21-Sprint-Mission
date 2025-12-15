import styled from "styled-components";
import styles from "./AllProductsListNav.module.scss";
import CustomSelect from "./CustomSelect";
import searchIcon from "../assets/search.png";
import { Link } from "react-router-dom";
import useSearchParam from "../hooks/useSearchParam";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: pretendard;
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);

  @media (max-width: 744px) {
   flex-direction: column; 
   gap: 8px 0;
   align-items: flex-start;
   justify-content: center;
   position: relative;
  };

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
  font-family: "pretendard";
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-500);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 1200px) {
  width: 242px;
  };

  @media (max-width: 744px) {
  width: 288px;
  };
`;

const Button = styled.button`
  width: 133px;
  height: 42px;
  color: var(--gray-100);
  border-radius: 8px;
  border: none;
  font-family: "pretendard";
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-100);
  background: linear-gradient(to right, #1e6fff, #3692ff);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 744px) {
  position: absolute;
  right: 0px;
  top: 0px;
  };
`;

const SearchButton = styled.button`
  position: absolute;
  left:6px;
  top: 22.5%;
  border: none;
  background-color: var(--gray-100);
`;



export default function AllProductsListNav({ search, setOrderBy, setSearch}) {
  const {setSearchParams} = useSearchParam();
  const sortOptions = [
    {
      name: "최신순",
      value: "recent"
    },

    {
      name: "좋아요순",
      value: "favorite"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSearchParams((pre)=> { return {...Object.fromEntries(pre), search, currentPage: 1 }; },{ replace: false });
    
  };

  return (
    <Container>
      <span>전체상품</span>
      <Right>
        <div className={styles.positionBox} >
          <form onSubmit={handleSubmit}>
            <SearchButton type="submit">
              <img src={searchIcon} />
            </SearchButton>
            <SearchingInput 
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"/>
          </form>
        </div>
        <Button as={Link} to="/addproduct">상품 등록하기</Button>
        <div className={styles.positionBox} >
          <CustomSelect sortOptions={sortOptions} setOrderBy={setOrderBy}/>
        </div>
      </Right>
    </Container>

  );
} 