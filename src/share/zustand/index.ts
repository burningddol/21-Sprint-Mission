import { create } from "zustand";

type Item = {
  id: number;
  name?: string;
  isCompleted: boolean;
};

type Items = {
  toDoItems: Item[];
  doneItems: Item[];

  setToDoItems: (items: Item[]) => void;
  setDoneItems: (items: Item[]) => void;
  addToDoItem: (item: Item) => void;
  addDoneItem: (item: Item) => void;
  removeToDoItem: (id: number) => void;
  removeDoneItem: (id: number) => void;
};

export const useSeparatedItems = create<Items>((set) => ({
  toDoItems: [],
  doneItems: [],

  setToDoItems(items: Item[]) {
    set(() => ({ toDoItems: items }));
  },
  setDoneItems(items: Item[]) {
    set(() => ({ doneItems: items }));
  },

  addToDoItem(item: Item) {
    set((state) => ({ toDoItems: [item, ...state.toDoItems] }));
  },

  addDoneItem(item: Item) {
    set((state) => ({ doneItems: [...state.doneItems, item] }));
  },

  removeToDoItem(id: number) {
    set((state) => ({
      toDoItems: state.toDoItems.filter((item) => item.id !== id),
    }));
  },
  removeDoneItem(id: number) {
    set((state) => ({
      doneItems: state.doneItems.filter((item) => item.id !== id),
    }));
  },
}));
