import Sequelize from "sequelize";

const sequelize = new Sequelize("slack_clone", "postgres", "postgres");

const models = {
  user: sequelize.import("./users"),
  channel: sequelize.import("./channel"),
  member: sequelize.import("./member"),
  team: sequelize.import("./team"),
  message: sequelize.import("./message")
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
