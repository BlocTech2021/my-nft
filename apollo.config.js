module.exports = {
  client: {
    tagName: "gql",
    includes: [
      "./components/**/*.tsx",
      "./pages/**/*.tsx",
      "./pages/**/*.ts",
      "./lib/**/*.ts",
    ],
    service: {
      name: "token-discovery",
      url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER
    }
  }
};