import { AddBookmarkToCollectionForm } from "../form/add-bookmark-to-collection.form";

import {
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/modal/modal";
import { useDialog } from "@/hooks/use-dialog";

const AddBookmarkToCollectionDialog: React.FC = () => {
  const { handleClose } = useDialog();

  return (
    <DialogRoot onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Add bookmark to collection</DialogTitle>
        <DialogDescription>
          Select the collection you want to add. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <AddBookmarkToCollectionForm afterSubmit={handleClose} />
    </DialogRoot>
  );
};

export { AddBookmarkToCollectionDialog as default };
