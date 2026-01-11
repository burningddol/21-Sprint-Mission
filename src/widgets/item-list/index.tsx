import Image from "next/image";
import todo from "@/assets/images/todo.svg";
import done from "@/assets/images/done.svg";
import styled from "styled-components";
import Item from "./ui/item";
import empty1 from "@/assets/images/empty1.svg";
import empty2 from "@/assets/images/empty2.svg";
import { useSeparatedItems } from "@/share/zustand";
import { useButtonAudio } from "@/features/audio/useAudio";

// @option
// toDO일때 true
// done일때 false
interface Props {
  option: boolean;
}

export default function ItemList({ option }: Props) {
  const { toDoItems, doneItems } = useSeparatedItems();
  const isEmpty: boolean = option
    ? toDoItems.length === 0
    : doneItems.length === 0;

  const isMax: boolean = !option
    ? toDoItems.length > 11
    : doneItems.length > 11;

  const clickAudio = useButtonAudio();

  return (
    <Section>
      {option ? (
        <Image src={todo} alt="ToDo 아이콘" />
      ) : (
        <Image src={done} alt="ToDo 아이콘" />
      )}

      <ListContainer>
        {option
          ? toDoItems.map((item) => (
              <Item
                key={item.id}
                toDo={option}
                item={item}
                clickAudio={clickAudio}
                isMax={isMax}
              />
            ))
          : doneItems.map((item) => (
              <Item
                key={item.id}
                toDo={option}
                item={item}
                clickAudio={clickAudio}
                isMax={isMax}
              />
            ))}
        {isEmpty && (
          <>
            <StyledImage src={option ? empty1 : empty2} alt="몬스터그림" />
            <StyledSpan>
              {option ? (
                <>
                  할 일이 없어요. <br /> TODO를 새롭게 추가해주세요!
                </>
              ) : (
                <>
                  아직 다 한 일이 없어요 <br /> 해야 할 일을 체크해보세요!
                </>
              )}
            </StyledSpan>
          </>
        )}
      </ListContainer>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  padding: 0 0 16px 0;
  background: linear-gradient(to top, var(--lime-400) 50%, transparent 100%);

  border-radius: 18px;
`;

const ListContainer = styled.div`
  width: 100%;
  max-width: 588px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px 0;
`;

const StyledImage = styled(Image)`
  margin: 80px auto 0;
`;

const StyledSpan = styled.span`
  font-family: "NanumSquare";
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--slate-400);
  margin: 0 auto;
`;
