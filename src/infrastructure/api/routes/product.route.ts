import express, { NextFunction, Request, response, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { FindProductUseCase } from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response, next: NextFunction) => {

    const productRepository = new ProductRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    try {
        const inputCreateProductDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const result = await productUseCase.execute(inputCreateProductDto);

        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }

});

productRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    try {
        const result = await listProductUseCase.execute({});
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});

productRoute.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const productRepository = new ProductRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    try {
        const productId = req.params.id;
        const result = await productFindUseCase.execute({ id: productId });
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});