import styled from "styled-components";
import AddForm from "@/widgets/add-form";
import ItemList from "@/widgets/item-list";
import { getItemList } from "@/share/axios";
import useItems from "@/features/data/items/useItems";
import media from "@/share/media/media";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.params?.id;

  if (!id) {
    return {
      props: {
        initItems: [],
      },
    };
  }

  const initItems: Item[] = await getItemList(id as string);

  return {
    props: {
      initItems,
    },
  };
}

type PageProps = {
  initItems: Item[];
};

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

const KEY = "apiId";

export default function List({ initItems }: PageProps) {
  const setItems = useItems({ initItems });
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
