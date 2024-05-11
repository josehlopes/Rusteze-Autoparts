const PartRepository = require("./src/repository/PartRepository");
const UserRepository = require("./src/repository/UserRepository");
const { faker } = require('@faker-js/faker');

class App {
    constructor() {
    }

    async init() {
        let admin = "admin";
        let client = "client";
        try {
            let partRepository = new PartRepository();
            let userRepository = new UserRepository();

            for (let i = 1; i <= 5; i++) {
                let part = {
                    name: faker.commerce.product(),
                    supplier: faker.company.name(), 
                    stock: faker.number.int({ min: 1, max: 999 }),
                    purchase_price: faker.commerce.price({ min: 100, max: 200 }),
                    sale_value: faker.commerce.price({ min: 130, max: 260 }) 
                };
                await partRepository.add(part);
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

            console.log("Inicializações completadas com sucesso.");
        } catch (error) {
            console.error("Erro na inicialização:", error);
        }
    }
}

const app = new App();
app.init();
