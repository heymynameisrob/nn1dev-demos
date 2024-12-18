import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  JSONContent,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";

import { cn } from "@/lib/utils";

// Extensions
const extensions = [
  StarterKit,
  Markdown.configure({
    breaks: true,
  }),
  Placeholder.configure({ placeholder: "Write something …" }),
];

export const TextEditor = ({
  content,
  className,
  onUpdate,
  editable = true,
}: {
  content?: JSONContent | string;
  className?: string;
  onUpdate?: (content: string) => void;
  editable?: boolean;
}) => {
  const handleOnUpdate = ({ editor }: { editor: Editor }) => {
    if (!onUpdate) return;
    const content = editor.getHTML();
    onUpdate(content);
  };

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      onUpdate={handleOnUpdate}
      immediatelyRender={false}
      editable={editable}
      editorProps={{
        attributes: {
          class: cn(
            "prose dark:prose-invert outline-none focus-visible:ring-2 focus-visible:ring-gray-7 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          ),
        },
      }}
    >
      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu> */}
    </EditorProvider>
  );
};
