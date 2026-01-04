import styled from 'styled-components';
import Skeleton from '../../utils/Skeleton';
import media from '../../utils/media';

const ProductBox = styled.div`
  height: 378px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.nowTablet`
    height: 434px;
  `};
`;

const ProductInfo = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${media.nowTablet`
    height: 81px;
  `};
`;

const ProductImgSkeleton = styled.div`
  width: 282px;
  height: 282px;
  border-radius: 16px;
  overflow: hidden;

  ${media.nowTablet`
    width: 343px;
    height: 343px;
  `};
`;

const FavoriteBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export default function BestProductSkeleton() {
  return (
    <ProductBox>
      <ProductImgSkeleton>
        <Skeleton $w="100%" $h="100%" $r="16px" />
      </ProductImgSkeleton>

      <ProductInfo>
        <Skeleton $w="70%" $h="18px" />

        <Skeleton $w="40%" $h="16px" />

        <FavoriteBox>
          <Skeleton $w="16px" $h="16px" $r="50%" />
          <Skeleton $w="24px" $h="14px" />
        </FavoriteBox>
      </ProductInfo>
    </ProductBox>
  );
}
