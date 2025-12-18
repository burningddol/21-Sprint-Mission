import styled from 'styled-components';
import styles from './ProductComments.module.scss';
import profilePlaceholder from '../assets/profile.png';
import getTimeAgo from '../utils/getTimeAgo';

const CommentBox = styled.div`
  width: 1200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--gray-300);
`;

const Comment = styled.span`
  font-family: 'pretendard';
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-800);
`;

const UserInfoBox = styled.div`
  height: 40px;
  display: flex;
  align-items: flex-start;
  gap: 0 8px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px 0;
  align-items: flex-start;
  font-family: 'pretendard';
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-400);
`;

const NickName = styled.span`
  font-family: 'pretendard';
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-600);
`;

function ProductComment({ productComment }) {
  const writer = productComment?.writer;

  const updatedDate = productComment?.updatedAt
    ? new Date(productComment.updatedAt)
    : null;
  const diffMs = updatedDate ? new Date() - updatedDate : 0;
  const diffHours = diffMs / (1000 * 60 * 60);

  return (
    <CommentBox>
      <Comment>{productComment?.content}</Comment>
      <UserInfoBox>
        {writer?.image ? (
          <img src={writer?.image} />
        ) : (
          <img src={profilePlaceholder} />
        )}
        <FlexBox>
          <NickName>{writer?.nickname}</NickName>
          {getTimeAgo(diffHours)}
        </FlexBox>
      </UserInfoBox>
    </CommentBox>
  );
}

const Container = styled.div`
  width: 1200px;
  height: 569px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  width: 1200px;
  height: 197px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;
`;

const CommentsBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
`;
export default function ProductComments({ productComments }) {
  const placeHolder =
    '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.';

  return (
    <Container>
      <StyledForm>
        <span className={styles.title}>문의하기</span>
        <textarea className={styles.commentArea} placeholder={placeHolder} />
        <div className={styles.btnBox}>
          <button className={styles.submitBtn} type="submit">
            등록
          </button>
        </div>
      </StyledForm>

      <CommentsBox>
        {productComments.map((productComment, index) => (
          <ProductComment productComment={productComment} key={index} />
        ))}
      </CommentsBox>
    </Container>
  );
}
