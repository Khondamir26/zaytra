import { NextResponse } from "next/server";
import connectNewsletterDB from "@/lib/mongodb-newsletter";
import mongoose, { Connection } from "mongoose";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const db: Connection = await connectNewsletterDB(); // ⬅️ теперь точно типизировано

    // ⬇️ схема должна быть создана заново при каждом запросе
    const SubscriberSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      createdAt: { type: Date, default: Date.now },
    });

    // ⬇️ проверяем, есть ли модель уже в подключении db
    const Subscriber =
      db.models.Subscriber || db.model("Subscriber", SubscriberSchema);

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already subscribed" }, { status: 409 });
    }

    await Subscriber.create({ email });
    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Server error:", error.message);
    return NextResponse.json({ message: "Server error: " + error.message }, { status: 500 });
  }
}
