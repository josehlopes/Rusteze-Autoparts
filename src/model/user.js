module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
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
        function: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { timestamps: false, freezeTableName: true }
    );
  
    return User;
  };