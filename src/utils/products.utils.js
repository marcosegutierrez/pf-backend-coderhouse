import { faker } from '@faker-js/faker/locale/es';

export const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(10),
        code: faker.number.hex(16777215),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.department(),
        thumbnails: ["/Img1.png", "/Img2.png"]
    }
}
