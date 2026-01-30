export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

export interface ProductListResponse {
  list: Product[];
  totalCount: number;
}

export interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface ProductComment {
  id: number;
  content: string;
  writer: CommentWriter;
  updatedAt: string;
  createdAt: string;
}

export interface ProductCommentListResponse {
  list: ProductComment[];
  nextCursor: number | null;
}

export interface PageSize {
  best: number;
  all: number;
}

export interface ProductFormData {
  name: string;
  content: string;
  price: number;
  tags: string[];
}

export type ToastType = 'error' | 'success';
