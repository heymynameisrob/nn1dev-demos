import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { TextEditor } from "@/components/text-editor";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Posts must have a title.",
  }),
  content: z.string().min(2, {
    message: "Posts must have a post, duh.",
  }),
});

export function PostForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full px-3 pb-3 bg-background border rounded-md dark:bg-gray-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Post title"
                    className="bg-transparent text-base font-medium border-none px-0 placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:text-primary"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <TextEditor
                    onUpdate={(content) => field.onChange(content)}
                    className="max-h-[320px] overflow-y-scroll scroll-py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:text-primary"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button type="reset" variant="ghost">
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
