import { betterAuth } from "better-auth";
import { Kysely } from "kysely";
import { SqliteDialect } from "kysely/dist/cjs/dialect/sqlite/sqlite-dialect";
import Database from "better-sqlite3";

interface KvTable {
  key: string;
  value: string;
}
interface DatabaseSchema {
  kv: KvTable;
}

const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: new Database("./sqlite.db"),
  }),
});

const auth = betterAuth({
  database: db,
});

export default auth; 