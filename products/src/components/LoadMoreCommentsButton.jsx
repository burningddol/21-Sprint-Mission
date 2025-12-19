import styled, { keyframes } from 'styled-components';
import arrowIc from '../assets/big_arrow_down.png';

const OnLoadingButton = styled.button`
  display: flex;
  justify-content: center;
  gap: 0 10px;
  align-items: center;
  width: 100%;
  height: 65px;
  margin-top: 15px;
  padding: 1px 0 0 0;
  border: none;
  border-radius: 13px;
  background-color: var(--gray-100);
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-800);
  position: relative;

  &:disabled {
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  to {
    transform:  rotate(360deg);
  }
`;

const Spinner = styled.span`
  position: absolute;
  top: 31%;
  left: 54%;
  width: 23px;
  height: 23px;
  border: 2px solid var(--blue-100);
  border-top-color: var(--gray-100);
  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;
`;

const LoadMoreButton = styled.button`
  display: flex;
  justify-content: space-between;

  align-items: center;
  width: 100%;
  height: 65px;
  margin-top: 15px;
  padding: 1px 0 0 0;
  border: none;
  border-radius: 13px;
  background-color: var(--gray-100);
  font-family: 'pretendard';
  font-size: 18px;
  font-weight: 400;
  color: var(--gray-800);

  &:hover {
    border: 1px solid var(--gray-400);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const floatUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0);
  }
`;
const ArrowImg = styled.img`
  padding: 0 150px 8px 150px;
  animation: ${floatUpDown} 1s ease-in-out infinite;
`;

export default function LoadMoreCommentsButton({ isLoading, setCommentsPage }) {
  if (!isLoading)
    return (
      <LoadMoreButton
        disabled={isLoading}
        onClick={() => setCommentsPage((pre) => pre + 1)}
      >
        <ArrowImg src={arrowIc} />
        질문이 ?개(api response에 총 질문갯수 만들어주세요) 더 남아 있습니다.
        <ArrowImg src={arrowIc} />
      </LoadMoreButton>
    );

  if (isLoading)
    return (
      <OnLoadingButton disabled={isLoading}>
        로딩중...
        <Spinner />
      </OnLoadingButton>
    );
}
