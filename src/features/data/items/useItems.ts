import parseItems from "@/share/utils/parseItems";
import { useSeparatedItems } from "@/share/zustand";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

type Props = {
  toDoList: Item[];
  doneList: Item[];
};

export default function useItems({ toDoList, doneList }: Props) {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const { setToDoItems, setDoneItems } = useSeparatedItems();

  //완료 비완료 분리
  useEffect(() => {
    setToDoItems(toDoList);
    setDoneItems(doneList);

    // iframe 실행 용 iframe에서 쿠키저장이 안됨
    if (toDoList.length === 0 && doneList.length === 0) {
      const { toDoList, doneList } = parseItems(allItems);
      setToDoItems(toDoList);
      setDoneItems(doneList);
    }
  }, [allItems]);

  return setAllItems;
}
