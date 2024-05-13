const PartRepository = require("./src/repository/PartRepository");
const UserRepository = require("./src/repository/UserRepository");
const { faker } = require('@faker-js/faker');

class App {
    constructor() {
    }

    async init() {
        let admin = "admin";
        let client = "client";
        const paths = [
            '../img/item/bomba.jpg',
            '../img/item/cadeirinha.jpg',
            '../img/item/cambio.jpg',
            '../img/item/canetavidro.jpg',
            '../img/item/carregador.jpg',
            '../img/item/cheirinho.jpg',
            '../img/item/motor.jpg',
            '../img/item/roda.jpg',
            '../img/item/roda2.jpg',
            '../img/item/vidros.jpg'
        ];
        
        
        try {
            let partRepository = await new PartRepository();
            let userRepository = await new UserRepository();

            for (let i = 1; i <= 5; i++) {
                const randomPathIndex = Math.floor(Math.random() * paths.length);
                const randomPath = paths[randomPathIndex];
                let part = {
                    name: faker.commerce.product(),
                    supplier: faker.company.name(), 
                    stock: faker.number.int({ min: 1, max: 999 }),
                    purchase_price: faker.commerce.price({ min: 100, max: 200 }),
                    sale_value: faker.commerce.price({ min: 130, max: 260 }) ,
                    imgSrc: randomPath
                };
                await partRepository.test(part);
                console.log(`Parte "${part.name}" adicionada com sucesso.`);
            }

            for (let i = 1; i <= 5; i++) {
                let user = {
                    name: faker.person.fullName(),
                    function: Math.random() < 0.5 ? admin : client
                };
                await userRepository.add(user);
                console.log(`Usuário "${user.name}" adicionado com sucesso.`);
            }

        } catch (error) {
            console.error("Erro na inicialização:", error);
        }
    }
}

const app = new App();
app.init();
