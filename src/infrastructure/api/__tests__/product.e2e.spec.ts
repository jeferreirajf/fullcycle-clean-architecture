import { response } from "express";
import request from "supertest";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { app, sequelize } from "../express";

describe("E2E tests for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: ProductFactory.ProductTypes.TYPE_A,
                name: "Product 1",
                price: 27.99
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(27.99);
    });

    it("should thrown an error if input name is blank", async ()=>{
        const response = await request(app)
            .post("/product")
            .send({
                type: ProductFactory.ProductTypes.TYPE_A,
                name: "",
                price: 27.99
            });

        expect(response.status).toBe(500);
        expect(response.text).toContain("Name is required");
    });

    it("should throw an error if input price is negative", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: ProductFactory.ProductTypes.TYPE_A,
                name: "Product 1",
                price: -1
            });

            expect(response.status).toBe(500);
            expect(response.text).toContain("Price must be greater than zero");
    });

    it("should get an specified product", async () => {
        
        const createProductResponse = await request(app)
            .post("/product")
            .send({
                type: ProductFactory.ProductTypes.TYPE_A,
                name: "Product 1",
                price: 27.99
            });
        
        const findProductResponse = await request(app)
            .get("/product/" + createProductResponse.body.id);

        expect(findProductResponse.body.id).toBe(createProductResponse.body.id);
        expect(findProductResponse.body.name).toBe(createProductResponse.body.name);
        expect(createProductResponse.body.price).toBe(findProductResponse.body.price);
    });

    it("should thrown an error if try to find an inexisting id", async()=>{
        const createProductResponse = await request(app)
            .post("/product")
            .send({
                type: ProductFactory.ProductTypes.TYPE_A,
                name: "Product 1",
                price: 27.99
            });
        
        const findProductResponse = await request(app)
            .get("/product/inexisting-id");

        expect(findProductResponse.status).toBe(500);
    });

    it("should list all products", async () =>{
        const createProduct1Response = await request(app)
        .post("/product")
        .send({
            type: ProductFactory.ProductTypes.TYPE_A,
            name: "Product 1",
            price: 27.99
        });

        const createProduct2Response = await request(app)
        .post("/product")
        .send({
            type: ProductFactory.ProductTypes.TYPE_B,
            name: "Product 2",
            price: 1.01
        });

        const listProductResponse = await request(app)
            .get("/product");

        expect(listProductResponse.body.products.length).toBe(2);
        expect(listProductResponse.body.products[0].id).toBe(createProduct1Response.body.id);
        expect(listProductResponse.body.products[0].name).toBe(createProduct1Response.body.name);
        expect(listProductResponse.body.products[0].price).toBe(createProduct1Response.body.price);
        expect(listProductResponse.body.products[1].id).toBe(createProduct2Response.body.id);
        expect(listProductResponse.body.products[1].name).toBe(createProduct2Response.body.name);
        expect(listProductResponse.body.products[1].price).toBe(createProduct2Response.body.price);
    });

    it("should return an empty products list", async () =>{
        const listProductsResponse = await request(app).
            get("/product");

        expect(listProductsResponse.body.products.length).toBe(0);
    });
});