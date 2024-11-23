import { Suspense, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ky from "ky";
import { useDebouncedCallback } from "use-debounce";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { Loader } from "lucide-react";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { TextEditor } from "@/components/text-editor";
import { Post, usePostStore } from "@/stores/posts";
import { Badge } from "@/components/badge";

export function PostResolve({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updatePost } = usePostStore();

  const handleSave = () => {
    const data: { date: string; content: string } | undefined =
      queryClient.getQueryData(["resolve", post.id]);

    if (!data) return null;

    updatePost(post.id, {
      ...post,
      resolved: {
        date: data.date,
        content: data.content,
      },
    });
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={!!post.resolved} asChild>
        {post.resolved ? null : (
          <Button size="sm" className="gap-2">
            <CheckCircleIcon className="w-4 h-4 opacity-70" />
            <>Resolve</>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Resolve post</DialogTitle>
        <DialogDescription>
          Let your team know the post is resolved
        </DialogDescription>
        <Suspense
          fallback={
            <div className="w-full h-[260px] flex items-center justify-center flex-col text-center gap-3">
              <Loader className="w-4 h-4 text-primary animate-spin" />
              <small className="font-medium">Generating resolution...</small>
            </div>
          }
        >
          <PostResolveContent post={post} />
        </Suspense>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" onClick={() => handleSave()}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PostResolveContent({ post }: { post: Post }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["resolve", post.id],
    queryFn: async () => {
      const res: { date: string; content: string } = await ky
        .post("/api/resolve", { json: { post: post, comments: post.comments } })
        .json();
      return res;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    initialData: post.resolved,
  });

  const onResolvedContentUpdate = useDebouncedCallback((content: string) => {
    queryClient.setQueryData(
      ["resolve", post.id],
      (oldData: { status: string; content: string }) => {
        return {
          ...oldData,
          content,
        };
      },
    );
  }, 500);

  if (!data) return null;

  return (
    <TextEditor
      content={data.content}
      onUpdate={onResolvedContentUpdate}
      className="px-3 bg-background border rounded-md dark:bg-gray-2 h-[260px] overflow-y-scroll"
    />
  );
}

export function ResolvedBanner({ post }: { post: Post }) {
  if (!post.resolved) return null;

  return (
    <div className="space-y-3 gap-3 border border-green-500/50 rounded-lg p-3 bg-gray-1 dark:bg-gray-3">
      <ResolvedBadge />
      <TextEditor content={post.resolved.content} editable={false} />
    </div>
  );
}

export function ResolvedBadge() {
  return (
    <Badge className="w-auto gap-1 bg-green-500/30 border-green-500/30 text-white">
      <CheckCircleIcon className="w-3 h-3 text-green-500 opacity-70" />
      <>Resolved</>
    </Badge>
  );
}
