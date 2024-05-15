const { SaleItem } = require("../data/dbContext");

class SaleItemRepository {
    constructor() { }

    async add(req) {
        const {data} = req;
        try {
            const row = await SaleItem.create(data);
            return row;
        } catch (error) {
            throw new Error('Erro ao criar o usuário');
        }
    }

    async getSaleItemById(id) {
        try {
            const row = await SaleItem(Sequelize, DataTypes).findByPk(id);
            return row;
        } catch (error) {
            throw new Error('Erro ao encontrar o usuário');
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedSaleItem] = await SaleItem.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) throw new Error('Usuário não encontrado');
            return updatedSaleItem[0];
        } catch (error) {
            throw new Error('Erro ao atualizar o usuário');
        }
    }

    async delete(id) {
        try {
            const deletedRowCount = await SaleItem.destroy({
                where: { id }
            });
            if (deletedRowCount === 0) throw new Error('Usuário não encontrado');
        } catch (error) {
            throw new Error('Erro ao excluir o usuário');
        }
    }

    async getAll() {
        try {
            const rows = await SaleItem.findAll();
            return rows;
        } catch (error) {
            throw new Error('Erro ao obter todos os admins');
        }
    }
}

module.exports = SaleItemRepository;