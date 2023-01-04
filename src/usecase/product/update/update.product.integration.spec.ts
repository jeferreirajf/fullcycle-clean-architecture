import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Update product use case integration test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update an existing product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const existingProduct = ProductFactory.create(
            ProductFactory.ProductTypes.TYPE_A,
            "Product 1",
            27.00);

        await productRepository.create(existingProduct);

        const input = {
            id: existingProduct.id,
            name: "Product name changed",
            price: 5.00
        };

        await updateProductUseCase.execute(input);

        const updatedProduct = await productRepository.find(input.id);

        expect(updatedProduct.id).toBe(input.id);
        expect(updatedProduct.name).toBe(input.name);
        expect(updatedProduct.price).toBe(input.price);
    });

    it("should thrown an error if input id is not found", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const existingProduct = ProductFactory.create(
            ProductFactory.ProductTypes.TYPE_A,
            "Product 1",
            27.00);

        await productRepository.create(existingProduct);

        const input = {
            id: "inexisting id",
            name: "Product name changed",
            price: 5.00
        };

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("Product not found");
    });

    it("should thrown an error if input name is blank", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const existingProduct = ProductFactory.create(
            ProductFactory.ProductTypes.TYPE_A,
            "Product 1",
            27.00);

        await productRepository.create(existingProduct);

        const input = {
            id: existingProduct.id,
            name: "",
            price: 5.00
        };

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("Name is required");
    });

    it("should thrown an error if input price is negative", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const existingProduct = ProductFactory.create(
            ProductFactory.ProductTypes.TYPE_A,
            "Product 1",
            27.00);

        await productRepository.create(existingProduct);

        const input = {
            id: existingProduct.id,
            name: "Product name changed",
            price: -0.01
        };

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("Price must be greater than zero");
    });
});