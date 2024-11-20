import { NextApiRequest } from "next/types";

/** Uses locally stored tokens for security. If you're running locally just use env variables. */
export const getAuthDetails = (req: NextApiRequest) => {
  if (process.env.NODE_ENV === "development") {
    return {
      token: process.env.OPENAI_API_KEY,
      orgId: process.env.OPENAI_ORG_ID,
    };
  }

  const auth = req.headers.authorization;

  if (!auth) return { token: undefined, orgId: undefined };

  const token = auth.split(" ")[1];
  const orgId = req.headers["openai-organization"] as string;

  return { token: token ?? undefined, orgId: orgId ?? undefined };
};
