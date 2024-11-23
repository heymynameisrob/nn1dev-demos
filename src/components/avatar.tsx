import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn, getAvatarColour, getInitialsFromFullName } from "@/lib/utils";

type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> & {
  src?: string;
  name?: string;
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, src, name = "User", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full text-sm",
      className,
    )}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      loading="lazy"
      className={cn("object-fit aspect-square h-full w-full")}
    />
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-background font-semibold text-inherit",
        getAvatarColour(name),
      )}
    >
      {getInitialsFromFullName(name)}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar };
