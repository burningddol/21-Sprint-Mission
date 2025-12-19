import styled from 'styled-components';
import styles from './ProductCommentsList.module.scss';
import ProductComment from './ProductComment';
import LoadMoreCommentsButton from './LoadMoreCommentsButton';
import EmptyCommentsImg from './EmptyCommentsImg';

const Container = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  margin: 0 auto 64px;
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
  gap: 26px 0;
`;

export default function ProductCommentsList({
  productComments,
  setCommentsPage,
  isLoadMoreOpen,
  isLoading,
  nextCursor,
}) {
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
      {nextCursor ? (
        <CommentsBox>
          {productComments.map((productComment) => (
            <ProductComment
              productComment={productComment}
              key={productComment.id}
            />
          ))}
        </CommentsBox>
      ) : (
        <EmptyCommentsImg />
      )}
      {isLoadMoreOpen && (
        <LoadMoreCommentsButton
          isLoading={isLoading}
          setCommentsPage={setCommentsPage}
        />
      )}
    </Container>
  );
}
