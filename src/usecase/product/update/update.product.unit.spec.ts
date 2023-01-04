import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Update product use case unit test", () => {
    it("should update an existing product", async () => {

        const input = {
            id: "asd",
            name: "Product 1",
            price: 27.55
        };

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(ProductFactory.createWithId(
                    ProductFactory.ProductTypes.TYPE_A,
                    input.id,
                    "other product",
                    155.0)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };

        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const result = await updateProductUseCase.execute(input);

        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.price).toBe(input.price);
    });

    it("should thrown an error if input name is blank", async () => {

        const input = {
            id: "asd",
            name: "",
            price: 27.55
        };

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(ProductFactory.createWithId(
                    ProductFactory.ProductTypes.TYPE_A,
                    input.id,
                    "other product",
                    155.0)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        await expect(updateProductUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error if input price is negative", async () => {

        const input = {
            id: "asd",
            name: "Product 1",
            price: -0.01
        };

        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(ProductFactory.createWithId(
                    ProductFactory.ProductTypes.TYPE_A,
                    input.id,
                    "other product",
                    155.0)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            }
        };
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("Price must be greater than zero");
    });
});