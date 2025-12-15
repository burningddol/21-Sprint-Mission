import { useState, useEffect } from "react";
import { getItemsList, getBestItemsList } from '../utils/getItemsApi';
import styled from "styled-components";
import AllItemsList from '../components/AllItemsList';
import BestItemsList from "../components/BestItemsList";
import Pagination from "../components/Pagination";
import useSearchParam from "../hooks/useSearchParam";

const Container = styled.div`
  width: 1200px;
  margin: 25px auto 0;

  @media (max-width: 1200px) {
    width: 696px;
  };

  @media (max-width: 744px) {
    width: 344px;
  };

`



export default function ItemsPage(){
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [totalPages, setTotalPages] = useState(50);
  const [pageSize, setPageSize] = useState({best: 4, all: 10,});
  
  const {currentPage,
         setCurrentPage,
         search,
         setSearch} = useSearchParam();
  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setPageSize({ best: 1, all: 4 });
      } else if (width <= 1200) {
        setPageSize({ best: 2, all: 6 });
      } else {
        setPageSize({ best: 4, all: 10 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getItemsList(currentPage, pageSize.all, search, orderBy);
        setItems(data.list);
        setTotalPages(Math.ceil(data.totalCount / pageSize.all));
      } catch (err) {
        console.log(err);
      }
    }
  
    loadItems();
  }, [currentPage, search, orderBy, pageSize.all]);

  useEffect(() => {
    async function loadBestItems() {
      try {
        const data = await getBestItemsList(pageSize.best);
        setBestItems(data.list);
      } catch (err) {
        console.log(err);
      }
    }
    loadBestItems();
  }, [pageSize]);

  return(
    <>
      <Container>
        <BestItemsList items={bestItems}/>
        <AllItemsList items={items} search={search} setOrderBy={setOrderBy} setSearch={setSearch}/>
      </Container>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  );
}