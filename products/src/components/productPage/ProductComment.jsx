import styled from 'styled-components';
import { useState } from 'react';
import profilePlaceholder from '../../assets/profile.png';
import getTimeAgo from '../../utils/getTimeAgo';
import KebabMenu from './KebabMenu';
import CommentEditCard from './CommentEditCard';
import { memo } from 'react';

const CommentBox = styled.div`
  width: 100%;
  height: ${(props) => (props.$isEditOpen ? '170px' : '100px')};
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isEditOpen ? '15px 0' : '33px 0')};
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--gray-300);
  position: relative;
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

const ProductComment = memo(function ProductComment({ productComment }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const writer = productComment?.writer;

  const updatedDate = productComment?.updatedAt
    ? new Date(productComment.updatedAt)
    : null;
  const diffMs = updatedDate ? new Date() - updatedDate : 0;
  const diffHours = diffMs / (1000 * 60 * 60);

  return (
    <CommentBox $isEditOpen={isEditOpen}>
      <KebabMenu setIsEditOpen={setIsEditOpen} />

      {!isEditOpen ? (
        <Comment>{productComment?.content}</Comment>
      ) : (
        <CommentEditCard
          existingComment={productComment?.content}
          setIsEditOpen={setIsEditOpen}
        />
      )}

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
});

export default ProductComment;
