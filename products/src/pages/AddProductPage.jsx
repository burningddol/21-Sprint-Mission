import { useState } from 'react';
import styled from 'styled-components';
import FileInput from '../components/addProductPage/FileInput';
import ContentsInput from '../components/addProductPage/ContentsInput';
import media from '../utils/media';

const StyledForm = styled.form`
  width: 1200px;
  margin: 0 auto;

  ${media.nowTablet`
    width: 696px;
    `}

  ${media.nowMobile`
    width: 346px;
    `};
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 700;
  margin: 24px 0 24px 0;
  color: var(--gray-800);
`;

const SubmitButton = styled.button`
  width: 74px;
  height: 42px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-100);
  border: none;
  border-radius: 8px;
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 6px 12px rgba(0, 0, 0, 0.15)' : 'none'};

  background: ${({ $isActive }) =>
    $isActive
      ? 'linear-gradient(to right, #1e6fff, #3692ff)'
      : 'var(--gray-400)'};

  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
`;

export default function AddProductPage() {
  const [product, setProduct] = useState({
    name: '',
    content: '',
    price: 0,
    tags: [],
  });

  const isActive =
    product.name && product.content && product.price && product.tags.length;

  const updateProduct = (patch) => {
    setProduct((prev) => ({
      ...prev,
      ...patch,
    }));
  };
  return (
    <StyledForm>
      <Nav>
        상품 등록하기
        <SubmitButton type="submit" $isActive={isActive}>
          {' '}
          등록{' '}
        </SubmitButton>
      </Nav>

      <FileInput />

      <ContentsInput product={product} updateProduct={updateProduct} />
    </StyledForm>
  );
}
