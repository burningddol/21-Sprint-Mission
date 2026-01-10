import Image from "next/image";
import todo from "@/assets/images/todo.svg";
import done from "@/assets/images/done.svg";
import styled from "styled-components";
import Item from "./ui/item";

interface Props {
  option: boolean;
}

export default function ItemList({ option }: Props) {
  return (
    <Section>
      <Image src={todo} alt="ToDo 아이콘" />
      <ListContainer>
        <Item toDo={option} />
        <Item toDo={option} />
        <Item toDo={option} />
      </ListContainer>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
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
