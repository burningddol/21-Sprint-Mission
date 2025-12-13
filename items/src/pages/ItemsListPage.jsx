import { useState, useEffect } from "react";
import { getItemsList, getBestItemsList } from '../utils/getItemsApi';
import styled from "styled-components";
import AllItemsList from '../components/AllItemsList';
import BestItemsList from "../components/BestItemsList";

const Container = styled.div`
  width: 1200px;
  margin: 25px auto 0;

`






export default function ItemsPage(){
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);
  const [pageSize, setPageSize] = useState({best: 4, all: 10,});
  const [search, setSearch] = useState("");


  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getItemsList(page, pageSize.all, search, orderBy);
        setItems(data.list);
        setTotalPages(Math.ceil(data.totalCount / pageSize.all));
      } catch (err) {
        console.log(err);
      }
    }
    loadItems();
  }, [page, search, orderBy, pageSize.all]);

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
  }, []);

  return(

    <Container>
    <BestItemsList items={bestItems}/>
    <AllItemsList orderBy={orderBy} setOrderBy={setOrderBy}/>
    </Container>
  );
}