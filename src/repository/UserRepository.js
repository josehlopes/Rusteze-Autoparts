const { User } = require("../data/dbContext");

class UserRepository {
    constructor() { }

    async add(user) {
        try {
            const row = await User.create(user);
            return row;
        } catch (error) {
            throw new Error('Erro ao criar o usuário');
        }
    }

    async getUserById(id) {
        try {
            const row = await User(Sequelize, DataTypes).findByPk(id);
            return row;
        } catch (error) {
            throw new Error('Erro ao encontrar o usuário');
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedUser] = await User.update(data, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) throw new Error('Usuário não encontrado');
            return updatedUser[0];
        } catch (error) {
            throw new Error('Erro ao atualizar o usuário');
        }
    }

    async delete(id) {
        try {
            const deletedRowCount = await User.destroy({
                where: { id }
            });
            if (deletedRowCount === 0) throw new Error('Usuário não encontrado');
        } catch (error) {
            throw new Error('Erro ao excluir o usuário');
        }
    }

    async getAll() {
        try {
            const rows = await User.findAll();
            return rows;
        } catch (error) {
            throw new Error('Erro ao obter todos os admins');
        }
    }
}

module.exports = UserRepository;