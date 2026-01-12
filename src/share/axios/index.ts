import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://assignment-todolist-api.vercel.app/api",
});

export async function getItemList(apiId: string) {
  const params = { page: 1, pageSize: 20 };

  const response = await axios.get(`/${apiId}/items/`, { params }); // 각 불러올 항목 주소로입력 param은 api 확인
  const data = response.data;

  return data;
}

export async function toggleItem(
  itemId: number,
  isCompleted: boolean,
  apiId: string
) {
  await axios.patch(`/${apiId}/items/${itemId}`, {
    isCompleted: !isCompleted,
  });
}

export async function addItem(name: string, apiId: string) {
  const response = await axios.post(`/${apiId}/items/`, {
    name,
  });
  const data = response.data;
  return data;
}
