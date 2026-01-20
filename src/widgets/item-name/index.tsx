import { useSeparatedItems } from "@/share/zustand";
import styled from "styled-components";
import { toggleItem } from "@/share/axios";
import { useButtonAudio } from "@/features/audio/useAudio";
import check from "@/assets/images/check.svg";
import { useEffect, useRef, useState } from "react";

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

interface Props {
  item: Item;
}

export default function ItemName({ item }: Props) {
  const [itemName, setItemName] = useState<string>(item.name);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    toDoItems,
    doneItems,
    addToDoItem,
    addDoneItem,
    removeToDoItem,
    removeDoneItem,
  } = useSeparatedItems();

  const clickAudio = useButtonAudio();

  const toDo = item.isCompleted ? false : true;
  const isMax: boolean = item.isCompleted
    ? toDoItems.length > 11
    : doneItems.length > 11;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isMax)
      return alert(
        `${toDo ? "Done" : "To Do"}항목이 최대 개수에 도달했습니다.`,
      );

    clickAudio();
    toggleItem(item.id, item.isCompleted, item.tenantId);

    if (!item.isCompleted) {
      removeToDoItem(item.id);
      addDoneItem(item);
      item.isCompleted = !item.isCompleted;
    } else {
      removeDoneItem(item.id);
      addToDoItem(item);
      item.isCompleted = !item.isCompleted;
    }
  };

  useEffect(() => {
    if (!spanRef.current || !inputRef.current) return;

    inputRef.current.style.width = spanRef.current.offsetWidth + 4 + "px";
  }, [itemName]);

  return (
    <Title $toDo={toDo}>
      <CheckBox $toDo={toDo} onClick={handleClick}>
        <Check $toDo={toDo} />
      </CheckBox>
      <Wrapper>
        <HiddenSpan ref={spanRef}>{itemName || " "}</HiddenSpan>
        <StyledInput
          ref={inputRef}
          name="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </Wrapper>
    </Title>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const HiddenSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;

  font-family: "NanumSquare";
  font-size: 20px;
  font-weight: 700;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  text-decoration: underline;

  font-family: "NanumSquare";
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.div<StyledProps>`
  width: 100%;
  height: 64px;
  border: 2px solid var(--slate-900);
  border-radius: 24px;
  background-color: ${({ $toDo }) =>
    $toDo ? "var(--white)" : "var(--violet-100)"};
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;

  transition:
    box-shadow 0.25s ease,
    background-color 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ $toDo }) =>
      !$toDo ? "var(--white)" : "var(--violet-100)"};
  }
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
