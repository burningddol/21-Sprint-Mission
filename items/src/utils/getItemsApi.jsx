import axios from "./axios";


export async function getItemsList(page=1, pageSize=10, keyword = "", orderBy = "recent" ) {
  const params = { page, pageSize, keyword, orderBy};
  const response = await axios.get("/products",{params});
  const data = response.data;

  return data;

} 

export async function getBestItemsList(pageSize=4) {
  const params = { page: 1, pageSize, keyword: "", orderBy: "favorite"};
  const response = await axios.get("/products",{params});
  const data = response.data;

  return data;
}
