import styled from "styled-components";
import AddForm from "@/widgets/add-form";
import ItemList from "@/widgets/item-list";
import { getItemList } from "@/share/axios";
import useItems from "@/features/data/items/useItems";
import media from "@/share/media/media";
import { useEffect } from "react";
import { useRouter } from "next/router";

/*    유저별 개인공간 제공을 위해 apiId가 브라우저에서 정해지므로 SSR무의미해짐 
export async function getServerSideProps() {
  const initItems: Item[] = await getItemList();

  return {
    props: {
      initItems,
    },
  };
}



type PageProps = {
  initItems: Item[];
};*/

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

const KEY = "apiId";

export default function List(/*{ initItems }: PageProps*/) {
  const setItems = useItems({ initItems: [] });
  const router = useRouter();

  useEffect(() => {
    const apiId = localStorage.getItem(KEY) as string; //string일때만 진입함
    if (!apiId) {
      router.replace("/login");
      return;
    }

    const loadItems = async () => {
      const initItems: Item[] = await getItemList(apiId);
      setItems(initItems);
    };
    loadItems();
  }, []);

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
