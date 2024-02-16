type DbInfo = {
  db: string;
  cluster: string;
  username: string;
  password: string;
};

interface DB {
  _db: string;
  _connection: any;
  _cluster: string;
  _username: string;
  _password: string;

  connectDb(): object;
}

export { DbInfo, DB };
