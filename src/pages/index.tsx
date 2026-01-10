import styled from "styled-components";
import AddForm from "@/widgets/add-form";
import ItemList from "@/widgets/item-list";
import { getItemList } from "@/share/axios";
import useItems from "@/features/data/items/useItems";

export async function getServerSideProps() {
  const initItems: Item[] = await getItemList();

  return {
    props: {
      initItems,
    },
  };
}

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

type PageProps = {
  initItems: Item[];
};

export default function Home({ initItems }: PageProps) {
  useItems({ initItems });
  const toDo = true;
  const done = false;

  return (
    <>
      <Container>
        <AddForm />

        <FlexBox>
          <ItemList option={toDo} />
          <ItemList option={done} />
        </FlexBox>
      </Container>
    </>
  );
}

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;
`;

const FlexBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
