import { z } from "zod";

import { ERR_MSG, PASSWORD_REG_PATTERN } from "@/constants/auth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERR_MSG.REQUIRED })
    .email({ message: ERR_MSG.EMAIL }),
  password: z
    .string()
    .min(1, { message: ERR_MSG.REQUIRED })
    .regex(PASSWORD_REG_PATTERN, { message: ERR_MSG.PASSWORD }),
});

type loginSchemaType = z.infer<typeof loginSchema>;

export type { loginSchemaType };
export { loginSchema };
