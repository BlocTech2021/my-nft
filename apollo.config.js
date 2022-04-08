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
      name: "me-nft",
      url: "https://kl5tlo5tj9.execute-api.us-east-1.amazonaws.com/dev/graphql"
    }
  }
};