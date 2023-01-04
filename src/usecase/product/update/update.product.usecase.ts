import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto>{
        let productFromDb : ProductInterface;
        
        try{
            productFromDb = await this.productRepository.find(input.id);
        }
        catch(error){
            throw new Error("Product not found");
        }

        productFromDb.changeName(input.name);
        productFromDb.changePrice(input.price);

        await this.productRepository.update(productFromDb);

        return {
            id: productFromDb.id,
            name: productFromDb.name,
            price: productFromDb.price
        };
    }
}