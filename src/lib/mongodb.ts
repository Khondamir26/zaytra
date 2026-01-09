import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_VENDOR_APPLICATION_URI = process.env.MONGODB_VENDOR_APPLICATION_URI!;

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');
if (!MONGODB_VENDOR_APPLICATION_URI) throw new Error('Please define the MONGODB_VENDOR_APPLICATION_URI environment variable');

interface GlobalWithMongoose {
  mongooseContacts: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
  mongooseVendors: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare const global: GlobalWithMongoose;

const cachedContacts = global.mongooseContacts ??= { conn: null, promise: null };
const cachedVendors = global.mongooseVendors ??= { conn: null, promise: null };

// Contacts DB
export async function connectDB() {
  if (cachedContacts.conn) return cachedContacts.conn;

  if (!cachedContacts.promise) {
    cachedContacts.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cachedContacts.conn = await cachedContacts.promise;
  } catch (e) {
    cachedContacts.promise = null;
    throw e;
  }

  return cachedContacts.conn;
}

// Vendor DB
export async function connectVendorDB() {
  if (cachedVendors.conn) return cachedVendors.conn;

  if (!cachedVendors.promise) {
    cachedVendors.promise = mongoose.connect(MONGODB_VENDOR_APPLICATION_URI, { bufferCommands: false });
  }

  try {
    cachedVendors.conn = await cachedVendors.promise;
  } catch (e) {
    cachedVendors.promise = null;
    throw e;
  }

  return cachedVendors.conn;
}
