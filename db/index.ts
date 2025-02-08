import { drizzle } from "drizzle-orm/libsql/web";

export const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL as string,
        authToken: process.env.DATABASE_AUTH_TOKEN as string,
    },
});
