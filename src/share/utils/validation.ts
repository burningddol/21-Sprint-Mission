import { z } from "zod";

const noKorean = z.string().refine((v) => !/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(v), {
  message: "파일이름에 한글(자음/모음 포함)은 포함할 수 없단 말입니다!",
});

export const fileNameSchema = z.object({
  fileName: noKorean,
});
