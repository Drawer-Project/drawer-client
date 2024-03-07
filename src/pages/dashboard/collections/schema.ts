import { z } from "zod";

import { checkCollectionName } from "@/api/verification";

const doesCollectionNameExist = async (collectionName: string) => {
  try {
    await checkCollectionName({ collectionName });

    return true;
  } catch (error) {
    return false;
  }
};

const collectionCreationSchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
  })
  .refine(data => doesCollectionNameExist(data.name), {
    path: ["name"],
    message: "collection name already exist",
  });

type CollectionCreationSchemaType = z.infer<typeof collectionCreationSchema>;

const collectionRevisionSchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
  })
  .refine(data => doesCollectionNameExist(data.name), {
    path: ["name"],
    message: "collection name already exist",
  });

type CollectionRevisitonSchemaType = z.infer<typeof collectionRevisionSchema>;

export type { CollectionCreationSchemaType, CollectionRevisitonSchemaType };
export { collectionCreationSchema, collectionRevisionSchema };
