import mongoose, { Connection } from "mongoose";

const MONGODB_NEWSLETTER_URI = process.env.MONGODB_NEWSLETTER_URI!;

if (!MONGODB_NEWSLETTER_URI) {
  throw new Error("Please define the MONGODB_NEWSLETTER_URI environment variable");
}

declare global {
  var mongooseNewsletter: Connection | null;
}

let cached = global.mongooseNewsletter || null;

async function connectNewsletterDB(): Promise<Connection> {
  if (cached && cached.readyState === 1) {
    return cached;
  }

  const connection = await mongoose.createConnection(MONGODB_NEWSLETTER_URI, {
    dbName: "newsletter",
    bufferCommands: false,
  }).asPromise();

  global.mongooseNewsletter = connection;
  return connection;
}

export default connectNewsletterDB;
