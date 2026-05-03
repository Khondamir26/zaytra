import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

async function sendToTelegram(data: ContactPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) { console.error("❌ Telegram env vars missing"); return; }

  const text =
    `📬 *New Lead — Binova Labs*\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📧 *Email:* ${data.email}\n` +
    (data.phone    ? `📞 *Phone:* ${data.phone}\n`     : "") +
    (data.company  ? `🏢 *Company:* ${data.company}\n` : "") +
    (data.service  ? `🛠 *Service:* ${data.service}\n`  : "") +
    `\n💬 *Message:*\n${data.message}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}

async function sendToGoogleSheets(data: ContactPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) { console.error("❌ Google Sheets env var missing"); return; }

  const params = new URLSearchParams({
    name:    data.name,
    email:   data.email,
    phone:   data.phone    ?? "",
    company: data.company  ?? "",
    service: data.service  ?? "",
    message: data.message,
    date:    new Date().toISOString(),
  });

  await fetch(`${webhookUrl}?${params.toString()}`, {
    method: "GET",
    redirect: "follow",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await Promise.allSettled([
      sendToTelegram(body),
      sendToGoogleSheets(body),
    ]);

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
