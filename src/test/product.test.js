import { describe, test, before, after } from 'node:test';
import assert from 'node:assert';
import { fakerES as faker } from '@faker-js/faker';
import config from '../config.js';

const mockProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.hex({ min: 0, max: 6553500 }),
        price: faker.commerce.price(),
        status: true,
        stock: faker.number.int(200),
        category: faker.commerce.department(),
        thumbnails: '[/img1.jpg], [/img2.jpg]',
        owner: 'admin'
    }
}

const apiURL = 'http://localhost:8080/api/products';
const apiURL_Login = 'http://localhost:8080/users/login-api-client';

const client = {
    email: config.CODER_EMAIL,
    password: config.CODER_PASS
}

// Logeo de usuario con credenciales
const loginResponse = async () => {
    return await fetch(apiURL_Login, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    });
}

describe('TEST API - Products', () => {

    before( () => console.log('Comienzo de pruebas') );
    after( () => console.log('Fin de pruebas') );

    test('[GET] /api/products', async () => {
        const response = await fetch(apiURL);
        const responseJson = await response.json();
        const products = responseJson.data.docs;
        assert.strictEqual(Array.isArray(products), true);

    })

    test('[GET] /api/products/:pid', async () => {
        const responseLogin = await loginResponse();
        // Captura de cookies de la respuesta
        const cookie = responseLogin.headers.get('set-cookie');

        const body = mockProducts();
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Cookie": cookie
            },
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();
        const _id = responseJson.data._id;
        const responseGetById = await fetch(apiURL+`/${_id}`);
        const responseGetByIdJSON = await responseGetById.json();
        const _idGet = responseGetByIdJSON.data._id
        assert.strictEqual(_idGet, _id);
    })

    test('[DELETE] /api/products', async () => {
        const responseLogin = await loginResponse();
        // Captura de cookies de la respuesta
        const cookie = responseLogin.headers.get('set-cookie');

        const body = mockProducts();
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Cookie": cookie
            },
            body: JSON.stringify(body)
        });
        const responseJson = await response.json();
        const _id = responseJson.data._id;
        const responseDelete = await fetch(apiURL+`/${_id}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Cookie": cookie
            }
        });
        const responseDeleteJSON = await responseDelete.json();
        assert.strictEqual(responseDeleteJSON.message, 'Success');
    })

});