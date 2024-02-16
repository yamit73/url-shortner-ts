import mongoose from "mongoose";
import { DbInfo, DB as IDB } from "./Interfaces/DB";

class DB implements IDB {
  _db: string;
  _connection: any;
  _cluster: string;
  _username: string;
  _password: string;

  constructor(dbInfo: DbInfo) {
    this._db = dbInfo.db;
    this._cluster = dbInfo.db;
    this._username = dbInfo.username;
    this._password = dbInfo.password;
  }

  async connectDb(): Promise<object> {
    try {
      if (this._connection !== null) {
        return this._connection;
      }
      const url = `mongodb+srv:${this._username}:${this._password}@${this._cluster}/${this._db}`;
      const maxRetry = 3;
      let retry = 1;
      while (retry < maxRetry) {
        const connection = await mongoose.connect(url);
        if (connection) {
          this._connection = connection;
          return this._connection;
        }
        retry++;
      }
      return this._connection;
    } catch (err) {
      throw err;
    }
  }
}

export default DB;
