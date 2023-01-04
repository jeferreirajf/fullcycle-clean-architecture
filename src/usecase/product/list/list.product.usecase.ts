import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepositoru: ProductRepositoryInterface) {
        this.productRepository = productRepositoru;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return this.outputMapper(products);
    }

    private outputMapper(products: ProductInterface[]): OutputListProductDto {
        return {
            products: products.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }),
        };
    }
}