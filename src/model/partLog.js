module.exports = (sequelize, DataTypes) => {
    const PartLog = sequelize.define(
        "partLog",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            change: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            part_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false, freezeTableName: true }
    );

    return PartLog;
};