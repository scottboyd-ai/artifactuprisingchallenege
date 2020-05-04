import {server} from "../../index";
import {createConnection} from "typeorm";
import {Category} from "../../models/Category";
import {Product} from "../../models/Product";
import {Purchase} from "../../models/Purchase";

describe('routes', () => {
    let testServer;

    beforeAll(async () => {
        testServer = server;
        await testServer.start()
        await createConnection({
            name: 'test',
            type: "mysql",
            host: "localhost",
            port: 3308,
            username: "root",
            password: "root",
            database: "au",
            // logging: true,
            entities: [Category, Product, Purchase]
        });
    })

    afterAll(async () => {
        await testServer.stop();
    });

    test('GET /', async () => {
        const res = await testServer.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).toEqual(200);
    });

    test('/products/{categoryId}', async () => {
        const res = await testServer.inject({
            method: 'get',
            url: '/products/' + 'test'
        });
        const jsonPayload = JSON.parse(res.payload);
        expect(jsonPayload).toEqual([]);
    });

    test('/categories', async () => {
        const res = await testServer.inject({
            method: 'get',
            url: '/categories'
        });
        const jsonPayload = JSON.parse(res.payload);
        expect(jsonPayload.length).toEqual(3);
    });
});