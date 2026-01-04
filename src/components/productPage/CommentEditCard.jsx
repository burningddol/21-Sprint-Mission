import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  height: 80px;
  position: relative;
`;

const EditArea = styled.textarea`
  border: none;
  width: 100%;
  border-radius: 12px;
  background-color: var(--gray-100);
  padding: 16px 24px;
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-600);
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 178px;
  height: 47px;
  position: absolute;
  right: 0;
  bottom: -50px;
`;

const SubmitButton = styled.button`
  width: 106px;
  height: 42px;
  border: none;
  border-radius: 8px;
  background-color: var(--blue-100);
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-100);
`;

const CancelButton = styled.button`
  width: 68px;
  height: 42px;
  border: none;
  background-color: var(--white);
  font-family: 'pretendard';
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-500);
`;
export default function CommentEditCard({ setIsEditOpen, existingComment }) {
  function handleSubmit(e) {
    e.preventDefault();

    alert('오 수정권한이 없네요. ^ㅡ^');
    setIsEditOpen(false);
  }

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <EditArea defaultValue={existingComment} />
      <ButtonBox>
        <CancelButton onClick={() => setIsEditOpen(false)}>최소</CancelButton>
        <SubmitButton type="submit">수정 완료</SubmitButton>
      </ButtonBox>
    </StyledForm>
  );
}
