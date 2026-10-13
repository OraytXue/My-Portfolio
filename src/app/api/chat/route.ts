import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/chatbot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const message = typeof body?.message === "string" ? body.message : "";

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Simulate a brief thinking delay for a more natural chat feel.
    await new Promise((resolve) => setTimeout(resolve, 250));

    const reply = getChatReply(message.slice(0, 500));

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong processing your message." },
      { status: 500 }
    );
  }
}
