import { createServerFn } from "@tanstack/react-start";
import { applicationSchema } from "./recruitment";

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Applications are temporarily unavailable. Please try again shortly.");
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const id = crypto.randomUUID();
    const { error } = await client.from("recruitment_applications").insert({ ...data, id });
    if (error) {
      if (error.code === "23505") throw new Error("An application has already been submitted with this email.");
      throw new Error("Your application could not be saved. Please try again shortly.");
    }
    return { reference: id.slice(0, 8).toUpperCase(), name: data.name, role: data.role };
  });