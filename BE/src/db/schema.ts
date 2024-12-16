import { sqliteTable } from "drizzle-orm/sqlite-core";
import { text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
        user_name: text().notNull().unique(),
        password: text().notNull(),
        imagePath: text().default(""),
    }
)