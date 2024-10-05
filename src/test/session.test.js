import { describe, test, before, after } from 'node:test';
import assert from 'node:assert';
import config from '../config.js';

const apiURL = 'http://localhost:8080/api/sessions/current';
const apiURL_Login = 'http://localhost:8080/users/login-api-client';
const client = {
    email: config.CODER_EMAIL,
    password: config.CODER_PASS
}

describe('TEST API - Session', () => {

    before( () => console.log('Comienzo de pruebas') );
    after( () => console.log('Fin de pruebas') );

    test('Error de autenticacion', async () => {
        const response = await fetch(apiURL);
        const responseJson = await response.json();
        assert.notDeepEqual(responseJson.status, 200);
        assert.strictEqual(responseJson.msg, 'Error de autenticacion');
    })

    test('Sesion correcta', async () => {
        
        // Logeo de usuario con credenciales
        const responseLogin = await fetch(apiURL_Login, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        });
        const responseLoginJson = await responseLogin.json();
        assert.strictEqual(responseLoginJson.message, 'Success');

        // Captura de cookies de la respuesta
        const cookie = responseLogin.headers.get('set-cookie');

        const response = await fetch(apiURL, {
            headers: { 
                "Content-Type": "application/json",
                "Cookie": cookie
            }
        });
        const responseJson = await response.json();
        assert.ok(responseJson.user);
    })
})