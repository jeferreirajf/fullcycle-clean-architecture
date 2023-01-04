import { Sequelize } from "sequelize-typescript";
import { number, string } from "yup";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration create product user case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () =>{
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "Product 1",
            price: 25.01
        }

        const result = await createProductUseCase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.price).toBe(input.price);
    });

    it("should thrown an error when input has a wrong type", async () =>{
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "c",
            name: "Product 1",
            price: 25.01
        }

        await expect(createProductUseCase.execute(input))
            .rejects.toThrowError("Product type not supported");
    });

    it("should thrown an error when input's name is missing", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "",
            price: 25.01
        }

        await expect(createProductUseCase.execute(input))
            .rejects.toThrowError("Name is required");
    });

    it("should thrown an error when input's price is negative", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "Product 1",
            price: -1
        }

        await expect(createProductUseCase.execute(input))
            .rejects.toThrowError("Price must be greater than zero");
    });
});