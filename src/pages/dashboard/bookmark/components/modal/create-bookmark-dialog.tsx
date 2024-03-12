import { CreateBookmarkForm } from "../form/create-bookmark-form";

import {
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/modal";
import { useDialog } from "@/hooks/use-dialog";

const CreateBookmarkDialog: React.FC = () => {
  const { handleClose } = useDialog();

  return (
    <DialogRoot onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Add Bookmark</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <CreateBookmarkForm afterSubmit={handleClose} />
    </DialogRoot>
  );
};

export { CreateBookmarkDialog as default };
