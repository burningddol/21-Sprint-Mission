import styled from 'styled-components';
import styles from './ProductCommentsList.module.scss';
import ProductComment from './ProductComment';
import LoadMoreCommentsButton from './LoadMoreCommentsButton';
import EmptyCommentsImg from './EmptyCommentsImg';
import media from '../utils/media';
import { useRef, useEffect, useState } from 'react';

const Container = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  margin: 0 auto 64px;
  ${media.nowTablet`
    width: 696px;
  `}
  ${media.nowMobile`
    width: 344px;
  `}
`;

const StyledForm = styled.form`
  width: 100%;
  height: 197px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;
`;

const CommentsBox = styled.div`
  width: 100%;
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
  const textRef = useRef(null);
  const submitBtnRef = useRef(null);
  const placeHolder =
    '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.';

  //비제어 인풋으로 렌더링 최소화
  const handleInput = () => {
    if (textRef.current.value.length > 0) {
      submitBtnRef.current.classList.add(styles.active);
    } else {
      submitBtnRef.current.classList.remove(styles.active);
    }
  };

  return (
    <Container>
      <StyledForm>
        <span className={styles.title}>문의하기</span>
        <textarea
          className={styles.commentArea}
          placeholder={placeHolder}
          ref={textRef}
          onChange={handleInput}
        />
        <div className={styles.btnBox}>
          <button className={styles.submitBtn} type="submit" ref={submitBtnRef}>
            등록
          </button>
        </div>
      </StyledForm>

      {nextCursor ? (
        <CommentsBox>
          {productComments.map((productComment, index) => (
            <ProductComment productComment={productComment} key={index} />
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
