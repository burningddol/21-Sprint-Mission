import axios from './axios';

export async function getProductsList(
  currentPage = 1,
  pageSize = 10,
  keyword = '',
  orderBy = 'recent'
) {
  const params = { page: currentPage, pageSize, keyword, orderBy };
  const response = await axios.get('/products', { params });
  const data = response.data;

  return data;
}

export async function getBestProductsList(pageSize = 4) {
  const params = { page: 1, pageSize, keyword: '', orderBy: 'favorite' };
  const response = await axios.get('/products', { params });
  const data = response.data;

  return data;
}

export async function getProductById(id) {
  const response = await axios.get(`/products/${id}`);
  const product = response.data;

  return product;
}

export async function getProductCommentsById(id, limit) {
  const response = await axios.get(`/products/${id}/comments`, {
    params: { limit },
  });
  const data = response.data;

  return data;
}
