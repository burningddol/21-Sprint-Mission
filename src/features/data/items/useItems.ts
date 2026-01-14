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

type AccType = {
  newToDoList: Item[];
  newDoneList: Item[];
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
      const { newToDoList, newDoneList } = allItems.reduce<AccType>(
        (acc, item) => {
          item.isCompleted
            ? acc.newDoneList.push(item)
            : acc.newToDoList.push(item);
          return acc;
        },
        { newToDoList: [], newDoneList: [] }
      );
      setToDoItems(newToDoList);
      setDoneItems(newDoneList);
    }
  }, [allItems]);

  return setAllItems;
}
