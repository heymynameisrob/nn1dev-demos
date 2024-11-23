import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { PostResolve } from "@/components/demos/post-resolve";
import { Input } from "@/components/input";
import { cn, fromNow } from "@/lib/utils";

import type { Comment as CommentType, Post } from "@/stores/posts";

export function PostActivity({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-primary">Activity</p>
        <PostResolve post={post} />
      </div>
      <div
        className={cn(
          "flex flex-col gap-8 transition-opacity",
          post.resolved && "pointer-events-none opacity-50",
        )}
      >
        {post.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="flex flex-col rounded-md border border-secondary shadow-sm bg-gray-1 dark:bg-gray-2">
      <div className="grid-rows relative isolate grid grid-cols-[24px,minmax(0,1fr)] gap-3 p-3 pb-6 border-b">
        <Avatar
          name={comment.author}
          className="w-6 h-6 text-[10px]"
          src={`https://avatar.iran.liara.run/public/${comment.id % 2 ? "boy" : "girl"}?username=${comment.author.split(" ")}`}
        />
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <small className="font-medium">{comment.author}</small>
            <small className="font-medium text-gray-7">
              {fromNow(new Date())}
            </small>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="prose prose-p:text-secondary dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        </section>
      </div>
      <div className="flex items-center gap-3 px-3 h-12">
        <Avatar name="Rob Hough" className="w-6 h-6 text-[10px]" />
        <Input
          type="text"
          placeholder="Write a reply..."
          className="w-full border-none bg-transparent"
        />
      </div>
    </div>
  );
}
