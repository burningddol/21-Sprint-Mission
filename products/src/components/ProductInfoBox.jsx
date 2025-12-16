import styled from "styled-components";
import styles from "./ProductInfoBox.module.scss";
import userIcon from "../assets/user_icon.png";

const Container = styled.div`
  width: 1200px;
  height: 536px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 24px;
`;

const ProductImg = styled.img`
  width: 486px;
  height: 486px;
  border: 0.5px solid var(--gray-50);
  border-radius: 16px;
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 496px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px 0;
`;

const NamePriceBox = styled.div`
  width: 100%;
  height: 112px;
  padding: 0 0 16px 0;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  margin-bottom: 24px;
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
  font-family: "pretendard";
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
export default function ProductInfoBox({product}) {

  if (!product) return null;

  const date = new Date(product.createdAt);
  const formattedDate = date.toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

  return(

<Container>
      <ProductImg src={product.images[0]}/>
      <ContentsBox>
        <div>
          <NamePriceBox>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.price}>{product.price.toLocaleString()}원</span>
          </NamePriceBox>

          <DescriptionBox className={styles.description}>
            <span className={styles.intro}>상품 소개</span>
            {product.description}
          </DescriptionBox>

          <span className={styles.intro}>상품 태그</span>
          <TagBox>
            {product.tags.map((tag, index)=>
              <TagButton key={index}> #{tag} </TagButton>
            )}
          </TagBox>
        </div>

        <UserBox>
          <div className={styles.flex}>
            <img src={userIcon}/>
            <div className={styles.userInfoBox}>
              <span> {product.ownerNickname} </span>
              <span className={styles.date}> {formattedDate} </span>
            </div>
          </div>

        </UserBox>

      </ContentsBox>
    </Container>

  );
}