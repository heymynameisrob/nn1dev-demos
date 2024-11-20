import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  emoji: string;
}

interface PostStore {
  posts: Post[];
  createPost: (post: Omit<Post, "id">) => void;
  deletePost: (id: string) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [
        {
          id: "1",
          emoji: "😁",
          title: "Getting Started with React",
          content:
            "<p>React is a popular JavaScript library for building user interfaces. This post will guide you through the basics. Starting with React can seem daunting at first, but breaking it down into core concepts makes it much more approachable.</p><p>We'll cover essential topics like components, props, and state management. Understanding these foundational concepts is crucial for building scalable React applications. By the end of this guide, you'll have the knowledge needed to start creating your own React components and applications.</p>",
          author: "Sarah Johnson",
          date: "2024-01-15",
        },
        {
          id: "2",
          emoji: "😁",
          title: "TypeScript Best Practices",
          content:
            "<p>Learn how to write better TypeScript code with these essential best practices and tips. TypeScript adds static typing to JavaScript, making your code more robust and maintainable. We'll explore how to effectively use interfaces, types, and generics to create more reliable applications.</p><p>Additionally, we'll dive into advanced TypeScript features like union types, intersection types, and utility types. Understanding these concepts will help you write more efficient and error-free code. We'll also cover common pitfalls to avoid and how to structure your TypeScript projects for maximum productivity.</p>",
          author: "Mike Chen",
          date: "2024-01-16",
        },
        {
          id: "3",
          emoji: "😁",
          title: "State Management with Zustand",
          content:
            "<p>Discover how to manage state effectively in React applications using Zustand. Zustand provides a minimalistic yet powerful approach to state management that can replace more complex solutions like Redux. We'll explore how to set up your first Zustand store and implement common patterns for state updates.</p><p>The tutorial will also cover advanced Zustand features like middleware, persistence, and debugging tools. You'll learn how to organize your state logic, handle async operations, and integrate Zustand with TypeScript for type-safe state management. By the end, you'll have a solid understanding of how to implement Zustand in your React projects.</p>",
          author: "Alex Rodriguez",
          date: "2024-01-17",
        },
      ],

      createPost: (post) =>
        set((state) => ({
          posts: [
            ...state.posts,
            {
              ...post,
              id: crypto.randomUUID(),
            },
          ],
        })),

      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "nn1-demo-posts-storage", // unique name for localStorage key
    },
  ),
);
