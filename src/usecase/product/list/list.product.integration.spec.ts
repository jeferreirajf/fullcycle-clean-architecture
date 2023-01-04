import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { sequelize } from "../../../infrastructure/api/express";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration list product test", () => {
    beforeAll(async ()=>{
        const sequelize = new Sequelize({
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

    it("should list all products", async () => {
        const product1 = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 1", 1.00);
        const product2 = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 2", 2.00);

        const productRepository = new ProductRepository();

        await productRepository.create(product1);
        await productRepository.create(product2);

        const listProductUseCase = new ListProductUseCase(productRepository);

        const result = await listProductUseCase.execute({});

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });
});