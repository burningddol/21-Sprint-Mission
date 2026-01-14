import styled from "styled-components";
import { RenderLoginModel } from "@/widgets/render-monster";
import { useState, useRef, useEffect } from "react";
import Button from "@/share/components/button";
import { Spinner } from "@/share/components/spinner";
import { useButtonAudio } from "@/features/audio/useAudio";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  apiId: string;
  name: string;
}

export default function LoginForm({ apiId, name }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasId, setHaId] = useState<boolean>(!!apiId);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const btnBgColor = isLoading ? "var(--slate-200)" : "var(--violet-600)";

  const ClickAudio = useButtonAudio();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return alert("조금 뒤 다시 시도하세요");

    if (!inputRef.current?.value) return alert("1글자 이상 입력해주세요");

    ClickAudio();
    const newName: string = inputRef.current.value;

    setIsLoading(true);
    const newApiId = Math.random().toString(36).slice(2, 10);
    localStorage.setItem("apiId", newApiId);
    localStorage.setItem("name", newName);

    const maxAge = 31536000; //1년

    document.cookie = `apiId=${encodeURIComponent(newApiId)}; path=/; max-age=${maxAge}`;
    document.cookie = `name=${encodeURIComponent(newName)}; path=/; max-age=${maxAge}`;

    try {
      await router.replace(`/list`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localApiId = localStorage.getItem("apiId");
    const localName = localStorage.getItem("name");

    if (!apiId && localApiId && localName) {
      setHaId(true);
      const maxAge = 31536000; //1년
      document.cookie = `apiId=${encodeURIComponent(localApiId)}; path=/; max-age=${maxAge}`;
      document.cookie = `name=${encodeURIComponent(localName)}; path=/; max-age=${maxAge}`;
    }

    if (apiId && (!localApiId || !localName)) {
      document.cookie = `apiId=${encodeURIComponent(apiId)}; path=/; max-age=0`;
      document.cookie = `name=${encodeURIComponent(name)}; path=/; max-age=0`;
    }
  }, []);

  return (
    <LoginBox>
      <CanvasWrapper>
        <RenderLoginModel />
        {!hasId && (
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
        )}

        {hasId && (
          <>
            <div style={{ height: "40px" }} />
            <Link href="/list" prefetch={true}>
              <Button
                type="button"
                bgColor={btnBgColor}
                color="var(--white)"
                alt="더하기모양그림"
                disabled={isLoading}
                size="big"
              >
                {name}님 어서오세요
              </Button>
            </Link>
          </>
        )}
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
