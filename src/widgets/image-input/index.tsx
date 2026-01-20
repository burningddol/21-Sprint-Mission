import styled from "styled-components";
import edit from "@/assets/images/edit.svg";
import placeHolder from "@/assets/images/place-holder.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { useButtonAudio } from "@/features/audio/useAudio";
import { fileNameSchema } from "@/share/utils/validation";

interface Props {
  name: string;
  imageUrl: string | undefined;
}

export default function ImageInput({ name, imageUrl }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const clickAudio = useButtonAudio();

  const isShowEdit = !!previewURL || !!imageUrl;

  const handleClick = () => {
    if (!inputRef.current) return;
    clickAudio();
    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return setPreviewURL(null);

    const result = fileNameSchema.safeParse({ fileName: file.name });

    if (!result.success) {
      e.target.value = "";
      return alert(result.error.issues[0].message);
    }

    setPreviewURL((prev) => {
      if (prev) URL.revokeObjectURL(prev); // 이전 미리보기 정리
      return URL.createObjectURL(file); // 새 미리보기 생성
    });
  };

  return (
    <PositionBox onClick={handleClick}>
      <StyledImage
        src={previewURL ?? imageUrl ?? placeHolder}
        alt="미리보기"
        fill
        priority
      />
      <StyledInput
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      {isShowEdit && (
        <EditImage src={edit} alt="수정버튼" width={64} height={64} />
      )}
    </PositionBox>
  );
}

const StyledInput = styled.input`
  display: none;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 24px;
`;

const EditImage = styled(Image)`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const PositionBox = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;

  /* 기본 상태 */
  transform: translateY(0) scale(1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition:
    transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 260ms cubic-bezier(0.2, 0.8, 0.2, 1);

  /* 은은한 테두리 링 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
    transition: box-shadow 260ms ease;
    z-index: 2;
  }

  /* 광택 */
  &::after {
    content: "";
    position: absolute;
    inset: -40%;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 35%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0) 65%
    );
    transform: translateX(-30%) translateY(10%) rotate(0deg);
    opacity: 0;
    transition:
      opacity 260ms ease,
      transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
    z-index: 3;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.14);
    filter: saturate(1.02);

    &::before {
      box-shadow:
        inset 0 0 0 1px rgba(99, 102, 241, 0.35),
        0 0 0 6px rgba(99, 102, 241, 0.08);
    }

    &::after {
      opacity: 1;
      transform: translateX(35%) translateY(-10%);
    }

    img {
      transform: scale(1.04);
    }

    ${EditImage} {
      transform: translate(5%, 5%) scale(108%);
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  img {
    transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }
`;
