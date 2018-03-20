import axios from "axios";

describe("user resolvers", () => {
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

  test("create user", async () => {
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
          id: 1,
          username: "user1",
          email: "user1@example.com"
        }
      }
    });
  });
});
