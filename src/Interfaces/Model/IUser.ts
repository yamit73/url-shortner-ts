import { Document } from "mongoose";

type UserData = {
  email: string;
  password: string;
  created_at?: string;
  phone_number?: string;
  full_name?: string;
  user_id?: string;
};

interface IUser {
  model: unknown;

  create(params: UserData): Promise<Document>;
  getById(userId: string): Promise<Document | null>;
  deleteById(userId: string): Promise<Document | null>;
  getByEmail(email: string): Promise<Document | null>;
}

export { UserData, IUser };
