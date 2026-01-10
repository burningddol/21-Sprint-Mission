import { useSeparatedItems } from "@/share/zustand";
import { useState, useEffect } from "react";

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

type Props = {
  initItems: Item[];
};

type AccType = {
  toDo: Item[];
  done: Item[];
};

export default function useItems({ initItems }: Props) {
  const [items, setItems] = useState<Item[]>(initItems);

  const { setToDoItems, setDoneItems } = useSeparatedItems();

  //완료 비완료 분리
  useEffect(() => {
    const { toDo, done } = items.reduce<AccType>(
      (acc, item) => {
        item.isCompleted ? acc.done.push(item) : acc.toDo.push(item);
        return acc;
      },
      { toDo: [], done: [] }
    );

    setToDoItems(toDo);
    setDoneItems(done);
  }, [items]);

  return null;
}
