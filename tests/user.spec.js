import axios from "axios";

describe("user resolvers", () => {
  test("allUsers", async () => {
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `{
        allUsers{
          id
          username
        }
      }`
    });
  });
});
