module.exports = (sequelize, DataTypes) => {
    const SaleItem = sequelize.define(
      "saleItem",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        part_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sale_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false, freezeTableName: true }
    );
  
    return SaleItem;
  };