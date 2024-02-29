import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserData } from "../Interfaces/Model/IUser";

class User implements IUser {
  model;

  constructor() {
    this.model = this.createModel();
  }
  async create(params: UserData) {
    try {
      const user = await this.model.create(params);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.model.findOne({ "email": email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getById(userId: string) {
    try {
      const user = await this.model.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(userId: string) {
    try {
      const user = await this.model.findOneAndDelete({ _id: userId });
      return user;
    } catch (error) {
      throw error;
    }
  }

  private createModel() {
    const userSchema = new Schema(
      {
        user_id: {
          type: String,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      }
    );
    return mongoose.model("users", userSchema);
  }
}

export { User };
