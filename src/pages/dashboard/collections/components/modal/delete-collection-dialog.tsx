import { useParams } from "react-router-dom";

import { useDeleteCollectionForm } from "../../use-collection-form";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";

const DeleteCollectionDialog = () => {
  const { handleClose } = useDialog();
  const { collectionId } = useParams();

  if (!collectionId) {
    throw new Error("collectionId cannot be undefined in this components");
  }

  const { request } = useDeleteCollectionForm({ afterSubmit: handleClose });

  return (
    <DialogRoot onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Delete Collection</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this list? This cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" onClick={() => request(parseInt(collectionId))}>
          Delete Collection
        </Button>
      </DialogFooter>
    </DialogRoot>
  );
};

export { DeleteCollectionDialog as default };
