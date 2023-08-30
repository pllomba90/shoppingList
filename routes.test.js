process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const router = require("./routes");

let items = require("./fakeDb");

let item = {"name": "popcorn", "price":2.50};

beforeEach(() =>{
    items.push(item);
});

afterEach(() =>{
    items.splice(0, items.length);
});

describe("Testing /items routes", () =>{
    test("Should get items", async () =>{
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name": "popcorn", "price":2.50});
    });
    test("Should add item", async () =>{
        const resp = await request(app).post("/items")
        .send({"name":"twizzlers", "price":1.25});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual([{"name": "popcorn", "price":2.50}, 
        {"name":"twizzlers", "price":1.25}]);
    });

    test("Should delete item", async () =>{
        const resp = await request(app).delete("/items/popcorn");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Item deleted"});

    });
    
    test("Should modify item", async () => {
        const resp = (await request(app).patch("/items/popcorn"))
        .send({"name":"twizzlers", "price":1.34});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name":"twizzlers", "price":1.34});
    });


});