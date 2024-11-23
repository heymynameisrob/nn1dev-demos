import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  emoji: string;
  resolved?: {
    date: string;
    content: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  date: string;
}

interface PostStore {
  posts: Post[];
  createPost: (post: Omit<Post, "id">) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, post: Omit<Post, "id">) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [
        {
          id: "0",
          emoji: "🤷",
          title: "Is the legacy dashboard page still in use?",
          content:
            "<p>I noticed we still have the old dashboard analytics page at /dashboard/analytics-v1 in our codebase. It doesn't appear to be receiving any traffic according to our metrics, and we've since rebuilt this functionality in the new dashboard.</p><p>Should we deprecate this page and remove the code? Let me know your thoughts on if anyone is still using this or if we should keep it around for reference.</p>",
          author: "James Chen",
          date: "2024-11-25",
          comments: [
            {
              id: 1,
              content:
                "I checked the logs and haven't seen any requests to this endpoint in over 3 months. I think it's safe to say it's not being actively used.",
              author: "Sarah Johnson",
              date: "2024-01-15",
            },
            {
              id: 2,
              content:
                "While it's not in use, I'd recommend we keep the code around for now. There are some interesting patterns in there that we might want to reference for future analytics features.",
              author: "Mike Peterson",
              date: "2024-01-16",
            },
            {
              id: 3,
              content:
                "Agreed with Mike - let's deprecate the route but preserve the code with a clear deprecated notice. We can revisit deletion in 6 months if we still haven't needed it.",
              author: "Emma Taylor",
              date: "2024-01-16",
            },
          ],
        },
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
        {
          id: "4",
          emoji: "🎨",
          title: "Redesigning the Dashboard Posts Page",
          content:
            "<p>Today we're discussing the redesign of our dashboard's posts page to improve user experience and functionality. One key feature we're implementing is the ability to group posts by read/unread status, making it easier for users to manage their content consumption.</p><p>After careful consideration of user feedback and workflow analysis, we've decided to implement this grouping feature to help users better track their reading progress and prioritize important content.</p>",
          author: "Emma Taylor",
          date: "2024-11-25",
          comments: [
            {
              id: 1,
              content:
                "I think adding the read/unread grouping feature would be really beneficial for user organization. It'll help people keep track of what they still need to review.",
              author: "David Wilson",
              date: "2024-01-18",
            },
            {
              id: 2,
              content:
                "Agreed! We'll proceed with the read/unread grouping feature. It aligns well with our goal of improving content management efficiency.",
              author: "Emma Taylor",
              date: "2024-01-18",
            },
            {
              id: 3,
              content:
                "We'll need to modify the backend API and database schema to support the read/unread tracking. Let's create tickets for both frontend and backend work.",
              author: "Sarah Chen",
              date: "2024-01-19",
            },
            {
              id: 4,
              content:
                "The backend will need to store a read status flag per user per post. We should also consider adding an endpoint for bulk status updates.",
              author: "Michael Park",
              date: "2024-01-19",
            },
          ],
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

      updatePost: (id: string, updatedPost: Partial<Post>) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post,
          ),
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
