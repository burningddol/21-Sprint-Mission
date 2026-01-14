import styled from "styled-components";
import AddForm from "@/widgets/add-form";
import ItemList from "@/widgets/item-list";
import { getItemList } from "@/share/axios";
import useItems from "@/features/data/items/useItems";
import media from "@/share/media/media";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie || "";

  const parseCookie = (key: string) => {
    return cookie
      .split("; ")
      .find((v) => v.startsWith(key + "="))
      ?.split("=")[1];
  };

  const apiId = parseCookie("apiId");

  if (!apiId) {
    return {
      props: {
        initItems: [],
      },
    };
  }

  const initItems: Item[] = await getItemList(apiId as string);

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
  const [visible, setVisible] = useState(false);
  const setItems = useItems({ initItems });
  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

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
  // 인라인스타일 분리 예정
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          opacity: visible ? 0 : 0.35,
          transition: "opacity 2s ease",
          pointerEvents: "none",
        }}
      />
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
