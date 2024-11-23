import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { Post as PostType, usePostStore } from "@/stores/posts";
import { ResolvedBadge, ResolvedBanner } from "@/components/demos/post-resolve";
import { Badge } from "@/components/badge";

export function PostFeed() {
  const { posts } = usePostStore();

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => <Post post={post} key={post.id} />);
}

export function Post({ post }: { post: PostType }) {
  return (
    <div className="grid-rows relative isolate grid grid-cols-[52px,minmax(0,1fr)]">
      <Avatar
        name={post.author}
        src={`https://avatar.iran.liara.run/public/${Number(post.id) % 2 ? "boy" : "girl"}?username=${post.author.split(" ")}`}
      />
      <section className="flex flex-col gap-4 border-b pb-6">
        <Link
          href={`/demo/${post.id}`}
          className="col-span-1 col-start-2 flex items-center gap-2 row-span-1 row-start-1"
        >
          <h3>{post.emoji}</h3>
          <h3 className="font-semibold">{post.title}</h3>
          {post.resolved && <ResolvedBadge />}
        </Link>
        <div className="flex items-center gap-2">
          <small className="font-medium text-gray-7">by </small>
          <small className="font-medium">{post.author}</small>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="prose prose-p:text-secondary dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <ResolvedBanner post={post} />
        </div>
        {post.comments && (
          <div className="flex items-center gap-2 px-2">
            <div className="flex items-center">
              {post.comments.map((comment) => (
                <Avatar
                  key={comment.id}
                  name={comment.author}
                  className="w-6 h-6 !text-[10px] -ml-2 border-2 border-background"
                  src={`https://avatar.iran.liara.run/public/${comment.id % 2 ? "boy" : "girl"}?username=${comment.author.split(" ")}`}
                />
              ))}
            </div>
            <Link
              href={`/demo/${post.id}`}
              prefetch={true}
              className="font-medium text-secondary text-sm underline"
            >
              {post.comments.length} comments
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
