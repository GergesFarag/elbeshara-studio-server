import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(uri: string) {
  if (cached.conn) {
    console.log('Connection Retrieved!');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connection Stablished!');
    cached.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
