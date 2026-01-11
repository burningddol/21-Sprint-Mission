import styled from "styled-components";

import plusWhite from "@/assets/images/plus-white.svg";
import Button from "@/share/components/button";
import { useRef, useState } from "react";
import { addItem } from "@/share/axios";
import { useSeparatedItems } from "@/share/zustand";
import { Spinner } from "@/share/components/spinner";
import { useButtonAudio } from "@/features/audio/useAudio";

export default function AddForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToDoItem } = useSeparatedItems();
  const ClickAudio = useButtonAudio();
  const btnBgColor = isLoading ? "var(--slate-200)" : "var(--violet-600)";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return alert("조금 뒤 다시 시도하세요");

    if (!inputRef.current?.value) return alert("1글자 이상 입력해주세요");
    ClickAudio();
    const title: string = inputRef.current.value;
    setIsLoading(true);
    try {
      const data = await addItem(title);
      const newItem = { id: data.id, name: title, isCompleted: false };
      addToDoItem(newItem);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      inputRef.current.value = "";
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <AddInput
        name="title"
        placeholder="할 일을 입력해주세요"
        ref={inputRef}
      />
      <Button
        icon={!isLoading}
        src={plusWhite}
        type="submit"
        bgColor={btnBgColor}
        color="var(--white)"
        alt="더하기모양그림"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "추가하기"}
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

  &:focus {
    outline: none;
  }
`;
