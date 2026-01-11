import styled from "styled-components";
import AddForm from "@/widgets/add-form";
import ItemList from "@/widgets/item-list";
import { getItemList } from "@/share/axios";
import useItems from "@/features/data/items/useItems";
import media from "@/share/media/media";

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
  position: relative;
  z-index: 10;

  ${media.nowTablet`
    width: 950px;
  `}
`;

const FlexBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 0 24px;
`;
