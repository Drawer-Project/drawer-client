import { useCreateCollectionForm } from "../../use-collection-form";

import { FormProps } from "@/components/types";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateCollectionForm: React.FC<FormProps> = ({ afterSubmit }) => {
  const { form, request } = useCreateCollectionForm({ afterSubmit });

  return (
    <form onSubmit={request()} id="add-collection">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" {...form.register("name")} />
        </div>
        <ErrorMessage message={form.formState.errors.name?.message} />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right leading-relaxed">
            Description (optional)
          </Label>
          <Input
            id="description"
            className="col-span-3"
            {...form.register("description")}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button
          type="submit"
          form="add-collection"
          disabled={!form.formState.isValid}
        >
          Save Collection
        </Button>
      </div>
    </form>
  );
};

export { CreateCollectionForm };
