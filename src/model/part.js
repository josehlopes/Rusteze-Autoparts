module.exports = (sequelize, DataTypes) => {
    const Part = sequelize.define(
      "part",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        supplier: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        purchase_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        sale_value: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        imgSrc: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        
      },
      { timestamps: true, freezeTableName: true }
    );
  
    return Part;
  };