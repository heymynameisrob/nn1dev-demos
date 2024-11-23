import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import { usePostStore } from "@/stores/posts";
import { PostActivity } from "@/components/demos/post-activity";
import { ResolvedBanner } from "@/components/demos/post-resolve";

export default function Page() {
  const router = useRouter();

  const { posts } = usePostStore();

  const post = posts.find((post) => post.id === router.query.id);

  if (!post) return null;

  return (
    <main className="flex flex-col gap-6 max-w-3xl mx-auto py-16">
      <Link href="/demo" className="inline-flex items-center gap-2">
        <ArrowLeftIcon className="w-4 h-4 opacity-70" />
        <small className="font-medium text-secondary">Go back</small>
      </Link>
      <section className="flex flex-col gap-4 border-b pb-6">
        <div className="col-span-1 col-start-2 flex items-center gap-2 row-span-1 row-start-1">
          <h3>{post.emoji}</h3>
          <h3 className="font-semibold">{post.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <small className="font-medium text-gray-7">by </small>
          <small className="font-medium">{post.author}</small>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="prose prose-p:text-secondary dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <ResolvedBanner post={post} />
      </section>
      <PostActivity post={post} />
    </main>
  );
}
