// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";           // default import of the entire module
import * as schema from "../shared/schema";

const { Pool } = pg;          // destructure Pool from the default export

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

export const db = drizzle(pool, { schema });
