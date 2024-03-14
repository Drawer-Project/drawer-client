import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png"];

const imageUploaderSchema = z.object({
  profile: z.instanceof(FileList).refine(
    files => {
      return Array.from(files).every(file => {
        if (file === undefined) {
          return true;
        }

        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      });
    },
    {
      message: "Unsupported file type.",
    },
  ),
});

type ImageUploaderSchemaType = z.infer<typeof imageUploaderSchema>;

export type { ImageUploaderSchemaType };
export { imageUploaderSchema };
