import { describe, test, before, after } from 'node:test';
import assert from 'node:assert';

const apiURL = 'http://localhost:8080/api/carts';

describe('TEST API - Carts', () => {
    
    before( () => console.log('Comienzo de pruebas') );
    after( () => console.log('Fin de pruebas') );

    test('[GET] /api/carts', async () => {
        const response = await fetch(apiURL);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson.data), true);
    })

    test('[GET] /api/carts/:cid', async () => {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        });
        const responseJson = await response.json();
        const { _id } = responseJson.data;
        const responseGetById = await fetch(apiURL+`/${_id}`);
        const responseGetByIdJSON = await responseGetById.json();
        assert.ok(responseGetByIdJSON, 'data')
    })

    test('[DELETE] /api/carts', async () => {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        });
        const responseJson = await response.json();
        const { _id } = responseJson.data;
        const responseDelete = await fetch(apiURL+`/${_id}`, {method: 'DELETE'});
        const responseDeleteJSON = await responseDelete.json();
        assert.strictEqual(responseDeleteJSON.message, 'Success');
    })
})