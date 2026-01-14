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
        toDoList: [],
        doneList: [],
      },
    };
  }

  const initItems: Item[] = await getItemList(apiId as string);

  // parse 함수로 따로 분리 예정
  const { toDoList, doneList } = initItems.reduce<AccType>(
    (acc, item) => {
      item.isCompleted ? acc.doneList.push(item) : acc.toDoList.push(item);
      return acc;
    },
    { toDoList: [], doneList: [] }
  );

  return {
    props: {
      toDoList,
      doneList,
    },
  };
}

type AccType = {
  toDoList: Item[];
  doneList: Item[];
};

type PageProps = AccType;

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

const KEY = "apiId";

// 추 후 zustand 전역상태 초기값에 toDOlist랑 doneList 설정 할 것
export default function List({ toDoList, doneList }: PageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const setAllItems = useItems({ toDoList, doneList });
  const router = useRouter();

  useEffect(() => {
    const apiId = localStorage.getItem(KEY) as string; //string일때만 진입함

    // iframe 실행 용 iframe에서 쿠키저장이 안됨
    const loadItems = async () => {
      const initItems: Item[] = await getItemList(apiId as string);
      setAllItems(initItems);
    };

    if (!apiId) {
      router.replace("/");
      return;
    } else {
      requestAnimationFrame(() => {
        setIsVisible(true);

        // iframe 실행 용 iframe에서 쿠키저장이 안됨
        loadItems();
      });
    }
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
          opacity: isVisible ? 0 : 0.3,
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
