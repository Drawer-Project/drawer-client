import { z } from "zod";

const bookmarkCreationSchema = z.object({
  url: z.string().min(1).url(),
  title: z.string().min(1),
});

type BookmarkCreationSchemaType = z.infer<typeof bookmarkCreationSchema>;

const addBookmarkToCollectionSchema = z.object({
  collectionId: z.string(),
});

type AddBookmarkToCollectionSchemaType = z.infer<
  typeof addBookmarkToCollectionSchema
>;

export type { BookmarkCreationSchemaType, AddBookmarkToCollectionSchemaType };
export { bookmarkCreationSchema, addBookmarkToCollectionSchema };
