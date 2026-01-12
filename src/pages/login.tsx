import styled from "styled-components";
import { RenderLoginModel } from "@/widgets/render-monster";
import { useState, useRef } from "react";
import Button from "@/share/components/button";
import { Spinner } from "@/share/components/spinner";
import { useButtonAudio } from "@/features/audio/useAudio";

import { useRouter } from "next/router";

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const btnBgColor = isLoading ? "var(--slate-200)" : "var(--violet-600)";

  const ClickAudio = useButtonAudio();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return alert("조금 뒤 다시 시도하세요");

    if (!inputRef.current?.value) return alert("1글자 이상 입력해주세요");

    ClickAudio();
    // const name: string = inputRef.current.value;
    setIsLoading(true);
    const apiId = Math.random().toString(36).slice(2, 10);
    localStorage.setItem("apiId", apiId);
    try {
      router.replace("/list");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      inputRef.current.value = "";
    }
  };

  return (
    <LoginBox>
      <CanvasWrapper>
        <RenderLoginModel />
        <form onSubmit={handleSubmit}>
          <AddInput
            name="title"
            placeholder="사용자 이름을 입력해주세요"
            ref={inputRef}
          />
          <Button
            type="submit"
            bgColor={btnBgColor}
            color="var(--white)"
            alt="더하기모양그림"
            disabled={isLoading}
            size="big"
          >
            {isLoading ? <Spinner /> : "로그인"}
          </Button>
        </form>
      </CanvasWrapper>
    </LoginBox>
  );
}

const LoginBox = styled.div`
  width: 420px;
  height: 298px;
  position: relative;

  margin: 250px auto;
  z-index: 9999999999;

  border: none;
  border-radius: 20px;
  background-color: var(--lime-300);

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CanvasWrapper = styled.div`
  width: 370px;
  height: 150px;
  margin-top: 10px;
`;

const AddInput = styled.input`
  font-family: "NanumSquare";
  font-size: 16px;

  margin-bottom: 10px;
  width: 100%;
  height: 52px;
  padding: 0 20px;
  display: flex;
  gap: 0 5px;
  justify-content: center;
  align-items: center;

  border: 2px solid var(--slate-900);
  border-radius: 24px;
  background-color: var(--violet-100);

  &:focus {
    outline: none;
  }
`;
