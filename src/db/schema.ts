import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const visitorStats = pgTable("visitor_stats", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull().unique(),
  firstVisitAt: timestamp("first_visit_at", { withTimezone: true }).defaultNow().notNull(),
  lastVisitAt: timestamp("last_visit_at", { withTimezone: true }).defaultNow().notNull(),
  visitCount: integer("visit_count").default(1).notNull(),
});