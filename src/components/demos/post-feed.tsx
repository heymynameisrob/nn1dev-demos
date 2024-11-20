import { Avatar } from "@/components/avatar";
import { Post as PostType, usePostStore } from "@/stores/posts";

export function PostFeed() {
  const { posts } = usePostStore();

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => <Post post={post} key={post.id} />);
}

export function Post({ post }: { post: PostType }) {
  return (
    <div className="grid-rows relative isolate grid grid-cols-[52px,minmax(0,1fr)] grid-rows-[minmax(20px,1fr),20px,max-content,max-content]">
      <Avatar name={post.author} />
      <div className="col-span-1 col-start-2 flex items-center gap-2 row-span-1 row-start-1">
        <h3>{post.emoji}</h3>
        <h3 className="font-semibold">{post.title}</h3>
      </div>
      <div className="flex flex-col gap-2 mt-4 col-span-1 col-start-2 row-span-3 row-start-2 border-b pb-6">
        <div
          className="prose prose prose-p:text-secondary dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
