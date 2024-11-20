import { z } from "zod";
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";

import { getAuthDetails } from "@/lib/server";

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

  const isEmojiRegex = /\p{Extended_Pictographic}/u;
  const EmojiSchema = z.object({
    emoji: z
      .string()
      .refine((str) => isEmojiRegex.test(str), "Must be a single emoji"),
  });

  const { prompt } = req.body;

  const emoji = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Return an appropriate emoji based on this title: ${prompt}`,
      },
    ],
    model: "gpt-3.5-turbo",
    response_model: { schema: EmojiSchema, name: "Emoji" },
    max_retries: 3,
  });

  return res.status(200).json(emoji);
}
