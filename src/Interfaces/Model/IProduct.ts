import { Document } from "mongoose";

type product = {
  user_id: string;
  title: string;
  description: string;
  price: number;
  qty: number;
  offer_price?: number;
  main_image: string;
  images: string[];
};

type getByIdParams = {
  user_id: product["user_id"];
  product_id: string;
};

type getProductParams = {
  user_id: product["user_id"];
  limit: number;
  offset: number;
};

interface IProduct {
  model: unknown;

  create(params: product): Promise<Document>;
  get(params: getProductParams): Promise<Document[]>;
  getById(params: getByIdParams): Promise<Document | null>;
  deleteById(params: getByIdParams): Promise<Document | null>;
}

export { product, getByIdParams, getProductParams, IProduct };
