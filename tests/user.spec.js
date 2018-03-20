import axios from "axios";
import models from "../models";

const resetUserTable = () => {
  models.User.destroy({ where: {} }).then(() => {
    models.sequelize.close();
  });
};

describe("User resolvers", () => {
  afterAll(() => {
    resetUserTable();
  });

  test("allUsers", async () => {
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `{
        allUsers{
          id
          username
          email
        }
      }`
    });

    const { data } = response;

    expect(data).toMatchObject({
      data: {
        allUsers: []
      }
    });
  });

  test("createUser", async () => {
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `mutation {
        createUser(username: "user1", email: "user1@example.com", password: "password1") {
          id
          username
          email
        }
      }`
    });
    const { data } = response;

    expect(data).toMatchObject({
      data: {
        createUser: {
          username: "user1",
          email: "user1@example.com"
        }
      }
    });
  });
});
