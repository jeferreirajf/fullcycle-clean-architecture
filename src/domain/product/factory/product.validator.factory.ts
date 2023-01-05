import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductBYupValidator from "../validator/product-b.yup.validator";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory{
    public static create() : ValidatorInterface<Product>{
        return new ProductYupValidator();
    }

    public static createB() : ValidatorInterface<ProductB>{
        return new ProductBYupValidator();
    }
}