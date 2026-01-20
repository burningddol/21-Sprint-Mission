import {
  getItemById,
  patchItem,
  removeItem,
  uploadImageAndGetUrl,
} from "@/share/axios";
import styled from "styled-components";
import check from "@/assets/images/check.svg";
import parseCookie from "@/share/utils/parseCookie";
import memoImage from "@/assets/images/memo.svg";
import checkBlack from "@/assets/images/check-black.svg";
import X from "@/assets/images/X.svg";
import { toggleItem } from "@/share/axios";
import { GetServerSidePropsContext } from "next";
import { useSeparatedItems } from "@/share/zustand";
import { useButtonAudio } from "@/features/audio/useAudio";
import ImageInput from "@/widgets/image-input";
import Button from "@/share/components/button";
import { useRouter } from "next/router";
import { Spinner } from "@/share/components/spinner";
import { useEffect, useRef, useState } from "react";
import ItemName from "@/widgets/item-name";

type Item = {
  isCompleted: boolean;
  imageUrl?: string;
  memo?: string;
  name: string;
  tenantId: string;
  id: number;
};

type StyledProps = {
  $toDo: boolean;
};

interface Body {
  memo: string;
  name: string;
  imageUrl?: string;
}

interface Props {
  item: Item;
}

export default function ItemPage({ item }: Props) {
  const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const router = useRouter();

  const clickAudio = useButtonAudio();

  const handleRemove = async () => {
    setIsRemoveLoading(true);
    clickAudio();
    try {
      await removeItem(item.tenantId, item.id);

      router.replace("/list");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const memo = String(formData.get("memo") ?? "").trim(); // <textarea name="memo" />
    const name = String(formData.get("name") ?? "").trim(); // <input  name="name" />
    const file = formData.get("imageFile"); // <input type="file" name="imageFile" />

    setIsSubmitLoading(true);
    clickAudio();
    try {
      let imageUrl: string | undefined;

      // 파일이 선택된 경우에만 url챙기기
      if (file instanceof File && file.size > 0) {
        imageUrl = await uploadImageAndGetUrl(item.tenantId, file);
      }

      const body: Body = { memo, name };
      if (imageUrl) body.imageUrl = imageUrl;

      await patchItem(item.tenantId, item.id, body);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ItemName item={item} />

      <FlexBox>
        <ImageInput name="imageFile" imageUrl={item?.imageUrl} />

        <TextAreaWrapper>
          <TextArea name="memo" defaultValue={item.memo} />
        </TextAreaWrapper>
      </FlexBox>

      <ButtonBox>
        <Button
          type="submit"
          icon={!isSubmitLoading}
          src={checkBlack}
          alt="체크모양"
          color="var(--black)"
          bgColor="var(--lime-300)"
          disabled={isSubmitLoading || isRemoveLoading}
        >
          {isSubmitLoading ? <Spinner /> : "수정 완료"}
        </Button>
        <Button
          icon={!isRemoveLoading}
          src={X}
          alt="엑스모양"
          color="var(--white)"
          bgColor="var(--rose-500)"
          onClick={handleRemove}
          disabled={isRemoveLoading || isSubmitLoading}
        >
          {isRemoveLoading ? <Spinner /> : "삭제하기"}
        </Button>
      </ButtonBox>
    </StyledForm>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id as string;
  const cookie = ctx.req.headers.cookie || "";
  const apiId = parseCookie("apiId", cookie);

  if (apiId && id) {
    const data = await getItemById(apiId, id);

    return {
      props: {
        item: data,
      },
    };
  }
}

const StyledForm = styled.form`
  width: 996px;
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 24px auto;
  gap: 24px 0;
  z-index: 1;
`;

const Check = styled.div<StyledProps>`
  position: relative;
  top: -1px;
  left: -1.5px;
  width: 32px;
  height: 32px;

  background-image: url(${check.src});
  background-repeat: no-repeat;
  background-position: center;

  background-size: 20px 20px;

  transform: ${({ $toDo }) => ($toDo ? "scale(0)" : "scale(1)")};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const CheckBox = styled.div<StyledProps>`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  cursor: pointer;
  border: 2px solid var(--slate-900);
  border-radius: 16px;
  background-color: ${({ $toDo }) =>
    $toDo ? "var(--yellow-50)" : "var(--violet-600)"};
  transition: background-color 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background-color: ${({ $toDo }) =>
      !$toDo ? "var(--yellow-50)" : "var(--violet-600)"};
    ${Check} {
      transform: ${({ $toDo }) => (!$toDo ? "scale(0)" : "scale(1)")};
    }
  }
`;

const FlexBox = styled.div`
  width: 100%;
  height: 311px;
  display: flex;
  gap: 0 24px;
`;

const TextAreaWrapper = styled.div`
  width: 588px;
  height: 100%;
  background-image: url(${memoImage.src});
  border-radius: 24px;
  border: none;

  padding: 60px 15px 20px 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  overflow-y: auto;

  font-family: "NanumSquare";
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    cursor: pointer;
    border: 2px solid transparent;
    background-clip: content-box;

    background-image: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.18),
      rgba(15, 23, 42, 0.32)
    );

    transition:
      background-image 200ms ease,
      transform 200ms ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.24),
      rgba(15, 23, 42, 0.42)
    );
  }

  &::-webkit-scrollbar-thumb:active {
    background-image: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.3),
      rgba(15, 23, 42, 0.55)
    );
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0 20px;
  position: absolute;
  bottom: -75px;
  right: 0;
`;
