import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Получаем agentId из URL
  const url = new URL(req.url);
  const agentId = url.pathname.split("/").pop(); // последний сегмент пути

  const body = await req.json();

  try {
    const res = await fetch(`https://api.zaytra.ai/agents/${agentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Если нужен API ключ:
        // "Authorization": `Bearer ${process.env.ZAYTRA_API_KEY}`
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
