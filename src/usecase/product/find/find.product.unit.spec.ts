import {v4 as uuid} from "uuid";
import { FindProductUseCase } from "./find.product.usecase";

describe("Find product use case unit test", ()=>{

    const repositoryFindOutput = {
        id: uuid(),
        name: "Product 1",
        price: "25,01"
    }
    
    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(repositoryFindOutput),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    }

    it("should find a product", async ()=>{
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {id: repositoryFindOutput.id};

        const result = await findProductUseCase.execute(input);

        expect(result.id).toBe(repositoryFindOutput.id);
    });
});