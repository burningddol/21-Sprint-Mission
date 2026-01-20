type AccType = {
  toDoList: Item[];
  doneList: Item[];
};

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

const parseItems = (initItems: Item[]) => {
  const { toDoList, doneList } = initItems.reduce<AccType>(
    (acc, item) => {
      item.isCompleted ? acc.doneList.push(item) : acc.toDoList.push(item);
      return acc;
    },
    { toDoList: [], doneList: [] },
  );

  return { toDoList, doneList };
};

export default parseItems;
