const { gql } = require("apollo-server");
const dbWorks = require("../dbWorks.js");

const typeDefs = gql`
  type People {
    id: ID!
    first_name: String!
    last_name: String!
    sex: Sex!
    blood_type: BloodType!
    serve_years: Int!
    role: Role!
    team: String!
    from: String!
    tools: [Tool]
    givens: [Given]
  }
`;

const resolvers = {
  Query: {
    people: (parent, arg) => dbWorks.getPeople(args),
  },
};

module.exports = { typeDefs, resolvers };
