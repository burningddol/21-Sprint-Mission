import styled from "styled-components";
import check from "@/assets/images/check.svg";
import { toggleItem } from "@/share/axios";
import { useSeparatedItems } from "@/share/zustand";

type ItemType = {
  id: number;
  name?: string;
  isCompleted: boolean;
};
interface Props {
  toDo: boolean;
  item: ItemType;
  clickAudio: () => void;
}

export default function Item({ toDo, item, clickAudio }: Props) {
  const { addToDoItem, addDoneItem, removeToDoItem, removeDoneItem } =
    useSeparatedItems();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    clickAudio();
    toggleItem(item.id, item.isCompleted);

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

  return (
    <ItemButton $toDo={toDo}>
      <CheckBox $toDo={toDo} onClick={handleClick}>
        <Check $toDo={toDo} />
      </CheckBox>

      {item.name}
    </ItemButton>
  );
}

type StyledProps = {
  $toDo: boolean;
};

const Check = styled.div<StyledProps>`
  position: absolute;
  top: -1px;
  left: -1.5px;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);

  background-image: url(${check.src});
  background-repeat: no-repeat;
  background-position: center;

  background-size: 20px 20px;

  transform: ${({ $toDo }) => ($toDo ? "scale(0)" : "scale(1)")};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const CheckBox = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 9.5px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
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

const ItemButton = styled.button<StyledProps>`
  font-family: "NanumSquare";
  font-size: 16px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 60px;
  width: 100%;
  height: 50px;
  border: 2px solid var(--slate-900);
  border-radius: 27px;
  background-color: ${({ $toDo }) =>
    $toDo ? "var(--white)" : "var(--violet-100)"};

  text-decoration: ${({ $toDo }) => ($toDo ? "none" : "line-through")};
  transition:
    box-shadow 0.25s ease,
    background-color 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ $toDo }) =>
      !$toDo ? "var(--white)" : "var(--violet-100)"};
  }
`;
