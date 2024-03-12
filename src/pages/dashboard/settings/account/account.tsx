import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

import { ImageUploader, renderProps } from "./image-uploader";

import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSignout } from "@/hooks/quries/auth";
import { useUser } from "@/hooks/quries/user";

const UploaderUI: React.FC<renderProps> = ({ files, handleClick }) => {
  const { user } = useUser();

  let url;

  try {
    url = URL.createObjectURL(files[0]);
  } catch (err) {
    url = user?.profileImageUrl || undefined;
  }

  return (
    <Button size="icon" variant="ghost" type="button" onClick={handleClick}>
      <Avatar>
        {url ? (
          <AvatarImage
            className="rounded-full flex h-9 w-9"
            alt="@shadcn"
            src={url}
          />
        ) : (
          <AvatarFallback className="rounded-full flex h-9 w-9 bg-black">
            AC
          </AvatarFallback>
        )}
      </Avatar>
    </Button>
  );
};

const Account = () => {
  const { signout } = useSignout();

  return (
    <main className="w-4/6 mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-8">
        <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Account
        </h1>
        <div className="w-1/2 flex flex-col gap-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Profile Image
          </h4>
          <ImageUploader render={props => <UploaderUI {...props} />} />

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Delete Account
          </h4>
          <Button onClick={() => signout()}> Delete</Button>
        </div>
      </div>
    </main>
  );
};

export { Account };
