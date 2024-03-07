import { Label } from "@radix-ui/react-label";

import { useCreateBookmarkForm } from "../../use-bookmark-form";

import { FormProps } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateBookmarkForm: React.FC<FormProps> = ({ afterSubmit }) => {
  const { form, request } = useCreateBookmarkForm({ afterSubmit });

  return (
    <form onSubmit={request()} id="bookmark">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="url" className="text-right">
            Url
          </Label>
          <Input id="url" className="col-span-3" {...form.register("url")} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            className="col-span-3"
            {...form.register("title")}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button
          type="submit"
          form="bookmark"
          disabled={!form.formState.isValid}
        >
          Save Bookmark
        </Button>
      </div>
    </form>
  );
};

export { CreateBookmarkForm };
