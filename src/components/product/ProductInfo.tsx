import styled from 'styled-components';
import styles from './ProductInfo.module.scss';
import userIcon from '../../assets/user_icon.png';
import KebabMenu from './KebabMenu';
import FavoriteButton from './FavoriteButton';
import media from '../../utils/media';
import type { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

const Container = styled.div`
  width: 1200px;
  height: 536px;
  margin: 20px auto 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0 24px;
  border-bottom: 1px solid var(--gray-200);

  ${media.nowTablet`
    width: 696px;
    height: 516px;
  `};
  ${media.nowMobile`
    width: 344px;
    height: 851px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

  `};
`;

const ProductImg = styled.img`
  width: 486px;
  height: 486px;
  border: 0.5px solid var(--gray-50);
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 1/1;
  transition: 0.3s cubic-bezier(0.15, 0, 0.2, 1);

  ${media.nowTablet`
    width: 340px;
    height: 340px;
  `};

  ${media.nowMobile`
    width: 343px;
    height: 343px;
  `};

  &:hover {
    transform: scale(1.04);
  }
`;

const ImgBox = styled.div`
  overflow: hidden;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const ContentsBox = styled.div`
  position: relative;
  width: 690px;
  height: 496px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px 0;

  ${media.nowTablet`
    width: 340px;
    height: 484px;
  `};
  ${media.nowMobile`
    width: 344px;
    height: 468px;
    margin-top:20px;
  `};
`;

const NamePriceBox = styled.div`
  width: 100%;
  height: 112px;
  padding: 0 0 16px 0;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.nowTablet`
    height: 95px;
  `};

  ${media.nowMobile`
    height: 80px;
  `};
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  margin-bottom: 29px;
`;

const TagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0 8px;
  margin-top: 16px;
`;

const TagButton = styled.button`
  height: 36px;
  border: none;
  border-radius: 26px;
  padding: 9px 17px 11px 17px;
  background-color: var(--gray-100);
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-800);
`;

const UserBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function ProductInfo({ product }: ProductInfoProps) {
  const date = new Date(product.createdAt);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <Container>
      <ImgBox>
        <ProductImg src={product.images[0]} />
      </ImgBox>
      <ContentsBox>
        <KebabMenu />
        <div>
          <NamePriceBox>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.price}>
              {product.price.toLocaleString()}원
            </span>
          </NamePriceBox>

          <DescriptionBox className={styles.description}>
            <span className={styles.intro}>상품 소개</span>
            {product.description}
          </DescriptionBox>

          <span className={styles.intro}>상품 태그</span>
          <TagBox>
            {product.tags.map((tag, index) => (
              <TagButton key={index}> #{tag} </TagButton>
            ))}
          </TagBox>
        </div>

        <UserBox>
          <div className={styles.flex}>
            <img src={userIcon} />
            <div className={styles.userInfoBox}>
              <span> {product.ownerNickname} </span>
              <span className={styles.date}> {formattedDate} </span>
            </div>
          </div>

          <div className={styles.favoriteBox}>
            <FavoriteButton count={product.favoriteCount} />
          </div>
        </UserBox>
      </ContentsBox>
    </Container>
  );
}
