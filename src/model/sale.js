module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define(
        "sale",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            total: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        { timestamps: true, freezeTableName: true }
    );

    return Sale;
};