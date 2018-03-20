import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.TEST_DB || "slack_clone",
  "postgres",
  "postgres",
  {
    dialect: "postgres",
    define: {
      underscored: true
    }
  }
);

const models = {
  User: sequelize.import("./user.js"),
  Channel: sequelize.import("./channel.js"),
  Message: sequelize.import("./message.js"),
  Team: sequelize.import("./team.js")
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
