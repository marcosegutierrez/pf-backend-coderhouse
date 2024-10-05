import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}

export const hasBeenMoreThanXTime = (lastConnectionDate) => {
    const dateNow = new Date();
    const diffMs = dateNow - lastConnectionDate;
    const hours48Ms = 48 * 60 * 60 * 1000; //48hs en ms
    const minutes3 = 3 * 60 * 1000; // 3m en ms
    return diffMs > hours48Ms; //diferencia es mayor a 48hs en ms
};

export const readDir = () => {
    const docsPath = path.join(__dirname, "/docs");
    fs.readdir(docsPath, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta:', err);
        } else {
            console.log('Archivos en src/docs:', files);
        }
    });
}