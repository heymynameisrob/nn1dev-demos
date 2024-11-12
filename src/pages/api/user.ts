// API Route Example
// https://nextjs.org/docs/api-routes/introduction
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

import { db, schema } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { ApiReturnType, User } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res.status(401).json({ message: "Unauthenticated. Please login." });
  const userId = session.user.id;

  if (req.method === "POST") {
    await saveData(userId, req.body);
    return res.status(200).json({ ok: true });
  }

  const json = await getData(userId);

  return res.status(200).json(json);
}

async function getData(userId: string): Promise<ApiReturnType<Partial<User>>> {
  try {
    const data = await db
      .select({
        name: schema.users.name,
        email: schema.users.email,
        id: schema.users.id,
      })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .then((res) => res[0]);

    return { data, status: 200 };
  } catch (e) {
    console.error("api/user", (e as Error).message);
    return { data: null, status: 500, error: e as Error };
  }
}

async function saveData(userId: string, data: { email: string; name: string }) {
  try {
    const res = await db
      .insert(schema.users)
      .values({
        ...data,
        id: userId,
      })
      .returning()
      .then((res) => res[0]);
    return { data: res, status: 200 };
  } catch (e) {
    console.error("api/user", (e as Error).message);
    return { data: null, status: 500, error: e as Error };
  }
}
