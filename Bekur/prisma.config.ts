import { defineConfig, env } from "@prisma/config"

export default defineConfig({
  schema: "./schema.prisma",
  datasource: {
    db: {
      url: env("DATABASE_URL"),
    },
  } as any,
})
