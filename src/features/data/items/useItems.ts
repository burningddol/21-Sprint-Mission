import { useSeparatedItems } from "@/share/zustand";
import { useEffect } from "react";

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
  const { setToDoItems, setDoneItems } = useSeparatedItems();

  //완료 비완료 분리
  useEffect(() => {
    setToDoItems(toDoList);
    setDoneItems(doneList);
  }, []);

  return null;
}
