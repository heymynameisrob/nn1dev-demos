import ky from "ky";

export const REVALIDATE_WEEK = 604800000; // 7 days
export const REVALIDATE_DAY = 86400000; // 24 hours
export const REVALIDATE_HOUR = 3600000; // 60 minutes
export const REVALIDATE_MIN = 60000; // 1 min

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (req) => {
        console.log("Requesting", req.url);
        const token = localStorage.getItem("openai_token");
        const org = localStorage.getItem("openai_org_id");
        if (token) req.headers.set("Authorization", `Bearer ${token}`);
        if (org) req.headers.set("OpenAI-Organization", org);
      },
    ],
    afterResponse: [(req) => console.log("Responded", req.url)],
  },
});
