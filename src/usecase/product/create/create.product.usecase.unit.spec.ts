import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";
import { v4 as uuid } from "uuid";
import { InputCreateProductDto } from "./create.product.dto";

describe("Create product unit test", () => {
    
    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    }

    it("should create a new product", async () => {
        const productRepository = MockRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "Product 1",
            price: 25.99
        }

        const result = await createProductUseCase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.price).toBe(input.price);
    });

    // Once we are not mocking ProductFactory.create, this still being an unit test?
    it("should thrown an error when input has a wrong type", async () => {
        const productRepository = MockRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "c",
            name: "Product 1",
            price: 25.99
        }

        await expect(createProductUseCase.execute(input))
            .rejects.toThrowError("Product type not supported");
    });

    // Once we are not mocking ProductFactory.create, this still being an unit test?
    it("should thrown an error when input's name is missing", async () => {
        const productRepository = MockRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "",
            price: 25.99
        }

        await expect(createProductUseCase.execute(input))
            .rejects.toThrowError("Name is required");
    });

    // Once we are not mocking ProductFactory.create, this still being an unit test?
    it("should thrown an error when input's price is negative", async () => {
        const productRepository = MockRepository();

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