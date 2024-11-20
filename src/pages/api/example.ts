import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  // Increase for expensive or long functions (e.g AI)
  maxDuration: 5,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return res.status(200).json({});
}
