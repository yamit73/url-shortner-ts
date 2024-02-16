import Express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import DB from "./DB";

class Server {
  private _port: any;
  public _app: any;
  constructor() {
    dotenv.config({ path: "./config.env" });
    this._port = process.env.PORT || 8000;
    this._app = Express();
  }

  loadMiddlewares(): Server {
    this._app.use(bodyParser.json());
    return this;
  }

  start() {
    const db = new DB({
      db: process.env.DB_NAME ?? "",
      username: process.env.DB_USER_NAME ?? "",
      password: process.env.DB_PASSWORD ?? "",
      cluster: process.env.DB_CLUSTER ?? "",
    });

    db.connectDb()
      .then(() => {
        console.log("DB connection established!!");
      })
      .catch((err) => {
        console.log("Error connecting to DB: " + err.message);
      });

    this._app.listen(this._port, () => {
      console.log("Server is listening on port: " + this._port);
    });
  }
}

export default Server;
