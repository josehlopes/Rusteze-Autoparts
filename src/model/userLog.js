module.exports = (sequelize, DataTypes) => {
    const UserLog = sequelize.define(
        "userLog",
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
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false, freezeTableName: true }
    );

    return UserLog;
};