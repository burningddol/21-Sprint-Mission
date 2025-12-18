import styled from 'styled-components';
import Skeleton from '../utils/Skeleton';
import media from '../utils/media';

const ProductBox = styled.div`
  height: 317px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.nowMobile`
    height: 264px;
  `};
`;

const ProductImgSkeleton = styled.div`
  width: 221px;
  height: 221px;
  border-radius: 16px;
  overflow: hidden;

  ${media.nowMobile`
    width: 168px;
    height: 168px;
  `};
`;

const ProductInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default function EachProductSkeleton() {
  return (
    <ProductBox>
      <ProductImgSkeleton>
        <Skeleton $w="100%" $h="100%" $r="16px" />
      </ProductImgSkeleton>

      <ProductInfo>
        <Skeleton $w="70%" $h="18px" />

        <Skeleton $w="40%" $h="16px" />

        <Skeleton $w="36px" $h="14px" />
      </ProductInfo>
    </ProductBox>
  );
}
