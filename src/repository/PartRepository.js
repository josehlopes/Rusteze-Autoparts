const { Part } = require("../data/dbContext");

class PartRepository {
    constructor() { }

    async add(part) {
        try {
            const row = await Part.create(part);
            return row;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar um admin');
        }
    }

    async getPartById(id) {
        try {
            const row = await Part(Sequelize, DataTypes).findByPk(id);
            return row;
        } catch (error) {
            throw new Error('Erro ao encontrar o admin');
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedPart] = await Part.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) throw new Error('Admin não encontrado');
            return updatedPart[0];
        } catch (error) {
            throw new Error('Erro ao atualizar o admin');
        }
    }

    async delete(id) {
        try {
            const deletedRowCount = await Part.destroy({
                where: { id }
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