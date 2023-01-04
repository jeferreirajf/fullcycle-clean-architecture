import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Integration find product user case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 1", 25.10);

        await productRepository.create(product);

        const input = {
            id: product.id
        };

        const result = await findProductUseCase.execute(input);

        expect(result.id).toBe(product.id);
        expect(result.name).toBe(product.name);
        expect(result.price).toBe(product.price);
    });

    it("should throw an error if id is not defined", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 1", 25.10);

        await productRepository.create(product);

        await expect(findProductUseCase.execute({ id: undefined })).rejects.toThrow('WHERE parameter "id" has invalid "undefined" value');
    });

    it("should throw an error if id are not present", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 1", 25.10);

        await productRepository.create(product);

        await expect(findProductUseCase.execute({ id: "asd" })).rejects.toThrow("Cannot read properties of null (reading 'id')");
    });
});
