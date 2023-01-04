import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {

  static ProductTypes = {
    TYPE_A: "a",
    TYPE_B: "b"
  }

  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case this.ProductTypes.TYPE_A:
        return new Product(uuid(), name, price);
      case this.ProductTypes.TYPE_B:
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }

  public static createWithId(type: string, id: string, name: string, price: number):ProductInterface{
    switch (type) {
      case this.ProductTypes.TYPE_A:
        return new Product(id, name, price);
      case this.ProductTypes.TYPE_B:
        return new ProductB(id, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
