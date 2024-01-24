import { z } from "zod";

import { ERR_MSG, PASSWORD_REG_PATTERN } from "@/constants/schema";

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: ERR_MSG.REQUIRED })
      .email({ message: ERR_MSG.EMAIL }),
    password: z
      .string()
      .min(1, { message: ERR_MSG.REQUIRED })
      .regex(PASSWORD_REG_PATTERN, { message: ERR_MSG.PASSWORD }),
    confirmPassword: z.string().min(1, { message: ERR_MSG.REQUIRED }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: ERR_MSG.PASSWORD_NOT_MATCHED,
  });

type signupSchemaType = z.infer<typeof signupSchema>;

export type { signupSchemaType };
export { signupSchema };
