import React from "react";

import { EditCollectionForm } from "../form/edit-collection-form";

import {
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/modal/modal";
import { useDialog } from "@/hooks/use-dialog";

const EditCollectionDialog: React.FC = () => {
  const { handleClose } = useDialog();

  return (
    <DialogRoot onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <EditCollectionForm afterSubmit={handleClose} />
    </DialogRoot>
  );
};

export { EditCollectionDialog as default };
