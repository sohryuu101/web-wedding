import { betterAuth } from "better-auth";
import { D1Dialect } from "kysely-d1";
import { Kysely } from "kysely";
import { D1Database } from "@cloudflare/workers-types";

interface DatabaseSchema {
  // Define your D1 database schema types here
  // Example:
  // users: { id: string; email: string };
  // sessions: { id: string; user_id: string; expires_at: Date };
}

export function createAuth(d1: D1Database) {
  return betterAuth({
    database: new Kysely<DatabaseSchema>({
      dialect: new D1Dialect({ database: d1 }),
    }),
    emailAndPassword: { enabled: true },
    // socialProviders: { github: { clientId: "...", clientSecret: "..." } }
  });
}