import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("List product use case unit test", ()=>{
    const product1 = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 1", 1.00);
    const product2 = ProductFactory.create(ProductFactory.ProductTypes.TYPE_A, "Product 2", 2.00);

    const MockRepository = ()=>{
        return {
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
        }
    }

    it("should return a list of products", async ()=>{
        const productRepository = MockRepository();
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