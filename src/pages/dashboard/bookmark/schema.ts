import { z } from "zod";

const bookmarkCreationSchema = z.object({
  url: z.string().min(1).url(),
  title: z.string().min(1),
  // collectionId: z.nullable(z.string()),
});

type BookmarkCreationSchemaType = z.infer<typeof bookmarkCreationSchema>;

export type { BookmarkCreationSchemaType };
export { bookmarkCreationSchema };
