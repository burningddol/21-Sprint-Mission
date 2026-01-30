import axios from './axiosInstance';
import type {
  Product,
  ProductListResponse,
  ProductCommentListResponse,
} from '../types/product';

export async function getProductsList(
  currentPage = 1,
  pageSize = 10,
  keyword = '',
  orderBy = 'recent'
): Promise<ProductListResponse> {
  const { data } = await axios.get<ProductListResponse>('/products', {
    params: { page: currentPage, pageSize, keyword, orderBy },
  });
  return data;
}

export async function getBestProductsList(
  pageSize = 4
): Promise<ProductListResponse> {
  const { data } = await axios.get<ProductListResponse>('/products', {
    params: { page: 1, pageSize, keyword: '', orderBy: 'favorite' },
  });
  return data;
}

export async function getProductById(id: number | string): Promise<Product> {
  const { data } = await axios.get<Product>(`/products/${id}`);
  return data;
}

export async function getProductCommentsById(
  id: number | string,
  limit: number,
  cursor = 0
): Promise<ProductCommentListResponse> {
  const { data } = await axios.get<ProductCommentListResponse>(
    `/products/${id}/comments`,
    { params: { limit, cursor } }
  );
  return data;
}
