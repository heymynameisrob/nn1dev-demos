import { z } from "zod";
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";

import { getAuthDetails } from "@/lib/server";

import type { Comment } from "@/stores/posts";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  // Increase for expensive or long functions (e.g AI)
  maxDuration: 15,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  /** Make sure token exists and is passed with request */
  const { token, orgId } = getAuthDetails(req);

  if (!token || !orgId)
    return res.status(401).json({ message: "No AI! Denied!" });

  const oai = new OpenAI({
    apiKey: token ?? undefined,
    organization: orgId ?? undefined,
  });

  const client = Instructor({
    client: oai,
    mode: "TOOLS",
  });

  const ResolveSchema = z.object({
    content: z.string(),
  });

  const { comments, post } = req.body;

  const resolved = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Read through these comments to this post and describe a resolution based on what's been decided.

        Keep it simple referencing who made what decision. Just respond with simple bullet-points.

        Format your response in Markdown.

        <example-format>
          - Rob said this
          - Harriet said that
          - This was decided
        </example-format>

        <original-post>
          Author: ${post.author}
          Content: ${post.content}
        </original-post>
        <comments>${comments
          .map((comment: Comment) =>
            Object.entries(comment)
              .map(([key, value]) => `${key}:${value}`)
              .join("\n"),
          )
          .join("\n\n")}</comments>

        If you can't find a clear resolution, say there is no clear resolution.
        `,
      },
    ],
    model: "gpt-4o-mini",
    response_model: { schema: ResolveSchema, name: "Resolve" },
    max_retries: 3,
  });

  return res.status(200).json({ ...resolved, date: new Date().toISOString() });
}
