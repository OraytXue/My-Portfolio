import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { visitorStats } from "@/db/schema";

export const runtime = "nodejs";

const COOKIE_NAME = "visitor_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function POST() {
  try {
    const cookieStore = await cookies();
    let visitorId = cookieStore.get(COOKIE_NAME)?.value;
    const isNewVisitor = !visitorId;

    if (!visitorId) {
      visitorId = randomUUID();
    }

    if (isNewVisitor) {
      await db
        .insert(visitorStats)
        .values({ visitorId })
        .onConflictDoNothing({ target: visitorStats.visitorId });
    } else {
      const updated = await db
        .update(visitorStats)
        .set({
          lastVisitAt: new Date(),
          visitCount: sql`${visitorStats.visitCount} + 1`,
        })
        .where(eq(visitorStats.visitorId, visitorId))
        .returning({ id: visitorStats.id });

      // Cookie existed but the row was missing (e.g. DB reset) — treat as new.
      if (updated.length === 0) {
        await db
          .insert(visitorStats)
          .values({ visitorId })
          .onConflictDoNothing({ target: visitorStats.visitorId });
      }
    }

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(visitorStats);

    const response = NextResponse.json({ uniqueVisitors: count });

    response.cookies.set(COOKIE_NAME, visitorId, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("[/api/visit] Failed to record visit:", error);
    return NextResponse.json({ error: "Failed to record visit." }, { status: 500 });
  }
}