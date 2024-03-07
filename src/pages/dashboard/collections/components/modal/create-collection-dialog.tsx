import React from "react";

import { CreateCollectionForm } from "../form/create-collection-form";

import {
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/modal/modal";
import { useDialog } from "@/hooks/use-dialog";

const CreateCollectionDialog: React.FC = () => {
  const { handleClose } = useDialog();

  return (
    <DialogRoot onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Add Collection</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <CreateCollectionForm afterSubmit={handleClose} />
    </DialogRoot>
  );
};

export { CreateCollectionDialog as default };
