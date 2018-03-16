export default (sequelize, DataTypes) => {
  const Team = sequelize.define("teams", {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Team.associate = models => {
    // n:m
    Team.belongsToMany(models.User, {
      through: "member",
      foreignKey: { name: "teamId", field: "team_id" }
    });
    // 1:1
    Team.belongsTo(models.User, {
      foreignKey: "owner"
    });
  };

  return Team;
};
