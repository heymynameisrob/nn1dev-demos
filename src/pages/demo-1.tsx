import React from "react";
import ky from "ky";

import { Avatar } from "@/components/avatar";
import { PostForm } from "@/components/demos/post-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog";
import { cn } from "@/lib/utils";
import { usePostStore } from "@/stores/posts";
import { PostFeed } from "@/components/demos/post-feed";

export default function Demo1() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { createPost } = usePostStore();

  return (
    <main className="flex flex-col gap-12 max-w-2xl mx-auto flex py-16">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Home</h1>
        <p className="text-secondary">Heres what you missed</p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={cn(
            "w-full p-4 h-16 text-muted relativeg flex items-center justify-between gap-3 rounded-lg hover:bg-gray-1 dark:bg-gray-2 dark:hover:bg-gray-3 bg-gray-1 shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "transition-all hover:shadow dark:shadow-[inset_0px_0px_0px_0.5px_rgb(255_255_255_/_0.06),_0px_1px_2px_rgb(0_0_0_/_0.2),_0px_2px_4px_rgb(0_0_0_/_0.12),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.12)]",
            "outline-none",
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar
              src={
                "https://ucarecdn.com/13ed369a-bf01-40cb-a951-d8e4a572f257/-/scale_crop/300x300/"
              }
              name="Rob"
            />
            <p className="text-gray-9 font-medium">
              What do you want to share?
            </p>
          </div>
          <div className="inline-flex items-center whitespace-nowrap justify-center rounded-md text-sm font-medium h-8 py-2 px-4 bg-primary text-background shadow pointer-events-none">
            Post
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-0">
          <PostForm
            onSubmit={async (values) => {
              const res: { emoji: string; meta: unknown } = await ky
                .post("/api/emoji", { json: { prompt: values.title } })
                .json();
              createPost({
                ...values,
                author: "Rob Hough",
                date: new Date().toISOString(),
                emoji: res.emoji,
              });
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <PostFeed />
    </main>
  );
}
