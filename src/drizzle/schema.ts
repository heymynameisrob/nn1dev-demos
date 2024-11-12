import {
  text,
  pgTableCreator,
  date,
  serial,
  uuid,
  foreignKey,
  boolean,
  customType,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const pgTable = pgTableCreator((name) => `nextstarter_${name}`);

/**
 * Setup for Magic Link login
 * User entry only created after onboarding (first sign-in)
 */
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique(),
  image: text("image"),
});

export const posts = pgTable(
  "posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: text(),
    date: date().defaultNow(),
    content: text(),
    user: text("user_id"),
    pubic: boolean().default(false),
  },
  (table) => {
    return {
      postsUserIdFkey: foreignKey({
        columns: [table.user],
        foreignColumns: [users.id],
        name: "posts_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
    };
  },
);
