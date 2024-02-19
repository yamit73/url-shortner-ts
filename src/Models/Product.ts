import mongoose, { Schema, Document } from "mongoose";
import * as ProductInterface from "../Interfaces/Model/IProduct";

class Product implements ProductInterface.IProduct {
  model;

  constructor() {
    this.model = this.createModel();
  }

  async create(product: ProductInterface.product): Promise<Document> {
    try {
      const data = await this.model.create(product);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async get(params: ProductInterface.getProductParams): Promise<Document[]> {
    try {
      const products = await this.model.find(
        {
          user_id: params.user_id,
        },
        { limit: params.limit, skip: params.offset }
      );
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getById(
    params: ProductInterface.getByIdParams
  ): Promise<Document | null> {
    try {
      const product = await this.model.findById({
        user_id: params.user_id,
        product_id: params.product_id,
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(
    params: ProductInterface.getByIdParams
  ): Promise<Document | null> {
    try {
      const response = await this.model.findOneAndDelete({
        user_id: params.user_id,
        product_id: params.product_id,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  private createModel() {
    const productSchema = new Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      offer_price: {
        type: Number,
      },
      main_image: {
        type: String,
      },
      images: {
        type: [String],
      },
    });
    return mongoose.model("products", productSchema);
  }
}

export default Product;
