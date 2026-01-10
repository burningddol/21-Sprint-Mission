import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://assignment-todolist-api.vercel.app/api/burningddol",
});

export async function getItemList() {
  const params = { page: 1, pageSize: 20 };

  const response = await axios.get("/items/", { params }); // 각 불러올 항목 주소로입력 param은 api 확인
  const data = response.data;

  return data;
}

export async function toggleItem(itemId: number, isCompleted: boolean) {
  await axios.patch(`/items/${itemId}`, {
    isCompleted: !isCompleted,
  });
}

export async function addItem(name: string) {
  const response = await axios.post(`/items/`, {
    name,
  });
  const data = response.data;
  return data;
}
