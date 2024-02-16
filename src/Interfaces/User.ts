type user = {
  email: string;
  password: string;
  name: string;
};

interface User {
  getUser(req: any, res: any): any;
  deleteUser(req: any, res: any): any;
}
