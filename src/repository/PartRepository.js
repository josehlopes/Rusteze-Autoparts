const { Part } = require("../data/dbContext");

class PartRepository {
    constructor() { }

    async add(req) {
        const {data} = req;

        try {
            const row = await Part.create(data);
            return row;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar um admin');
        }
    }
    async test(data) {
        try {
            const row = await Part.create(data);
            return row;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar uma parte');
        }
    }

    async getPartById(id) {
        try {
            const product = await Part.findOne({
                where: { id },
            });
            return product;
        } catch (error) {
            console.error('Erro ao buscar peça por ID:', error);
            throw new Error('Erro ao encontrar a peça no banco de dados');
        }
    }

    async update(req) {
        const {id, data} = req;
        try {
            const [updatedRowsCount, updatedPart] = await Part.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) throw new Error('Admin não encontrado');
            return updatedPart[0];
        } catch (error) {
            console.error("Erro ao atualizar peças:", error);
            throw new Error('Erro ao atualizar o admin');
        }
    }

    async delete(req) {
        const {id} = req;
        try {
            const deletedRowCount = await Part.destroy({
                where: { id },
                returning: true,
            });
            if (deletedRowCount === 0) throw new Error('Admin não encontrado');
        } catch (error) {
            throw new Error('Erro ao excluir o admin');
        }
    }

    async getAll() {
        try {
            const rows = await Part.findAll();
            return rows;
        } catch (error) {
            throw new Error('Erro ao obter todos os admins');
        }
    }
}

module.exports = PartRepository;