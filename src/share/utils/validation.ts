import { z } from "zod";

const fileName = z.string().regex(/^[A-Za-z0-9_.-]+$/, {
  message:
    "파일 이름에는 영문, 숫자, _, -, . 만 사용할 수 있숨니다. \n (한글, 띄어쓰기, 특수문자 불가)",
});
export const fileNameSchema = z.object({
  fileName,
});
