import styled from 'styled-components';
import profilePlaceholder from '../assets/profile.png';
import getTimeAgo from '../utils/getTimeAgo';
import KebabMenu from './KebabMenu';
import arrowIc from '../assets/big_arrow_down.png';

const CommentBox = styled.div`
  width: 1200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

export default function ProductComment({ productComment }) {
  const writer = productComment?.writer;

  const updatedDate = productComment?.updatedAt
    ? new Date(productComment.updatedAt)
    : null;
  const diffMs = updatedDate ? new Date() - updatedDate : 0;
  const diffHours = diffMs / (1000 * 60 * 60);

  return (
    <CommentBox>
      <KebabMenu />
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
