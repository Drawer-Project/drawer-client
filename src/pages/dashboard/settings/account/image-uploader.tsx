import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";

import { ImageUploaderSchemaType, imageUploaderSchema } from "./schema";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { useUpdateProfileImage, useUser } from "@/hooks/quries/user";

export interface renderProps {
  files: FileList;
  handleClick: () => void;
}

interface ImageUploaderProps {
  render: (props: renderProps) => ReactNode;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ render }) => {
  const mutation = useUpdateProfileImage();
  const { user } = useUser();

  const { handleSubmit, register, formState, watch } =
    useForm<ImageUploaderSchemaType>({
      mode: "onSubmit",
      resolver: zodResolver(imageUploaderSchema),
    });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: ImageUploaderSchemaType) => {
    const formData = new FormData();
    formData.append("file", data.profile[0]);

    mutation.mutate({
      uuid: user!.uuid,
      profileImage: formData,
    });
  };

  const { ref, ...rest } = register("profile");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="edit-profile-image">
        <div className="flex gap-2">
          {render && render({ files: watch("profile"), handleClick })}
          <div className="cursor-pointer">
            <Input
              type="file"
              id="file"
              accept="image/png"
              {...rest}
              ref={e => {
                ref(e);
                fileInputRef.current = e;
              }}
            />
          </div>
        </div>
        <p className="my-2 text-sm text-gray-500 dark:text-gray-400">
          Update your profile picture. PNG is allowed.
        </p>
        {formState.errors && (
          <ErrorMessage message={formState.errors.profile?.message} />
        )}
      </form>
      <Button
        type="submit"
        form="edit-profile-image"
        disabled={!formState.isValid}
      >
        Change Profile Image
      </Button>
    </>
  );
};

export { ImageUploader };
