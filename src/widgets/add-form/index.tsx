import styled from "styled-components";
import plus from "@/assets/images/plus.svg";
import Button from "@/share/global-style/components/button";

export default function AddForm() {
  return (
    <StyledForm>
      <AddInput placeholder="할 일을 입력해주세요" />
      <Button icon src={plus} bgColor="var(--slate-200)" alt="더하기모양그림">
        추가하기
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 100%;
  height: 56px;
  display: flex;
  gap: 0 16px;
  margin-top: 24px;

  color: var(--slate-900);
`;

const AddInput = styled.input`
  font-family: "NanumSquare";
  font-size: 16px;

  width: 100%;
  height: 52px;
  padding: 0 20px;
  display: flex;
  gap: 0 5px;
  justify-content: center;
  align-items: center;

  border: 2px solid var(--slate-900);
  border-radius: 24px;
  background-color: var(--slate-100);
  box-shadow:
    3px 3px 0 1px var(--slate-900),
    0px 4px 4px rgba(0, 0, 0, 0.25);
`;
