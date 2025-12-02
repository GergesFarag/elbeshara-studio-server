import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
export class DB {
  static isConnected: boolean = false;
  static configService: ConfigService;
  constructor(private configService: ConfigService) {
    DB.configService = configService;
  }
  static async connect() {
    const uri = this.configService.get<string>('MONGO_URI');
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    const db = await mongoose.connect(uri);
    DB.isConnected =
      db.connections[0].readyState === mongoose.ConnectionStates.connected;
    console.log('MongoDB Connected:', DB.isConnected);
  }
}
