const { Sale } = require("../data/dbContext");

class SaleRepository {
    constructor() { }

    async add(req) {
        const {data} = req;
        try {
          const sale = await Sale.create(data);
          return sale;
        } catch (error) {
          console.error('Erro ao criar a venda:', error);
          throw new Error('Erro ao criar a venda');
        }
      }

    async getSaleById(id) {
        try {
            const row = await Sale(Sequelize, DataTypes).findByPk(id);
            return row;
        } catch (error) {
            throw new Error('Erro ao encontrar o usuário');
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedSale] = await Sale.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) throw new Error('Usuário não encontrado');
            return updatedSale[0];
        } catch (error) {
            throw new Error('Erro ao atualizar o usuário');
        }
    }

    async delete(id) {
        try {
            const deletedRowCount = await Sale.destroy({
                where: { id }
            });
            if (deletedRowCount === 0) throw new Error('Usuário não encontrado');
        } catch (error) {
            throw new Error('Erro ao excluir o usuário');
        }
    }

    async getAll() {
        try {
            const rows = await Sale.findAll();
            return rows;
        } catch (error) {
            throw new Error('Erro ao obter todos os admins');
        }
    }
}

module.exports = SaleRepository;